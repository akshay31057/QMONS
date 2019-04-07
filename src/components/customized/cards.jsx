import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
export default class Cards extends Component {


  render() {
    const data = this.props.data;
    var keys = []
    var values = []
    //console.log(data);
    var collapse = this.props.collapse;
    for (var key in data){
      keys.push(data[key]["location"]);
      values.push(data[key]["timestamp"]);
      console.log(data[key]);
    }
    const cards = keys.map((card,ind) =>
    <div>
        <Button color="primary" onClick={(e) => {
          this.props.onCollapsible(e,ind);
        }} style={{ marginBottom: '1rem' }}>{card}</Button>
        <Collapse isOpen={this.props.collapse[ind]}>
          <Card>
            <CardBody>
            {values[ind]}
            </CardBody>
          </Card>
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
