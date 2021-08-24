describe('intial setup', () => {
  before('resets hardhat', () => {
    //read snapshot
    cy.readFile('./tests/snapshot-id.txt')
    .then(snapshotId => {
      // revert to snapshot
      return cy.request("POST", "http://localhost:8545", {
        "jsonrpc":"2.0",
        "method":"evm_revert",
        "params":[snapshotId],
        "id":1
      })
    })
    .then(({body})=> {
      cy.log("revert success: " + body.result)
    })
    
    cy.wait(4*1000)
    // take new snapshot
    cy.request("POST", "http://localhost:8545", {
      "jsonrpc":"2.0",
      "method":"eth_blockNumber",
      "params":[],
      "id":1
    })
    .then(({body})=> {
      cy.log("eth_blockNumber: " + body.result)
      return cy.request("POST", "http://localhost:8545", {
        "jsonrpc":"2.0",
        "method":"evm_snapshot",
        "params":[body.result],
        "id":1
      })
    })
    .then(({body})=> {
      cy.log("snapshot-id.txt: " + body.result)
      // write snapshot to disk
      return cy.writeFile('./tests/snapshot-id.txt', body.result)
    })

    cy.log("snapshot done! ")

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc":"2.0",
      "method":"mine_block",
      "params":[],
      "id":1
    })

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc":"2.0",
      "method":"mine_block",
      "params":[],
      "id":1
    })

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc":"2.0",
      "method":"mine_block",
      "params":[],
      "id":1
    })

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc":"2.0",
      "method":"mine_block",
      "params":[],
      "id":1
    })

    cy.request("POST", "http://localhost:8545", {
      "jsonrpc":"2.0",
      "method":"mine_block",
      "params":[],
      "id":1
    })
    cy.log("mined 5 blocks")
  })

  it('validates address', () => {
    cy.getMetamaskWalletAddress().then(address => {
      expect(address).to.equal("0xF994Eba5f3F33EbC5a03d9B5e195765eeb29a923")
    })
  })

  it('validates balance', () => {
    cy.visit('/maker')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.wait(4 * 1000)
    cy.acceptMetamaskAccess()
    cy.wait(4 * 1000)
    cy.contains("Deposit").click()
    cy.wait(4 * 1000)
    cy.contains("1111 ETH")
  })
})