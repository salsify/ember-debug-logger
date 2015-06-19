module.exports = {
  description: 'ember-debug-logger dependency setup',

  // TODO: ??
  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addBowerPackageToProject('visionmedia-debug', '2.2');
  }
};
