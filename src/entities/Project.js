import React from 'react';
import './ProjectSelection.scss';

class Project extends React.Component {

  loadTasks(project) {
    this.props.controller.onProjectChanged(project);
  }

  render() {
    return (
      <div className="project">
        ID: {this.props.project.id}<br/>
        Name: <a href="#" onClick={this.loadTasks.bind(this, this.props.project)}> {this.props.project.name} </a>
      </div>
    );
  }
}

Project.propTypes = {
  project: React.PropTypes.object,
  apiClient: React.PropTypes.object,
  controller: React.PropTypes.object
};

export default Project;
