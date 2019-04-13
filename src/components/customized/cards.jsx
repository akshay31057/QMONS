import React, { Component } from "react";
import { Collapse, Button, CardBody, Card, CardTitle, Modal } from 'reactstrap';
import { Chart } from "react-google-charts";
import {Series, DataFrame} from "pandas-js"

export default class Cards extends Component {
  state = {
    innerShow : new Array(100).fill(false),
  };
  constructor(){
   super();
   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
 };
 forceUpdateHandler(){
     this.forceUpdate();
   };


  render() {
    const data = this.props.data;
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
    var today = new Date(data[0]["timestamp"]).getDate();
    for (var key in data){

      var date = new Date(data[key]["timestamp"]);
      var day = date.getDay();
      var hour = date.getHours();
      //if(date == today){
        timeCount[hour] += data[key]["persons"];
      //}
      dayCount[day] += data[key]["persons"]
      keys.push(data[key]["location"]);
      values.push(data[key]["timestamp"]);
      if(!(data[key]["location"] in location_site_map))
        location_site_map[data[key]["location"]] = new Set();
      location_site_map[data[key]["location"]].add(data[key]["site"]);
    //  console.log(data[key]);
    }


    console.log(location_site_map);


    for (var i=0;i<7;i++){
      dayWise.push([weekDays[i],dayCount[i]]);
    }
    for(var i=0;i<24;i++){
      timeWise.push([(i*100+""),timeCount[i]])
    }
    //console.log(timeWise);
    var inner_cards = [];
    for(var i=0;i<keys.length;i++){
      //console.log(keys[i]);
      const ir = i;
      var location_site_array = Array.from(location_site_map[keys[i]]);
      //console.log(location_site_array);
      //console.log(i);
      const temp_cards = location_site_array.map((site,ind) =>
        <div className="card" onClick={(e) => {
          //var newState = this.state.innerShow;
          //newState[ir] = true;
          //this.setState({innerShow: newState});
          this.props.onInnerCollapsible(e, this.props.index, ir, ind);
          this.forceUpdate();
        }}>
       <div className="card-body">
         <h4 className="card-title">{site}</h4>
         <p className="card-text">Some example text. Some example text.</p>
         <a href="#" className="card-link">Card link</a>
         <a href="#" className="card-link">Another link</a>
       </div>
       {this.props.collapseInnerCards[ this.props.index][ir][ind] &&               <div className="card-deck">

                     <div className="row">
                        <div className="col-6 d-flex align-items-center justify-content-end">
                          <h3>GO to Queue #</h3>
                        </div>
                        <div className="col-6">
                          <div className="card card-body bg-success">
                            <h3 className="text-white text-center">6</h3>
                          </div>
                        </div>
                      </div>

                      {/* Popular Days  */}
                       <div className="col-sm-12 col-md-6">
                         <div className="card mb-4">
                           <div className="card-body">
                           <Chart
                             width='100%'
                             height='300px'
                             chartType="Bar"
                             loader={<div>Loading Weekly Trends</div>}

                             // JUST POPULATE THE DATA as per the database

                             data={dayWise}

                             options={{
                               // Material design options
                                 chart:
                                 {
                                   title: 'Popular Days',
                                   subtitle: 'The graphs shows which days are the most busy',
                                 },
                             }}
                             // For tests
                             rootProps={{ 'data-testid': '2' }}
                           />
                         </div>
                         </div>
                       </div>


                       {/* Popular Times Today */}
                       <div className="col-sm-12 col-md-6">
                         <div className="card mb-4">
                           <div className="card-body">
                           <Chart
                             width='100%'
                             height='300px'
                             chartType="Bar"
                             loader={<div>Loading Today's Trends</div>}


                             // JUST POPULATE THE DATA as per the database

                             data={timeWise}

                             options={{
                               // Material design options
                               chart: {
                                 title: 'Popular Times Today',
                                 subtitle: 'The graphs shows which times are the most busy today',
                               },
                               colors: ['red']
                             }}

                             // For tests
                             rootProps={{ 'data-testid': '3' }}
                           />
                         </div>
                         </div>
                       </div>


                       {/* Crowd Distribution over Week Days */}
                       <div className="col-sm-12">
                         <div className="card mb-4">
                           <div className="card-body">
                            <Chart
                             width='800px'
                             height='400px'
                             chartType="PieChart"
                             loader={<div>Overall Weekly Population Distribution</div>}


                             // JUST POPULATE THE DATA as per the database

                             data={[
                               ['Day', 'Crowd'],
                               ['Mon', 1000],
                               ['Tue', 1170],
                               ['Wed', 660 ],
                               ['Thu', 1030],
                               ['Fri', 780],
                               ['Sat', 985],
                               ['Sun', 500],
                             ]}

                             options={{
                               // Material design options
                                 title: 'Crowd Distribution',
                                 subtitle: 'The graph shows which days are most busy',
                               // colors: ['red']
                             }}

                             // For tests
                               rootProps={{ 'data-testid': '3' }}
                             />
                           </div>
                         </div>
                       </div>
                     </div>
}

     </div>
      );
      inner_cards.push(temp_cards);
    }
    //console.log(inner_cards[0]);
    const cards = keys.map((card,ind) =>
    <div>
        <Button color="secondary" className="col-12" onClick={(e) => {
          this.props.onCollapsible(e,this.props.index, ind, data);
          this.forceUpdateHandler();
        }}>{card}</Button>
        <Collapse isOpen={this.props.collapse[this.props.index][ind]} className="card card-body border-secondary">
            {inner_cards[ind]}
        </Collapse>
      </div>
    );

    return (
        <div>
          {cards}
        </div>

            );
          }
}
/*onChange={this.handleChange
<Collapse isOpen={collapse[ind]}>yy*/
