import React from 'react';
import './ProjectSelection.scss';
import Workspace from './Workspace';
import Loader from '../helpers/Loader';

class ProjectSelection extends React.Component {

  constructor() {
    super();
    this.state = {
      workspaces: []
    };
  }

  componentWillReceiveProps(props) {
    if (props.apiClient) {
      this.loadWorkspaces(props.apiClient);
    }
  }

  loadWorkspaces(apiClient) {
    apiClient.workspaces.findAll().then((workspaceList) => {
      const workspaces = [];
      workspaceList.data.forEach((workspace) => {
        workspaces.push(<Workspace
          key = { workspace.id }
          workspace = { workspace }
          apiClient = { this.props.apiClient }
          controller = { this.props.controller }
        />);
      });
      this.setState({ workspaces });
    });
  }

  render() {
    return (
      <div className="project-selection">
        <strong>Workspaces</strong>
        { this.state.workspaces.length === 0 ? <Loader /> : this.state.workspaces }
      </div>
    );
  }
}

ProjectSelection.propTypes = {
  apiClient: React.PropTypes.object,
  controller: React.PropTypes.object
};

export default ProjectSelection;
