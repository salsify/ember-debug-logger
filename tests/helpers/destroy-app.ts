import { run } from '@ember/runloop';
import Application from '@ember/application';

export default function destroyApp(application: Application) {
  run(application, 'destroy');
}
