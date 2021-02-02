import React, {Component} from "react";
import styled from "styled-components"

const Bar = styled.div`
    border-radius: 4px;
    width: 100%;
    height: 4px;
    background-color: rgba(11, 4, 18, 0.15);
` 

const Marker = styled.div`
    transition: all 0.3s ease-in-out;
    border-radius: 4px 0 0 4px;
    width: ${({precent})=> precent}%;
    height 100%;
    background: black;
`

export default (props)=> {
    return (
        <Bar>
            <Marker precent={props.precent}/>
        </Bar>
    )
}