import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import reducers from './reducers.jsx'
import { Redirect } from 'react-router-dom'

class Welcome extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            displayName: this.props.displayName,
            avatar: this.props.avatar,
            redirect: null
        }
    }

    handleDisplayNameChange(event) {
        this.setState({ displayName: event.target.value })
    }

    handleReady() {
        this.props.updateDisplayName(this.state.displayName)
        this.props.updateCurrentRoom('vestibule')
        this.setState({ redirect: '/party' })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <div className="vestibule">
                <h1>Welcome have fun</h1>
                <input type="text" placeholder="name" name="name" minLength="1" onChange={this.handleDisplayNameChange.bind(this)}/>
                <br />
                <input type="button" onClick={this.handleReady.bind(this)} value="Party!" disabled={!this.state.displayName} />
            </div>
        )
    }
}

export default connect(
    state => state, 
    {
        updateDisplayName: reducers.updateDisplayNameActionCreator,
        updateCurrentRoom: reducers.updateCurrentRoomActionCreator
     })(Welcome)
