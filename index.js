/* eslint-disable no-console */

const Console = require('console').Console;
const OWTJ = require('owtj');
const moment = require('moment');
const chalk = require('chalk');

const opt = {
  active: false,
  flatten: false,
  time_format: 'HH:mm:ss DD/MM/YYYY Z'
};

const _ = (fn, tcolor, bcolor, ...args) => {
  if (!args[0]) {
    return;
  }

  let data = '';

  if (opt.time_format) {
    data = chalk.rgb(210, 214, 216)(moment().format(opt.time_format) + ' -- ') + 
      tcolor()(args[0]) + chalk.rgb(210, 214, 216)(' -- ');
  }
  else {
    data = tcolor()(args[0]) + chalk.rgb(210, 214, 216)(' -- ');
  }

  let values = args.slice(1);
  
  values.map(a => {
    if (a instanceof Error) {
      data += bcolor()(`\n${a.stack}`);
    }

    let arg_data = opt.flatten ? OWTJ(a) : OWTJ(a, null, 2);
    arg_data = arg_data ? arg_data.replace(/"(\w+)"\s*:/g, '$1:') : null;

    data += bcolor()(`${!opt.flatten ? '\n' : ''}${arg_data || ''}`);
  });

  fn(data);
};

var output = {
  on: () => {
    const CS = new Console(process.stdout, process.stderr);

    opt.active = true;

    global.console.log = (...args) => {
      _(CS.log, () => chalk.rgb(50, 209, 50), () => chalk.rgb(71, 197, 255), ...args);
    },

    global.console.info = (...args) => {
      _(CS.log, () => chalk.rgb(68, 226, 249), () => chalk.rgb(163, 228, 238), ...args);
    },
    
    global.console.warn = (...args) => {
      _(CS.warn, () => chalk.rgb(255, 165, 0), () => chalk.rgb(255, 197, 71), ...args);
    },

    global.console.error = (...args) => {
      _(CS.error, () => chalk.rgb(209, 50, 50), () => chalk.rgb(246,148,148), ...args);
    };
  },

  flatten: () => opt.flatten = true,

  unflatten: () => opt.flatten = false,

  timeFormat: format => opt.time_format = format,

  off: () => {
    const CS = new Console(process.stdout, process.stderr);

    opt.active = false;

    global.console.log = CS.log
    global.console.info = CS.info;
    global.console.warn = CS.warn;
    global.console.error = CS.error;
  }
}

module.exports = output;