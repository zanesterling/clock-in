'use strict';

var React = require('react/addons');

var ClockedInDisplay = React.createClass({
	propTypes: {
		currentTask: React.PropTypes.string.isRequired,
		clockOut: React.PropTypes.func.isRequired,
	},

	render: function() {
		return (
			<div>
				<h2>{this.props.currentTask}</h2>
				<button onClick={this.props.clockOut}>Clock out</button>
			</div>
		);
	}
});

module.exports = ClockedInDisplay;
