/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbagnall17
 */

var React = require('react');

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusIcon: props.statusIcon,
      statusColor: props.statusColor
    };
  }
  
  /**
   * fa-times-circle - X in a circle
   * fa-minus-circle - - in a circle
   * fa-check-circle - checkmark in a circle
   * probo-text-dark - dark red
   * probo-text-green - green
   * none - dark grey
   */
  render() {
    var iconClass = "fa " + this.state.statusIcon + " " + this.state.statusColor;
    return (
      <div className="right"><i className={ iconClass } aria-hidden="true"></i></div>
    );
  }
}

module.exports = Step;
