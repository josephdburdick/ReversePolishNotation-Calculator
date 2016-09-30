var assert = require('assert');

var mathItUp = {
  '+': (x, y) => { return parseInt(x) + parseInt(y); },
  '-': (x, y) => { return parseInt(x) - parseInt(y); },
  '*': (x, y) => { return parseInt(x) * parseInt(y); },
  '/': (x, y) => { return parseInt(y) / parseInt(x); }
};

function rpn(input) {
  const raw = input.split(' ');
  let
    stack = [],
    operator,
    a, b;

  for (let i = 0; i < raw.length; i++){
    stack.push(raw[i]);
    console.log(stack);
    if (!isNaN(raw[i])){   // Number
      console.log(`__________________`);
      console.log(`${raw[i]} is an operand. Add to stack and continue.`);
    } else {
      console.log(`__________________`);
      console.log(`${raw[i]} is an operator. Use it to calculate the numbers.`);

      operator = stack.pop();
      a = stack.pop();
      b = stack.pop();

      console.log(`__________________`);
      console.log(`operator: ${operator}`);
      console.log(`a: ${a}`);
      console.log(`b: ${b}`);

      stack.push(mathItUp[operator](a,b));

      console.log(`__________________`);
      console.log(`stack: ${stack}`);

      return stack.pop();
    }
  }
}

var value = rpn('2 2 + 3 *');
console.log(value);
describe('rpn', function() {
  it('3 3 +', function() {
    assert.equal(rpn('3 3 +'), 6);
  });

  it('2 2 + 3 *', function() {
    assert.equal(rpn('2 2 + 3 *'), 12);
  });

  it('2 2 3 + *', function() {
    assert.equal(rpn('2 2 3 + *'), 10);
  });

  it('2 2 3 3 / * /', function() {
    assert.equal(rpn('2 2 3 3 / * /'), 1);
  });
});
