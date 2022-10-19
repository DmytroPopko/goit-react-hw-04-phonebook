import React from 'react';
import './Filter.scss';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
  <label className="Filter">
    Find contacts by name
    <input
      className="Filter__textarea"
      type="text"
      value={value}
      onChange={onChange}
    />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Filter;
