'use strict'


const infoAddress = "0x8e34f2EbcaEDD5f0F4265e4ED1015ab178358d0B"
const infoAbi = [{"inputs":[{"internalType":"address","name":"dai_","type":"address"},{"internalType":"address","name":"weth_","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"bitten","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"blockNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cdp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dai","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"daiAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"daiBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"daiDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dustInWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ethBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ethDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"guy","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"contract VatLike","name":"vat","type":"address"},{"internalType":"contract GetCdps","name":"getCdp","type":"address"}],"name":"findFirstNonZeroInkCdp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"address","name":"manager","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"contract VatLike","name":"vat","type":"address"},{"internalType":"contract GetCdps","name":"getCdp","type":"address"},{"internalType":"bool","name":"b","type":"bool"}],"name":"getCdpInfo","outputs":[{"components":[{"internalType":"bool","name":"hasCdp","type":"bool"},{"internalType":"bool","name":"bitten","type":"bool"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"ethDeposit","type":"uint256"},{"internalType":"uint256","name":"daiDebt","type":"uint256"},{"internalType":"uint256","name":"maxDaiDebt","type":"uint256"},{"internalType":"uint256","name":"minEthDeposit","type":"uint256"}],"internalType":"struct UserInfoStorage.CdpInfo","name":"info","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"contract BCdpManager","name":"manager","type":"address"},{"internalType":"contract DssCdpManager","name":"makerDAOManager","type":"address"},{"internalType":"contract GetCdps","name":"getCdp","type":"address"},{"internalType":"contract VatLike","name":"vat","type":"address"},{"internalType":"contract SpotLike","name":"spot","type":"address"},{"internalType":"contract ProxyRegistryLike","name":"registry","type":"address"},{"internalType":"address","name":"jar","type":"address"}],"name":"getInfo","outputs":[{"components":[{"components":[{"internalType":"bool","name":"hasProxy","type":"bool"},{"internalType":"contract DSProxyLike","name":"userProxy","type":"address"}],"internalType":"struct UserInfoStorage.ProxyInfo","name":"proxyInfo","type":"tuple"},{"components":[{"internalType":"bool","name":"hasCdp","type":"bool"},{"internalType":"bool","name":"bitten","type":"bool"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"ethDeposit","type":"uint256"},{"internalType":"uint256","name":"daiDebt","type":"uint256"},{"internalType":"uint256","name":"maxDaiDebt","type":"uint256"},{"internalType":"uint256","name":"minEthDeposit","type":"uint256"}],"internalType":"struct UserInfoStorage.CdpInfo","name":"bCdpInfo","type":"tuple"},{"components":[{"internalType":"bool","name":"hasCdp","type":"bool"},{"internalType":"bool","name":"bitten","type":"bool"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"ethDeposit","type":"uint256"},{"internalType":"uint256","name":"daiDebt","type":"uint256"},{"internalType":"uint256","name":"maxDaiDebt","type":"uint256"},{"internalType":"uint256","name":"minEthDeposit","type":"uint256"}],"internalType":"struct UserInfoStorage.CdpInfo","name":"makerdaoCdpInfo","type":"tuple"},{"components":[{"internalType":"uint256","name":"userRating","type":"uint256"},{"internalType":"uint256","name":"userRatingProgressPerSec","type":"uint256"},{"internalType":"uint256","name":"totalRating","type":"uint256"},{"internalType":"uint256","name":"totalRatingProgressPerSec","type":"uint256"},{"internalType":"uint256","name":"jarBalance","type":"uint256"}],"internalType":"struct UserInfoStorage.UserRatingInfo","name":"userRatingInfo","type":"tuple"},{"components":[{"internalType":"uint256","name":"spotPrice","type":"uint256"},{"internalType":"uint256","name":"dustInWei","type":"uint256"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"internalType":"struct UserInfoStorage.MiscInfo","name":"miscInfo","type":"tuple"},{"components":[{"internalType":"uint256","name":"ethBalance","type":"uint256"},{"internalType":"uint256","name":"daiBalance","type":"uint256"},{"internalType":"uint256","name":"daiAllowance","type":"uint256"}],"internalType":"struct UserInfoStorage.UserWalletInfo","name":"userWalletInfo","type":"tuple"}],"internalType":"struct UserInfoStorage.UserState","name":"state","type":"tuple"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"contract ProxyRegistryLike","name":"registry","type":"address"},{"internalType":"address","name":"user","type":"address"}],"name":"getProxyInfo","outputs":[{"components":[{"internalType":"bool","name":"hasProxy","type":"bool"},{"internalType":"contract DSProxyLike","name":"userProxy","type":"address"}],"internalType":"struct UserInfoStorage.ProxyInfo","name":"info","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"address","name":"urn","type":"address"},{"internalType":"contract VatLike","name":"vat","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"jar","type":"address"}],"name":"getUserRatingInfo","outputs":[{"components":[{"internalType":"uint256","name":"userRating","type":"uint256"},{"internalType":"uint256","name":"userRatingProgressPerSec","type":"uint256"},{"internalType":"uint256","name":"totalRating","type":"uint256"},{"internalType":"uint256","name":"totalRatingProgressPerSec","type":"uint256"},{"internalType":"uint256","name":"jarBalance","type":"uint256"}],"internalType":"struct UserInfoStorage.UserRatingInfo","name":"info","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"hasCdp","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"hasProxy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"jarBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"makerdaoCdp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"makerdaoDaiDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"makerdaoEthDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"makerdaoHasCdp","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"makerdaoMaxDaiDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxDaiDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"components":[{"components":[{"internalType":"bool","name":"hasProxy","type":"bool"},{"internalType":"contract DSProxyLike","name":"userProxy","type":"address"}],"internalType":"struct UserInfoStorage.ProxyInfo","name":"proxyInfo","type":"tuple"},{"components":[{"internalType":"bool","name":"hasCdp","type":"bool"},{"internalType":"bool","name":"bitten","type":"bool"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"ethDeposit","type":"uint256"},{"internalType":"uint256","name":"daiDebt","type":"uint256"},{"internalType":"uint256","name":"maxDaiDebt","type":"uint256"},{"internalType":"uint256","name":"minEthDeposit","type":"uint256"}],"internalType":"struct UserInfoStorage.CdpInfo","name":"bCdpInfo","type":"tuple"},{"components":[{"internalType":"bool","name":"hasCdp","type":"bool"},{"internalType":"bool","name":"bitten","type":"bool"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"ethDeposit","type":"uint256"},{"internalType":"uint256","name":"daiDebt","type":"uint256"},{"internalType":"uint256","name":"maxDaiDebt","type":"uint256"},{"internalType":"uint256","name":"minEthDeposit","type":"uint256"}],"internalType":"struct UserInfoStorage.CdpInfo","name":"makerdaoCdpInfo","type":"tuple"},{"components":[{"internalType":"uint256","name":"userRating","type":"uint256"},{"internalType":"uint256","name":"userRatingProgressPerSec","type":"uint256"},{"internalType":"uint256","name":"totalRating","type":"uint256"},{"internalType":"uint256","name":"totalRatingProgressPerSec","type":"uint256"},{"internalType":"uint256","name":"jarBalance","type":"uint256"}],"internalType":"struct UserInfoStorage.UserRatingInfo","name":"userRatingInfo","type":"tuple"},{"components":[{"internalType":"uint256","name":"spotPrice","type":"uint256"},{"internalType":"uint256","name":"dustInWei","type":"uint256"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"internalType":"struct UserInfoStorage.MiscInfo","name":"miscInfo","type":"tuple"},{"components":[{"internalType":"uint256","name":"ethBalance","type":"uint256"},{"internalType":"uint256","name":"daiBalance","type":"uint256"},{"internalType":"uint256","name":"daiAllowance","type":"uint256"}],"internalType":"struct UserInfoStorage.UserWalletInfo","name":"userWalletInfo","type":"tuple"}],"internalType":"struct UserInfoStorage.UserState","name":"state","type":"tuple"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"contract BCdpManager","name":"manager","type":"address"},{"internalType":"contract DssCdpManager","name":"makerDAOManager","type":"address"},{"internalType":"contract GetCdps","name":"getCdp","type":"address"},{"internalType":"contract VatLike","name":"vat","type":"address"},{"internalType":"contract SpotLike","name":"spot","type":"address"},{"internalType":"contract ProxyRegistryLike","name":"registry","type":"address"},{"internalType":"address","name":"jar","type":"address"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"spotPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalRating","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalRatingProgressPerSec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"userProxy","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"userRating","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"userRatingProgressPerSec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"weth","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]


const actionProxyAddress = "0x4671A2923bE5272F8FAeD175d2cA3cF1BFE4C54f"
const actionProxyAbi =
[{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"ok","type":"uint256"}],"name":"cdpAllow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"apt","type":"address"},{"internalType":"address","name":"urn","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"daiJoin_join","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"draw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"src","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"enter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"apt","type":"address"},{"internalType":"address","name":"urn","type":"address"}],"name":"ethJoin_join","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"exitETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"exitGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"flux","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"freeETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"freeGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"int256","name":"dink","type":"int256"},{"internalType":"int256","name":"dart","type":"int256"}],"name":"frob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"apt","type":"address"},{"internalType":"address","name":"urn","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"gemJoin_join","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"usr","type":"address"}],"name":"give","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"proxyRegistry","type":"address"},{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"}],"name":"giveToProxy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"obj","type":"address"},{"internalType":"address","name":"usr","type":"address"}],"name":"hope","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"lockETH","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"lockETHAndDraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"lockETHViaCdp","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"lockGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amtC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"lockGemAndDraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"gemJoin","type":"address"}],"name":"makeGemBag","outputs":[{"internalType":"address","name":"bag","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"obj","type":"address"},{"internalType":"address","name":"usr","type":"address"}],"name":"nope","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"address","name":"usr","type":"address"}],"name":"open","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"managerSrc","type":"address"},{"internalType":"address","name":"managerDst","type":"address"},{"internalType":"uint256","name":"cdpSrc","type":"uint256"},{"internalType":"bytes32","name":"ilk","type":"bytes32"}],"name":"openAndImportFromManager","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"openLockETHAndDraw","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"proxyRegistry","type":"address"},{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"address","name":"dst","type":"address"}],"name":"openLockETHAndGiveToProxy","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"gntJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"uint256","name":"amtC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"openLockGNTAndDraw","outputs":[{"internalType":"address","name":"bag","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"uint256","name":"amtC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"openLockGemAndDraw","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"}],"name":"quit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"safeLockETH","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"},{"internalType":"address","name":"owner","type":"address"}],"name":"safeLockGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"safeWipe","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"safeWipeAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdpSrc","type":"uint256"},{"internalType":"uint256","name":"cdpOrg","type":"uint256"}],"name":"shift","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"managerSrc","type":"address"},{"internalType":"address","name":"managerDst","type":"address"},{"internalType":"uint256","name":"cdpSrc","type":"uint256"},{"internalType":"uint256","name":"cdpDst","type":"uint256"}],"name":"shiftManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"gem","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"ok","type":"uint256"}],"name":"urnAllow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"wipe","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"wipeAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadC","type":"uint256"}],"name":"wipeAllAndFreeETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amtC","type":"uint256"}],"name":"wipeAllAndFreeGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"wipeAndFreeETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amtC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"wipeAndFreeGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const proxyAbi =
[{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_target","type":"address"},{"name":"_data","type":"bytes"}],"name":"execute","outputs":[{"name":"response","type":"bytes32"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_code","type":"bytes"},{"name":"_data","type":"bytes"}],"name":"execute","outputs":[{"name":"target","type":"address"},{"name":"response","type":"bytes32"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"cache","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_cacheAddr","type":"address"}],"name":"setCache","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_cacheAddr","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"}]

const daiAbi =
[{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"deny","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"rely","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

const ETH_ILK = "0x4554482d41000000000000000000000000000000000000000000000000000000"
const BCDP_MANGER = "0x0470000Ff279d3951F0Fb4893443C25EA4E0ec69"
const CDP_MANAGER = "0x1476483dD8C35F25e568113C5f70249D3976ba21"
const GET_CDPS = "0x592301a23d37c591C5856f28726AF820AF8e7014"
const MCD_VAT = "0xbA987bDB501d131f766fEe8180Da5d81b34b69d9"
const MCD_SPOT = "0x3a042de6413eDB15F2784f2f97cC68C7E9750b2D"
const PROXY_REGISTRY = "0x64A436ae831C1672AE81F674CAb8B6775df3475C"
const MCD_JOIN_ETH_A = "0x775787933e92b709f2a3C70aa87999696e74A9F8"
const MCD_JOIN_DAI = "0x5AA71a3ae1C0bd6ac27A1f28e1415fFFB6F15B8c"
const MCD_JUG = "0xcbB7718c9F39d05aEEDE1c472ca8Bf804b2f1EaD"
const MCD_DAI = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"

const JAR = "0x92E3B48d3C86A1c809a2a5334a4ad3c9d0bf3758"



export const getUserInfo = function(web3, user) {
  const infoContract = new web3.eth.Contract(infoAbi,infoAddress)
  return infoContract.methods.getInfo(user,
                                      ETH_ILK,
                                      BCDP_MANGER,
                                      CDP_MANAGER,
                                      GET_CDPS,
                                      MCD_VAT,
                                      MCD_SPOT,
                                      PROXY_REGISTRY,
                                      JAR).call({gasLimit:10e6})
}

export const firstDeposit = function(web3, user) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,actionProxyAddress)
  return actionProxyContract.methods.openLockETHAndGiveToProxy(PROXY_REGISTRY,
                                                               BCDP_MANGER,
                                                               MCD_JOIN_ETH_A,
                                                               ETH_ILK,
                                                               user)
}

export const depositETH = function(web3, userProxy, cdp) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,actionProxyAddress)

  const data = actionProxyContract.methods.lockETHViaCdp(BCDP_MANGER,
                                                         MCD_JOIN_ETH_A,
                                                         cdp).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](actionProxyAddress,data)
}

export const withdrawETH = function(web3, userProxy, cdp, wad) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,actionProxyAddress)

  const data = actionProxyContract.methods.freeETH(BCDP_MANGER,
                                                   MCD_JOIN_ETH_A,
                                                   cdp,
                                                   wad).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](actionProxyAddress,data)
}

export const generateDai = function(web3, userProxy, cdp, wad) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,actionProxyAddress)

  const data = actionProxyContract.methods.draw(BCDP_MANGER,
                                                MCD_JUG,
                                                MCD_JOIN_DAI,
                                                cdp,
                                                wad).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](actionProxyAddress,data)
}

export const unlockDai = function(web3, userProxy) {
  const daiContract = new web3.eth.Contract(daiAbi,MCD_DAI)
  return daiContract.methods.approve(userProxy,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
}

export const repayDai = function(web3, userProxy, cdp, wad) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,actionProxyAddress)

  const data = actionProxyContract.methods.safeWipe(BCDP_MANGER,
                                                    MCD_JOIN_DAI,
                                                    cdp,
                                                    wad,
                                                    userProxy).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](actionProxyAddress,data)
}

export const repayAllDai = function(web3, userProxy, cdp) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,actionProxyAddress)

  const data = actionProxyContract.methods.safeWipeAll(BCDP_MANGER,
                                                       MCD_JOIN_DAI,
                                                       cdp,
                                                       userProxy).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](actionProxyAddress,data)
}

export const migrateFresh = function(web3, userProxy, makerDaoCdp) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,actionProxyAddress)

  const data = actionProxyContract.methods.openAndImportFromManager(CDP_MANAGER,
                                                                    BCDP_MANGER,
                                                                    makerDaoCdp,
                                                                    ETH_ILK).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](actionProxyAddress,data)
}

export const migrateToExisting = function(web3, userProxy, makerDaoCdp, bCdp) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,actionProxyAddress)

  const data = actionProxyContract.methods.shiftManager(CDP_MANAGER,
                                                        BCDP_MANGER,
                                                        makerDaoCdp,
                                                        bCdp).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](actionProxyAddress,data)
}

// this will be used only for testings
export const openMakerDaoCdp = function(web3, user) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,actionProxyAddress)
  return actionProxyContract.methods.openLockETHAndGiveToProxy(PROXY_REGISTRY,
                                                               CDP_MANAGER,
                                                               MCD_JOIN_ETH_A,
                                                               ETH_ILK,
                                                               user)
}


////////////////////////////////////////////////////////////////////////////////
//
// Util functions without blockchain interaction
//
////////////////////////////////////////////////////////////////////////////////

function toNumber(bignum,web3) {
  return Number(web3.utils.fromWei(bignum))
}

function calcNewBorrowAndLPrice(userInfo,
                                dEth,
                                dDai,
                                web3) {
  dEth = toNumber(dEth,web3)
  dDai = toNumber(dDai,web3)
  const ethDeposit = toNumber(userInfo.bCdpInfo.ethDeposit,web3)
  const daiDebt = toNumber(userInfo.bCdpInfo.daiDebt,web3)

  const maxDaiDebt = toNumber(userInfo.bCdpInfo.maxDaiDebt,web3)
  const spotPrice = toNumber(userInfo.miscInfo.spotPrice,web3)

  if((ethDeposit == 0) || (ethDeposit + dEth == 0)) return [web3.utils.toWei("0"), web3.utils.toWei("0")]

  const newMaxDaiDebt = maxDaiDebt * (ethDeposit + dEth) / ethDeposit
  const liqRatio = ethDeposit * spotPrice / maxDaiDebt
  // (total dai debt) * liqRatio = (total eth deposit) * liquidationPrice
  const newLiquidationPrice = (daiDebt + dDai) * liqRatio / (ethDeposit + dEth)

  return [web3.utils.toWei(newMaxDaiDebt.toFixed(17).toString()), web3.utils.toWei(newLiquidationPrice.toFixed(17).toString())]
}

export const calcNewBorrowLimitAndLiquidationPrice = calcNewBorrowAndLPrice

////////////////////////////////////////////////////////////////////////////////

export const verifyDepositInput = function(userInfo,
                                             dEth,
                                             web3) {
  dEth = toNumber(dEth,web3)
  if(dEth <= 0) return [false, "Deposit amount must be positive"]

  // equality is also failure, because ETH is needed for gas
  if(dEth > toNumber(userInfo.userWalletInfo.ethBalance,web3)) return [false, "Amount exceeds wallet balance"]

  return [true,""]
}

////////////////////////////////////////////////////////////////////////////////

export const verifyWithdrawInput = function(userInfo,
                                              dEth,
                                              web3) {
  const dEthMinus = web3.utils.toBN(dEth).mul(web3.utils.toBN(-1))
  dEth = toNumber(dEth,web3)
  if(dEth <= 0) return [false, "Withdraw amount must be positive"]
  if(dEth > toNumber(userInfo.bCdpInfo.ethDeposit,web3)) return [false, "Amount exceeds CDP deposit"]

  const [maxDebt,newPrice] = calcNewBorrowAndLPrice(userInfo,dEthMinus.toString(10),"0",web3)
  if(toNumber(maxDebt,web3) < toNumber(userInfo.bCdpInfo.daiDebt,web3)) return [false,"Amount exceeds allowed withdrawal"]

  return [true,""]
}

////////////////////////////////////////////////////////////////////////////////

export const verifyBorrowInput = function(userInfo,
                                            dDai,
                                            web3) {
  dDai = toNumber(dDai,web3)
  if(dDai <= 0) return [false, "Borrow amount must be positive"]

  const newDebt = toNumber(userInfo.bCdpInfo.daiDebt,web3) + dDai
  const dust = toNumber(userInfo.miscInfo.dustInWei,web3)

  if(newDebt > toNumber(userInfo.bCdpInfo.maxDaiDebt,web3)) return [false,"Amount exceeds allowed borrowed"]
  if(newDebt < dust) return [false,"A Vault requires a minimum of " + dust.toString() + " Dai to be generated"]

  return [true,""]
}

////////////////////////////////////////////////////////////////////////////////

export const verifyRepayInput = function(userInfo,
                                           dDai,
                                           web3) {
  dDai = toNumber(dDai,web3)
  if(dDai <= 0) return [false, "Repay amount must be positive"]
  if(dDai > toNumber(userInfo.userWalletInfo.daiBalance,web3)) return [false,"Amount exceeds dai balance"]
  if(dDai > toNumber(userInfo.bCdpInfo.daiDebt,web3)) return [false,"Amount exceeds dai debt"]
  if(dDai > toNumber(userInfo.userWalletInfo.daiAllowance,web3)) return [false,"Must unlock DAI"]

  const newDebt = toNumber(userInfo.bCdpInfo.daiDebt,web3) - dDai
  const dust = toNumber(userInfo.miscInfo.dustInWei, web3)
  const maxRepay = toNumber(userInfo.bCdpInfo.daiDebt,web3) - dust

  if(dust >= newDebt && newDebt > 1) return [false,"You can repay all your outstanding debt or a maximum of " + maxRepay.toString() + " Dai"]
  if(dust >= newDebt) {
    if(web3.utils.toBN(userInfo.bCdpInfo.daiDebt).gt(web3.utils.toBN(userInfo.userWalletInfo.daiBalance))) {
      return [false, "Dai balance is not enough to repay your entire debt"]
    }

    if(web3.utils.toBN(userInfo.bCdpInfo.daiDebt).gt(web3.utils.toBN(userInfo.userWalletInfo.daiAllowance))) {
      return [false, "Dai allowance is not enough to repay your entire debt"]
    }
  }


  return [true,""]
}
