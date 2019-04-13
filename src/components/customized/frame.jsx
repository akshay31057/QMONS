import React, { Component } from "react";
import { Collapse, Button, CardBody, Card, CardTitle, Modal } from 'reactstrap';
import { Chart } from "react-google-charts";
import {Series, DataFrame} from "pandas-js"

export default class Cards extends Component {

  render() {
    const data = this.props.data;
    var rowLocation = {}
    var keys = []
    var values = []
    var timeWise = [["Time", "Crowd"]]
    var timeCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    var dayWise = [["Day", "Crowd"]];
    var dayCount = [0,0,0,0,0,0,0]
    var location_site_map = {}
    const weekDays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //var DataFrame = require('pandas-js').DataFrame;
    //const df = new DataFrame(data);
    //console.log(df);
    //console.log(data);
    //console.log(data);
    // var collapse = this.props.collapse;
    // for(const [row, idx] of df) {
    //   console.log(row, idx);
    // }
    //console.log(data);

    for (var key in data){
      const location = data[key]['location'];
      if(!(location in rowLocation))
        rowLocation[data[key]["location"]] = [];
      rowLocation[data[key]["location"]].push(data[key]);
    }
    console.log(rowLocation);
    
    return (
        <div>
        <Cards data={this.props.data} onCollapsible= {this.props.onCollapsible} collapse={this.props.collapse} onInnerCollapsible={this.props.onInnerCollapsible} collapseInnerCards={this.props.collapseInnerCards} />
        </div>

            );
          }
}
/*onChange={this.handleChange
<Collapse isOpen={collapse[ind]}>yy*/
