1. [Add AngularJS](#add-angularjs)


# Add AngularJS
1. Run `jspm install angular angular-ui-router`
1. Copy the [_angular-app](./_angular-app) directory to [source/assets/scripts](./source/assets/scripts)
1. Add the following to the `<html>` tag in the [head.hbs](./source/_partials/base.pug#L14)

```html
ng-app="app"
```

1. Add the following to the [<head>](../../../source/_partials/base.hbs#L15) in the [base.hbs](../../../source/_partials/base.pug)

```html
<base href="/">
```

1. Add the following to the [scripts.js](../../../source/assets/scripts/scripts.js)

```javascript
import './_angular-app/app.module';
```

1. Add the following to the [front.pug](../../../source/_partials/templates/front.pug#L20)

```html
<ui-view></ui-view>
```

1. Add the following to the [gulpfile.babel.js](../../../gulpfile.babel.js)

```javascript
config.paths.source.angularApp = config.paths.source.scripts + '/_angular-app';

...

config.paths.build.angularApp = config.paths.build.scripts + '/_angular-app';

...

gulp.task('copy:angular-app', copy.angularApp);
gulp.task('copy', gulp.parallel('copy:base'/**, 'copy:cache-manifest'*/, 'copy:libraries', 'copy:angular-app'));

...

gulp.watch(config.paths.source.angularApp + '/**/*.html', gulp.series('copy:angular-app', browserSync.reload));

...

export function angularApp() {
    return gulp.src(config.paths.source.angularApp + '/**/*.html')
        .pipe(cached('copy:angular-app'))
        .pipe(gulp.dest(config.paths.build.angularApp));
}
```
