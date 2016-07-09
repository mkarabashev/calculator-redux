export const clearInput = input => {
  return {
    type: 'CLEAR_INPUT',
    input
  };
};

export const newInput = input => {
  return {
    type: 'NEW_INPUT',
    input
  };
};

export const addInput = (input, parenth) => {
  return {
    type: 'ADD_INPUT',
    input,
    parenth
  };
};

export const undo = () => {
  return {
    type: 'UNDO'
  };
};
