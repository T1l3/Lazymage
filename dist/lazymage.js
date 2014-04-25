/* global Image, jQuery */

angular.module('lazymage', []);

angular.module('lazymage')
.provider('lazymageRemote', function LazymageRemoteProvider() {
  'use strict';
  var self = this;
  this.globalOptions = {};
  var globalOptions = {
    currentImage: {
      attrs: {}
    },
    errorImage: {
      src: null,
      attrs: {}
    },
    defaultImage: {
      src: null,
      attrs: {}
    },
    loader: {
      html:  '<span class="lazymage-loader">Preloading...</span>'
    }
  };

  this.$get = [function() {
    var exports = {};

    // Merge configurations
    // directive > config > provider
    angular.extend(globalOptions, self.globalOptions);
    exports.globalOptions = globalOptions;

    return exports;
  }];

  return this;
})
.directive('lazymage', ['lazymageRemote', function (lazymageRemote) {
  'use strict';
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      element.addClass('lazymage-container');

      // Override lazymage options if some provided in lazymage-options attribute
      var lazymageOptions = {};
      angular.extend(lazymageOptions, lazymageRemote.globalOptions);

      if(angular.isDefined(attrs.lazymageOptions) && attrs.lazymageOptions) {
        angular.extend(lazymageOptions, scope.$eval(attrs.lazymageOptions));
      }

      // Set default value to timeouts if undefined or null for simpler configuration
      var timeouts = ['defaultImage', 'loader'];
      angular.forEach(timeouts, function(value) {
        if(lazymageOptions[value].removeTimeout === undefined || lazymageOptions[value].removeTimeout === null) {
          lazymageOptions[value].removeTimeout = 0;
        }
      });

      var imageSrc = attrs.lazymage;
      var setImage = function(imageToAppend, attributes) {
        if(attributes === undefined) {
          attributes = {};
        }
        imageToAppend.attr(attributes);

        // Timeout to prevent image to be shown before loaders when removeTimeout = 0
        setTimeout(function() {
          element.append(imageToAppend);
        }, 0);
      };

      var removeLoaders = function() {
        if(defaultImageToAppend) {
          if(lazymageOptions.defaultImage.removeTimeout !== false) {
            setTimeout(function() {
              defaultImageToAppend.remove();
            }, lazymageOptions.defaultImage.removeTimeout);
          }
        }

        if(loaderToAppend) {
          if(lazymageOptions.loader.removeTimeout !== false) {
            setTimeout(function() {
              loaderToAppend.remove();
            }, lazymageOptions.loader.removeTimeout);
          }
        }
      };

      if(lazymageOptions.defaultImage.src || lazymageOptions.loader.html) {
        element.html('');
      }

      if(lazymageOptions.defaultImage.src) {
        var defaultImage = new Image();
        defaultImage.src = lazymageOptions.defaultImage.src;
        var defaultImageToAppend = jQuery(defaultImage);

        setImage(defaultImageToAppend, lazymageOptions.defaultImage.attrs);
      }

      if(lazymageOptions.loader.html) {
        var loaderToAppend = jQuery(lazymageOptions.loader.html);
        element.append(loaderToAppend);
      }

      var image = new Image();

      image.onload = function() {
        element.addClass('lazymage-loaded');
        setImage(jQuery(image), lazymageOptions.currentImage.attrs);
        removeLoaders();
      };

      image.onerror = function() {
        element.addClass('lazymage-error');
        if(lazymageOptions.errorImage.src) {
          image.src = lazymageOptions.errorImage.src;
          setImage(jQuery(image), lazymageOptions.errorImage.attrs);
        }
        removeLoaders();
      };
      image.src = imageSrc;
    }
  };
}]);

