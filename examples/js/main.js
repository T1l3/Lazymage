angular.module('myApp', ['lazymage'])
.config(function(lazymageRemoteProvider) {
    lazymageRemoteProvider.globalOptions = {
      currentImage: {
        attrs: {
          class: 'img-responsive'
        }
      },
      errorImage: {
        src: 'img/error.jpg'
      },
      defaultImage: {
        src: 'img/loading.jpg',
        attrs:{
          class: 'img-responsive'
        }
      },
      loader: false
    };
  })
.controller('myCtrl', function myCtrl($scope) {
  $scope.options = {
    defaultImage: false,
    loader: {
      html: '<span class="loader"></span>'
    }
  };

  // Images from wallbase.cc
  $scope.images = [
    'http://i.imgur.com/i5xjTTb.jpg',
    'http://i.imgur.com/vcIWxsL.jpg',
    'http://i.imgur.com/P0OPc2C.jpg',
    'http://i.imgur.com/zFDyPOO.jpg',
    'http://i.imgur.com/GCY2ENZ.jpg',
    'http://i.imgur.com/CkGkmc0.jpg',
    'http://i.imgur.com/H3bPge9.jpg'
  ];
});