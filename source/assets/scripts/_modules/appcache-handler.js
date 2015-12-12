var reinitializePage;
var defaultOptions = {
    interval: 300000,
};
var options = defaultOptions;

/**
 * Reloads the site
 * @param  {Object} e Contains the event object
 * @return {[type]}   [description]
 */
function refreshPage(e) {
    e.preventDefault();
    window.location.reload(true);
}

function showNewVersionNotice() {
    window.applicationCache.swapCache();
    document.querySelector('.new-version__cta').addEventListener('click', refreshPage);
    document.querySelector('.new-version').classList.add('new-version--show');
}

/**
 * Updates the application cache
 * @return {[type]} [description]
 */
function init() {
    window.applicationCache.update();
    window.applicationCache.addEventListener('updateready', showNewVersionNotice);
}

/**
 * Turns the site into online mode
 * @return {[type]} [description]
 */
function pageGoesOnline() {
    window.removeEventListener('online', pageGoesOnline);
    window.addEventListener('offline', pageGoesOffline);

    init();

    reinitializePage = setInterval(() => init(), options.interval);
}

/**
 * Turns the site into offline mode
 * @return {[type]} [description]
 */
function pageGoesOffline() {
    window.removeEventListener('offline', pageGoesOffline);
    window.addEventListener('online', pageGoesOnline);

    clearInterval(reinitializePage);
}

export function init(userOptions) {
    options = defaultOptions;
    for (let attrName in userOptions) {
        options[attrName] = userOptions[attrName];
    }

    if (window.navigator.onLine) {
        pageGoesOnline();
    } else {
        pageGoesOffline();
    }
}

export function destroy() {
    options = defaultOptions;

    window.removeEventListener('offline', pageGoesOffline);
    window.removeEventListener('online', pageGoesOnline);
    clearInterval(reinitializePage);
}
