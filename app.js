const React = require('react');
const ReactDom = require('react-dom');

console.log("Got the script");

// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('example')
// );
const App = () => (
  <div>
    React Init
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
