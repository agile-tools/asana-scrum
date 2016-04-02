import React from 'react';
import './ProjectSelection.scss';
import Project from './Project';

class Workspace extends React.Component {

  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  loadProjects() {
    const projects = [];
    this.props.apiClient.projects.findByWorkspace(this.props.workspace.id).then((projectList) => {
      projectList.data.forEach((project) => {
        projects.push(<Project
          key = { project.id }
          project = { project }
          controller = { this.props.controller }
        />);
      });
      this.setState({ projects });
    });
  }

  render() {
    return (
      <div className="workspace">
        id:{this.props.workspace.id}
        <a href="#" onClick={this.loadProjects.bind(this)}> {this.props.workspace.name} </a>
        {this.state.projects}
      </div>
    );
  }
}

Workspace.propTypes = {
  workspace: React.PropTypes.object,
  apiClient: React.PropTypes.object,
  controller: React.PropTypes.object
};

export default Workspace;
