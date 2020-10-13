import React from 'react';

const FAQContent = () => {
  return (
    <p>
      <h4>1. What is B.protocol (in under 280 characters)</h4>
      <p className="item-content-text">
        <strong>A. </strong> B.Protocol makes lending platforms more stable by
        incentivizing liquidity providers (keepers) to commit on liquidation of
        under collateralized loans while shifting the miners extracted profits
        back to the users of the platform.
      </p>

      <h4>2. How do I use B.protocol?</h4>
      <p className="item-content-text">
        <strong>A.</strong> Head over to bprotocol.org/XXXX to connect your
        wallet -<br />
        <span className="item-sub-text">
          <strong>i. </strong> If you are already a user of MakerDAO - you can
          transfer your funds to B.Protocol seamlessly, using the “Migrate”
          button on the upper left corner.
        </span>
        <br />
        <strong>B.</strong> Deposit ETH. <br />
        <strong>C.</strong> Earn your share of the liquidation proceeds on
        MakerDAO.
      </p>
      <h4>3. Why should I use B.Protocol?</h4>
      <p className="item-content-text">
        <strong>A. </strong> B.Protocol lets you use MakerDAO just as you are
        used to (and soon other decentralized lending platforms), while enabling
        you to have a share
      </p>
      <h4>4. What is the B.Protocol Rating Score?</h4>
      <p className="item-content-text">
        <strong>A.</strong> Rating Score is the way for B.Protocol to calculate
        your part in the liquidation proceeds of the platform. A user’s Rating
        Score is determined by A. Rating Score is the way for B.Protocol to
        calculate your part in the liquidation proceeds of the platform. A
        user’s Rating Score is determined by the amount of DAI s/he borrowed and
        the time that elapsed before returning the loan. For example, if a user
        has a debt of 500 DAI for a period of 7 days, then his/her score is
        added with 3,500 points.
      </p>
      <h4>5. What is the JAR Balance?</h4>
      <p className="item-content-text">
        <strong>A.</strong> The JAR is where the users’ liquidation proceeds are
        being accumulated. 50% of the total liquidation proceeds are
        automatically being sent to the JAR, while the other 50% is kept by the
        liquidators. This distribution balance will hold for the first JAR
        distribution, which will take place 6 months after the launch of
        B.Protocol on mainnet (aimed at mid-April 2021). After that, the
        community will be able to vote on a new distribution model.
      </p>
      <h4>
        6. Will the Rating Score cover all lending platforms I’m using with
        B.Protocol or just MakerDAO?
      </h4>
      <p className="item-content-text">
        <strong>A.</strong> At this point in time, each lending platform will
        have its own B.Protocol users’ Rating Score and its own JAR to be
        distributed among them accordingly. Once B.Protocol control is handed
        over to the community new models can be offered by the community.
      </p>
      <h4>7. Who’s behind the development of B.Protocol?</h4>
      <p className="item-content-text">
        <strong>A.</strong> B.Protocol is being developed by Smart Future Labs
        LTD, an Israeli based LTD company, founded by Yaron Velner, ex-CTO and
        Co-Founder of KyberNetwork, who was also part of the wBTC protocol dev
        team and Smart Pool, the first XXXX. Yaron holds a PhD in Computer
        Science from Tel Aviv University.{' '}
      </p>
      <h4>
        8. Is it true B.Protocol devs not keeping any Rating Score for
        themselves?
      </h4>
      <p className="item-content-text">
        <strong>A. </strong>True. No pre-mining to anyone. Not VCs, Not devs, No
        one. B. Protocol has a real use case and a real revenue-creating model
        for its users, on both sides - Liquidators as well as platform users. We
        do hope the community will keep the development of the protocol at SFL
        hands, but we are aware that it is not in our hands to decide about it.
      </p>
    </p>
  );
};

export default FAQContent;
