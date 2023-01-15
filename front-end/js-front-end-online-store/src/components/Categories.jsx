import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  render() {
    const { id, value, filter } = this.props;
    return (
      <aside>
        <label htmlFor={ id } data-testid="category">
          <input
            id={ id }
            value={ value }
            type="radio"
            name="category"
            onClick={ filter }
          />
          {value}
        </label>
      </aside>
    );
  }
}

Categories.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired,
};

export default Categories;
