import React, { Component } from 'react';
import { connect } from 'react-redux';
import { instanceOf, func } from 'prop-types';
import { deleteExpense, changeExpense } from '../redux/actions/index';

class Table extends Component {
  handleClickDelete = (id) => {
    const { userExpenses, dispatch } = this.props;
    const filteredExpenses = userExpenses.filter((expense) => expense.id !== id);
    dispatch(deleteExpense(filteredExpenses));
  };

  handleClickChange = (id) => {
    const { dispatch } = this.props;
    dispatch(changeExpense(id));
  };

  fetchTable = () => {
    const { userExpenses } = this.props;
    return userExpenses.map(({ currency, id, method,
      tag, exchangeRates, value, description }) => {
      const ask = Number(exchangeRates[currency].ask);
      return (
        <tr key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{Number(value).toFixed(2)}</td>
          <td>{exchangeRates[currency].name}</td>
          <td>{ask.toFixed(2)}</td>
          <td>{(ask * Number(value)).toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button
              onClick={ () => this.handleClickDelete(id) }
              type="button"
              data-testid="delete-btn"
            >
              Excluir
            </button>
            <button
              onClick={ () => this.handleClickChange(id) }
              type="button"
              data-testid="edit-btn"
            >
              Editar
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const table = this.fetchTable();
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  userExpenses: instanceOf(Array).isRequired,
  dispatch: func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  userExpenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
