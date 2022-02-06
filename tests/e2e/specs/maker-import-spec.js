import { wait } from '../test-utils'

describe('resets hardhat', () => {
  before('resets', () => {
    //read snapshot
    cy.readFile('./tests/snapshot-id.txt')
      .then(snapshotId => {
        // revert to snapshot
        return cy.request("POST", "http://localhost:8545", {
          "jsonrpc": "2.0",
          "method": "evm_revert",
          "params": [snapshotId],
          "id": 1
        })
      })
      .then(({ body }) => {
        cy.log("revert success: " + body.result)
      })

    cy.wait(wait.short)
    // take new snapshot
    cy.request("POST", "http://localhost:8545", {
      "jsonrpc": "2.0",
      "method": "eth_blockNumber",
      "params": [],
      "id": 1
    })
      .then(({ body }) => {
        cy.log("eth_blockNumber: " + body.result)
        return cy.request("POST", "http://localhost:8545", {
          "jsonrpc": "2.0",
          "method": "evm_snapshot",
          "params": [body.result],
          "id": 1
        })
      })
      .then(({ body }) => {
        cy.log("snapshot-id.txt: " + body.result)
        // write snapshot to disk
        return cy.writeFile('./tests/snapshot-id.txt', body.result)
      })

    cy.log("snapshot done! ")

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc": "2.0",
      "method": "mine_block",
      "params": [],
      "id": 1
    })

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc": "2.0",
      "method": "mine_block",
      "params": [],
      "id": 1
    })

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc": "2.0",
      "method": "mine_block",
      "params": [],
      "id": 1
    })

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc": "2.0",
      "method": "mine_block",
      "params": [],
      "id": 1
    })

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc": "2.0",
      "method": "mine_block",
      "params": [],
      "id": 1
    })
    cy.log("mined 5 blocks")
  })

  it('validates address', () => {
    cy.getMetamaskWalletAddress().then(address => {
      expect(address).to.equal("0xF994Eba5f3F33EbC5a03d9B5e195765eeb29a923")
    })
  })

  it('accept metamask access', {retries: 10}, () => {
    cy.resetMetamaskAccount() // fix 
    cy.visit('/')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.wait(wait.short)
    //cy.acceptMetamaskAccess()
  })

  it('validates balance', () => {
    cy.wait(wait.short)
    cy.contains("Deposit").click()
    cy.wait(wait.short)
    cy.contains("1111 ETH")
  })
})

describe('import CDP from maker into b.protocol', () => {

  it('establish a connection on faker', ()=> {

    const faker = "https://faker.b-protocol.workers.dev/"
    cy.visit('/')
    cy.window().then(win => win.location.href = faker);
    cy.wait(wait.short)
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    //cy.acceptMetamaskAccess()
  })
  
  it('open ETH action box', ()=> {
    cy.wait(wait.short)
    cy.get('button').contains("Deposit").click({force: true})
    cy.wait(wait.short)
    cy.contains('How much ETH would you like to deposit?')
  })
  
  it('inserts deposit amount and click', { retries: 10}, ()=> {
    cy.get('[placeholder="Amount in ETH"]').clear().type('4.444')
    cy.get('button').contains("Deposit").click()
    cy.contains('Depositing 4.444 ETH')
  })

  it('confirm the deposit', { retries: 10}, ()=> {
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })

  it('shows an import button if a Maker CDP exists', () => {
    cy.visit('/')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.wait(wait.short)
    cy.wait(wait.short)
    cy.wait(wait.short)
    cy.wait(wait.short)
    cy.get('.migrate-btn').contains('Import')
  })

  it('dispaly the CDP values', () => {
    cy.get('.cdp-convert').contains('4.4440 ETH')
    cy.get('.cdp-convert').contains('0.00 DAI')
  })

  it('shows the import modal', () => {
    cy.get('.migrate-btn').click()
    cy.get('.migrate').find('h2').should('have.text', 'Import your Vault')
  })

  it('starts the import TX ', () => {
    cy.get('.migrate').find('.migration-btn').click()
  })

  it('confirms the import TX ', { retries: 10}, () => {
    cy.confirmMetamaskTransaction()
  })

  it('validates import success', { retries: 10}, () => {
    cy.wait(wait.short)
    cy.get('#ETH-box').find('.currency-value').find('p').should('have.text', '4.4440 ETH')
  })

})