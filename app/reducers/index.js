import { List } from 'immutable';

const record = (
  state = List.of({
    parent: 0,
    value: '0',
    parenth: 0,
    isNew: true
  }),
  action
) => {
  switch (action.type) {
    case 'CLEAR_INPUT':
      return state.push({
        parent: state.size - 1,
        value: action.input,
        parenth: 0,
        isNew: false
      });
    case 'NEW_INPUT':
      return state.push({
        parent: state.size - 1,
        value: action.input,
        parenth: 0,
        isNew: true
      });
    case 'ADD_INPUT':
      return state.push({
        parent: state.size - 1,
        value: state.get(-1).value + action.input,
        parenth: action.parenth,
        isNew: false
      });
    case 'UNDO':
      return state.push(state.get(
        state.get(-1).parent));
    default:
      return state;
  }
};
export default record;
