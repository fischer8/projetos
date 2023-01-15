import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, func, number, instanceOf, bool } from 'prop-types';
import { editExpense, fetchCurrencys } from '../redux/actions/index';

const lintChatao = 'Alimentação';
class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: lintChatao,
  };

  generateOptions = (currencys) => currencys.map((currency) => (
    <option
      key={ currency }
      value={ currency }
    >
      {currency}
    </option>));

  generateTagOptions = () => {
    const tagOptions = [lintChatao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return tagOptions.map((tag) => <option value={ tag } key={ tag }>{tag}</option>);
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleState = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: lintChatao,
    });
  };

  handleEdit = () => {
    const { idToEdit, expenses, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      id: idToEdit,
    };
    const editExpenses = expenses;
    // editExpenses[idToEdit] = expense;
    console.log(expense, editExpenses);
    dispatch(editExpense(expense));
    this.handleState();
  };

  handleClick = () => {
    const { dispatch, expenseId } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      id: expenseId,
    };
    dispatch(fetchCurrencys(expense));
    this.handleState();
  };

  render() {
    console.log('renderizou o form');
    const { allCurrencys, shouldEdit } = this.props;
    const { value, description } = this.state;
    const options = this.generateOptions(allCurrencys);
    const tagOptions = this.generateTagOptions();
    return (
      <section>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              onChange={ this.handleChange }
              id="value"
              value={ value }
              type="number"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              onChange={ this.handleChange }
              type="text"
              id="description"
              value={ description }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              onChange={ this.handleChange }
              id="currency"
              data-testid="currency-input"
            >
              {options}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              onChange={ this.handleChange }
              id="method"
              data-testid="method-input"
            >
              <option value="Dinheiro" key="money">Dinheiro</option>
              <option value="Cartão de crédito" key="credit">Cartão de crédito</option>
              <option value="Cartão de débito" key="debit">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select onChange={ this.handleChange } id="tag" data-testid="tag-input">
              {tagOptions}
            </select>
          </label>
          <button
            onClick={ shouldEdit === false ? this.handleClick : this.handleEdit }
            type="button"
          >
            {
              shouldEdit ? 'Editar despesa' : 'Adicionar despesa'
            }

          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  allCurrencys: wallet.currencies,
  expenseId: wallet.expenses.length,
  exchangeRates: wallet.exchangeRates,
  idToEdit: wallet.idToEdit,
});

WalletForm.propTypes = {
  allCurrencys: arrayOf(string).isRequired,
  dispatch: func.isRequired,
  expenseId: number.isRequired,
  idToEdit: number.isRequired,
  expenses: instanceOf(Array).isRequired,
  shouldEdit: bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
