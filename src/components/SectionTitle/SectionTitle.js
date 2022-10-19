import React from 'react';
import PropTypes from 'prop-types';

const SectionTitle = ({ title, children }) => (
  <>
    <h2>{title}</h2>
    <div>{children}</div>
  </>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
