import React, { Component } from 'react';

import Sidebar from '../components/Sidebar';

export default class Risk extends Component {
  render() {
    const { handleItemChange, history } = this.props;
    return (
      <div className="App">
        <Sidebar
          handleItemChange={handleItemChange}
          history={history}
          initialState="risk"
        />
        <div className="item-page-content">
          <div className="menu-item-header">
            <h1 className="item-header-title">Risk</h1>
          </div>
        </div>
      </div>
    );
  }
}
