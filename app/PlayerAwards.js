import React from 'react';

export default class PlayerAwards extends React.Component {
	render() {
		var trophy = 'img/nfltrophy.png';
		return (

			<div className="playerAwards">
				<div className="titles">
					<img src={trophy} />
					<h2>{this.props.championships}</h2><span>Super Bowl Titles</span>
				</div>
				<div className="selections">
					<div className="mvp"><h2>{this.props.totals.MVP}</h2><span>MVP</span></div>
					<div className="opy"><h2>{this.props.totals.OP}</h2><span>Offensive Player of the Year</span></div>
					<div className="allpro"><h2>{this.props.totals.AP}</h2><span>All Pro</span></div>
					<div className="probowl"><h2>{this.props.totals.PB}</h2><span>Pro Bowl</span></div>
				</div>
			</div>
		)
	}
}