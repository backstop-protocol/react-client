(function() {
  const isDevelopment = location.host.indexOf("localhost") > -1 
  if (isDevelopment){
    window.appConfig = {
      votingBanner: true,
      voting: true,
      makerPropsalId: 0,
      compoundPropsalId: 0,
      voteBpApi: "http://localhost:8545"
    };
  } else {
    // is production staging ...
    window.appConfig = {
      votingBanner: false,
      voting: false,
      makerPropsalId: 0,
      compoundPropsalId: 0,
      voteBpApi: "http://localhost:8545"
    };
  }
})()