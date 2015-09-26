'use strict';

var React = require('react/addons');
var Duration = require('duration-js');

var ClockedInDisplay = React.createClass({
	propTypes: {
		currentTask: React.PropTypes.string.isRequired,
		clockOut: React.PropTypes.func.isRequired,
		lastClockedIn: React.PropTypes.object.isRequired,
	},

	render: function() {
		var msDiff = new Date() - this.props.lastClockedIn;
		var timeClockedIn = new Duration(msDiff - msDiff % 1000);

		return (
			<div>
				<h2>{this.props.currentTask}</h2>
				<h4>{timeClockedIn.toString()}</h4>
				<button onClick={this.props.clockOut}>Clock out</button>
			</div>
		);
	}
});

module.exports = ClockedInDisplay;
