/** 
 * ProboCI - ReactJS Interface
 * by Michael R. Bagnall <mrbagnall@icloud.com>
 * Twitter: @mbagnall17
 */

import React, { Component } from 'react';

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusIcon: props.statusIcon,
      statusColor: props.statusColor,
      statusTask: props.statusTask
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
    var iconClass = "fa " + this.props.statusIcon + " " + this.props.statusColor;
    return (
      <div id={ this.props.statusTask } className="right"><i className={ iconClass } aria-hidden="true"></i></div>
    );
  }
}

export default Step;
