const axios = require('axios');
const fs = require("fs");

const run = async () => {
  try{
    const [remoteHardhatUrl] = process.argv.slice(2);
    if(!remoteHardhatUrl){
      throw new Error('please include the remote hardhat url as an argument')
    }
    console.log('remote hardhat url: ', remoteHardhatUrl)
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

run();