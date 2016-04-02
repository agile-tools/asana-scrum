import React from 'react';
import Auth from '../auth/Auth';
import ProjectSelection from '../entities/ProjectSelection';

class IndexContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      apiClient: null
    };
  }

  onAuthenticated(apiClient) {
    this.setState({
      apiClient
    });
  }

  render() {
    return (
      <div className="container">
        <div className="index-container">
          <Auth onAuthenticated = {this.onAuthenticated.bind(this)} />
          <ProjectSelection apiClient={this.state.apiClient} />
        </div>
      </div>
    );
  }
}

export default IndexContainer;
