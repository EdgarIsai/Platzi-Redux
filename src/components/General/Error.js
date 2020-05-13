import React from 'react';


const Error = (props) => (
    <h2 className='center rojo'>
        We fucked up Kowalski: {props.message}
    </h2>
);

export default Error;