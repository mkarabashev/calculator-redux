import React, { Component } from 'react';
import { connect } from 'react-redux';

class Display extends Component {
  render () {
    const { record } = this.props;
    const expression = record.get(-1);

    return (
      <div className='th'>
        <div className='inner'>
            <span>{expression.value}</span>
            <span className='light'>{')'.repeat(expression.parenth)}</span>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { record: state };
};
export default connect(mapStateToProps)(Display);
