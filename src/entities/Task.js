import React from 'react';
import './ProjectSelection.scss';

class Task extends React.Component {

  render() {
    return (
      <div className="Task">
        ID: {this.props.task.id}<br/>
        name: {this.props.task.name}<br/>
        external: {this.props.task.external ? this.props.task.external.data : ''}<br/>
      </div>
    );
  }
}

Task.propTypes = {
  task: React.PropTypes.object,
  apiClient: React.PropTypes.object,
  controller: React.PropTypes.object
};

export default Task;
