import React from 'react';

const Button = ({label, classes, handleChange}) => (
  <td onClick={handleChange} className={classes}>
    {label.length > 1 ? label.replace(/\(/, '') : label}
  </td>
);
export default Button;
