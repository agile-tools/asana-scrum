import React from 'react';
import './ProjectSelection.scss';
import Project from './Project';
import Loader from '../helpers/Loader';

class Workspace extends React.Component {

  constructor() {
    super();
    this.state = {
      projects: [],
      loading: false
    };
  }

  loadProjects() {
    this.setState({
      loading: true
    });
    const projects = [];
    this.props.apiClient.projects.findByWorkspace(this.props.workspace.id).then((projectList) => {
      projectList.data.forEach((project) => {
        projects.push(<Project
          key = { project.id }
          project = { project }
          controller = { this.props.controller }
        />);
      });
      this.setState({
        projects,
        loading: false
      });
    });
  }

  render() {
    return (
      <div className="workspace">
        <a href="#" onClick={this.loadProjects.bind(this)}> {this.props.workspace.name} </a>
        { this.state.loading ? <Loader/ > : null }
        <ul>{ this.state.projects }</ul>
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
