import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import getCurrency from '../services/api';
import { saveCurrencys } from '../redux/actions/index';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const currencys = await getCurrency();
    delete currencys.USDT;
    dispatch(saveCurrencys(Object.keys(currencys)));
  }

  render() {
    return (
      <section>
        <Header />
        <WalletForm />
        <Table />
      </section>
    );
  }
}

Wallet.propTypes = {
  dispatch: func.isRequired,
};

export default connect()(Wallet);
