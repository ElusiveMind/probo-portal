/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbagnall17
 */

var React = require('react');

var Steps = require('./Steps');

class Builds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      build: props.build
    }
  }
  render() {
    return (
      <tr>
        <td>
          <span className="h4">{ this.state.build.pullRequestName }</span><br />
          <p className="build-information">
            <strong>Build URL:</strong> { this.state.build.URL }<br />
            <span className="f-italic"><strong>Pull Request:</strong> { this.state.build.pullRequestURL }</span>
          </p>
          <div className="build-links">
            <Steps steps = { this.state.build.steps } />
            <div className="clear"></div>
          </div>
        </td>
        <td>
          <div className="build-details">
            <Steps steps = { this.state.build.steps } />
            <div className="clear"></div>
          </div>
        </td>

      </tr>
    )
  }
};

module.exports = Builds;
