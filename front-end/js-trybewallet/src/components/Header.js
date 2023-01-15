import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, instanceOf } from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, userExpenses } = this.props;
    const valueSum = userExpenses.map(({ value, currency, exchangeRates,
    }) => value * exchangeRates[currency].ask).reduce((a, v) => a + v, 0).toFixed(2);

    return (
      <section>
        <p data-testid="email-field">{userEmail}</p>
        <p data-testid="total-field">{valueSum}</p>
        <p data-testid="header-currency-field">BRL</p>
      </section>
    );
  }
}

Header.propTypes = {
  userEmail: string.isRequired,
  userExpenses: instanceOf(Array).isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  userEmail: user.email,
  userExpenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
