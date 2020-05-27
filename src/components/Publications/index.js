import React, { Component } from "react";
import { connect } from 'react-redux';
import * as usersActions from '../../actions/usersActions'
import * as publicacionesActions from "../../actions/publicacionesActions";
import Spinner from "../General/Spinner";
import Error from "../General/Error";
import Comments from './Comments'

const { bringAll: usersBringAll } = usersActions;
const { 
    bringFromUser: publicationsBringFromUser, 
    openClose, 
    bringComments 
} = publicacionesActions;

class Publications extends Component {
    async componentDidMount() {
        const {
            usersBringAll,
            publicationsBringFromUser,
            match: { params:{ key } }
        } = this.props

        if (!this.props.usuariosReducer.users.length) {
            await usersBringAll();
        }
        if (this.props.usuariosReducer.error) {
            return;
        }
        if (!('posts_key' in this.props.usuariosReducer.users[key])) {
            publicationsBringFromUser(key);
        }


    }

    addUser = () => {
        const {
            usuariosReducer,
            match: { params: { key } }
        } = this.props;
        if (usuariosReducer.error) {
            return <Error message={usuariosReducer.error}/>
        }

        if (!usuariosReducer.users.length || usuariosReducer.loading) {
            return <Spinner />
        }
        const name = usuariosReducer.users[key].name

        return (
            <h1>
                Publicaciones de {name}
            </h1>
        )
    }

    addPosts = () => {
        const {
            usuariosReducer,
            usuariosReducer: { users },
            publicacionesReducer,
            publicacionesReducer: { posts },
            match: { params: { key } }
        } = this.props;

        if (!users.length) return;
        if (usuariosReducer.error) return;

        if (publicacionesReducer.loading) {
            return <Spinner />;
        }
        if (publicacionesReducer.error) {
            return <Error message={publicacionesReducer.error}/>;
        }
        if (!posts.length) return;
        if (!('posts_key' in users[key])) return;

        const { posts_key } = users[key];

        return this.showInfo(posts[posts_key], posts_key)
    }

    showInfo = (posts, posts_key) => (
        posts.map((post, com_key) => (
            <div
                className='pub_title'
                key= { post.id }
                onClick={ 
                    ()=>this.showComments(posts_key, com_key, post.comments) 
                }
            >
                <h2>{ post.title }</h2>
                <h2>{ post.body }</h2>
                {
                    (post.open) ? <Comments comments={post.comments}/>: ''
                }
            </div>
        ))
    );


    showComments = (posts_key, com_key, comments) => {
        this.props.openClose(posts_key, com_key);
        if (!comments.length) {
            this.props.bringComments(posts_key, com_key)
        }
    }
                
    render() {
        return (
            <div>
                { this.addUser() }
                { this.addPosts() }
            </div>

        )
    }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer,
        publicacionesReducer
    };
}

const mapDispatchToProps = {
    usersBringAll,
    publicationsBringFromUser,
    openClose,
    bringComments
};

export default connect(mapStateToProps, mapDispatchToProps)(Publications);
