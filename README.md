# owting
Simple enhanced console logging.

![Screenshot of logging](http://i.imgur.com/ZGx5iLF.png)

## What does it do?

`owting` enhances the native `console.log` and `console.error` functions to provide automatic timestamps, as well as coloring and enhanced JSON formatting for objects. You no longer need to call JSON.stringify, or worry about your object types. Circular references in JS objects are automatically taken care of by the complimentary package [owtj](https://github.com/flagpoonage/owtj).

The first parameter to every `console.log` or `console.error` function becomes the main title, you can add as many parameters as you like, but they will fall under a single timestamp. Each parameters wil be stringified and formatted nicely.

## Usage

The usage is extremely simple. You turn it on, and you turn it off.

    const owting = require('owting');
    
    owting.on();
    
    console.log('Woohoo, my console logs look nice!');
    console.log('This is so awesome...');
    
    owting.off();
    
    console.log('Oh, they\'ve gone back to normal :(');
    
