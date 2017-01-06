import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class Display extends Component {

  render () {
    const { expression } = this.props;

    return (
      <div className='th'>
        <div className='inner'>
            <span>{expression.value}</span>
            <span className='light'>{')'.repeat(expression.parenth)}</span>
        </div>
      </div>
    );
  }
}

Display.propTypes = {
  expression: PropTypes.string.isRequired
};

const mapStateToProps = state => ({ expression: state.get(-1) });

export default connect(mapStateToProps)(Display);
