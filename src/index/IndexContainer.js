import React from 'react';
import Auth from '../auth/Auth';
import ProjectSelection from '../entities/ProjectSelection';
import TaskList from '../entities/TaskList';

class IndexContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      apiClient: null,
      project: null
    };
  }

  onAuthenticated(apiClient) {
    this.setState({
      apiClient
    });
  }

  onProjectChanged(project) {
    this.setState({
      project
    });
  }

  render() {
    return (
      <div className="container">
        <div className="index-container">
          <Auth onAuthenticated = {this.onAuthenticated.bind(this)} />
          <ProjectSelection apiClient={this.state.apiClient} controller={this} />
          <TaskList apiClient={this.state.apiClient} controller={this} project={this.state.project} />
        </div>
      </div>
    );
  }
}

export default IndexContainer;
