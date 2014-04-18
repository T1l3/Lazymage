/* global Image, jQuery */

angular.module('lazymage', []);

angular.module('lazymage')
.provider('lazymageRemote', function LazymageRemoteProvider() {
  'use strict';
  var self = this;
  this.globalOptions = {};
  var globalOptions = {
    currentImage: {},
    defaultImage: {},
    errorImage: {},
    loader: '<span class="lazymage-loader">Preloading...</span>'
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
      // override lazymage options if some provided in lazymage-options attribute
      if(angular.isDefined(attrs.lazymageOptions) && attrs.lazymageOptions) {
        angular.extend(lazymageRemote.globalOptions, scope.$eval(attrs.lazymageOptions));
      }
      var opts = lazymageRemote.globalOptions;
      var imageSrc = attrs.lazymage;
      var setImage = function(imageToAppend, attributes) {
        if(attributes === undefined) {
          attributes = {};
        }
        imageToAppend.attr(attributes);
        element.append(imageToAppend);
      };
      var removeLoaders = function() {
        if(defaultImageToAppend) {
          defaultImageToAppend.remove();
        }

        if(loader) {
          loader.remove();
        }
      };

      if(opts.defaultImage.src || opts.loader) {
        element.html('');
      }

      if(opts.defaultImage.src) {
        var defaultImage = new Image();
        defaultImage.src = opts.defaultImage.src;
        var defaultImageToAppend = jQuery(defaultImage);

        setImage(defaultImageToAppend, opts.defaultImage.attrs);
      }

      if(opts.loader) {
        var loader = jQuery(opts.loader);
        element.append(loader);
      }

      var image = new Image();

      image.onload = function() {
        setImage(jQuery(image), opts.currentImage.attrs);
        removeLoaders();
      };

      image.onerror = function() {
        if(opts.errorImage.src) {
          image.src = opts.errorImage.src;
          setImage(jQuery(image), opts.errorImage.attrs);
        }
        removeLoaders();
      };
      image.src = imageSrc;
    }
  };
}]);

