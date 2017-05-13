// Dependencies
import config from './_gulpfile/config';

import valimate from 'valimate';
import modRewrite from 'connect-modrewrite';
import compression from 'compression';
import browserSync from 'browser-sync';


// Same code as in gulpfile.babel.js
browserSync({
    ghostMode: {
        clicks: false,
        scroll: false,
        forms: false,
    },
    server: {
        baseDir: config.paths.build.base,
        middleware: [
            modRewrite([
                '^.([^\\.]+)$ /$1.html [L]', // Remove .html from URL (as in the .htaccess)
            ]),
            compression(), // Enable gzip compression
        ],
    },
    https: false, // Turned off since valimate can't handle self signed certificates
    online: false,
    open: false, // Turned off so no browser will open (not needed since this is a headless test)
});


valimate.validate({
    urls: [
        'http://localhost:3000',
    ],
})
    .then(isInvalid => process.exit(~~isInvalid)); // protip: ~ = bitwise NOT - can use this twice to doubly invert the bits to coerce a bool to 1 or 0
