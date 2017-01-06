export default function evaluate(input) {
  let k;
  const i = input.lastIndexOf('(');
  let part = input.slice(i + 1);
  if (i < 0) return evalBasic(input);

  const j = part.indexOf(')');
  part = part.slice(0, j);

  const firstPart = input.slice(0, i);
  if (/[a-z]$/.test(firstPart)) {
    const action = firstPart.split(/[\s(]/);
    part = funcs[ action[action.length - 1] ](part);
    k = input.lastIndexOf(action[action.length - 1]);
  } else {
    part = evalBasic(part);
    k = i;
  }
  input = input.split(input.slice(k, i + j + 2)).join(part);
  //input = input.slice(0, k) + part + input.slice(i + j + 2);
  return evaluate(input);
}

const evalBasic = input => {
  input = input.split(' ');
  input = evalOperands(input, '*', '/');
  input = evalOperands(input, '+', '-');
  return input[0];
};

const evalOperands = (input, op1, op2) => {
  for (let i = 0; i < input.length; i++) {
    switch (input[i]) {
      case op1:
        input[i - 1] = operations[op1](input[i - 1]/1, input[i + 1]/1);
        input.splice(i--, 2);
        break;
      case op2:
        input[i - 1] = operations[op2](input[i - 1]/1, input[i + 1]/1);
        input.splice(i--, 2);
        break;
    }
  }
  return input;
};

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
};

const funcs = {
  'sqrt' : (input) => Math.sqrt(evalBasic(input)),
  'sqr' : (input) => Math.pow(evalBasic(input), 2),
  'sin' : (input) => Math.sin(evalBasic(input)),
  'cos' : (input) => Math.cos(evalBasic(input)),
  'tan' : (input) => Math.tan(evalBasic(input)),
  'ln' : (input) => Math.log(evalBasic(input)),
};
