import React from 'react';
import { render } from 'react-dom';
import Header from '../partials/Header';
import IndexContainer from './IndexContainer';
import Footer from '../partials/Footer';
import './index.scss';
import Auth from '../auth/Auth';

class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Auth/>
        <IndexContainer />
        <Footer year="2016" brand="asana scrum" />
      </div>
    );
  }
}

render(<IndexPage />, document.getElementById('root'));
