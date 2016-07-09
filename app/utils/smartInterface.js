import { clearInput, newInput, addInput, undo } from '../actions'
import evaluate from './evaluate';

export default input => {
  return (dispatch, getState) => {
    const record = getState().get(-1);
    const parenth = parenthCheck(record.value);

    if (record.isNew) return onNew(dispatch, input);
    if (/\d/.test(input)) {
      if (/\)$/.test(record.value)) input = ' * ' + input;
      return dispatch(addInput(input, parenth));
    }

    switch(input) {
      case 'ln(':
      case 'sqrt(':
      case 'sqr(':
      case 'cos(':
      case 'sin(':
        if (/(\)|\d)$/.test(record.value)) {
          input = ' * ' + input;
        }
        return dispatch(addInput(input, parenth));

      case ' + ':
      case ' - ':
      case ' * ':
      case ' / ':
        if (/[-+*/]\s$/.test(record.value)) {
          dispatch(undo());
        }
        return dispatch(addInput(input, parenth));

      case '(':
        if (/\)|\d$/.test(record.value)) {
          input = ' * ' + input;
        }
        return dispatch(addInput(input, parenth + 1));

      case ')':
        return parenth > 0 ? dispatch(addInput(input, parenth - 1)) : null;

      case '.':
        return /\..*?[\sa-z].*\d$|^[^.]*$/.test(record.value)
          ? dispatch(addInput(input, parenth))
          : null;

      case 'AC':
        return dispatch(newInput('0'));

      case 'C':
        return dispatch(undo());

      case '=':
        let result = +evaluate(record.value + new Array(record.parenth + 1).join(')'));
        const decimals = result.toString().split('.')[1];
        result = decimals && decimals.length > 12 ? +result.toPrecision(12) : +result;
        dispatch(newInput(result));
    }
  };
};

const parenthCheck = input => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    let char = input.charAt(i);
    if (char === '(') count++;
    else if (char === ')') count--;
    if (count < 0) break;
  }
  return count;
}

const onNew = (dispatch, input) => {
  if (/[\w(.]/.test(input) &&
      input !== 'AC' && input !== 'C') {
    dispatch(clearInput(input));
  } else if (input === 'C') {
    dispatch(undo());
  } else if (input === 'AC' || input === ')') {
    dispatch(newInput('0'));
  } else if (input !== '=') {
    dispatch(addInput(input));
  }
};
