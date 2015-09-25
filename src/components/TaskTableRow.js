'use strict';

var React = require('react/addons');

var CELL_STYLE = {
	border: 'black solid 1px',
	padding: '5px',
};

var TaskTableRow = React.createClass({
	propTypes: {
		task: React.PropTypes.object.isRequired,
		clockInFunc: React.PropTypes.func.isRequired,
	},

	render: function() {
		var task = this.props.task;
		var hoursThisWeek = task.hoursThisWeek;

		var clockInButton = (
			<button
				onClick={() => this.props.clockInFunc(task.name)}>
				Clock in
			</button>
		);

		var clockInCell = !this.props.clockedIn ?
			<td
				style={CELL_STYLE}>
				{clockInButton}
			</td> :
			null;

		return (
			<tr>
				<td
					style={CELL_STYLE}>
					{task.name}
				</td>
				<td
					style={CELL_STYLE}>
					{hoursThisWeek.toFixed(2) + '/' + task.hoursPerWeek}
				</td>
				{clockInCell}
			</tr>
		);
	}
});

module.exports = TaskTableRow;
