/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbagnall17
 */

import React, { Component } from 'react';
import Step from './Step';
import $ from "jquery";

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: props.steps,
      buildID: props.buildID,
      token: 'SailAway77'
    };
  }

  tick() {
    this.serverRequest = $.get('https://www.proofroom.net/probo-api/specific-build-status/' + this.state.buildID+ '/' + this.state.token, function(result) {
      this.setState({
        steps: result.steps
      });
    }.bind(this));
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  render() {
    var steps = this.state.steps;
    var stepsDisplay = steps.map(function(item, index) {
      return (      
        <Step 
          key = { index }
          statusIcon = { item.statusIcon }
          statusColor = { item.statusColor }
          statusTask = { item.statusTask }
        />
      );
    });

    return (
      <div className="right">
        { stepsDisplay }
        <div className="clear"></div>
        <button className="button button--success disabled button-sm">View Build</button>
        <button className="button button--success button-sm">Build Details</button>
      </div>
    );
  }
}

export default Steps;
