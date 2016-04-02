import React from 'react';
import './ProjectSelection.scss';

class Project extends React.Component {

  loadTasks() {
  }

  render() {
    return (
      <div className="project">
        ID: {this.props.id}<br/>
        Name: <a href="#" onClick={this.loadTasks.bind(this)}> {this.props.name} </a>
      </div>
    );
  }
}

Project.propTypes = {
  id: React.PropTypes.number,
  name: React.PropTypes.string,
  apiClient: React.PropTypes.object
};

export default Project;
