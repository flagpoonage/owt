/* eslint-disable no-console */

const Console = require('console').Console;
const OWTJ = require('owtj');
const moment = require('moment');
const chalk = require('chalk');

const _ = (fn, tcolor, bcolor, ...args) => {
  if (!args[0]) {
    return;
  }

  fn(chalk.rgb(210, 214, 216)(moment().format('HH:mm:ss DD/MM/YYYY Z') + ' -- ') + tcolor(args[0]) + chalk.rgb(210, 214, 216)(' -- '));

  args.slice(1).map(a => {
    if (a instanceof Error) {
      return fn(bcolor(a.stack));
    }

    let output = OWTJ(a, null, 2);
    fn(bcolor(output ? output.replace(/"(\w+)"\s*:/g, '$1:') : null));
  });
};

var output = {
  on: () => {
    const CS = new Console(process.stdout, process.stderr);

    global.console.log = (...args) => {
      _(CS.log, chalk.rgb(50, 209, 50), chalk.rgb(71, 197, 255), ...args);
    },

    global.console.error = (...args) => {
      _(CS.error, chalk.rgb(209, 50, 50), chalk.rgb(255, 197,71), ...args);
    };
  },

  off: () => {
    const CS = new Console(process.stdout, process.stderr);

    global.console.log = CS.log
    global.console.error = CS.error;
  }
}

module.exports = output;