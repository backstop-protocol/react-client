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
    cy.acceptMetamaskAccess()
  })

  it('validates balance', () => {
    cy.wait(wait.short)
    cy.contains("Deposit").click()
    cy.wait(wait.short)
    cy.contains("1111 ETH")
  })
})

describe('import positions from compound into b.protocol', () => {

  it('establish a connection on faker', {retries: 10}, ()=> {
    const faker = "https://faker.b-protocol.workers.dev/compound"
    cy.visit('/')
    cy.window().then(win => win.location.href = faker);
    cy.wait(wait.short)
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.wait(wait.short)
    cy.acceptMetamaskAccess()
  })

  const openDepositEthBtn = ".content > div.flex-x9ump0-0.qZfPl > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) div:nth-child(4) div:nth-child(1) > button:nth-child(1)"
  const depositEthInput = ".content > div.flex-x9ump0-0.qZfPl > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) input"
  const depositBtn = ".content > div.flex-x9ump0-0.qZfPl > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) button"

  it('Deposit 1.1 ETH', {retries: 10},()=> {
    cy.wait(wait.short)
    cy.get(openDepositEthBtn).click({force: true})
    cy.wait(wait.short)
    cy.get(depositEthInput).clear().type('1.1')
    cy.get(depositBtn).click()
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })

  it('shows an import button if a Compound position exists', { retries: 10 }, () => {
    cy.wait(wait.short)
    cy.visit('/compound')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.wait(wait.short)
    cy.get('#open-compound-migration-modal').contains('Import')
  })

  it('shows the import modal', () => {
    cy.get('#open-compound-migration-modal').click({force: true})
    cy.wait(wait.short)
    cy.contains('Import your account')
  })

  it('shows an error message when no allowance', ()=>{
    cy.get('#coumpound-import-modal-import-btn').click()
    cy.contains('must unlock all collateral before import')
  })

  it('click on toggle to grant allowance to import the tokens', ()=>{
    cy.get('#ETH-allowance-toggle').click({force: true})
    cy.wait(wait.short)

  })

  it('grants allowance to import the tokens', {retries: 10}, ()=>{
    cy.confirmMetamaskPermissionToSpend()
  })

  it('will not show a no allowance error message after allowance is granted', {retries: 10}, ()=>{
    cy.wait(wait.short)
    cy.get('#coumpound-import-modal-import-btn').click()
    cy.contains('must unlock all collateral before import').should('not.exist')
  })

  it('starts the import TX ', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.get('#coumpound-import-modal-import-btn').click()
    cy.wait(wait.short)
    cy.confirmMetamaskTransaction()
  })

  it('validates import success', {retries: 10}, () => {
    cy.wait(wait.short)
    cy.get('#ETH-deposited').should('have.text', '1.1000 ETH')
  })
})