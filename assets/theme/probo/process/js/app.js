/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbags17
 */

// Load in our required items to run.
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

// Load in our sub components.
var Builds = require('./Builds');

/** 
 * The list of builds in a specific repository.
 * 
 * @version 0.0.1
 * @author [Michael R. Bagnall](https://www.michaelbagnall.com)
 */

class RepositoryBuilds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repositoryName: '',
      builds: []
    }
    this.tick();
  }

  tick() {
    this.serverRequest = $.get('./json/builds.json?nocache=' + (new Date()).getTime(), function(result) {
      this.setState({
        builds: result.builds,
        repositoryName: result.repositoryName
      });
    }.bind(this));
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 60000);
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    var builds = this.state.builds;
    var thebuilds = builds.map(function(item, index) {
      return (
        <Builds 
          key = { index }
          build = { item }
        />
      );
      
    }.bind(this));

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th colSpan="2" className="probo-purple-dark probo-text-soft-peach">Build Information For { this.state.repositoryName }</th>
          </tr>
        </thead>
        <tbody>
          { thebuilds }
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
