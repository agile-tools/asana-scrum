import React from 'react';
import Auth from '../auth/Auth';

class IndexContainer extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="index-container">
          <Auth/>
        </div>
      </div>
    );
  }
}

export default IndexContainer;
