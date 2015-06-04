// Require and initialize FastClick
import attachFastClick from 'fastclick';
attachFastClick(document.body);

// Require and initialize Application Cache Handler
import * as appcacheHandler from './_modules/_appcache-handler';
appcacheHandler.init();

// Remove no-js class
document.querySelector('html').classList.remove('no-js');
