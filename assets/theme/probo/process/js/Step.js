/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbagnall17
 */

var React = require('react');

class Step extends React.Component {
  /**
   * fa-times-circle - X in a circle
   * fa-minus-circle - - in a circle
   * fa-check-circle - checkmark in a circle
   * probo-text-dark - dark red
   * probo-text-green - green
   * none - dark grey
   */
  render() {
    return (
      <div class="right"><i class="fa { this.props.statusIcon } { this.props.statusColor }" aria-hidden="true"></i></div>
    );
  }
}

module.exports = Step;
