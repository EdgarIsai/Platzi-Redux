import React from 'react';


const Error = (props) => {
    console.log(props)
    return(<h2 className='center rojo'>
        { props.message }
    </h2>)
};

export default Error;