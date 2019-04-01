import React, { Component } from "react";
import { Collapse, Button, CardBody, Card, CardTitle } from 'reactstrap';
import { Chart } from "react-google-charts";
export default class Cards extends Component {


  render() {
    const data = this.props.data;
    var keys = []
    var values = []
    var collapse = this.props.collapse;
    for (var key in data){
      keys.push(key);
      values.push(data[key])
    }
    const cards = keys.map((card,ind) =>
    <div>
        <Button color="secondary" className="col-12" onClick={(e) => {
          this.props.onCollapsible(e,ind);
        }}>{card}</Button>
        <Collapse isOpen={this.props.collapse[ind]} className="card card-body border-secondary">
            {/* {values[ind]} */}        
             {/* Optimal Queue number */}
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


              <div className="card-deck">
             
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
                      
                      data={[
                        ['Time', 'Crowd'],
                        ['0000', 50 ],
                        ['0200', 150],
                        ['0400', 180],
                        ['0600', 220 ],
                        ['0800', 200 ],
                        ['1000', 500 ],
                        ['1200', 850 ],
                        ['1400', 780 ],
                        ['1600', 680 ],
                        ['1800', 980 ],
                        ['2000', 560],
                        ['2200', 100],
                      ]}
                    
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
