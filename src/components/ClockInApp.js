'use strict';

var React = require('react/addons');

var TaskTable = require('./TaskTable');
var AddTaskInterface = require('./AddTaskInterface');
var ClockedInDisplay = require('./ClockedInDisplay');

var MAIN_STYLE = {
	textAlign: 'center',
};

var ClockInApp = React.createClass({
	getInitialState: function() {
		return {
			clockedIn: false,
			lastClockedIn: null,
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
		var timeClocked = new Date().getTime() - this.state.lastClockedIn;
		var hoursClocked = timeClocked / (3600 * 1000);

		var tasks = JSON.parse(JSON.stringify(this.state.tasks));
		for (var task of tasks) {
			if (task.name === this.state.currentTask) {
				task.hoursThisWeek += hoursClocked;
				console.log(task.name);
			}
		}

		this.setState({
			clockedIn: false,
			currentTask: null,
			tasks: tasks,
		});
	},

	clockIn: function(taskName) {
		this.setState({
			clockedIn: true,
			lastClockedIn: new Date().getTime(),
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
		var clockedInDisplay = null;
		if (this.state.clockedIn) {
			clockedInDisplay = <ClockedInDisplay
				currentTask={this.state.currentTask}
				clockOut={this.clockOut}
			/>;
		}

		return (
			<div style={MAIN_STYLE} className='main'>
				{clockedInDisplay}
				<br />
				<TaskTable
					tasks={this.state.tasks}
					clockedIn={this.state.clockedIn}
					clockInFunc={this.clockIn}
				/>
				<br />
				<AddTaskInterface addTask={this.addTask} />
			</div>
		);
	}
});

module.exports = ClockInApp;
