/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbagnall17
 */

var React = require('react');

var Step = require('./Step');

class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: props.steps
    }
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
    }.bind(this));

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

module.exports = Steps;
