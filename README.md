# Lazymage

> Angular directive to show a default image/loader while an image is loading. You can also add a default image if an error occured.

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
<div lazymage="{{item.image}}" class="image-wrapper"></div>
```

or

```html
<div lazymage="http://example.com/image.jpg" class="image-wrapper"></div>
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
    currentImage:{
      attrs:{
        class: 'img-responsive',
        custom_property: 'value'
      }
    },
    defaultImage: {
      src: 'path/to/image',
      attrs:{}
    },
    errorImage: {
      src: null,
      attrs:{}
    },
    loader: '<span>Loading...</span>'
};
```
You can also use the `lazymage-options` attribute on the same element with the `lazymage` directive.

In your controller:

```javascript
$scope.lazymageOptions = {
  loader: '<span>This loader overrides others</span>'
};
```

In your view:

```html
<div lazymage="{{item.image}}" lazymage-options="lazymageOptions"></div>
```

## Todos

  - Add more controls on default image/loader (classes for css transition)
  - Remove jQuery dependency

## Author

Thibault PIERRE - [@T1l3][1]
[http://thibaultpierre.com][2]


  [1]: http://twitter.com/T1l3
  [2]: http://thibaultpierre.com