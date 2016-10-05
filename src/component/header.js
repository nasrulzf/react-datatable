"use strict"

import React from 'react';
import $ from 'jquery';

class Header extends React.Component {
    constructor(){
        super();
        this.state = {
            isSearch : false
        };
        this.clickSearch = this.clickSearch.bind(this);
    }

    clickSearch(){
        this.setState({
            isSearch : !this.state.isSearch
        });
        
    }

    render(){
        let column = this.props.mapping;
        let columnHeader = [];
        let columnFilterComp = [];
        
        $.each(column, function(e, t){
            console.log(e);
            if(t.index){
                columnHeader.push(<th style={{width:t.width}}>Number</th>)
                columnFilterComp.push(
                    <th>
                        <div className="row">
                            <div className="col-xs-12"></div>
                        </div>
                    </th>
                );
            }
            else{
                var sorter = (t.sorter) ? <div className="col-md-1 col-sm-1 hidden-xs"><a href="#"><i className="glyphicon glyphicon-sort-by-attributes"></i></a></div> : '';
                var filter = (t.filter) ? <div className="col-md-1 hidden-sm hidden-xs" ><a href="#" onClick={this.clickSearch}><i className="glyphicon glyphicon-filter"></i></a></div> : '';
                columnHeader.push(
                    <th>
                        <div className="row">
                            <div className="col-md-8 col-sm-9">{t.name}</div>
                            {sorter}
                            {filter}
                        </div>
                    </th>
                );
                var filter_name = "filter_" + e;
                columnFilterComp.push(
                    <th>
                        <div className="row">
                            <div className="col-xs-12">
                                <input type="text" className="form-control" ref={filter_name} name={filter_name} onChange={this.props.filterAction} />
                            </div>
                        </div>
                    </th>
                );
            }
        }.bind(this));

        if(this.state.isSearch){
            return(
                <thead>
                    <tr>
                        {columnHeader}
                    </tr>
                    <tr>
                        {columnFilterComp}
                    </tr>
                </thead>
            );
        }else{
            return(
                <thead>
                    <tr>
                        {columnHeader}
                    </tr>
                </thead>
            );
        }
        
    }
}

export default Header;