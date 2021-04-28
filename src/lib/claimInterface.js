const makerGenesisClaimAddress = "0x2fda31af983d36d521dc6de0fabc87777334dc6c"
const compoundGenesisClaimAddress = "0x20428d7F2a5F9024F2A148580f58e397c3718873"
const genesisClaimAbi = [{"inputs":[{"internalType":"address","name":"token_","type":"address"},{"internalType":"bytes32","name":"merkleRoot_","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"isClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

function isClaimed(contractAddress, web3, userIndex){
  const gensisClaim = new web3.eth.Contract(genesisClaimAbi, contractAddress)
  return gensisClaim.methods.isClaimed(userIndex).call({gasLimit:10e6})
}

function claim(contractAddress, web3, userIndex,  account, amount, merkleProof){
  debugger
  const gensisClaim = new web3.eth.Contract(genesisClaimAbi, contractAddress)
  return gensisClaim.methods.claim(userIndex, account, amount, merkleProof)
}

export const makerGenesisIsClaimed = function(){return isClaimed(makerGenesisClaimAddress, ...arguments)}
export const makerGenesisClaim = function(){return claim(makerGenesisClaimAddress, ...arguments)}
export const compoundGenesisIsClaimed = function(){return isClaimed(compoundGenesisClaimAddress, ...arguments)}
export const compoundGenesisClaim = function(){return claim(compoundGenesisClaimAddress, ...arguments)}