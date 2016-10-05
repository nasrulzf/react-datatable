"use strict"

import React from 'react';

class PagingFilter extends React.Component {
    constructor(){
        super();
    }
    render(){
        return (
            <div className="col-md-2 col-sm-4 col-xs-6">
                <select className="form-control" onChange={this.props.changeEvent}>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        );
    }
}

export default PagingFilter;