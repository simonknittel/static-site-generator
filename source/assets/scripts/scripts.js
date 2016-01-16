// Remove no-js class
document.querySelector('html').classList.remove('no-js');

// Require and initialize FastClick
import FastClick from '../../../node_modules/fastclick/lib/fastclick';
FastClick.attach(document.body);

// Require and initialize Application Cache Handler
// import * as appcacheHandler from './_modules/_appcache-handler';
// appcacheHandler.init();
