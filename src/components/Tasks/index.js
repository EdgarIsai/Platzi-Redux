import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as tasksAction from '../../actions/tasksAction';
class Tasks extends Component {
    componentDidMount() {
        this.props.bringAll();
    }

    render() {
        console.log(this.props)
        return (
            <div>
                Tasks
            </div>
        )
    }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(mapStateToProps, tasksAction)(Tasks)