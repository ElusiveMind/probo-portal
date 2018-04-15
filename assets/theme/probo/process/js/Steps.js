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
      buildID: props.buildID,
      steps: []
    };
    this.tick = this.tick.bind(this);
    this.tick();
  }

  tick() {
    var steps = [];
    var stepsToUse;
    
    this.serverRequest = $.get('./json/status.json?nocache=' + (new Date()).getTime(), function(result) {
      var buildID = this.state.buildID;
      result.builds.map(function(item, index) {
        steps = item.steps;
        if (item.buildID == buildID) {
          stepsToUse = steps;
        }
      }); 
      this.setState({
        steps: stepsToUse
      });
    }.bind(this));
    this.forceUpdate();
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 5000);
  }

  componentWillUnmount() {
    this.serverRequest.abort();
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
