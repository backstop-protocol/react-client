// TODO add support for platform name, link, docs,

const poolsByChain = {
  "kovan": [
    {
      poolAddress: "0xEcF1b3903D8596b3B78AD624e88C65829D78b7a4", 
      tokenAddress: "0x6FA3b05777dae34e95FaFd4852FF5D89c0cECF18", 
      tokenName: "LUSD",
      decimals: 7
    }
  ],
  "Arbitrum Testnet": [
    {
      poolAddress: "0xf73940bCE9b8999b222fBa3a03FbF91D16DCF9d4",
      tokenAddress: "0x38C9919E5f6349bA43681fE566031d9ee0Ea3932",
      tokenName: "VST",
      decimals: 18,
      lensAddress: "0x3131ef0f8c63418322009235526206745fF01552",
      rewardAddress: "0xa2f0cc74dfb91c57a21d65bfdde344f21037a532"
    }
  ],
  "fantom": [
    {
      poolAddress: "0xEDC7905a491fF335685e2F2F1552541705138A3D", 
      tokenAddress: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75", 
      tokenName: "USDC",
      decimals: 6
    },
    {
      poolAddress: "0x6d62d6Af9b82CDfA3A7d16601DDbCF8970634d22", 
      tokenAddress: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", 
      tokenName: "DAI",
      decimals: 18
    }
  ]
}

export const getPools = (chain) => {
  return poolsByChain[chain] || []
}

