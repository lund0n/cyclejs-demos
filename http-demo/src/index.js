import xs from 'xstream';
import debounce from 'xstream/extra/debounce';
import { run } from '@cycle/xstream-run';
import { div, h1, h2, img, label, input, makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';

const main = ({ DOM, HTTP }) => {
  const searchKey$ = DOM.select('.search').events('input')
    // This step will debounce the request stream, so that it's not so chatty.
    // .compose(debounce(300))
    .map(ev => ev.target.value)
    .startWith('');
  const request$ = searchKey$
    .map(key => ({
      url: `http://localhost:3000/people?name_like=${key}`,
      category: 'search',
    }));

  const response$ = HTTP.select('search').flatten().map(res => res.body);

  const vdom$ = response$
    .map(people =>
      div([
        h1('Search Demo'),
        label([
          'Search:',
          input('.search', { attrs: { type: 'text' } }),
        ]),
        h2('Results'),
        div('.results',
          people.map(person =>
            div('.person', [
              div('.person__name', person.name),
              img('.person__image', {
                attrs: {
                  src: person.avatar,
                  alt: person.name,
                },
              }),
            ]),
          ),
        ),
      ]),
    );
  return {
    DOM: vdom$,
    HTTP: request$,
  };
};

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
};

run(main, drivers);
