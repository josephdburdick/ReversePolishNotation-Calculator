var assert = require('assert');

function isNumeric(value){
  return !isNaN(parseFloat(value)) && isFinite(value);
}

var mathItUp = {
  '+': (x, y) => parseFloat(x) + parseFloat(y),
  '-': (x, y) => parseFloat(x) - parseFloat(y),
  '*': (x, y) => parseFloat(x) * parseFloat(y),
  '/': (x, y) => parseFloat(y) / parseFloat(x),
  '^': (x, y) => Math.pow(parseFloat(x), parseFloat(y))
};

function rpn(input) {
  const postfix = input.split(' ');
  let
    stack = [],
    operator

  for (let i = 0; i < postfix.length; i++){
    if (isNumeric(postfix[i])){
      stack.push(parseFloat(postfix[i]));
    } else {
      let n1 = stack.pop();
      let n2 = stack.pop();
      operator = postfix[i];

      stack.push( mathItUp[operator]( n1, n2 ) );
    }
  }
  return stack;
}

describe('rpn', () => {
  it('3.5 3 +', () => {
    assert.equal(rpn('3.5 3 +'), 6.5);
  });

  it('2 2 + 3 *', () => {
    assert.equal(rpn('2 2 + 3 *'), 12);
  });

  it('2 2 3 + *', () => {
    assert.equal(rpn('2 2 3 + *'), 10);
  });

  it('2 2 3 3 / * /', () => {
    assert.equal(rpn('2 2 3 3 / * /'), 1);
  });

  it('2 2 3 3 / * / 4 * 6 ^', () => {
    assert.equal(rpn('2 2 3 3 / * / 4 * 6 ^'), 1296);
  });
});
