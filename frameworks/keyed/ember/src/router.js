import EmberRouter from '@ember/routing/router';

export default class Router extends EmberRouter {
  location = 'history';
  rootURL = import.meta.env.VITE_NO_JSBF ? '/' : '/frameworks/keyed/ember/';
}

Router.map(function () {
  this.route('index.html');
});
pa
