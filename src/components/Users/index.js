import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from "../General/Spinner";
import Error from "../General/Error";
import * as usersActions from '../../actions/usersActions'
import Tabla from "./Tabla";

class Users extends Component{
    componentDidMount() {
        this.props.bringAll();
    }

    ponerContenido = () => {
        if (this.props.loading) {
            return <Spinner />
        }
        if (this.props.error) {
            return <Error message={this.props.error}/>
        }
        return(
            <Tabla />
        )
    }



    render() {
        return(
            <div>
                <h1>Usuarios</h1>
                { this.ponerContenido() }
            </div>
        )
    }
}




const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
}


export default connect(mapStateToProps, usersActions)(Users);