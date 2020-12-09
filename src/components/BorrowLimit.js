import React, {Component} from "react";
import {numm} from "../lib/Utils";
import Flex, {FlexItem} from "styled-flex-component";
import LiquidationPrice from './LiquidationPrice'

export default class BorrowLimit extends Component {

    render() {

        const {userInfo} = this.props;
        const collateralToBorrowRatio = (userInfo && userInfo.bCdpInfo.maxDaiDebt?numm(userInfo.bCdpInfo.daiDebt / userInfo.bCdpInfo.maxDaiDebt * 100):0)
        const ratioPositionStyle = collateralToBorrowRatio > 50 ? {right: '0%'} : {left: '100%'}
        return (
            <Flex full>
                <FlexItem>
                    <div className="borrow-limit">
                        <h3>Borrow Limit</h3>
                            <div className="limit-bar-inner" style={{margin:0}}>
                                <div className="limit-bar-track" style={{width: (userInfo && userInfo.bCdpInfo.maxDaiDebt ? (userInfo.bCdpInfo.daiDebt / userInfo.bCdpInfo.maxDaiDebt * 100):0)+"%"}}>
                                    <span style={ratioPositionStyle} > {collateralToBorrowRatio}% </span>
                                </div>
                            </div>
                            <Flex justifyBetween>
                                <label>{userInfo?numm(userInfo.bCdpInfo.daiDebt):0} DAI</label>
                                <label>{userInfo?numm(userInfo.bCdpInfo.maxDaiDebt):0} DAI</label>
                            </Flex>
                    </div>
                </FlexItem>
                <FlexItem>
                    <LiquidationPrice userInfo={userInfo} />
                </FlexItem>
            </Flex>
        )
    }
}