import React from 'react';
import {Link} from "react-router-dom";

const FAQContent = () => {
  return (
    <div>
      <h4>1. What is B.protocol?</h4>
      <p className="item-content-text">
        <strong>A. </strong> B.Protocol makes lending platforms more stable by 
        incentivizing liquidity providers (keepers) to commit on liquidation of
        under collateralized loans while shifting the miners' extracted profits
        back to the users of the platform.
      </p>

      <h4>2. As a lending platform user, what should I do with B.Protocol?</h4>
      <p className="item-content-text">
        <strong>A. </strong> B.Protocol provides you an alternative interface to MakerDAO and Compound, 
        which enables you to share liquidation proceeds with the B.Protocol Backstop liquidators, and accumulate bScore - B.Protocol User Score.
      </p>

      <h4>3. Were the smart contracts audited?</h4>
      <p className="item-content-text">
        <strong>A. </strong> Yes. B.Protocol smart contracts were by Solidified.
        <br/>
        <span className="item-sub-text">
          <strong>i. </strong>
          <a href="https://github.com/solidified-platform/audits/blob/master/Audit%20Report%20-%20Backstop%20Protocol%20%5B02.10.2020%5D.pdf" target="_blank">MakerDAO audit</a>
        </span>
        <br/>
        <span className="item-sub-text">
          <strong>ii. </strong>
          <a href="https://github.com/solidified-platform/audits/blob/60778395ae2f78fc1caec0085bfa96c6f70c4573/Audit%20Report%20-%20B-Protocol%20%5B16.02.2021%5D.pdf" target="_blank">Compound audit</a>
        </span>
      </p>

      <h4>4. How do I use B.protocol?</h4>
      <p className="item-content-text">
        <strong>A.</strong> Head over to <a target="_blank" href="bprotocol.org/app">bprotocol.org/app</a>, choose your platform on the left (MakerDAO or Compound), and connect your wallet.
        <br/>
        <strong>B. </strong> If you are already a user of MakerDAO or Compound - you can import your existing Maker Vault/ Compound account to B.Protocol seamlessly, using the “Import” button on the upper left corner (make sure to connect with the same account you use for Maker/ Compound).
        <br />
        <strong>C.</strong>Manage your account (Deposit and Withdraw/ Borrow and Repay) via the B.Protocol interface.<br />
        <strong>D.</strong>Accumulate your bScore and share the liquidation proceeds every epoch (the current epoch ends in April 2021).
      </p>

      <h4>5. What is the B.Protocol User Score?</h4>
      <p className="item-content-text">
        <strong>A.</strong> User Score is the way for B.Protocol to calculate your part in the liquidation proceeds of the platform, and your weight in the protocol upgrade vote (both will occur in April 2021). A user’s Score is determined by his/her usage of B.Protocol and is being calculated differently for MakerDAO users and for Compound users.
        <ul>
          <li><strong>Maker users</strong> - for every 1k Dai debt, borrowed for 24 hours, a user will get approximately 1 bmScore (B.Protocol-MakerDAO Score).</li>
          <li><strong>Compound users</strong> - for every $1k worth of debt in any of the available tokens for borrowing, borrowed for 24 hours, a user will get 0.6 bcScore (B.Protocol-Compound Score). For every $1k worth of collateral deposit, deposited for 24 hours, a user will get 0.2 bcScore.</li>
        </ul>
        <strong>The bScore is non-transferable</strong> and is not even an ERC20 token. Hence it cannot be traded, and can never be traded. While we technically cannot prevent future governance from tokenizing it, we will not actively support any outcome that will violate the applicable regulatory frameworks.

      </p>
      <h4>6. What is the JAR Balance?</h4>
      <p className="item-content-text">
        <strong>A.</strong> The JAR is where the users’ liquidation proceeds are being accumulated before being distributed to the community according to the User Score. Each platform has its separate Jar and distribution balance. Currently, the distribution balances of the Jars are as follows: 
        <ul>
          <li>MakerDAO - 1/2  goes to the Jar, 1/2 goes to the liquidators (e.g., 6.5% of each liquidation as the liquidation penalty is 13%).</li>
          <li>Compound - 3/8 goes to the Jar, 5/8 goes to the liquidators (e.g., 3% to users, 5% to liquidators, as the liquidation penalty is 8%).</li>
        </ul>
        This distribution balance will hold for the first JAR distribution, which will take place at the end of April 2021 (6 months from the launch of B.Protocol). After that, the community will be able to vote on a new distribution model.
      </p>
      <h4>
        7. Will the Rating Score cover all lending platforms I’m using with
        B.Protocol?
      </h4>
      <p className="item-content-text">
        <strong>A.</strong> At this point in time, each lending platform will have its own B.Protocol User Score (mScore for Maker, cScore for Compound) and its own JAR to be distributed among them accordingly. Once B.Protocol governance is handed over to the community, new models can be offered by the community.
      </p>
      <h4>8. Who’s behind the development of B.Protocol?</h4>
      <p className="item-content-text">
        <strong>A.</strong> B.Protocol is being developed by Smart Future Labs LTD, an Israeli based LTD company, founded by Yaron Velner, ex-CTO of KyberNetwork, who was also part of the wBTC protocol dev team and Smart Pool, the first decentralized mining pool over Ethereum. Yaron holds a PhD in Computer Science from Tel Aviv University.{' '}
      </p>
      <h4>
        9. Is it true B.Protocol devs not keeping any User Score for themselves?
      </h4>
      <p className="item-content-text">
        <strong>A. </strong>True. No pre-mining to anyone. Not VCs, Not devs, No one. B. Protocol has a real use case and a real added value for all stakeholders - DeFi lending platforms, Liquidators, and users.
      </p>
      <h4>
      10. B.Protocol is great, but what if I want to export my Vault back to MakerDAO CDP manager (Oasis)?
      </h4>
      <p className="item-content-text">
        <strong>A. </strong>You can export your Vault back to MakerDAO at any time, 
        and still maintain your accumulated bmScore. 
        Simply go <Link to="/maker?export=true">here</Link> and click the export button.
      </p>
    </div>
  );
};

export default FAQContent;
