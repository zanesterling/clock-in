'use strict';

var React = require('react/addons');

var ClockedInDisplay = React.createClass({
	propTypes: {
		currentTask: React.PropTypes.string.isRequired,
		clockOut: React.PropTypes.func.isRequired,
		lastClockedIn: React.PropTypes.number.isRequired,
	},

	render: function() {
		var timeClockedIn = (new Date().getTime() -
			this.props.lastClockedIn) / 3600 / 1000;

		return (
			<div>
				<h2>{this.props.currentTask}</h2>
				<h4>{timeClockedIn.toFixed(4)}</h4>
				<button onClick={this.props.clockOut}>Clock out</button>
			</div>
		);
	}
});

module.exports = ClockedInDisplay;
