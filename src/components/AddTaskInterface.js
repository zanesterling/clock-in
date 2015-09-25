'use strict';

var React = require('react/addons');

var AddTaskInterface = React.createClass({
	propTypes: {
		addTask: React.PropTypes.func.isRequired,
	},

	getInitialState: function() {
		return {
			newTaskName: '',
			newTaskHours: 0,
		};
	},

	changeTaskName: function(event) {
		this.setState({ newTaskName: event.target.value });
	},

	changeTaskHours: function(event) {
		this.setState({ newTaskHours: event.target.value });
	},

	addTask: function() {
		console.log(this.state);
		this.props.addTask(
			this.state.newTaskName,
			this.state.newTaskHours
		);
	},

	render: function() {
		return (
			<div className='task-interface'>
				<input
					type='text'
					placeholder='new task name'
					onChange={this.changeTaskName}
				/>
				<br />

				<input
					type='number'
					placeholder='hours per week'
					onChange={this.changeTaskHours}
				/>
				<br />

				<button onClick={this.addTask}>add task</button>
			</div>
		);
	}
});

module.exports = AddTaskInterface;
