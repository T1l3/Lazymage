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
      var lazymageOptions = {};
      angular.extend(lazymageOptions, lazymageRemote.globalOptions);

      if(angular.isDefined(attrs.lazymageOptions) && attrs.lazymageOptions) {
        angular.extend(lazymageOptions, scope.$eval(attrs.lazymageOptions));
      }

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

      if(lazymageOptions.defaultImage.src || lazymageOptions.loader) {
        element.html('');
      }

      if(lazymageOptions.defaultImage.src) {
        var defaultImage = new Image();
        defaultImage.src = lazymageOptions.defaultImage.src;
        var defaultImageToAppend = jQuery(defaultImage);

        setImage(defaultImageToAppend, lazymageOptions.defaultImage.attrs);
      }

      if(lazymageOptions.loader) {
        var loader = jQuery(lazymageOptions.loader);
        element.append(loader);
      }

      var image = new Image();

      image.onload = function() {
        setImage(jQuery(image), lazymageOptions.currentImage.attrs);
        removeLoaders();
      };

      image.onerror = function() {
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

