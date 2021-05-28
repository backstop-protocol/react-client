import React, {Component} from "react";
import {observer} from "mobx-react"
import styled from "styled-components"
import CoinListHeader from "./CoinListHeader"
import CoinList from "./CoinList"
import compoundStore from "../../stores/compound.store"
import ResponsiveWidthCol from "../style-components/ResponsiveContainer"
import { Transition } from "react-spring/renderprops";

const Container = styled(ResponsiveWidthCol)`
    border-radius: 12px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.22);
    border-style: solid;
    border-width: 0.5px;
    border-image-source: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4) 5%, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0));
`

class CoinListBox extends Component {

    render () {
        const {list, type} = this.props
        const show = list.length > 0 
        return (
            <Transition
                items={show}
                initial={null}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {show => show && (props =>
                    <Container style={props}>
                        <CoinListHeader/>
                        <CoinList type={type} list={list}/>
                    </Container>
                )}
            </Transition>
        )
    }
}

export default observer(CoinListBox)