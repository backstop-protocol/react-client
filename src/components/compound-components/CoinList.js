import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import CoinListItem from "./CoinListItem"
import Flex, {FlexItem} from "styled-flex-component";
import {Transition, animated} from 'react-spring/renderprops'
import compoundStore from "../../stores/compound.store";
import userStore from "../../stores/user.store"

class CoinList extends Component {

    render () {
        const {list: items, isInBalanceBox, type, coinStatusToShow} = this.props

        return (
            <Transition
            native
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