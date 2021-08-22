describe('resets hardhat', () => {
  before('', () => {
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
    
    cy.wait(3000)
    // mine one block
    cy.request("POST", "http://localhost:8545", {
      "jsonrpc":"2.0",
      "method":"mine_block",
      "params":[],
      "id":1
    })
    cy.log("block mine success")
    cy.wait(3000)
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
    cy.visit('/')
    cy.contains('Connect').click()
    cy.contains('Meta Mask').click()
    cy.acceptMetamaskAccess()
  })

  it('validates address', () => {
    cy.getMetamaskWalletAddress().then(address => {
      expect(address).to.equal("0xF994Eba5f3F33EbC5a03d9B5e195765eeb29a923")
    })
  })

  it('validates balance', () => {
    cy.contains("Deposit").click()
    cy.contains("16664.9482 ETH")
  })

})