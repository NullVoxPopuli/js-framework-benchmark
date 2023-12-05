import { renderComponent } from '@glimmer/core';

import App from './App.ts';

export default async function run() {
  const app = document.getElementById('app');
  await renderComponent(App, {
    element: app,
    owner: {},
  });
}
