# Lazymage

[![Build Status](https://travis-ci.org/T1l3/Lazymage.svg?branch=master)](https://travis-ci.org/T1l3/Lazymage)

> Angular directive to show a default image/loader while an image is loading. You can also add a default image if an error occured.

You can fin a demo here: [http://codepen.io/T1l3/full/gapHw](http://codepen.io/T1l3/full/gapHw)

## Installation

Include the script:

`<script src="path/to/script/lazymage/dist/lazymage.min.js"></script>`

## Directives Usage

This package provides a `lazymage` module which you'll need to add as a dependency to your app, i.e.

```javascript
angular.module('myApp', ['lazymage']);
```

### Lazymage

```html
<div lazymage="{{item.image}}"></div>
```

or

```html
<div lazymage="http://example.com/image.jpg"></div>
```

#### Options

You can pass initialization parameters to the `Lazymage` constructor:

```javascript
angular.module('myApp', ['lazymage'])
  .config(function(lazymageRemoteProvider) {
    lazymageRemoteProvider.globalOptions.loader = false;
    // or
    lazymageRemoteProvider.globalOptions = {
      loader: false,
      // ... others options
    }
  })
```

 An example of full configuration:

```javascript
lazymageRemoteProvider.globalOptions =  {
    currentImage: {
      attrs: {
        class: 'img-responsive',
        custom_property: 'value'
      }
    },
    errorImage: {
      src: null,
      attrs: {}
    },
    defaultImage: {
      src: 'path/to/image',
      attrs: {},
      removeTimeout: 0
    },
    loader: {
      html: '<span>Loading...</span>',
      removeTimeout: 0
    }
};
```

You can also use the `lazymage-options` attribute on the same element with the `lazymage` directive.

In your controller:

```javascript
$scope.lazymageOptions = {
  loader: {
    html: '<span>This loader overrides others</span>',
    removeTimeout: 0
  }
};
```

In your view:

```html
<div lazymage="{{item.image}}" lazymage-options="lazymageOptions"></div>
```

## Author

Thibault PIERRE - [@T1l3][1] [http://thibaultpierre.com][2]

License MIT.


  [1]: http://twitter.com/T1l3
  [2]: http://thibaultpierre.com
