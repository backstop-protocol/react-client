const axios = require('axios');
const fs = require("fs");

const takeSnapshot = async () => {
  try{
    const [remoteHardhatUrl] = process.argv.slice(2);
    const {data} = await axios.post(remoteHardhatUrl, {
      "jsonrpc":"2.0",
      "method":"evm_snapshot",
      "params":[],
      "id":1
    })
    console.log('snapshotId: ', data.result)
    fs.writeFileSync('./tests/snapshot-id.txt', data.result)
    console.log('all done')
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
};

const run = async () => {
  try{
    const [remoteHardhatUrl] = process.argv.slice(2);
    if(!remoteHardhatUrl){
      throw new Error('please include the remote hardhat url as an argument')
    }
    console.log('remote hardhat url: ', remoteHardhatUrl)
    const snapshotId = fs.readFileSync('./tests/snapshot-id.txt', 'utf8')
    if (!snapshotId){

    }
    console.log('snapshotId: ', snapshotId)

    const {data} = await axios.post(remoteHardhatUrl, {
      "jsonrpc":"2.0",
      "method":"evm_revert",
      "params":[snapshotId],
      "id":1
    })
    
    console.log('revert success: ', data.result)
    console.log('all done')
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
};

run();