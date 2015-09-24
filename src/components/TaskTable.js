'use strict';

var React = require('react/addons');

var TaskTableHeader = require('./TaskTableHeader');
var TaskTableRow = require('./TaskTableRow');

var TABLE_STYLE = {
	display: 'inline-table',
	border: 'black solid 1px',
	borderCollapse: 'collapse',
};

var TaskTable = React.createClass({
	propTypes: {
		tasks: React.PropTypes.array.isRequired,
		clockedIn: React.PropTypes.bool.isRequired,
		clockInFunc: React.PropTypes.func.isRequired,
	},

	render: function() {
		return (
			<table style={TABLE_STYLE}>
				<TaskTableHeader
					clockedIn={this.props.clockedIn}
				/>

				{this.props.tasks.map(
					task => <TaskTableRow
						key={task.name}
						task={task}
						clockedIn={this.props.clockedIn}
						clockInFunc={this.props.clockInFunc}
					/>
				)}
			</table>
		);
	}
});

module.exports = TaskTable;
