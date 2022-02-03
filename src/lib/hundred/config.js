// TODO add support for platform name, link, docs,

const poolsByChain = {
  // "kovan": [
  //   {
  //     poolAddress: "0xEcF1b3903D8596b3B78AD624e88C65829D78b7a4", 
  //     tokenAddress: "0x6FA3b05777dae34e95FaFd4852FF5D89c0cECF18", 
  //     tokenName: "LUSD",
  //     decimals: 7
  //   }
  // ],
  "Arbitrum Testnet": [
    {
      poolAddress: "0xd09a277D75Ce0fA4C76ACaE5423876cD85c9f9f0",
      tokenAddress: "0x660754A3aec39F79D8326c46905BAE6d7B022897",
      tokenName: "VST",
      collateralName: "ETH",
      platformName: "Vesta",
      decimals: 18,
      lensAddress: "0x3131ef0f8c63418322009235526206745fF01552",
      rewardAddress: "0x183CEe30F1C9c126907d8355f25cad762632D7aE",
    },
    {
      poolAddress: "0x6dDE0A629bc66ACdC1DBDF6F1637E12c1DecbA59",
      tokenAddress: "0x660754A3aec39F79D8326c46905BAE6d7B022897",
      tokenName: "VST",
      collateralName: "gOHM",
      platformName: "Vesta",
      decimals: 18,
      lensAddress: "0x3131ef0f8c63418322009235526206745fF01552",
      rewardAddress: "0x183CEe30F1C9c126907d8355f25cad762632D7aE",
    },
    {
      poolAddress: "0xB71dcFf020d7Da360372E185Bcfc593329E3cCcb",
      tokenAddress: "0x660754A3aec39F79D8326c46905BAE6d7B022897",
      tokenName: "VST",
      collateralName: "renBTC",
      platformName: "Vesta",
      decimals: 18,
      lensAddress: "0x3131ef0f8c63418322009235526206745fF01552",
      rewardAddress: "0x183CEe30F1C9c126907d8355f25cad762632D7aE",
    },
  ],
  // "fantom": [
  //   {
  //     poolAddress: "0xEDC7905a491fF335685e2F2F1552541705138A3D", 
  //     tokenAddress: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75", 
  //     tokenName: "USDC",
  //     decimals: 6
  //   },
  //   {
  //     poolAddress: "0x6d62d6Af9b82CDfA3A7d16601DDbCF8970634d22", 
  //     tokenAddress: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", 
  //     tokenName: "DAI",
  //     decimals: 18
  //   }
  // ]
}

export const getPools = (chain) => {
  return poolsByChain[chain] || []
}

