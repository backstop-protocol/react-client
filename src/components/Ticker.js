import React, {Component} from "react";

export default class Ticker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value : '0',
            changes : [],
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.value && !this.state.value || this.state.value !== this.props.value) {
            let changes = [];
            if (prevState.value) {
                const old = prevState.value.toString(), notold = this.props.value.toString();
                for (let c = 0; c < old.length; c++) {
                    if (notold[c] !== old[c]) changes.push(c);
                }
            }
            if (this.props.value !== '0' && this.props.value !== '')
            this.setState({value : this.props.value, changes});
            setTimeout(() => this.setState({changes: []}), 300);
        }

    }

    render() {
        let {value, changes} = this.state;
        let {primary} = this.props;
        primary = primary ? primary : 6666;

        value = value ? value.toString().split('') : ['0'];

        return (
          <span className="ticker">
            {value.map((n, index) => (
              <span
                key={index}
                className={
                  n === "."
                    ? "dot"
                    : "" +
                      (n === "1" ? (value.length > 7 ? "s-one" : " one") : "") +
                      (value.length > 7
                        ? index < primary
                          ? " s-primary"
                          : n === "1"
                          ? "s-one small fade-small-one"
                          : "small"
                        : index < primary
                        ? " primary"
                        : "") +
                      (changes.indexOf(index) > -1 ? " in" : "")
                }
              >
                {n}
              </span>
            ))}
          </span>
        );
    }
}