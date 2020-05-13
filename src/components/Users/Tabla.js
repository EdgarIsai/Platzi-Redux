import React from "react";
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

const Tabla = (props) => {
    const addRow = () => (
        props.users.map((user, key) => (

            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.website}</td>
                <td>
                    <Link to={ `/publications/${key}` }><div className="eye-solid2 icon"></div></Link>
                </td>
            </tr>


        ))
    );

    return (
        <table className="table">
            <thead>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    Email
                </th>
                <th>
                    Website
                </th>
            </tr>
            </thead>
            <tbody>
            { addRow() }
            </tbody>
        </table>
    )
}

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
}

export default connect(mapStateToProps)(Tabla);