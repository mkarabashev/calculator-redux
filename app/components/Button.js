import React, { PropTypes } from 'react';

const Button = ({label, classes, handleChange}) => (
  <td onClick={handleChange} className={classes}>
    {label.length > 1 ? label.replace(/\(/, '') : label}
  </td>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Button;
