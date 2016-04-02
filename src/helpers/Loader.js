import React from 'react';
import './loader.scss';

class Loader extends React.Component {
  render() {
    return (
      <div className="loading-indicator-blue">
        <div className="loadingIndicator">
          <div className="loadingIndicator-rotator">
            <div className="loadingIndicator-dot">
            </div>
          </div>
          <div className="loader-text">Loading...</div>
        </div>
      </div>
    );
  }
}

export default Loader;
