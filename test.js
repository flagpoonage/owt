// Run `node test` to show this in action

var cons = require('./index');

console.log('Hello');

cons.on();

console.log('Yay!');

try {
  throw new Error('Something went wrong!');
}

catch(exc) {
  console.error(exc.message, exc);
}

cons.off();

console.log('Finished');