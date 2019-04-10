import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom";

const Rsvp = props => (
    <tr>
        <td>{props.rsvp.rsvp_person}</td>
        <td>{props.rsvp.rsvp_going?'Yes':'No'}</td>
        <Link to={"/edit/"+props.rsvp._id}>Edit</Link> | <Link to={"/delete/"+props.rsvp._id}>Delete</Link>
        <hr/>
    </tr>
);
export default class ListRsvp extends Component{
    constructor(props) {
        super(props);
        this.state={rsvps: []};
    }

    componentDidMount() {
        console.log("Refresh Data!");
        fetch('/rsvp')
            .then(data=>data.json())
            .then(returnedData=>this.setState({rsvps: returnedData}))
    }

    rsvpList(){
        return(
            this.state.rsvps && this.state.rsvps.map(function (currentRsvp,i) {
                return <Rsvp rsvp={currentRsvp} key={i}/>
            })
        )
    }
    render() {
        return (
            <div>
                <h1>List RSVP</h1>
                <table>
                    <tr>
                        <th>Person Invited</th>
                        <th>Responded?</th>
                        <th>Action</th>
                    </tr>
                    {this.rsvpList()}
                </table>
            </div>
        );
    }

}