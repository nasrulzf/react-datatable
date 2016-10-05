"use strict"

import React from 'react';

class Body extends React.Component {

    constructor(){
        super();
    }

    render(){

        let content = this.props.record.map(this.props.mapping);

        return(
            <tbody>
                {content}
            </tbody>
        );
    }

}

export default Body;