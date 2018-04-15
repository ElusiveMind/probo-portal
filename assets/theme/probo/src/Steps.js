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
      buildID: props.buildID,
      steps: []
    };
    this.tick();
  }

  tick() {
    this.serverRequest = $.get('./json/status.json?nocache=' + (new Date()).getTime(), function(result) {
      var buildID = this.state.buildID;
      result.builds.map(function(item, index) {
        if (item.buildID === buildID) {
          this.setState({
            steps: item.steps
          });
        }
        return item;
      }.bind(this));
    }.bind(this));
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 5000);
  }

  render() {
    var steps = this.state.steps.map(function(item, index) {
      return (      
        <Step 
          key = { index }
          statusIcon = { item.statusIcon }
          statusColor = { item.statusColor }
        />
      );
    });

    return (
      <div className="right">
        { steps }
        <div className="clear"></div>
        <button className="button button--success disabled button-sm">View Build</button>
        <button className="button button--success button-sm">Build Details</button>
      </div>
    );
  }
}

export default Steps;
