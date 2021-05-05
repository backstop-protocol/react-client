import React, {Component} from "react";
import {Spring, animated, interpolate} from 'react-spring/renderprops'
import {toCommmSepratedString} from "../../lib/Utils"

export default class AnimateNumericalString extends Component{

    constructor(props) {
        super(props);

        this.state = {
            from : props.val,
            to : props.val,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.val !== prevProps.val) {
          this.setState({from: prevProps.val, to: this.props.val})
        }
      }

    render () {
        const decimals = this.props.decimals || 2
        const duration = this.props.duration || 300

        return (
            <Spring
                native
                config={{duration}}
                from={{ number: this.state.from }}
                to={{ number: this.state.to }}>
                {({number}) => <animated.span>{number.interpolate(x=> parseFloat(x).toFixed(decimals))}</animated.span>}
            </Spring>
        )
    }
} 