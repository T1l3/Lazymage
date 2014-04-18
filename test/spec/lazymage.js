'use strict';

describe('Directive: lazymage', function() {
  var image = 'http://upload.wikimedia.org/wikipedia/en/4/40/Octocat%2C_a_Mascot_of_Github.jpg';
  var timeout = 2000;
  var options = {
    defaultImage: {
      src: 'http://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/695px-AngularJS_logo.svg.png'
    },
    errorImage: {
      src: 'http://upload.wikimedia.org/wikipedia/commons/c/ca/Crystal_error.png',
    },
    loader: '<span>My custom preloader</span>'
  };

  beforeEach(module('lazymage'));

  var $compile;
  var $scope;
  var template;
  var compileTemplate = function(image) {
    $scope.lazymageOptions = options;
    var element = angular.element('<div lazymage="' + image + '" lazymage-options="{{lazymageOptions}}"></div>');
    return $compile(element)($scope);
  };

  // Angular strips the underscores when injecting
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
  }));

  it('should display a default image during image loading', function() {
    template = compileTemplate(image);
    expect(template.html()).toMatch('<img src="' + options.defaultImage.src + '">');
  });

  it('should display a loader during image loading', function() {
    template = compileTemplate(image);
    expect(template.html()).toMatch(options.loader);
  });

  it('should display the real image when load is complete', function(done) {
    template = compileTemplate(image);
    setTimeout(function() {
      expect(template.html()).toMatch('<img src="' + image + '">');
      done();
    }, timeout);
  });

  it('should display a default error image if image load fail', function(done) {
    template = compileTemplate('foo/bar.jpg');
    setTimeout(function() {
      expect(template.html()).toMatch('<img src="' + options.errorImage.src + '">');
      done();
    }, timeout);
  });

});