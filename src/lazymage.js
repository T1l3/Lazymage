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
      attrs: {},
      removeTimeout: 0
    },
    loader: {
      html:  '<span class="lazymage-loader">Preloading...</span>',
      removeTimeout: 0
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
          if(!(lazymageOptions.defaultImage.removeTimeout === undefined || lazymageOptions.defaultImage.removeTimeout === null)) {
            setTimeout(function(){
              defaultImageToAppend.remove();
            }, lazymageOptions.defaultImage.removeTimeout);
          }
        }

        if(loaderToAppend) {
          if(!(lazymageOptions.loader.removeTimeout === undefined || lazymageOptions.loader.removeTimeout === null)) {
            setTimeout(function(){
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

