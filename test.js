// Run `node test` to show this in action

var cons = require('./index');

cons.on();

console.log('Hello');

console.log('A little best of test information');
console.log('Some JSON object', {
  something: {
    value: 'one',
    other: 'two'
  }
});

console.log('Yay!');

try {
  throw new Error('Something went wrong!');
}

catch(exc) {
  console.error(exc.message, exc);
}

cons.off();

console.log('Finished');