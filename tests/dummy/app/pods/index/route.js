import Route from '@ember/routing/route';

export default Route.extend({
  activate() {
    this.debug('Hello from the application index.');
  }
});
