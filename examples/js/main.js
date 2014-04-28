angular.module('myApp', ['lazymage'])
.config(function(lazymageRemoteProvider) {
    lazymageRemoteProvider.globalOptions = {
      currentImage: {
        attrs: {
          class: 'img-responsive fadein'
        }
      },
      errorImage: {
        src: 'img/error.jpg',
        attrs:{
          class: 'img-responsive'
        }
      },
      defaultImage: {
        src: 'img/loading.jpg',
        attrs: {
          class: 'img-responsive default-img'
        },
        removeTimeout: false
      },
      loader: false
    };
  })
.controller('myCtrl', function myCtrl($scope) {
  $scope.options = {
    defaultImage: false,
    loader: {
      html: '<div class="loader"></div>'
    }
  };

  // Images from wallbase.cc
  $scope.images = [
    'http://i.imgur.com/B3E2nkP.jpg',
    'http://i.imgur.com/YBkNRs1.jpg',
    'http://i.imgur.com/hBhOWDL.jpg',
    'http://i.imgur.com/2vFmPpE.jpg',
    'http://i.imgur.com/zfu31ZO.jpg'
  ];
});