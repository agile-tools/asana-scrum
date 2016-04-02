import React from 'react';
import './ProjectSelection.scss';
import Workspace from './Workspace';

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
      const workspaces = this.state.workspaces;
      workspaceList.data.forEach((workspace) => {
        workspaces.push(<Workspace
          key = { workspace.id }
          id = { workspace.id }
          name = { workspace.name }
          apiClient = { this.props.apiClient }
        />);
      });
      this.setState({ workspaces });
    });
  }

  render() {
    return (
      <div className="project-selection">
        Workspaces
        {this.state.workspaces}
      </div>
    );
  }
}

ProjectSelection.propTypes = {
  apiClient: React.PropTypes.object
};

export default ProjectSelection;
