import React from 'react';
import { shape, func } from 'prop-types';
import { connect } from 'react-redux';
import { saveUserInfo } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { type, value } }) => {
    this.setState({ [type]: value });
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(saveUserInfo(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const MIN_VALUE = 6;
    const isDisabled = password.length < MIN_VALUE || !email.match(/\S+@\S+\.\S+/);
    return (
      <section>
        <div>Login</div>
        <form>
          <input
            onChange={ this.handleChange }
            type="email"
            data-testid="email-input"
          />
          <input
            onChange={ this.handleChange }
            type="password"
            data-testid="password-input"
          />
          <button onClick={ this.handleClick } type="button" disabled={ isDisabled }>
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  history: shape(Object).isRequired,
  dispatch: func.isRequired,
};

export default connect()(Login);
