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
    const projects = this.state.projects;
    this.props.apiClient.projects.findByWorkspace(this.props.id).then((projectList) => {
      projectList.data.forEach((project) => {
        projects.push(<Project
          key = { project.id }
          id = { project.id }
          name = { project.name }
        />);
      });
      this.setState({ projects });
    });
  }

  render() {
    return (
      <div className="workspace">
        <a href="#" onClick={this.loadProjects.bind(this)}> {this.props.name} </a>
        {this.state.projects}
      </div>
    );
  }
}

Workspace.propTypes = {
  id: React.PropTypes.number,
  name: React.PropTypes.string,
  apiClient: React.PropTypes.object
};

export default Workspace;
