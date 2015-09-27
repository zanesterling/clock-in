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
			tasks: [],
		};
	},

	componentDidMount() {
		if (document.cookie) {
			this.loadStateFromCookie();
		} else {
			this.reset();
		}

		setInterval(function() {
			this.forceUpdate();
		}.bind(this), 30);
	},

	saveStateToCookie: function() {
		document.cookie = JSON.stringify(this.state.tasks);
	},

	loadStateFromCookie: function() {
		this.setState({ tasks: JSON.parse(document.cookie) });
	},

	reset: function() {
		this.setState({
			tasks: this.state.tasks.map(task => {
				task.timeThisWeek = 0;
				return task;
			})
		}, this.saveStateToCookie);
	},

	clockOut: function() {
		var timeClocked = new Date() - this.state.lastClockedIn;

		var tasks = JSON.parse(JSON.stringify(this.state.tasks));
		for (var task of tasks) {
			if (task.name === this.state.currentTask) {
				task.timeThisWeek += timeClocked;
			}
		}

		this.setState({
			clockedIn: false,
			currentTask: null,
			tasks: tasks,
		}, this.saveStateToCookie);
	},

	clockIn: function(taskName) {
		this.setState({
			clockedIn: true,
			lastClockedIn: new Date(),
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
			timeThisWeek: 0,
		});

		this.setState({ tasks: tasks }, this.saveStateToCookie);
	},

	render: function() {
		var clockedInDisplay = null;
		if (this.state.clockedIn) {
			clockedInDisplay = <ClockedInDisplay
				currentTask={this.state.currentTask}
				clockOut={this.clockOut}
				lastClockedIn={this.state.lastClockedIn}
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
				<br /><br />

				<AddTaskInterface addTask={this.addTask} />
				<br /><br />

				<button onClick={this.reset}>Reset</button>
			</div>
		);
	}
});

module.exports = ClockInApp;
