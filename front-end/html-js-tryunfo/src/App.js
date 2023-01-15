import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    cardsList: [],
    filteredCard: '',
    rarityFilter: 'todas',
  };

  resetState = (newCard) => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: newCard.trunfo === true,
    });
  };

  onSaveButtonClick = (newCard) => {
    this.setState((prev) => ({ cardsList: [...prev.cardsList, newCard] }));
    this.resetState(newCard);
  };

  handleChange = ({ target: { name, value, type, checked } }) => {
    const propertie = type === 'checkbox' ? checked : value;
    this.setState({ [name]: propertie });
  };

  removeCard = (card) => {
    const { cardsList } = this.state;
    const newCardList = cardsList.filter(({ name }) => name !== card.name);
    this.setState({
      cardsList: newCardList,
    });
    if (card.trunfo) {
      this.setState({ hasTrunfo: false });
    }
  };

  filterByInput(filteredCardByText, rarityFilter) {
    const { cardsList } = this.state;
    if (filteredCardByText && rarityFilter !== 'todas') {
      return filteredCardByText.filter(({ rare }) => rare === rarityFilter);
    }
    if (!filteredCardByText && rarityFilter !== 'todas') {
      return cardsList.filter(({ rare }) => rare === rarityFilter);
    }
    if (filteredCardByText && rarityFilter === 'todas') {
      return filteredCardByText;
    }
    return cardsList;
  }

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2,
      cardAttr3, cardImage, cardRare, cardTrunfo, hasTrunfo,
      cardsList, filteredCard, rarityFilter } = this.state;

    const MAX_SUM = 210;
    const MAX_VALUE = 90;
    const MIN_VALUE = 0;

    const textInputs = [cardName, cardDescription, cardImage, cardRare];
    const numInputs = [cardAttr1, cardAttr2, cardAttr3];

    const cond1 = textInputs.every((textInput) => textInput.length !== 0);
    const cond2 = numInputs.every((num) => num <= MAX_VALUE && num >= MIN_VALUE);
    const cond3 = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= MAX_SUM;
    const buttonState = cond1 && cond2 && cond3;

    const filteredCardByText = filteredCard.length !== 0 && cardsList
      .filter(({ name }) => name.match(new RegExp(filteredCard, 'i')));

    const filteredCardByInput = this.filterByInput(filteredCardByText, rarityFilter);

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          handleHasTrunfo={ this.handleHasTrunfo }
          isSaveButtonDisabled={ !buttonState }
          onSaveButtonClick={ this.onSaveButtonClick }
          onInputChange={ this.handleChange }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <div>
          <input
            onChange={ this.handleChange }
            name="filteredCard"
            data-testid="name-filter"
            type="text"
          />
          <label htmlFor="rarity">
            Filtro pela Raridade
            <select
              name="rarityFilter"
              onChange={ this.handleChange }
              id="rare"
              data-testid="rare-filter"
            >
              <option value="todas">todas</option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          {filteredCardByInput.map((card) => (
            <div key={ card.name }>
              <Card
                cardName={ card.name }
                cardDescription={ card.description }
                cardAttr1={ card.attr1 }
                cardAttr2={ card.attr2 }
                cardAttr3={ card.attr3 }
                cardImage={ card.img }
                cardRare={ card.rare }
                cardTrunfo={ card.trunfo }
                removeCard={ this.removeCard }
                showRemoveButton="1"
              />
              <button
                type="button"
                data-testid="delete-button"
                onClick={ () => this.removeCard(card) }
              >
                Excluir
              </button>
            </div>))}
        </div>
      </div>
    );
  }
}

export default App;
