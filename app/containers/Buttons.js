import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Button from '../components/Button';
import smartInterface from '../utils/smartInterface.js';

class Buttons extends Component {
  render () {
    const { dispatch } = this.props;
    const buttons = [
      ['ln(', '(', ')', 'AC', 'C'],
      ['sqrt(', '7', '8', '9', ' / '],
      ['sqr(', '4', '5', '6', ' * '],
      ['cos(', '1', '2', '3', ' + '],
      ['sin(', '0', '.', '=', ' - ']
    ];

    return (
      <table>
        <tbody>
          {buttons.map((row, i) =>
            <tr key={i}>
              {row.map((input, j) =>
                <Button
                  key={j}
                  label={input}
                  handleChange={() => dispatch(smartInterface(input))}
                  classes={classNames({'darkbtn': j === 0 || j === 4 || i === 0})}
                />
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

Buttons.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Buttons);
