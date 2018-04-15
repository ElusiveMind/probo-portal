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
      buildID: props.build.buildID,
      pullRequestName: props.build.pullRequestName,
      URL: props.build.URL,
      pullRequestURL: props.build.pullRequestURL
    };
  }

  render() {
    return (
      <tr>
        <td>
          <span className="h4">{ this.state.pullRequestName }</span><br />
          <p className="build-information">
            <strong>Build URL:</strong> { this.state.URL }<br />
            <span className="f-italic"><strong>Pull Request:</strong> { this.state.pullRequestURL }</span>
          </p>
          <div className="build-links">
            <Steps
              buildID = { this.state.buildID }
            />
            <div className="clear"></div>
          </div>
        </td>
        <td>
          <div className="build-details">
            <Steps
              buildID = { this.state.buildID }
            />
            <div className="clear"></div>
          </div>
        </td>
      </tr>
    )
  }
};

module.exports = Builds;
