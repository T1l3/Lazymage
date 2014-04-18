'use strict';

describe('Service: lazymageRemote', function() {

  var lazymageRemote;

  beforeEach(module('lazymage'));

  beforeEach(inject(function($injector) {
    lazymageRemote = $injector.get('lazymageRemote');
  }));

  it('should have a global options attribute', function() {
    expect(lazymageRemote.globalOptions).toBeDefined();
  });

});