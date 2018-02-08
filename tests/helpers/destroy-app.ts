import Application from '@ember/application';
import { run } from '@ember/runloop';

export default function destroyApp(application: Application) {
  run(application, 'destroy');
}
