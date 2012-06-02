/*!
 * Simple jQuery Countdown
 * https://github.com/jonasanx/jQuery-simple-countdown
 * @author Jonathan J. Flores
 */
 ;(function ($) {
  $.scountdown = function (element, options) {
    var plugin = this;

    var time = {
      days: 24 * 60 * 60,
      hours: 60 * 60,
      minutes: 60
    };

    plugin.init = function () {
      var settings = $.extend({}, {
        timestamp: 0,
        callback: function () {}
      }, options);

      (function countdown() {
        var timeLeft = Math.floor((settings.timestamp - (new Date())) / 1000);
        var digits = {}

        if (timeLeft < 0) timeLeft = 0;

        for (key in time) {
          var y = time[key];
          var x = digits[key] = add_leading_zero(Math.floor(timeLeft / y));
          timeLeft -= x * y;
        }

        // Returns days, hours, minutes, and seconds.
        // TODO: arguments should be passed dynamically.
        settings.callback(digits.days, digits.hours, digits.minutes, add_leading_zero(timeLeft));

        setTimeout(countdown, 1000);
      })();

    }

    // Private methods
    var add_leading_zero = function (n) {
        return (n.toString().length < 2) ? '0' + n : n;
      }

      // Fire!
      plugin.init();
  }

  $.fn.scountdown = function (options) {
    return this.each(function () {
      var plugin = new $.scountdown(this, options);
    });
  }

})(jQuery);