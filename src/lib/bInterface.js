'use strict'
import Web3 from "web3"
import {fromUiDeciamlPointFormat, toUiDecimalPointFormat} from "./Utils"
const {fromWei, toWei, toBN} = Web3.utils

const infoAbi =
[{"inputs":[{"internalType":"address","name":"dai_","type":"address"},{"internalType":"address","name":"weth_","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"bitten","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"blockNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cdp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dai","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"daiAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"daiBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"daiDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dustInWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ethBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ethDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"expectedDebtMissmatch","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"guy","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"contract VatLike","name":"vat","type":"address"},{"internalType":"contract GetCdps","name":"getCdp","type":"address"}],"name":"findFirstNonZeroInkCdp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gemAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gemBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gemDecimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"address","name":"manager","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"contract VatLike","name":"vat","type":"address"},{"internalType":"contract GetCdps","name":"getCdp","type":"address"},{"internalType":"bool","name":"b","type":"bool"},{"internalType":"address","name":"gemJoin","type":"address"}],"name":"getCdpInfo","outputs":[{"components":[{"internalType":"bool","name":"hasCdp","type":"bool"},{"internalType":"bool","name":"bitten","type":"bool"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"ethDeposit","type":"uint256"},{"internalType":"uint256","name":"daiDebt","type":"uint256"},{"internalType":"uint256","name":"maxDaiDebt","type":"uint256"},{"internalType":"uint256","name":"unlockedEth","type":"uint256"},{"internalType":"bool","name":"expectedDebtMissmatch","type":"bool"}],"internalType":"struct UserInfoStorage.CdpInfo","name":"info","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"contract BCdpManager","name":"manager","type":"address"},{"internalType":"contract DssCdpManager","name":"makerDAOManager","type":"address"},{"internalType":"contract GetCdps","name":"getCdp","type":"address"},{"internalType":"contract VatLike","name":"vat","type":"address"},{"internalType":"contract SpotLike","name":"spot","type":"address"},{"internalType":"contract ProxyRegistryLike","name":"registry","type":"address"},{"internalType":"address","name":"jar","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"}],"name":"getInfo","outputs":[{"components":[{"components":[{"internalType":"bool","name":"hasProxy","type":"bool"},{"internalType":"contract DSProxyLike","name":"userProxy","type":"address"}],"internalType":"struct UserInfoStorage.ProxyInfo","name":"proxyInfo","type":"tuple"},{"components":[{"internalType":"bool","name":"hasCdp","type":"bool"},{"internalType":"bool","name":"bitten","type":"bool"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"ethDeposit","type":"uint256"},{"internalType":"uint256","name":"daiDebt","type":"uint256"},{"internalType":"uint256","name":"maxDaiDebt","type":"uint256"},{"internalType":"uint256","name":"unlockedEth","type":"uint256"},{"internalType":"bool","name":"expectedDebtMissmatch","type":"bool"}],"internalType":"struct UserInfoStorage.CdpInfo","name":"bCdpInfo","type":"tuple"},{"components":[{"internalType":"bool","name":"hasCdp","type":"bool"},{"internalType":"bool","name":"bitten","type":"bool"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"ethDeposit","type":"uint256"},{"internalType":"uint256","name":"daiDebt","type":"uint256"},{"internalType":"uint256","name":"maxDaiDebt","type":"uint256"},{"internalType":"uint256","name":"unlockedEth","type":"uint256"},{"internalType":"bool","name":"expectedDebtMissmatch","type":"bool"}],"internalType":"struct UserInfoStorage.CdpInfo","name":"makerdaoCdpInfo","type":"tuple"},{"components":[{"internalType":"uint256","name":"spotPrice","type":"uint256"},{"internalType":"uint256","name":"dustInWei","type":"uint256"},{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"uint256","name":"gemDecimals","type":"uint256"}],"internalType":"struct UserInfoStorage.MiscInfo","name":"miscInfo","type":"tuple"},{"components":[{"internalType":"uint256","name":"ethBalance","type":"uint256"},{"internalType":"uint256","name":"gemBalance","type":"uint256"},{"internalType":"uint256","name":"gemAllowance","type":"uint256"},{"internalType":"uint256","name":"daiBalance","type":"uint256"},{"internalType":"uint256","name":"daiAllowance","type":"uint256"}],"internalType":"struct UserInfoStorage.UserWalletInfo","name":"userWalletInfo","type":"tuple"}],"internalType":"struct UserInfoStorage.UserState","name":"state","type":"tuple"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"contract ProxyRegistryLike","name":"registry","type":"address"},{"internalType":"address","name":"user","type":"address"}],"name":"getProxyInfo","outputs":[{"components":[{"internalType":"bool","name":"hasProxy","type":"bool"},{"internalType":"contract DSProxyLike","name":"userProxy","type":"address"}],"internalType":"struct UserInfoStorage.ProxyInfo","name":"info","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"hasCdp","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"hasProxy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"makerdaoCdp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"makerdaoDaiDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"makerdaoEthDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"makerdaoHasCdp","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"makerdaoMaxDaiDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxDaiDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"components":[{"components":[{"internalType":"bool","name":"hasProxy","type":"bool"},{"internalType":"contract DSProxyLike","name":"userProxy","type":"address"}],"internalType":"struct UserInfoStorage.ProxyInfo","name":"proxyInfo","type":"tuple"},{"components":[{"internalType":"bool","name":"hasCdp","type":"bool"},{"internalType":"bool","name":"bitten","type":"bool"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"ethDeposit","type":"uint256"},{"internalType":"uint256","name":"daiDebt","type":"uint256"},{"internalType":"uint256","name":"maxDaiDebt","type":"uint256"},{"internalType":"uint256","name":"unlockedEth","type":"uint256"},{"internalType":"bool","name":"expectedDebtMissmatch","type":"bool"}],"internalType":"struct UserInfoStorage.CdpInfo","name":"bCdpInfo","type":"tuple"},{"components":[{"internalType":"bool","name":"hasCdp","type":"bool"},{"internalType":"bool","name":"bitten","type":"bool"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"ethDeposit","type":"uint256"},{"internalType":"uint256","name":"daiDebt","type":"uint256"},{"internalType":"uint256","name":"maxDaiDebt","type":"uint256"},{"internalType":"uint256","name":"unlockedEth","type":"uint256"},{"internalType":"bool","name":"expectedDebtMissmatch","type":"bool"}],"internalType":"struct UserInfoStorage.CdpInfo","name":"makerdaoCdpInfo","type":"tuple"},{"components":[{"internalType":"uint256","name":"spotPrice","type":"uint256"},{"internalType":"uint256","name":"dustInWei","type":"uint256"},{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"uint256","name":"gemDecimals","type":"uint256"}],"internalType":"struct UserInfoStorage.MiscInfo","name":"miscInfo","type":"tuple"},{"components":[{"internalType":"uint256","name":"ethBalance","type":"uint256"},{"internalType":"uint256","name":"gemBalance","type":"uint256"},{"internalType":"uint256","name":"gemAllowance","type":"uint256"},{"internalType":"uint256","name":"daiBalance","type":"uint256"},{"internalType":"uint256","name":"daiAllowance","type":"uint256"}],"internalType":"struct UserInfoStorage.UserWalletInfo","name":"userWalletInfo","type":"tuple"}],"internalType":"struct UserInfoStorage.UserState","name":"state","type":"tuple"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"contract BCdpManager","name":"manager","type":"address"},{"internalType":"contract DssCdpManager","name":"makerDAOManager","type":"address"},{"internalType":"contract GetCdps","name":"getCdp","type":"address"},{"internalType":"contract VatLike","name":"vat","type":"address"},{"internalType":"contract SpotLike","name":"spot","type":"address"},{"internalType":"contract ProxyRegistryLike","name":"registry","type":"address"},{"internalType":"address","name":"jar","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"spotPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unlockedEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"userProxy","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"weth","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

const actionProxyAbi =
[{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"ok","type":"uint256"}],"name":"cdpAllow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"apt","type":"address"},{"internalType":"address","name":"urn","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"daiJoin_join","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"draw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"src","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"enter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"apt","type":"address"},{"internalType":"address","name":"urn","type":"address"}],"name":"ethJoin_join","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"exitETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"exitGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"flux","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"freeETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"freeGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"int256","name":"dink","type":"int256"},{"internalType":"int256","name":"dart","type":"int256"}],"name":"frob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"apt","type":"address"},{"internalType":"address","name":"urn","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"gemJoin_join","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"usr","type":"address"}],"name":"give","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"proxyRegistry","type":"address"},{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"}],"name":"giveToProxy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"obj","type":"address"},{"internalType":"address","name":"usr","type":"address"}],"name":"hope","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"lockETH","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"lockETHAndDraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"lockETHViaCdp","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"lockGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amtC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"lockGemAndDraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"lockGemViaCdp","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"gemJoin","type":"address"}],"name":"makeGemBag","outputs":[{"internalType":"address","name":"bag","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"obj","type":"address"},{"internalType":"address","name":"usr","type":"address"}],"name":"nope","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"address","name":"usr","type":"address"}],"name":"open","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"managerSrc","type":"address"},{"internalType":"address","name":"managerDst","type":"address"},{"internalType":"uint256","name":"cdpSrc","type":"uint256"},{"internalType":"bytes32","name":"ilk","type":"bytes32"}],"name":"openAndImportFromManager","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"openLockETHAndDraw","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"proxyRegistry","type":"address"},{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"address","name":"dst","type":"address"}],"name":"openLockETHAndGiveToProxy","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"gntJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"uint256","name":"amtC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"openLockGNTAndDraw","outputs":[{"internalType":"address","name":"bag","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"openLockGem","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"jug","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"bytes32","name":"ilk","type":"bytes32"},{"internalType":"uint256","name":"amtC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"}],"name":"openLockGemAndDraw","outputs":[{"internalType":"uint256","name":"cdp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"dst","type":"address"}],"name":"quit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"safeLockETH","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"bool","name":"transferFrom","type":"bool"},{"internalType":"address","name":"owner","type":"address"}],"name":"safeLockGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"safeWipe","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"safeWipeAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"uint256","name":"cdpSrc","type":"uint256"},{"internalType":"uint256","name":"cdpOrg","type":"uint256"}],"name":"shift","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"managerSrc","type":"address"},{"internalType":"address","name":"managerDst","type":"address"},{"internalType":"uint256","name":"cdpSrc","type":"uint256"},{"internalType":"uint256","name":"cdpDst","type":"uint256"}],"name":"shiftManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"gem","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"ok","type":"uint256"}],"name":"urnAllow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"wipe","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"}],"name":"wipeAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadC","type":"uint256"}],"name":"wipeAllAndFreeETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amtC","type":"uint256"}],"name":"wipeAllAndFreeGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"ethJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"wadC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"wipeAndFreeETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"gemJoin","type":"address"},{"internalType":"address","name":"daiJoin","type":"address"},{"internalType":"uint256","name":"cdp","type":"uint256"},{"internalType":"uint256","name":"amtC","type":"uint256"},{"internalType":"uint256","name":"wadD","type":"uint256"}],"name":"wipeAndFreeGem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const proxyAbi =
[{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_target","type":"address"},{"name":"_data","type":"bytes"}],"name":"execute","outputs":[{"name":"response","type":"bytes32"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_code","type":"bytes"},{"name":"_data","type":"bytes"}],"name":"execute","outputs":[{"name":"target","type":"address"},{"name":"response","type":"bytes32"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"cache","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_cacheAddr","type":"address"}],"name":"setCache","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_cacheAddr","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"}]

const daiAbi =
[{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"deny","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"rely","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

const bStatsAbi = [{"constant":true,"inputs":[{"internalType":"contract BCdpManagerLike","name":"man","type":"address"}],"name":"getStats","outputs":[{"internalType":"uint256","name":"cdpi","type":"uint256"},{"internalType":"uint256","name":"eth","type":"uint256"},{"internalType":"uint256","name":"wbtc","type":"uint256"},{"internalType":"uint256","name":"dai","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

const proxyRegistryAbi = [{"constant":false,"inputs":[],"name":"build","outputs":[{"name":"proxy","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"proxies","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"build","outputs":[{"name":"proxy","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"factory_","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]


const ETH_A_ILK = "0x4554482d41000000000000000000000000000000000000000000000000000000"
const ETH_B_ILK = "0x4554482d42000000000000000000000000000000000000000000000000000000"
const ETH_C_ILK = "0x4554482d43000000000000000000000000000000000000000000000000000000"
const WBTC_A_ILK = "0x574254432d410000000000000000000000000000000000000000000000000000"
                   
const collateralFactor = { [ETH_A_ILK] : 1.5, [ETH_B_ILK] : 1.3, [ETH_C_ILK] : 1.75, [WBTC_A_ILK] : 1.5 }

const mainnetAddresses =
{
     "INFO_ADDRESS" : "0xe423e5a5f434c0c63C377fe13888CD8D252D68C0",
     "ACTION_PROXY_ADDRESS" : "0x5eAe7715D1970867E4d57C58b08e6AcF405A094d",
     "JAR" : "0x3C36cCf03dAB88c1b1AC1eb9C3Fb5dB0b6763cFF",
     "BCDP_MANGER" : "0x3f30c2381CD8B917Dd96EB2f1A4F96D91324BBed",
     "BSTATS" : "0x6546f6cc31a207863F14439d57AAed4baa9B6F99",

     "CDP_MANAGER" : "0x5ef30b9986345249bc32d8928B7ee64DE9435E39",
     "GET_CDPS" : "0x36a724Bd100c39f0Ea4D3A20F7097eE01A8Ff573",
     "MCD_VAT" : "0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B",
     "MCD_SPOT" : "0x65C79fcB50Ca1594B025960e539eD7A9a6D434A3",
     "PROXY_REGISTRY" : "0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4",
     "MCD_JOIN_ETH_A" : "0x2F0b23f53734252Bda2277357e97e1517d6B042A",
     "MCD_JOIN_ETH_B" : "0x08638eF1A205bE6762A8b935F5da9b700Cf7322c",     
     "MCD_JOIN_ETH_C": "0xF04a5cC80B1E94C69B48f5ee68a08CD2F09A7c3E",
     "MCD_JOIN_WBTC_A" : "0xBF72Da2Bd84c5170618Fbe5914B0ECA9638d5eb5",
     "MCD_JOIN_DAI" : "0x9759A6Ac90977b93B58547b4A71c78317f391A28",
     "MCD_JUG" : "0x19c0976f590D67707E62397C87829d896Dc0f1F1",
     "MCD_DAI" : "0x6B175474E89094C44Da98b954EedeAC495271d0F",
     "WBTC" : "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
}

const kovanAddresses =
{
    "INFO_ADDRESS" : "0x5702Abb17C6eEDe8AbD342F3067ea541e00e55Bc",
    "ACTION_PROXY_ADDRESS" : "0x8dbFA8A8534B7dA6348a6a4355364063bE3EEaCd",
    "JAR" : "0x92E3B48d3C86A1c809a2a5334a4ad3c9d0bf3758",
    "BCDP_MANGER" : "0x0470000Ff279d3951F0Fb4893443C25EA4E0ec69",
    "BSTATS" : "0xfA730332e64c2a8a181c53Aee18d98429DDdFb35",

    "CDP_MANAGER" : "0x1476483dD8C35F25e568113C5f70249D3976ba21",
    "GET_CDPS" : "0x592301a23d37c591C5856f28726AF820AF8e7014",
    "MCD_VAT" : "0xbA987bDB501d131f766fEe8180Da5d81b34b69d9",
    "MCD_SPOT" : "0x3a042de6413eDB15F2784f2f97cC68C7E9750b2D",
    "PROXY_REGISTRY" : "0x64A436ae831C1672AE81F674CAb8B6775df3475C",
    "MCD_JOIN_ETH_A" : "0x775787933e92b709f2a3C70aa87999696e74A9F8",
    "MCD_JOIN_ETH_B" : "0xd19A770F00F89e6Dd1F12E6D6E6839b95C084D85",    
    "MCD_JOIN_ETH_C": "0xD166b57355BaCE25e5dEa5995009E68584f60767",
    "MCD_JOIN_WBTC_A" : "0xB879c7d51439F8e7AC6b2f82583746A0d336e63F",
    "MCD_JOIN_DAI" : "0x5AA71a3ae1C0bd6ac27A1f28e1415fFFB6F15B8c",
    "MCD_JUG" : "0xcbB7718c9F39d05aEEDE1c472ca8Bf804b2f1EaD",
    "MCD_DAI" : "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",
    "WBTC" : "0x7419f744bBF35956020C1687fF68911cD777f865"
}

function getAddress(name, networkId) {
    if(networkId === 42) return kovanAddresses[name]

    // return mainnet addresses to make sure no loss of funds if network type
    // was wrong
    return mainnetAddresses[name]
}


function getJoinAddress(ilk, networkId) {
  if(ilk === ETH_A_ILK) {
    return getAddress("MCD_JOIN_ETH_A", networkId)
  }
  if(ilk === ETH_B_ILK) {
    return getAddress("MCD_JOIN_ETH_B", networkId)
  }
  if(ilk === ETH_C_ILK) {
    return getAddress("MCD_JOIN_ETH_C", networkId)
  }
  if(ilk === WBTC_A_ILK) {
    return getAddress("MCD_JOIN_WBTC_A", networkId)
  }

  throw new Error("unknown ilk " + ilk)
}

function getGemAddress(ilk, networkId) {
  if(ilk === WBTC_A_ILK) return getAddress("WBTC", networkId)

  throw new Error("unknown ilk " + ilk)
}

export const getUserInfo = function(web3, networkId, user, ilk) {
  const infoContract = new web3.eth.Contract(infoAbi,getAddress("INFO_ADDRESS",networkId))
  return infoContract.methods.getInfo(user,
                                      ilk,
                                      getAddress("BCDP_MANGER", networkId),
                                      getAddress("CDP_MANAGER", networkId),
                                      getAddress("GET_CDPS", networkId),
                                      getAddress("MCD_VAT", networkId),
                                      getAddress("MCD_SPOT", networkId),
                                      getAddress("PROXY_REGISTRY", networkId),
                                      getAddress("JAR", networkId),
                                      getJoinAddress(ilk, networkId)).call({gasLimit:10e6})
}

export const firstDepositETH = function(web3, networkId, user, ilk) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS", networkId))
  return actionProxyContract.methods.openLockETHAndGiveToProxy(getAddress("PROXY_REGISTRY", networkId),
                                                               getAddress("BCDP_MANGER", networkId),
                                                               getJoinAddress(ilk, networkId),
                                                               ilk,
                                                               user)
}

export const firstDepositGem = function(web3, networkId, userProxy, amt, ilk) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS", networkId))
  const data = actionProxyContract.methods.openLockGem(getAddress("BCDP_MANGER", networkId),
                                                       getJoinAddress(ilk, networkId),
                                                       ilk,
                                                       amt,
                                                       true).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)                                                 
}

export const depositETH = function(web3, networkId, userProxy, cdp, ilk) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS", networkId))

  const data = actionProxyContract.methods.lockETHViaCdp(getAddress("BCDP_MANGER", networkId),
                                                         getJoinAddress(ilk, networkId),
                                                         cdp).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)
}

export const depositGem = function(web3, networkId, userProxy, cdp, amt, ilk) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS", networkId))

  const data = actionProxyContract.methods.lockGemViaCdp(getAddress("BCDP_MANGER", networkId),
                                                         getJoinAddress(ilk, networkId),
                                                         cdp,
                                                         amt,
                                                         true).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)
}

export const withdrawETH = function(web3, networkId, userProxy, cdp, wad, ilk) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS",networkId))

  const data = actionProxyContract.methods.freeETH(getAddress("BCDP_MANGER", networkId),
                                                   getJoinAddress(ilk, networkId),
                                                   cdp,
                                                   wad).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)
}

export const withdrawGem = function(web3, networkId, userProxy, cdp, amt, ilk) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS",networkId))

  const data = actionProxyContract.methods.freeGem(getAddress("BCDP_MANGER", networkId),
                                                   getJoinAddress(ilk, networkId),
                                                   cdp,
                                                   amt).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)
}

export const generateDai = function(web3, networkId, userProxy, cdp, wad) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS",networkId))

  const data = actionProxyContract.methods.draw(getAddress("BCDP_MANGER",networkId),
                                                getAddress("MCD_JUG",networkId),
                                                getAddress("MCD_JOIN_DAI",networkId),
                                                cdp,
                                                wad).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)
}

export const unlockDai = function(web3, networkId, userProxy) {
  const daiContract = new web3.eth.Contract(daiAbi,getAddress("MCD_DAI",networkId))
  return daiContract.methods.approve(userProxy,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
}

export const unlockGem = function(web3, networkId, userProxy, ilk) {
  const gemContract = new web3.eth.Contract(daiAbi,getGemAddress(ilk, networkId))
  return gemContract.methods.approve(userProxy,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
}

export const repayDai = function(web3, networkId, userProxy, cdp, wad) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS",networkId))

  const data = actionProxyContract.methods.safeWipe(getAddress("BCDP_MANGER",networkId),
                                                    getAddress("MCD_JOIN_DAI",networkId),
                                                    cdp,
                                                    wad,
                                                    userProxy).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)
}

export const repayAllDai = function(web3, networkId, userProxy, cdp) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS",networkId))

  const data = actionProxyContract.methods.safeWipeAll(getAddress("BCDP_MANGER",networkId),
                                                       getAddress("MCD_JOIN_DAI",networkId),
                                                       cdp,
                                                       userProxy).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)
}

/**
 * just for tests
 */
export const frob = function(web3, networkId, userProxy, cdp, wad, art) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS",networkId))

  const data = actionProxyContract.methods.frob(getAddress("BCDP_MANGER",networkId),
                                                cdp,
                                                wad,
                                                art).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)
}

// claim unclaimed collateral - e.g., after makerdao external liquidation
export const claimUnlockedCollateral = function(web3, networkId, userProxy, cdp, wad, ilk) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS",networkId))
  
  const ethJoin = getJoinAddress(ilk, networkId)
  const data = actionProxyContract.methods.exitETH(getAddress("BCDP_MANGER",networkId),
                                                ethJoin,
                                                cdp,
                                                wad).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)
}

export const migrateFresh = function(web3, networkId, userProxy, makerDaoCdp, ilk) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS",networkId))

  const data = actionProxyContract.methods.openAndImportFromManager(getAddress("CDP_MANAGER",networkId),
                                                                    getAddress("BCDP_MANGER",networkId),
                                                                    makerDaoCdp,
                                                                    ilk).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)
}

export const migrateToExisting = function(web3, networkId, userProxy, makerDaoCdp, bCdp) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS",networkId))

  const data = actionProxyContract.methods.shiftManager(getAddress("CDP_MANAGER",networkId),
                                                        getAddress("BCDP_MANGER",networkId),
                                                        makerDaoCdp,
                                                        bCdp).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)
}

// migrate from b protocol back to makerdao, with a new cdp number
export const exportFresh = function(web3, networkId, userProxy, bCdp, ilk) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS",networkId))

  const data = actionProxyContract.methods.openAndImportFromManager(getAddress("BCDP_MANGER",networkId),
                                                                    getAddress("CDP_MANAGER",networkId),
                                                                    bCdp,
                                                                    ilk).encodeABI()

  const proxyContract = new web3.eth.Contract(proxyAbi,userProxy)
  return proxyContract.methods['execute(address,bytes)'](getAddress("ACTION_PROXY_ADDRESS",networkId),data)
}

// open new proxy for user
export const openProxy = function(web3, networkId, user) {
  const registryContract = new web3.eth.Contract(proxyRegistryAbi, getAddress("PROXY_REGISTRY", networkId))
  return registryContract.methods.build()
}

// this will be used only for testings
export const openMakerDaoCdp = function(web3, networkId, user, ilk) {
  const actionProxyContract = new web3.eth.Contract(actionProxyAbi,getAddress("ACTION_PROXY_ADDRESS",networkId))
  return actionProxyContract.methods.openLockETHAndGiveToProxy(getAddress("PROXY_REGISTRY",networkId),
                                                               getAddress("CDP_MANAGER",networkId),
                                                               getJoinAddress(ilk, networkId),
                                                               ilk,
                                                               user)
}

export const getStats = function (web3, networkId){
  const bStatsContract = new web3.eth.Contract(bStatsAbi, getAddress("BSTATS", networkId))
  const bcdpManagerAddress = getAddress("BCDP_MANGER", networkId)
  return bStatsContract.methods.getStats(bcdpManagerAddress).call({gasLimit:10e6})
}

////////////////////////////////////////////////////////////////////////////////
//
// Util functions without blockchain interaction
//
////////////////////////////////////////////////////////////////////////////////

export const toNumber = (bignum) => Number(fromWei(bignum))
export const gemToNumber = (bignum, userInfo) => Number(toUiDecimalPointFormat(bignum, userInfo.miscInfo.gemDecimals))

const calcNewBorrowAndLPrice = (userInfo, dEth, dDai, ilk) => {
  const {gemDecimals} = userInfo.miscInfo
  dEth = toNumber(dEth)
  dDai = toNumber(dDai)
  const deposit = gemToNumber(userInfo.collaeralDeposited, userInfo)
  const daiDebt = toNumber(userInfo.bCdpInfo.daiDebt)

  const maxDaiDebt = toNumber(userInfo.bCdpInfo.maxDaiDebt)
  const spotPrice = toNumber(userInfo.miscInfo.spotPrice)

  if(deposit == 0 && dEth > 0) {
    const newMaxDaiDebt = spotPrice * dEth / collateralFactor[ilk]; // todo - read 1.5 from the blockchain
    return [toWei(newMaxDaiDebt.toFixed(17).toString()), toWei("0")]
  }
  if((deposit == 0) || (deposit + dEth == 0)) return [toWei("0"), toWei("0")]
  const newMaxDaiDebt = maxDaiDebt * (deposit + dEth) / deposit
  const liqRatio = deposit * spotPrice / maxDaiDebt
  // (total dai debt) * liqRatio = (total eth deposit) * liquidationPrice
  const newLiquidationPrice = (daiDebt + dDai) * liqRatio / (deposit + dEth)
  
  return [toWei(newMaxDaiDebt.toFixed(17).toString()), toWei(newLiquidationPrice.toFixed(17).toString())]
}

export const calcNewBorrowLimitAndLiquidationPrice = calcNewBorrowAndLPrice

////////////////////////////////////////////////////////////////////////////////

const liqudationMsg = "vault is being liqudated"
const checkForActiveLiqudation = ({bCdpInfo: {bitten}}) => bitten ? [false,liqudationMsg] : [true,""]

export const verifyDepositInput = (userInfo, val) => {
  val = gemToNumber(val, userInfo)
  if(val < 0) return [false, "Deposit amount must be positive"]
  const balance = userInfo.walletBalance
  if(val > gemToNumber(balance, userInfo)) return [false, "Amount exceeds wallet balance"]
  const debtIsBiggerThanDust = checkDebtIsBiggerThanDust(userInfo)
  if(debtIsBiggerThanDust){
    return [false, debtIsBiggerThanDust]
  }

  return checkForActiveLiqudation(userInfo)
}

////////////////////////////////////////////////////////////////////////////////

export const verifyWithdrawInput = (userInfo, val, ilk) => {
  const debtIsBiggerThanDust = checkDebtIsBiggerThanDust(userInfo)
  if(debtIsBiggerThanDust){
    return [false, debtIsBiggerThanDust]
  }
  const valMinus = toBN(val).mul(toBN(-1))
  val = toNumber(val)
  if(val <= 0) return [false, "Withdraw amount must be positive"]
  const deposited = gemToNumber(userInfo.collaeralDeposited, userInfo)
  if(val > deposited) return [false, "Amount exceeds CDP deposit"]

  const [maxDebt,newPrice] = calcNewBorrowAndLPrice(userInfo,valMinus.toString(10), "0", null, ilk)
  if(toNumber(maxDebt) < toNumber(userInfo.bCdpInfo.daiDebt)) return [false,"Amount exceeds allowed withdrawal"]

  return checkForActiveLiqudation(userInfo)
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

  return checkForActiveLiqudation(userInfo)
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

  if(dust > newDebt && newDebt > 1) return [false,"You can repay all your outstanding debt or a maximum of " + maxRepay.toString() + " Dai"]
  if(dust >= newDebt) {
    if(web3.utils.toBN(userInfo.bCdpInfo.daiDebt).gt(web3.utils.toBN(userInfo.userWalletInfo.daiBalance))) {
      return [false, "Dai balance is not enough to repay your entire debt"]
    }

    if(web3.utils.toBN(userInfo.bCdpInfo.daiDebt).gt(web3.utils.toBN(userInfo.userWalletInfo.daiAllowance))) {
      return [false, "Dai allowance is not enough to repay your entire debt"]
    }
  }


  return checkForActiveLiqudation(userInfo)
}

const checkDebtIsBiggerThanDust = (userInfo) => {
  const dust = toNumber(userInfo.miscInfo.dustInWei)
  const currentDebt = toNumber(userInfo.bCdpInfo.daiDebt)
  if (currentDebt < dust && currentDebt > 0) { 
    return `the minimum debt Maker requires to preform the operation is ${dust.toString()} DAI`
  }
}
