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
        back to the users of the platform. A detailed documentation of the protocol is available <a href="https://docs.bprotocol.org/" target="_blank">here.</a>
      </p>

      <h4>2. As a lending platform user, what should I do with B.Protocol?</h4>
      <p className="item-content-text">
        <strong>A. </strong> B.Protocol provides you an alternative interface to MakerDAO and Compound, 
        which enables you to share liquidation proceeds with the B.Protocol Backstop liquidators, and accumulate bScore - B.Protocol User Score.
      </p>

      <h4>3. Were the smart contracts audited?</h4>
      <p className="item-content-text">
        <strong>A. </strong> Yes. B.Protocol smart contracts were audited.
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
        <br/>
        <span className="item-sub-text">
          <strong>iii. </strong>
          <a href="https://github.com/Fixed-Point-Solutions/published-work/blob/master/SmartContractAudits/FPS_B.AMM_Liquity_Assessment_FINAL.pdf" target="_blank">Liquity audit</a>
        </span>        
      </p>

      <h4>4. How do I use B.protocol?</h4>
      <p className="item-content-text">
        <strong>A.</strong> Head over to <a target="_blank" href="//app.bprotocol.org">app.bprotocol.org</a>, choose your platform on the left (MakerDAO or Compound), and connect your wallet.
        <br/>
        <strong>B. </strong> If you are already a user of MakerDAO or Compound - you can import your existing Maker Vault/ Compound account to B.Protocol seamlessly, using the “Import” button on the upper left corner (make sure to connect with the same account you use for Maker/ Compound).
        <br />
        <strong>C.</strong>Manage your account (Deposit and Withdraw/ Borrow and Repay) via the B.Protocol interface.<br />
        <strong>D.</strong>Accumulate your mScore/cScore and share the liquidation proceeds every epoch (the current epoch ends in April 2021).
      </p>

      <h4>5. What is the B.Protocol mScore, cScore and BPRO?</h4>
      <p className="item-content-text">
        <strong>A.</strong> User Score is the way for B.Protocol to calculate your part in the liquidation proceeds of the platform, and your weight in the protocol upgrade vote (both will occur in April 2021). A user’s Score is determined by his/her usage of B.Protocol and is being calculated differently for MakerDAO users (mScore) and for Compound users  (cScore).
        <strong>The Score is non-transferable</strong> and is not even an ERC20 token. Hence it cannot be traded, and can never be traded.
        BPRO is the governance token of B.Protocol.

      </p>
      <h4>6. How do the Score and BPRO distibuted?</h4>
      <p className="item-content-text">
      <strong>A.</strong> A fixed amount is distributed at every block, and each user get according to his total deposit and debt.
        The exact details are subject to the decision of the protocol governance, and as of now a 3 month program (until end of July 2021) was approved,
        and can be found <a href="https://forum.bprotocol.org/t/b-protocol-governance-token/48#user-incentives-post-april-26th-10">here.</a>
      </p>
      <h4>       
      7. B.Protocol is great, but what if I want to export my Vault back to MakerDAO CDP manager (Oasis)?
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
