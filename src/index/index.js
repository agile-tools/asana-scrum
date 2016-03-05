import React from 'react';
import { render } from 'react-dom';
import Header from '../partials/Header';
import IndexContainer from './IndexContainer';
import Footer from '../partials/Footer';
import './index.scss';

class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <IndexContainer />
        <Footer year="2016" brand="asana scrum" />
      </div>
    );
  }
}

render(<IndexPage />, document.getElementById('root'));
