/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbagnall17
 */

var React = require('react');

var Steps = require('./Steps');

class Builds extends React.Component {  
  render() {
    return (
      <tr>
        <td>
          <span class="h4">build.pullRequestName</span><br />
            <p class="build-information">
              <strong>Build URL:</strong> build.URL<br />
              <span class="f-italic"><strong>Pull Request:</strong> build.pullRequestURL</span>
            </p>
          <div class="build-links">
            <Steps steps = { this.props.build.steps } />
            <div class="clear"></div>
          </div>
        </td>
        <td>
          <div class="build-details">
            <Steps steps = { this.props.build.steps } />
            <div class="clear"></div>
          </div>
        </td>
      </tr>
    )
  }
};

module.exports = Builds;
