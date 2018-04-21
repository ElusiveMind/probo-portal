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
      repositoryName: '',
      builds: []
    }
    this.tick();
  }

  tick() {probo-api/repository-status/{repository_id}/{token}
    var repository_status = getRepository();
    var token = getToken();
    this.serverRequest = $.get('https://www.proofroom.net/probo-api/repository-status/' + $repository_status + '/' + $token + '?nocache=' + (new Date()).getTime(), function(result) {      
      this.setState({
        builds: result.builds,
        repositoryName: result.repositoryName
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
    var thebuilds = builds.map(function(item, index) {
      return (
        <Builds 
          key = {index}
          build = {item}
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
          {thebuilds}
        </tbody>
      </table>
    );
  }
  
  getRepository() {
    var pathArray = window.location.pathname.split( '/' );
    alert(pathArray[5]));
    return pathArray[5];
  }

  getToken() {
    var pathArray = window.location.pathname.split( '/' );
    alert(pathArray[6]));
    return pathArray[6];
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
