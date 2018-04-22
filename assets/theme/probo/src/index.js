/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbags17
 */

// Load in our required items to run.
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Builds from './Builds';
import $ from "jquery";
//import registerServiceWorker from './registerServiceWorker';

/** 
 * The list of builds in a specific repository.
 * 
 * @version 0.0.2
 * @author [Michael R. Bagnall](https://www.michaelbagnall.com)
 */

class RepositoryBuilds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'SailAway77',
      rid: '1',
      builds: []
    }
    this.tick();
  }

  tick() {
    this.serverRequest = $.get('https://www.proofroom.net/probo-api/repository-status/' + this.state.rid+ '/' + this.state.token, function(result) {
      this.setState({
        builds: result
      });
    }.bind(this));
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    var builds = this.state.builds;

    var buildsDisplay = builds.map(function(item, index) {
      return (
        <Builds 
          key = {index}
          steps = {item.steps}
          buildID = {item.buildID}
          pullRequestName = {item.pullRequestName}
          URL = {item.URL}
          pullRequestURL = {item.pullRequestURL}
        />
      ); 
    });

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th colSpan="2" className="probo-purple-dark probo-text-soft-peach">Build Information For {this.state.repositoryName}</th>
          </tr>
        </thead>
        <tbody>
          {buildsDisplay}
        </tbody>
      </table>
    );
  }
}

/**
 * Render our main interface in the #content DOM element.
 */
ReactDOM.render(
  <RepositoryBuilds />,
  document.getElementById('content')
);
//registerServiceWorker();
