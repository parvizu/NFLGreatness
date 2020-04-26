import React from 'react';
import ReactDOM from 'react-dom';

import Menu from './Menu';
import Player from './Player';
import Visualization from './Visualization';


export default class NFLGreatness extends React.Component {
	constructor(props) {
		super(props);

		['changeViewMode', 'getTimeSpan','handlePlayerSelect','closeImage','getPlayerList'].map(k=> this[k] = this[k].bind(this));

		const defaultPlayers = ['brady','montana','peyton'];
		this.state = {
			"selected": defaultPlayers,
			"vizMode": 'career',
			"timespan": this.getTimeSpan(defaultPlayers),
			"popup": "hide",
			"img": ""
		}
	}

	changeViewMode(value) {
		this.setState({
			"vizMode": value
		});
	}

	getTimeSpan(selectedPlayers) {
		let start = 2017,
			end = 1,
			years = [],
			ages = [], 
			startAge = 60,
			endAge = 1,
			min, max, 
			careerYears = 0,
			players = [];

		players = this.props.data.filter(p => {
			return selectedPlayers.indexOf(p.nickname) !== -1;
		});

		players.forEach((p,i) => {
			years = Object.keys(p.awards);
			min = Math.min.apply(Math, years);
			max = Math.max.apply(Math, years);
			if (min < start) {
				start = min;
			}

			if (max > end) {
				end = max;
			}

			if (years.length > careerYears) {
				careerYears = years.length;
			}

			if (startAge > p.age.first) {
				startAge = p.age.first;
			}

			if (endAge < p.age.last) {
				endAge = p.age.last;
			}
		});

		return {
			"start": start,
			"end": end,
			"years": careerYears,
			"age": {
				"first": startAge,
				"last": endAge
			}
		};
	}

	handlePlayerSelect(e) {
		const position = this.state.selected.indexOf(e.nickname);
		if (position <0) {
			this.state.selected.unshift(e.nickname);
		} else {
			this.state.selected.splice(position,1);
		}

		const newTimeSpan = this.getTimeSpan(this.state.selected);

		this.setState({
			selected: this.state.selected,
			timespan: newTimeSpan
		});
		
	}

	closeImage() {
		this.setState({
			"popup": "hide"
		});
	}

	getPlayerList() {
		const players = this.props.data.map((player) => {
			const isSelected = this.state.selected.indexOf(player.nickname) !== -1 ? 'selected' : '';
			return (
				<Player key={player.nickname+"-key"} player={player} onPlayerSelect={this.handlePlayerSelect} isSelected={isSelected} />
			)
		});

		return (
			<div id="jerseys">
				{players}
			</div>
		);
	}

	render() {
		const nflLogo = 'img/nfllogo.png',
			instructions = this.state.selected.length !== 0 ? 'hide' : '',
			twitterLink = 'img/twitter-256.png',
			helpIcon = 'img/helpIconWhite.png';

		return (
			<div id='app'>
				<div id="header">
					<div id="updated">
						v1.0 (04/25/2020)
					</div>
					<img src={nflLogo} /> 
					<h1> Comparing Greatness</h1> <a href="http://www.parvizu.com" target="_blank" id="madeby">by Pablo Arvizu</a> <a href="https://twitter.com/arvizualization" target="_blank" id="twitterLink"><img src={twitterLink} /></a>
					<div className="addthis_sharing_toolbox"></div>
				</div>
				<div id="blurb">
						<p>Quarterback is the hardest position to play in all of sports. There's only 32 QB spots available in the entire world. The good ones make their teams better and can deliver wins for them. QBs can carry teams beyond their talent level or be the one weak link in legendary teams. </p>

						<p>The truly great ones are the ones who answer the call when the pressure is at its highest, when the championship is on the line and the game, season, and even, careers depend on what they will do with the ball in their hands. And they deliver.</p>

						<p>Here are the Top 20 Quarterbacks of all time.</p>



				</div>
				{ this.getPlayerList()}
				
				<Menu changeViewMode={this.changeViewMode} selected={this.state.vizMode} />
				<div id="vizLegend">
					<div id="legendSection">
						<div className="legendScale label">
							<h5 className="selectionType">NFL Championship</h5>
						</div>
						<div className="legendScale">
							<h5>&nbsp;</h5>
							<div className="superbowl firstteam">
								<img src="img/nfltrophy.png"/>
							</div>
						</div>
						<div className="legendScale label">
							<h5 className="selectionType">Super Bowls</h5>
						</div>
						<div className="legendScale">
							<h5>&nbsp;</h5>
							<div className="superbowl firstteam"></div>
						</div>
						<div className="legendScale">
							<h5 className="selectionType">Most Valuable Player</h5>
						</div>
						<div className="legendScale">
							<h5>&nbsp;</h5>
							<div className="mvp firstteam"></div>
						</div>

						<div className="legendScale label">
							<h5 className="selectionType">All Pro Team</h5>
						</div>
						<div className="legendScale">
							<h5>1st</h5>
							<div className="allpro firstteam"></div>
						</div>
						<div className="legendScale">
							<h5>2nd</h5>
							<div className="allpro secondteam"></div>
						</div>

						<div className="legendScale ">
							<h5 className="selectionType">Offensive Player of the Year</h5>
						</div>
						<div className="legendScale">
							<h5>&nbsp;</h5>
							<div className="opy firstteam"></div>
						</div>

						<div className="legendScale label">
							<h5 className="selectionType">Pro <br/>Bowls</h5>
						</div>
						<div className="legendScale">
							<h5>&nbsp;</h5>
							<div className="probowl firstteam"></div>
						</div>
					</div>
				</div>
				
				
				<Visualization players={this.state.selected} data={this.props.data} mode={this.state.vizMode} timespan={this.state.timespan} images={this.props.images}/>
				
				<div className={instructions} id="instructions" >
					<h1>To compare, select one or more players by clicking on their jerseys above</h1>
				</div>
				<div className="footer">
					<a href="https://twitter.com/arvizualization" className="twitter-follow-button" data-show-count="false">Follow @arvizualization</a>&nbsp;&nbsp;<span className="vertBar">|</span>&nbsp;&nbsp;
					<a className="footer-link" href="http://www.parvizu.com" target="_blank" >www.parvizu.com</a>&nbsp;&nbsp;<span className="vertBar">|</span>&nbsp;&nbsp;
					<a className="footer-link" href="http://www.morethanjustsports.com" target="_blank" >www.morethanjustsports.com</a> &nbsp;&nbsp;<span className="vertBar">|</span>&nbsp;&nbsp;
					<a>Image Credits: Logos and Jerseys are property of the ©NFL </a>
				</div>
			</div>
		);
	}
}

