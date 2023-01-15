import { Component } from 'react';
import { string, bool } from 'prop-types';

export default class Card extends Component {
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
    } = this.props;
    return (
      <section>
        <h4 data-testid="name-card">{cardName}</h4>
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <p data-testid="description-card">
          descrição
          {cardDescription}
        </p>
        <p data-testid="attr1-card">
          attr1
          {cardAttr1}
        </p>
        <p data-testid="attr2-card">
          attr2
          {cardAttr2}
        </p>
        <p data-testid="attr3-card">
          attr3
          {cardAttr3}
        </p>
        <h6 data-testid="rare-card">
          Raridade
          {cardRare}
        </h6>
        {cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p>}
      </section>
    );
  }
}

Card.propTypes = {
  cardName: string.isRequired,
  cardDescription: string.isRequired,
  cardAttr1: string.isRequired,
  cardAttr2: string.isRequired,
  cardAttr3: string.isRequired,
  cardImage: string.isRequired,
  cardRare: string.isRequired,
  cardTrunfo: bool.isRequired,
};
