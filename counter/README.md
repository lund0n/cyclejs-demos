## counter

Example of interacting with the UI using DOM driver, and alternatively other sources.

### Usage

```
npm install
npm start    # Builds the demo and hosts it on port 3000.
npm test     # Executes the tests.
```

### Things to Try

1. Execute the test. The test leverages the [XStream](http://staltz.com/xstream/) `fromDiagram()` factory to generate clicks from marble diagrams, as well as Tylor Steinberger's [snabbdom-selector](https://www.npmjs.com/package/snabbdom-selector) library to select pieces of virtual DOM.
2. Add additional sources. For instance when a user hits the left arrow, the counter should decrement, and when the user hits the right arrow, the counter should increment. There is an example of how to do this in the code comments using Raquel Moss' excellent [cycle-keys](https://www.npmjs.com/package/cycle-keys) driver.
 
