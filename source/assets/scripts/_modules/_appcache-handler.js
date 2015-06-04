var _reinitializePage;
var options = {
    interval: 300000
};

function _showNewVersionNotice() {
    window.applicationCache.swapCache();
    document.querySelector('.new-version__cta').addEventListener('click', _refreshPage);
    document.querySelector('.new-version').classList.add('new-version--show');
};

/**
 * Reloads the site
 * @param  {Object} e Contains the event object
 * @return {[type]}   [description]
 */
function _refreshPage(e) {
    e.preventDefault();
    window.location.reload(true);
};

/**
 * Updates the application cache
 * @return {[type]} [description]
 */
function _init() {
    window.applicationCache.update();
    window.applicationCache.addEventListener('updateready', _showNewVersionNotice);
};

/**
 * Turns the site into offline mode
 * @return {[type]} [description]
 */
function _pageGoesOffline() {
    window.removeEventListener('offline', _pageGoesOffline);
    window.addEventListener('online', _pageGoesOnline);

    clearInterval(_reinitializePage);
};

/**
 * Turns the site into online mode
 * @return {[type]} [description]
 */
function _pageGoesOnline() {
    window.removeEventListener('online', _pageGoesOnline);
    window.addEventListener('offline', _pageGoesOffline);

    _init();

    _reinitializePage = setInterval(function() {
        _init();
    }, options.interval);
};

export function init(userOptions) {
    for (var attrName in userOptions) {
        options[attrName] = userOptions[attrName];
    }

    if (window.navigator.onLine) {
        _pageGoesOnline();
    } else {
        _pageGoesOffline();
    }
}
