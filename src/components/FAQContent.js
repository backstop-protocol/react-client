import React from 'react';
import {Link} from "react-router-dom";

const FAQContent = () => {
  return (
    <p>
      <h4>1. What is B.protocol?</h4>
      <p className="item-content-text">
        <strong>A. </strong> B.Protocol makes lending platforms more stable by
        incentivizing liquidity providers (keepers) to commit on liquidation of
        under collateralized loans while shifting the miners extracted profits
        back to the users of the platform.
      </p>

      <h4>2. As a lending platform user, what should I do with B.Protocol?</h4>
      <p className="item-content-text">
        <strong>A. </strong> B.Protocol provides you an alternative interface to MakerDAO (and soon Compound Aave),
        which enables you to share liquidation proceeds, and accumulate user rating.
      </p>

      <h4>3. Were the smart contracts audited?</h4>
      <p className="item-content-text">
        <strong>A. </strong> Yes. B.Protocol smart contracts were <a href="https://github.com/solidified-platform/audits/blob/master/Audit%20Report%20-%20Backstop%20Protocol%20%5B02.10.2020%5D.pdf" target="_blank">audited</a> by Solidified.
      </p>

      <h4>4. How do I use B.protocol?</h4>
      <p className="item-content-text">
        <strong>A.</strong> Head over to bprotocol.org/app and connect your
        wallet -<br />
        <span className="item-sub-text">
          <strong>i. </strong> If you are already a user of MakerDAO - you can
          import your Vault to B.Protocol seamlessly, using the “Import”
          button on the upper left corner.
        </span>
        <br />
        <strong>B.</strong>Manage your vault (Deposit ETH, borrow DAI etc) via B.Protocol interface. <br />
        <strong>C.</strong>Accumulate user rating and share the liquidation proceeds after 6 months period.
      </p>

      <h4>5. What is the B.Protocol Rating Score?</h4>
      <p className="item-content-text">
        <strong>A.</strong> Rating Score is the way for B.Protocol to calculate
        your part in the liquidation proceeds of the platform, and your weight in the protocol upgrade vote (both will occur in month of April 2021).
        A user’s Rating
        Score is determined by the amount of DAI position (debt) you hold over time.
        If a user has a debt of 1000 DAI for a period of 7 days he will get approximately 7 points.
        <b>The score is non transferable</b> and not even an ERC20 token. Hence it cannot be traded, and can never be traded.
        While we technically cannot prevent a future governance from tokenizing it, we will not actively support any outcome that will violate the applicable regulatory frameworks.
      </p>
      <h4>6. What is the JAR Balance?</h4>
      <p className="item-content-text">
        <strong>A.</strong> The JAR is where the users’ liquidation proceeds are
        being accumulated. 50% of the total liquidation proceeds are
        automatically being sent to the JAR, while the other 50% is kept by the
        liquidators. This distribution balance will hold for the first JAR
        distribution, which will take place 6 months after the launch of
        B.Protocol on mainnet (at end of April 2021). After that, the
        community will be able to vote on a new distribution model.
      </p>
      <h4>
        7. Will the Rating Score cover all lending platforms I’m using with
        B.Protocol or just MakerDAO?
      </h4>
      <p className="item-content-text">
        <strong>A.</strong> At this point in time, each lending platform will
        have its own B.Protocol users’ Rating Score and its own JAR to be
        distributed among them accordingly. Once B.Protocol control is handed
        over to the community new models can be offered by the community.
      </p>
      <h4>8. Who’s behind the development of B.Protocol?</h4>
      <p className="item-content-text">
        <strong>A.</strong> B.Protocol is being developed by Smart Future Labs
        LTD, an Israeli based LTD company, founded by Yaron Velner, ex-CTO of KyberNetwork, who was also part of the wBTC protocol dev
        team and Smart Pool, the first decentralized mining pool over Ethereum. Yaron holds a PhD in Computer
        Science from Tel Aviv University.{' '}
      </p>
      <h4>
        9. Is it true B.Protocol devs not keeping any Rating Score for
        themselves?
      </h4>
      <p className="item-content-text">
        <strong>A. </strong>True. No pre-mining to anyone. Not VCs, Not devs, No
        one. B. Protocol has a real use case and a real added value
        for its users, on both sides - Liquidators as well as platform users.
      </p>
      <h4>
      10. B.Protocol is great, but what if I want to export my Vault back to MakerDAO CDP manager (Oasis)?
      </h4>
      <p className="item-content-text">
        <strong>A. </strong>You can export your Vault back to MakerDAO at any time, 
        and still maintain your accumulated score. 
        Simply go <Link to="/app?export=true">here</Link> and click the export button.
      </p>
    </p>
  );
};

export default FAQContent;
