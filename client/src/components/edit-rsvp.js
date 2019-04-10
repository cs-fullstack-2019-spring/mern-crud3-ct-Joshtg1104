import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class EditRsvp extends Component{
    constructor(props) {
        super(props);

        this.state= {
            rsvp_person: '',
            rsvp_going: false,
            toHomePage: false
        };
        this.onChangeRSVPPerson = this.onChangeRSVPPerson.bind(this);
        this.onChangeRSVPGoing = this.onChangeRSVPGoing.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.targetHomePage = this.targetHomePage.bind(this);
    }

    componentDidMount() {
        console.log("Refresh Data!");
        fetch('/rsvp/' + this.props.match.params.id)
            .then(data => data.json())
            .then(response => {
                this.setState({
                    rsvp_id: response._id,
                    rsvp_person: response.rsvp_person,
                    rsvp_going: response.rsvp_going
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeRSVPPerson(e){
        this.setState({
            rsvp_person: e.target.value
        })
    }
    onChangeRSVPGoing(e){
        this.setState({
            rsvp_going: e.target.value
        })
    }
    targetHomePage(e){
        this.setState({
            toHomePage: true
        })
    }
    onSubmit(e){
        e.preventDefault();

        let data = {
            rsvp_person: this.state.rsvp_person,
            rsvp_going: this.state.rsvp_going
        };

        return fetch('/rsvp/'+this.state.rsvp_id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: "cors",
            body: JSON.stringify(data)
        })
            .then(res => res.text())
            .then(res => console.log(res))
            .then( () => {
                    this.targetHomePage();
                }
            );
    }


    render() {
        if(this.state.toHomePage === true){
            return <Redirect to={'/'}/>
        }


        return (
            <div>
                <h1>Edit RSVP</h1>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Person Invited:
                        <input type="text" value={this.state.rsvp_person} onChange={this.onChangeRSVPPerson}/>
                    </label>
                    <label>
                        Is Going?:
                        <select value={this.state.rsvp_going} onChange={this.onChangeRSVPGoing}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </label>
                    <input type="submit" value="Update RSVP"/>
                    <button onClick={this.targetHomePage}>Cancel</button>
                </form>
            </div>
        );
    }

}