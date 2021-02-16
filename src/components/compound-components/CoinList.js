import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import CoinListItem from "./CoinListItem"
import Flex, {FlexItem} from "styled-flex-component";
import {Transition, animated} from 'react-spring/renderprops'
import compoundStore from "../../stores/compound.store";
import userStore from "../../stores/user.store"

class CoinList extends Component {
// TODO: filter the array here and pass it to the transition
// inorder for it to scale the height greacfully
// TODO: store 4 lists in compound store and change there values on every userInfo Fetch
    render () {
        const {list, isInBalanceBox, type, coinStatusToShow} = this.props
        const items = list.filter(coinAddress=> {
            const coin = compoundStore.coinsInTx[coinAddress] || compoundStore.coinMap[coinAddress] // preserve state until tx is finished and UI is ready to dispaly new coin state
            return coin.isCoinStatus(coinStatusToShow)
        })
        .map(coinAddress => {
            const coin = compoundStore.coinsInTx[coinAddress] || compoundStore.coinMap[coinAddress]
            return coin
        })  
        return (
            <Transition
            native
            // immediate={compoundStore.firstUserInfoFetchDelay}
            // delay={compoundStore.firstUserInfoFetchDelay ? 1000 : 0}
            initial={null}
            config={{duration: 300}}
            items={items}
            keys={item=> item.symbol}
            from={{ opacity: 0, height: 0, zIndex: 0}}
            enter={{ opacity: 1 , height: "auto", zIndex: 1}}
            leave={{ opacity: 0, height: 0, zIndex: -1}}>
                {(item, state, i) => (props => 
                    <animated.div style={props}>
                        <CoinListItem 
                                        type={type} 
                                        isInBalanceBox={isInBalanceBox} 
                                        lastItem={i == items.length - 1}
                                        coinAddress={item.address} />
                    </animated.div>)
                }
            </Transition>
        )
    }
}

export default observer(CoinList)