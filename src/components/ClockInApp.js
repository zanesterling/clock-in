'use strict';

var React = require('react/addons');

var TaskTable = require('./TaskTable');
var AddTaskInterface = require('./AddTaskInterface');

var MAIN_STYLE = {
	textAlign: 'center',
};

var ClockInApp = React.createClass({
	getInitialState: function() {
		return {
			clockedIn: false,
			currentTask: null,
			tasks: [
				{
					name: 'vision',
					hoursPerWeek: 10,
					hoursThisWeek: 0,
				}
			],
		};
	},

	clockOut: function() {
		this.setState({
			clockedIn: false,
			currentTask: null,
		});
	},

	clockIn: function(taskName) {
		this.setState({
			clockedIn: true,
			currentTask: taskName,
		});
	},

	addTask: function(taskName, taskHours) {
		if (taskName in this.state.tasks) {
			console.log('task', taskName, 'already being tracked');
			return;
		}

		var tasks = JSON.parse(JSON.stringify(this.state.tasks));
		tasks.push({
			name: taskName,
			hoursPerWeek: taskHours,
			hoursThisWeek: 0,
		});

		console.log(tasks);
		this.setState({ tasks: tasks });
	},

	render: function() {
		var clockedInButton = this.state.clockedIn ?
			<button onClick={this.clockOut}>Clock out</button> :
			null;

		return (
			<div style={MAIN_STYLE} className='main'>
				<TaskTable
					tasks={this.state.tasks}
					clockedIn={this.state.clockedIn}
					clockInFunc={this.clockIn}
				/>
				<br />
				{clockedInButton}
				<AddTaskInterface addTask={this.addTask} />
			</div>
		);
	}
});

module.exports = ClockInApp;
