import React, {Component} from "react";
import styled from "styled-components"

const Bar = styled.div`
    border-radius: 4px;
    width: 100%;
    height: 8px;
    background-color: rgba(66, 110, 85, 0.12);
` 

const Marker = styled.div`
    transition: all 0.3s ease-in-out;
    border-radius: 4px;
    width: ${({precent})=> precent}%;
    height 100%;
    background: linear-gradient(to right, rgba(37, 30, 43, 0.38) -4%, #100d13);
`

export default (props)=> {
    return (
        <Bar>
            <Marker precent={props.precent}/>
        </Bar>
    )
}