import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { div, h1, input, label, makeDOMDriver } from '@cycle/dom';

const main = ({ DOM }) => {
  const name$ = DOM.select('.name').events('input')
    .map(ev => ev.target.value)
    .startWith('');

  const vdom$ = name$
    .map(name =>
      div([
        label('Name:'),
        input('.name', { attrs: { type: 'text' } }),
        h1(`Hello, ${name}`),
      ]),
    );
  return {
    DOM: vdom$,
  };
};

const drivers = {
  DOM: makeDOMDriver('#app'),
};

run(main, drivers);
