import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { makeDOMDriver } from '@cycle/dom';
import { makeKeysDriver } from 'cycle-keys';
import app from './app';

const drivers = {
  DOM: makeDOMDriver('#app'),
  Keys: makeKeysDriver(),
  Time: () => xs.periodic(1000),
};

run(app, drivers);
