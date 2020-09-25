import React from "react";

export default function Tooltip(props) {


    let tooltipCls = 'tooltip';
    if (props.bottom) tooltipCls += ' bottom';
    if (props.className) tooltipCls += ' '+props.className;

    return (
        <div className={tooltipCls}>
            <i></i>
            {props.children}
        </div>
    )

}
