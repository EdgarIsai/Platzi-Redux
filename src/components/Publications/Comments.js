import React from 'react';
import { connect } from 'react-redux'
import Spinner from '../General/Spinner';
import Error from '../General/Error'


const Comments = (props) => {
    if (props.com_error) {
        return <Error message={props.com_error} />
    }
    
    if (props.com_loading && !props.comments.length) {
        return <Spinner />
    }

    const addComments = () => (
        props.comments.map(comment => (
            <li key={comment.id}>
                <b>
                    <u>
                        {comment.email}
                    </u>
                </b>
                <br />
                {comment.body}
            </li>
        ))
    );
    return (
        <ul>
            { addComments() }
        </ul>
    )
};


const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer
export default connect(mapStateToProps)(Comments);