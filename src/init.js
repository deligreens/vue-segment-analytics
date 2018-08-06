import loadScript from 'load-script'

export default function init (config, callback) {
  if (!config.id || !config.id.length) {
    console.warn('Please enter a Segment.io tracking ID')
    return
  }

  (function() {
    var
        analytics = window.analytics = window.analytics || [];
    if (!analytics.initialize)
        analytics.invoked = !0;
        analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "page", "once", "off", "on"];
        analytics.factory = function(t) {
            return function() {
                var e = Array.prototype.slice.call(arguments);
                e.unshift(t);
                analytics.push(e);
                return
                analytics
            }
        };
        for (var t = 0; t < analytics.methods.length; t++) {
            var
                e = analytics.methods[t];
            analytics[e] = analytics.factory(e)
        }
        analytics.load = function(t) {
            var
                e = document.createElement("script");
            e.type = "text/javascript";
            e.async = !0;
            e.src = ("https:" === document.location.protocol ? "https://" : "http://") + "cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";
            var
                n = document.getElementsByTagName("script")[0];
            n.parentNode.insertBefore(e, n)
        };
        analytics.SNIPPET_VERSION = "3.1.0";
        analytics.load(config.id);
        // Make sure to remove any calls to `analytics.page()`!
  })();

  const poll = setInterval(function () {
    if (!window.analytics) {
      return
    }

    clearInterval(poll)

    // the callback is fired when window.analytics is available and before any other hit is sent
    if (callback && typeof callback === 'function') {
      callback()
    }
  }, 10);

  return window.analytics
}
