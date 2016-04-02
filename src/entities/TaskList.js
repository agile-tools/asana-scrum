import React from 'react';
import './ProjectSelection.scss';
import Task from './Task';

class TaskList extends React.Component {

  constructor() {
    super();
    this.state = {
      tasks: []
    };
  }

  componentWillReceiveProps(props) {
    if (props.apiClient) {
      this.loadTasks(props.apiClient, props.project);
    }
  }

  loadTasks(apiClient, project) {
    apiClient.tasks.findAll({ 'project': project.id, 'opt_fields': 'id,name,external' }).then((taskList) => {
      const tasks = [];
      taskList.data.forEach((task) => {
        tasks.push(<Task
          key = { task.id }
          task = { task }
          apiClient = { this.props.apiClient }
          controller = { this.props.controller }
        />);
      });
      this.setState({ tasks });
    });
  }


  render() {
    return (
      <div className="project-task-list">
        {this.state.tasks}
      </div>
    );
  }
}

TaskList.propTypes = {
  project: React.PropTypes.object,
  apiClient: React.PropTypes.object,
  controller: React.PropTypes.object
};

export default TaskList;
