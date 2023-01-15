import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  state = {
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    allImputsFilled: false,
    imputError: false,
  };

  verifyFinishButton = () => {
    const { fullname, email, cpf, phone, cep, address, payment } = this.state;
    const arrayInput = [fullname, email, cpf, phone, cep, address, payment];
    const minLengthInput = 0;
    const inputsFilled = (arrayInput.every((input) => (input.length > minLengthInput)));
    if (inputsFilled) {
      this.setState({ allImputsFilled: true });
    } else {
      this.setState({ allImputsFilled: false });
    }
  };

  changeFormInput = (action) => {
    const { name, value, id } = action.target;
    const newValue = (action.target.type === 'radio') ? id : value;
    this.setState({ [name]: newValue }, () => this.verifyFinishButton());
  };

  saveUserData = () => {
    const { history } = this.props;
    const { allImputsFilled } = this.state;

    if (allImputsFilled) {
      this.setState({ imputError: false });
      localStorage.clear();
      history.push('/');
    } else {
      this.setState({ imputError: true });
    }
  };

  render() {
    const { fullname, email, cpf, phone, cep, address, imputError } = this.state;
    const items = Object.keys(localStorage);
    return (
      <section>
        {
          items.map((key) => {
            const { title, price, id,
            } = JSON.parse(localStorage.getItem(key));
            return (
              <div key={ id }>
                <h3>{title}</h3>
                <p>{price}</p>
              </div>
            );
          })
        }
        <form>
          <label htmlFor="fullname">
            Nome Completo:
            <input
              type="text"
              data-testid="checkout-fullname"
              value={ fullname }
              required
              name="fullname"
              onChange={ this.changeFormInput }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              data-testid="checkout-email"
              value={ email }
              required
              name="email"
              onChange={ this.changeFormInput }
            />
          </label>
          <label htmlFor="cpf">
            CPF:
            <input
              type="text"
              data-testid="checkout-cpf"
              value={ cpf }
              required
              name="cpf"
              onChange={ this.changeFormInput }
            />
          </label>
          <label htmlFor="tel">
            Telefone:
            <input
              type="tel"
              data-testid="checkout-phone"
              value={ phone }
              required
              name="phone"
              onChange={ this.changeFormInput }
            />
          </label>
          <label htmlFor="cep">
            CEP:
            <input
              type="text"
              data-testid="checkout-cep"
              value={ cep }
              required
              name="cep"
              onChange={ this.changeFormInput }
            />
          </label>
          <label htmlFor="address">
            Endereço:
            <input
              type="text"
              data-testid="checkout-address"
              value={ address }
              required
              name="address"
              onChange={ this.changeFormInput }
            />
          </label>
          <label htmlFor="Payment">
            Forma de Pagamento:
            <input
              type="radio"
              id="Boleto"
              name="payment"
              data-testid="ticket-payment"
              onClick={ this.changeFormInput }
            />
            Boleto
            <input
              type="radio"
              id="Visa"
              name="payment"
              data-testid="visa-payment"
              onClick={ this.changeFormInput }
            />
            Visa
            <input
              type="radio"
              id="MasterCard"
              name="payment"
              data-testid="master-payment"
              onClick={ this.changeFormInput }
            />
            MasterCard
            <input
              type="radio"
              id="Elo"
              name="payment"
              data-testid="elo-payment"
              onClick={ this.changeFormInput }
            />
            Elo
          </label>
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.saveUserData }
          >
            Finalizar
          </button>
        </form>
        { (imputError) && <h1 data-testid="error-msg">Campos inválidos</h1> }
      </section>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Checkout;
