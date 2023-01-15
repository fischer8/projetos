import { Component } from 'react';
import { string, bool, func } from 'prop-types';

export default class Form extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    const card = {
      name: cardName,
      description: cardDescription,
      attr1: cardAttr1,
      attr2: cardAttr2,
      attr3: cardAttr3,
      img: cardImage,
      rare: cardRare,
      trunfo: cardTrunfo,
    };
    return (
      <form>
        <label htmlFor="card-name">
          Nome da carta
          <input
            value={ cardName }
            onChange={ onInputChange }
            name="cardName"
            id="card-name"
            type="text"
            data-testid="name-input"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <textarea
            style={ { resize: 'none' } }
            value={ cardDescription }
            onChange={ onInputChange }
            name="cardDescription"
            id="description"
            cols="30"
            rows="2"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="attr1">
          Attr1
          <input
            value={ cardAttr1 }
            onChange={ onInputChange }
            type="number"
            name="cardAttr1"
            id="attr1"
            data-testid="attr1-input"
          />
        </label>
        <label htmlFor="attr2">
          Attr2
          <input
            value={ cardAttr2 }
            onChange={ onInputChange }
            type="number"
            name="cardAttr2"
            id="attr2"
            data-testid="attr2-input"
          />
        </label>
        <label htmlFor="attr3">
          Attr3
          <input
            value={ cardAttr3 }
            onChange={ onInputChange }
            type="number"
            name="cardAttr3"
            id="attr3"
            data-testid="attr3-input"
          />
        </label>
        <label htmlFor="img">
          Imagem
          <input
            value={ cardImage }
            onChange={ onInputChange }
            name="cardImage"
            id="img"
            type="text"
            data-testid="image-input"
          />
        </label>
        <label htmlFor="rarity">
          Raridade
          <select
            name="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
            id="rarity"
            data-testid="rare-input"
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo">
          { hasTrunfo
            ? <p>Você já tem um Super Trunfo em seu baralho</p>
            : (
              <div>
                <p>Super Trunfo?</p>
                <input
                  checked={ cardTrunfo }
                  onChange={ onInputChange }
                  type="checkbox"
                  name="cardTrunfo"
                  id="trunfo"
                  data-testid="trunfo-input"
                />
              </div>)}
        </label>
        <button
          disabled={ isSaveButtonDisabled }
          onClick={ () => onSaveButtonClick(card) }
          type="button"
          data-testid="save-button"
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: string.isRequired,
  cardDescription: string.isRequired,
  cardAttr1: string.isRequired,
  cardAttr2: string.isRequired,
  cardAttr3: string.isRequired,
  cardImage: string.isRequired,
  cardRare: string.isRequired,
  cardTrunfo: bool.isRequired,
  hasTrunfo: bool.isRequired,
  isSaveButtonDisabled: bool.isRequired,
  onInputChange: func.isRequired,
  onSaveButtonClick: func.isRequired,
};
