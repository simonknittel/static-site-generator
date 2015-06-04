function finishInitialization() {
    // Delete script itself

    console.log('\x1b[32m', 'We successfully finished initializing your project without any problems.', '\x1b[0m');
    process.exit();
};

function addReact() {
    if (process.argv.indexOf('--skip-react') > 0) {
        console.log('Skipped adding React to your project.')
        finishInitialization();
        return;
    }

    console.log('\x1b[36m', 'Do you want to add React to your project? [No]', '\x1b[0m');
    process.stdin.once('data', function(data) {
        data = data.toString().trim(); // Entfernt überflüssige Lerrezeichen am Anfang und Ende des eingegebenen Strings
        data = data.toLowerCase();

        if (data === 'yes' || data === 'y') {
            console.log('\x1b[36m', 'Adding React to your project ...', '\x1b[0m');
            exec('jspm install react', function(error, stdout, stderr) {
                if (error) {
                    console.log(stdout);
                }

                exec('jspm install jsx', function(error, stdout, stderr) {
                    if (error) {
                        console.log(stdout);
                    }

                    console.log('\x1b[32m', 'Added React to your project.', '\x1b[0m');
                    finishInitialization();
                });
            });
            // Create `source/assets/scripts/_components`
            // Create `source/assets/scripts/_components/hello-world.jsx` with following content:
            // var React = require('react');
            //
            // module.exports = React.createClass({
            //     render: function() {
            //         return (
            //             <h1>Hello World!</h1>
            //         );
            //     }
            // });
            // Add following content to `source/assets/scripts/main.js`:
            // var React = require('react');
            // var HelloWorld = require('./_components/hello-world.jsx!');
            // React.render(
            //     React.createElement(HelloWorld, null),
            //     document.getElementById('container')
            // );
        } else {
            console.log('Skipped adding React to your project.')
            finishInitialization();
        }
    });
}

/**
 * Run `jspm install`
 */
function installJSPMDependencies() {
    if (process.argv.indexOf('--skip-jspm') > 0) {
        console.log('Skipped installing JSPM dependencies.')
        finishInitialization();
        return;
    }

    console.log('\x1b[36m', 'Installing jspm dependencies ...', '\x1b[0m');
    exec('jspm install', function(error, stdout, stderr) {
        if (error) {
            console.log(stdout);
        }

        console.log('\x1b[32m', 'jspm dependencies installed.', '\x1b[0m');
        addReact();
    });
}

/**
 * Run `npm install`
 */
function installNPMDependencies() {
    if (process.argv.indexOf('--skip-npm') > 0) {
        console.log('Skipped installing NPM dependencies.')
        installJSPMDependencies();
        return;
    }

    console.log('\x1b[36m', 'Installing npm dependencies ...', '\x1b[0m');
    exec('npm install', function(error, stdout, stderr) {
        if (error) {
            console.log(stdout);
        }

        console.log('\x1b[32m', 'npm dependencies installed.', '\x1b[0m');
        installJSPMDependencies();
    });
};

function _replaceDescription(file, data, isLast) {
    fs.readFile(file, 'utf8', function(error, oldContent) {
        var newContent = oldContent.replace(/SET-DESCRIPTION/gi, data);

        fs.writeFile(file, newContent, 'utf8', function(error) {
            if (isLast) { // Alle Dateien erledigt
                console.log('\x1b[32m', 'Description set.', '\x1b[0m');
                installNPMDependencies();
            }
        });
    });
}

function setDescription() {
    if (process.argv.indexOf('--skip-description') > 0) {
        console.log('Skipped setting description.')
        installNPMDependencies();
        return;
    }

    console.log('\x1b[36m', 'Describe your project in 140 characters:', '\x1b[0m');
    process.stdin.once('data', function(data) {
        data = data.toString().trim(); // Entfernt überflüssige Lerrezeichen am Anfang und Ende des eingegebenen Strings

        var files = [ // Dateien, in denen der String eingesetzt werden soll
            './package.json',
            './README.md',
            './source/_partials/_head.hbs'
        ];
        for (var i = 0; i < files.length; i++) {
            if (i === (files.length - 1)) {
                _replaceDescription(files[i], data, true);
            } else {
                _replaceDescription(files[i], data, false);
            }
        }
    });
};

function _replaceProjectName(file, data, isLast) {
    fs.readFile(file, 'utf8', function(error, oldContent) {
        var newContent = oldContent.replace(/SET-PROJECT-NAME/gi, data);

        fs.writeFile(file, newContent, 'utf8', function(error) {
            if (isLast) { // Alle Dateien erledigt
                console.log('\x1b[32m', 'Project name set.', '\x1b[0m');
                setDescription();
            }
        });
    });
}

function setProjectName() {
    if (process.argv.indexOf('--skip-project-name') > 0) {
        console.log('Skipped setting project name.')
        setDescription();
        return;
    }

    console.log('\x1b[36m', 'Enter your project name:', '\x1b[0m');
    process.stdin.once('data', function(data) {
        data = data.toString().trim(); // Entfernt überflüssige Lerrezeichen am Anfang und Ende des eingegebenen Strings

        var files = [ // Dateien, in denen der String eingesetzt werden soll
            './package.json',
            './README.md',
            './source/index.hbs',
            './source/_partials/_head.hbs'
        ];
        for (var i = 0; i < files.length; i++) {
            if (i === (files.length - 1)) {
                _replaceProjectName(files[i], data, true);
            } else {
                _replaceProjectName(files[i], data, false);
            }
        }
    });
}

if (process.argv.indexOf('--help') > 0) {
    console.log('--help');
    console.log('--skip-project-name for skipping to set the project name');
    console.log('--skip-description for skipping to set the description');
    console.log('--skip-npm for skipping to install the NPM dependencies');
    console.log('--skip-jspm for skipping to install the JSPM dependencies');
    console.log('--skip-react for skipping to add React to your project');

    process.exit();
} else {
    // console.log('\x1b[36m', 'Loading script ...', '\x1b[0m');
    var exec = require('child_process').exec;
    var fs = require('fs');
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    // console.log('\x1b[32m', 'Script loaded.', '\x1b[0m');

    setProjectName();
}
