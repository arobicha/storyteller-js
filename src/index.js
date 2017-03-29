import React from 'react';
import ReactDOM from 'react-dom';
import StoryEditor from './App/App';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/draft-js/dist/Draft.css';

ReactDOM.render(
  <StoryEditor />,
  document.getElementById('container')
);
