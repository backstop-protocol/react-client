import React from "react";

export default function BpLoader(props) {
    const styles = {
      border: "none",
      padding: 0,
      flex: 0,
    }
    return (
      <div className="currency-action-panel" style={styles}>
        <svg style={{fill: props.color}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path d="M 37.7 13.8 l 5.8 5.8 c 1 1 1 2.6 0 3.6 L 33.4 33.4 l -5.8 -5.8 c -1 -1 -1 -2.6 0 -3.6 L 37.7 13.8 z"/>
            <path d="M 16.76 16.775 L 22.56 10.975 c 1 -1 2.6 -1 3.6 0 l 5.8 5.8 l -5.8 5.8 c -1 1 -2.6 1 -3.6 0 c 0.1 0.1 -5.8 -5.8 -5.8 -5.8 z"/>
            <path d="M 16.76 34.675 L 22.56 28.875 c 1 -1 2.6 -1 3.6 0 l 5.8 5.8 l -5.8 5.8 c -1 1 -2.6 1 -3.6 0 c 0.1 0.1 -5.8 -5.8 -5.8 -5.8 z" />
            <path d="M 15.5 18.095 L 21.3 23.995 c 1 1 1 2.6 0 3.6 l -9.8 9.8 l -5.8 -5.8 c -1 -1 -1 -2.6 0 -3.6 c 0 -0.1 9.8 -9.9 9.8 -9.9 z" />
        </svg>
      </div>
    )
}
