import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  activate() {
    this.debug('Hello from the application index.');
  }
});
