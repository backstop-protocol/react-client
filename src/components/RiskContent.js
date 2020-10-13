import React from "react";

const RiskContent = () => {
  return (
    <p>
      <h2>Lending platform risks</h2>
      <h4>Liquidation risk</h4>
      <p className="risk-item-content-text">
        When interacting with lending platforms, user’s deposits are subject to
        liquidation risk. Despite having well defined liquidation penalties, the
        loss could result in losing 100% of the deposit. This risk is not only
        theoretical, during the so-called “Black Thursday”, around $8M of user’s
        collateral at MakerDAO was lost.
        <br />
        <strong>
          B.Protocol does *not* help the user to avoid liquidations.
        </strong>
        Interacting with B.Protocol could help in preventing a loss that is
        bigger than the underlying platform liquidation penalty, as it provides
        an improved liquidation process, however this is done on a best effort
        basis only, and does not guarantee to eliminate this risk.
      </p>
      <h4>Smart contract and software risks</h4>
      <p className="risk-item-content-text">
        The underlying lending platforms might have software bugs and security
        vulnerabilities, that would result in loss of user funds. Same loss
        might occur when interacting with these platforms via B.Protocol.
      </p>
      <h2>B.Protocol Risks</h2>
      <h4>Liquidation risk</h4>
      <p className="risk-item-content-text">
        <strong>
          B.Protocol does *not* help the user to avoid liquidations.
        </strong>
        <br />
        A liquidation in B.Protocol will happen under exactly the same
        conditions as in the underlying platforms. E.g., when interacting with
        MakerDAO via B.Protocol, the liquidation will be triggered according to
        the same conditions that would trigger it if the user would interact
        with MakerDAO directly. The liquidation penalty is also identical to the
        underlying platform penalty.
        <br />
        <br />
        Once a liquidation is triggered, the liquidation process relies on a
        price feed that is provided by the underlying platforms, to determine
        the fair value of the user’s debt and deposit. It’s worth noting, that
        in the case of MakerDAO, this is different from the original liquidation
        process, and while we expect that in most cases the outcome will be
        favorable to the user, it might not be the case if the price feed does
        not well reflect the market conditions.
      </p>
      <h4>Smart contract and software risks</h4>
      <p className="risk-item-content-text">
        B.Protocol smart contracts were audited by Solidified - TODO link where
        ready.
        <br />
        The audit was focused on verifying the security of user funds, however
        security audits do not eliminate risks completely. Please only supply
        funds that you can afford and willing to lose.
      </p>
      <h4>User Rating and rewards</h4>
      <p className="risk-item-content-text">
        The protocol was designed with intention to keep user funds safe, and
        under user custody (unless the users reached a liquidation state).
        However, the user Rating and the proceed sharing scheme comes without
        strong guarantees,
        <br />
        and the user should consider it only as a potential bonus that might not
        be exercised. Moever,
        <br />
        the parameters that dictate the proceeds sharing could be changed over
        time by the liquidators.
        <br />
        <br />
        The user rating itself is subject to slashing (decrease of score) in the
        cases where someone
        <br />
        increased a deposit or repaid some of the user debt on behalf of the
        user without using the B.Protocol smart contract. However, to protect
        the user from such a line of attacks, the expected reward loss due to
        the slashed will typically be smaller than the extra value that the user
        benefited from an external deposit or debt repayment.
      </p>
      <h4>Upgradability</h4>
      <p className="risk-item-content-text">
        The protocol was designed with the intention that no protocol upgrade
        could result in loss of user funds, or in obtaining custody over user
        funds. The development team does not have admin keys to trigger any
        update in the protocol, and it can be upgraded only with decisions that
        are made by the liquidators and/or the users. In the event of an
        undesired protocol change, a user can disable the protocol functionally,
        and interact with the underlying lending platform directly.
        <br />
        <br />
        An upgrade in the underlying lending platforms might trigger unexpected
        behavior in the B.Protocol interface, and potentially to loss of funds.
        We note that this problem is not unique to B.Protocol, and loss of funds
        is expected mainly if the upgrade is malicious. However, to date, any
        such upgrade is subject to a time delay, in which the user could take
        action before the upgrade is triggered.
      </p>
    </p>
  );
};

export default RiskContent;
