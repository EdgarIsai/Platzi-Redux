import React, { Component } from "react";
import { connect } from 'react-redux';
import * as usersActions from '../../actions/usersActions'
import usuariosReducer from "../../reducers/usuariosReducer";

class Publications extends Component {
    componentDidMount() {
        if (!this.props.users.length) {
            this.props.bringAll()
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1>
                    Publicaciones de
                </h1>
                <h4>
                    { this.props.match.params.key }
                </h4>
            </div>

        )
    }
}

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
}

export default connect(mapStateToProps, usersActions)(Publications);