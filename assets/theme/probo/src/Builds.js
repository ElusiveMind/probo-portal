/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbagnall17
 */

import React, { Component } from 'react';
import Steps from './Steps';

class Builds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: props.steps,
      buildID: props.buildID,
      pullRequestName: props.pullRequestName,
      URL: props.URL,
      pullRequestURL: props.pullRequestURL
    };
    console.log(this.state);
  }

  tick() {
    this.setState({
      steps: this.state.steps,
      buildID: this.state.buildID,
      pullRequestName: this.state.pullRequestName,
      URL: this.state.URL,
      pullRequestURL: this.state.pullRequestURL
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }
  
  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <tr>
        <td>
          <span className="h4">{this.state.pullRequestName}</span><br />
          <p className="build-information">
            <strong>Build URL:</strong> {this.state.URL}<br />
            <span className="f-italic"><strong>Pull Request:</strong> {this.state.pullRequestURL}</span>
          </p>
          <div className="build-links">
            <Steps
              steps = {this.state.steps}
              buildID = {this.state.buildID}
            />
            <div className="clear"></div>
          </div>
        </td>
        <td>
          <div className="build-details">
            <Steps
              steps = {this.state.steps}
              buildID = {this.state.buildID}
            />
            <div className="clear"></div>
          </div>
        </td>
      </tr>
    )
  }
};

export default Builds;
