export const ABI = {
  bammKeeper: [{"inputs":[{"internalType":"contract Arb","name":"_arb","type":"address"},{"internalType":"contract ArbChecker","name":"_arbChecker","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"succ","type":"bool"}],"name":"KeepOperation","type":"event"},{"inputs":[{"internalType":"address","name":"newBamm","type":"address"}],"name":"addBamm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"arb","outputs":[{"internalType":"contract Arb","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"arbChecker","outputs":[{"internalType":"contract ArbChecker","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bamms","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"checkUpkeep","outputs":[{"internalType":"bool","name":"upkeepNeeded","type":"bool"},{"internalType":"bytes","name":"performData","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"findSmallestQty","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxEthQty","type":"uint256"},{"internalType":"uint256","name":"_minEthQty","type":"uint256"},{"internalType":"uint256","name":"_minProfit","type":"uint256"}],"name":"initParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"masterCopy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"performData","type":"bytes"}],"name":"performUpkeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"performData","type":"bytes"}],"name":"performUpkeepSafe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"bamm","type":"address"}],"name":"removeBamm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newVal","type":"uint256"}],"name":"setMaxEthQty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newVal","type":"uint256"}],"name":"setMinEthQty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newVal","type":"uint256"}],"name":"setMinProfit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"transferAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newMaster","type":"address"}],"name":"upgrade","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
  bamm: [{"inputs":[{"internalType":"address","name":"_priceAggregator","type":"address"},{"internalType":"address payable","name":"_SP","type":"address"},{"internalType":"address","name":"_LUSD","type":"address"},{"internalType":"address","name":"_LQTY","type":"address"},{"internalType":"uint256","name":"_maxDiscount","type":"uint256"},{"internalType":"address payable","name":"_feePool","type":"address"},{"internalType":"address","name":"_frontEndTag","type":"address"},{"internalType":"address","name":"_pLQTY","type":"address"},{"internalType":"address","name":"_pickleJar","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"val","type":"uint256"}],"name":"Exit","type":"event"},{"anonymous":false,"inputs":[],"name":"Flee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"val","type":"uint256"}],"name":"Join","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"A","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"ParamsSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"lusdAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"RebalanceSwap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Tack","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"lusdAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"numShares","type":"uint256"}],"name":"UserDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"lusdAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"numShares","type":"uint256"}],"name":"UserWithdraw","type":"event"},{"inputs":[],"name":"A","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LUSD","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_A","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_A","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SP","outputs":[{"internalType":"contract StabilityPool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"add","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonus","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"crops","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lusdAmount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositLqty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feePool","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fetchPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"frontEndTag","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gem","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"},{"internalType":"contract IERC20","name":"","type":"address"},{"internalType":"uint256","name":"srcQty","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"getConversionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"xQty","type":"uint256"},{"internalType":"uint256","name":"xBalance","type":"uint256"},{"internalType":"uint256","name":"yBalance","type":"uint256"},{"internalType":"uint256","name":"A","type":"uint256"}],"name":"getReturn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"},{"internalType":"uint256","name":"A","type":"uint256"}],"name":"getSumFixedPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"lusdQty","type":"uint256"}],"name":"getSwapEthAmount","outputs":[{"internalType":"uint256","name":"ethAmount","type":"uint256"},{"internalType":"uint256","name":"feeEthAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ilk","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxDiscount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"mul","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nav","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pickleJar","outputs":[{"internalType":"contract PickleJarLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceAggregator","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"rdiv","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"rmul","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"rmulup","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_A","type":"uint256"},{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"share","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"sub","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"lusdAmount","type":"uint256"},{"internalType":"uint256","name":"minEthReturn","type":"uint256"},{"internalType":"address payable","name":"dest","type":"address"}],"name":"swap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"},{"internalType":"uint256","name":"srcAmount","type":"uint256"},{"internalType":"contract IERC20","name":"","type":"address"},{"internalType":"address payable","name":"destAddress","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"name":"trade","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vat","outputs":[{"internalType":"contract VatLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"wdiv","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"wdivup","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"numShares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"wmul","outputs":[{"internalType":"uint256","name":"z","type":"uint256"}],"stateMutability":"pure","type":"function"},{"stateMutability":"payable","type":"receive"}],
  stabilityPool: [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newActivePoolAddress",
          "type": "address"
        }
      ],
      "name": "ActivePoolAddressChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newBorrowerOperationsAddress",
          "type": "address"
        }
      ],
      "name": "BorrowerOperationsAddressChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newCommunityIssuanceAddress",
          "type": "address"
        }
      ],
      "name": "CommunityIssuanceAddressChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newDefaultPoolAddress",
          "type": "address"
        }
      ],
      "name": "DefaultPoolAddressChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_P",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_S",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_G",
          "type": "uint256"
        }
      ],
      "name": "DepositSnapshotUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_ETH",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_LUSDLoss",
          "type": "uint256"
        }
      ],
      "name": "ETHGainWithdrawn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "_currentEpoch",
          "type": "uint128"
        }
      ],
      "name": "EpochUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "EtherSent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_frontEnd",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_kickbackRate",
          "type": "uint256"
        }
      ],
      "name": "FrontEndRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_frontEnd",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_P",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_G",
          "type": "uint256"
        }
      ],
      "name": "FrontEndSnapshotUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_frontEnd",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_newFrontEndStake",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        }
      ],
      "name": "FrontEndStakeChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_frontEnd",
          "type": "address"
        }
      ],
      "name": "FrontEndTagSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_G",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "_epoch",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "_scale",
          "type": "uint128"
        }
      ],
      "name": "G_Updated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_LQTY",
          "type": "uint256"
        }
      ],
      "name": "LQTYPaidToDepositor",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_frontEnd",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_LQTY",
          "type": "uint256"
        }
      ],
      "name": "LQTYPaidToFrontEnd",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newLUSDTokenAddress",
          "type": "address"
        }
      ],
      "name": "LUSDTokenAddressChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_P",
          "type": "uint256"
        }
      ],
      "name": "P_Updated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newPriceFeedAddress",
          "type": "address"
        }
      ],
      "name": "PriceFeedAddressChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_S",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "_epoch",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "_scale",
          "type": "uint128"
        }
      ],
      "name": "S_Updated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "_currentScale",
          "type": "uint128"
        }
      ],
      "name": "ScaleUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newSortedTrovesAddress",
          "type": "address"
        }
      ],
      "name": "SortedTrovesAddressChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_newBalance",
          "type": "uint256"
        }
      ],
      "name": "StabilityPoolETHBalanceUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_newBalance",
          "type": "uint256"
        }
      ],
      "name": "StabilityPoolLUSDBalanceUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newTroveManagerAddress",
          "type": "address"
        }
      ],
      "name": "TroveManagerAddressChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_newDeposit",
          "type": "uint256"
        }
      ],
      "name": "UserDepositChanged",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "BORROWING_FEE_FLOOR",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "CCR",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "DECIMAL_PRECISION",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "LUSD_GAS_COMPENSATION",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MCR",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MIN_NET_DEBT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "NAME",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "P",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PERCENT_DIVISOR",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "SCALE_FACTOR",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_100pct",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "activePool",
      "outputs": [
        {
          "internalType": "contract IActivePool",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "borrowerOperations",
      "outputs": [
        {
          "internalType": "contract IBorrowerOperations",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "communityIssuance",
      "outputs": [
        {
          "internalType": "contract ICommunityIssuance",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentEpoch",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentScale",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "defaultPool",
      "outputs": [
        {
          "internalType": "contract IDefaultPool",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "depositSnapshots",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "S",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "P",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "G",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "scale",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "epoch",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "deposits",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "initialValue",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "frontEndTag",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint128",
          "name": "",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "",
          "type": "uint128"
        }
      ],
      "name": "epochToScaleToG",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint128",
          "name": "",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "",
          "type": "uint128"
        }
      ],
      "name": "epochToScaleToSum",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "frontEndSnapshots",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "S",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "P",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "G",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "scale",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "epoch",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "frontEndStakes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "frontEnds",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "kickbackRate",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "registered",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_frontEnd",
          "type": "address"
        }
      ],
      "name": "getCompoundedFrontEndStake",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        }
      ],
      "name": "getCompoundedLUSDDeposit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        }
      ],
      "name": "getDepositorETHGain",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_depositor",
          "type": "address"
        }
      ],
      "name": "getDepositorLQTYGain",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getEntireSystemColl",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "entireSystemColl",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getEntireSystemDebt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "entireSystemDebt",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_frontEnd",
          "type": "address"
        }
      ],
      "name": "getFrontEndLQTYGain",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalLUSDDeposits",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastETHError_Offset",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastLQTYError",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastLUSDLossError_Offset",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lusdToken",
      "outputs": [
        {
          "internalType": "contract ILUSDToken",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_debtToOffset",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_collToAdd",
          "type": "uint256"
        }
      ],
      "name": "offset",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "priceFeed",
      "outputs": [
        {
          "internalType": "contract IPriceFeed",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_frontEndTag",
          "type": "address"
        }
      ],
      "name": "provideToSP",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_kickbackRate",
          "type": "uint256"
        }
      ],
      "name": "registerFrontEnd",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_borrowerOperationsAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_troveManagerAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_activePoolAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_lusdTokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_sortedTrovesAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_priceFeedAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_communityIssuanceAddress",
          "type": "address"
        }
      ],
      "name": "setAddresses",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "sortedTroves",
      "outputs": [
        {
          "internalType": "contract ISortedTroves",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "troveManager",
      "outputs": [
        {
          "internalType": "contract ITroveManager",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_upperHint",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_lowerHint",
          "type": "address"
        }
      ],
      "name": "withdrawETHGainToTrove",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawFromSP",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
}