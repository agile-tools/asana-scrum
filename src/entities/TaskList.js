import React from 'react';
import './ProjectSelection.scss';
import Task from './Task';
import Loader from '../helpers/Loader';

class TaskList extends React.Component {

  constructor() {
    super();
    this.state = {
      tasks: [],
      loading: false
    };
  }

  componentWillReceiveProps(props) {
    if (props.apiClient && props.project) {
      this.loadTasks(props.apiClient, props.project);
    }
  }

  loadTasks(apiClient, project) {
    this.setState({
      loading: true
    });
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
      this.setState({
        tasks,
        loading: false
      });
    });
  }


  render() {
    return (
      <div className="project-task-list">
        <strong> Tasks </strong>
        { this.state.loading ? <Loader/> :
          <div>
          { this.state.tasks.length > 0 ?
            this.state.tasks :
            'No tasks found'
          }
          </div>
        }
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
