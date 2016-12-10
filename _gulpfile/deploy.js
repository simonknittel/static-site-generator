// Dependencies
import config from './config';

import gulp from 'gulp';


export default function deploy() {
    let notify = require('gulp-notify');
    let sftp = require('gulp-sftp');

    let sftpSettings = null;
    switch (process.argv.slice(3)[0]) {
        case '--target=production':
            sftpSettings = config.deployment.production;
            break;
        case '--target=staging':
            sftpSettings = config.deployment.staging;
            break;
        default:
            sftpSettings = config.deployment.integration;
    }

    return gulp.src(config.paths.build.base + '/**/*')
        .pipe(sftp(sftpSettings))
        .pipe(notify({
            title: 'deploy finished',
            message: ' ',
            sound: true,
            onLast: true,
        }));
}
