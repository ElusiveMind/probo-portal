/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbagnall17
 */

var React = require('react');

var Step = require('./Step');

class Steps extends React.Component {

  render() {

    var steps = this.props.steps;

    steps = steps.map(function(item, index) {
      return (
        <Step 
          statusIcon = { item.statusIcon }
          statusColor = { item.statusColor }
          url = { item.url }

        />
      );
    }.bind(this));


    return (
      <div class="right">
      { steps }
      <div class="clear"></div>
          <button class="button button--success disabled button-sm" onclick="window.location.href='build-details.html'">View Build</button>
          <button class="button button--success button-sm" onclick="window.location.href='build-details.html'">Build Details</button>
      </div>
    );
  }
}

module.exports = Steps;
