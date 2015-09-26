'use strict';

var React = require('react/addons');

var TaskTableHeader = React.createClass({
	propTypes: {
		clockedIn: React.PropTypes.bool.isRequired,
	},

	render: function() {
		var style = {
			border: 'black solid 1px',
			padding: '5px',
		};

		var clockInHeader = !this.props.clockedIn ?
			<th style={style}>Clock in</th> :
			null;

		return (
			<tr>
				<th style={style}>Task</th>
				<th style={style}>Worked</th>
				<th style={style}>Goal</th>
				{clockInHeader}
			</tr>
		);
	}
});

module.exports = TaskTableHeader;
