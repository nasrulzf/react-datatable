"use strict"

import React from 'react';
import Header from './header';
import Body from './body';
import Pagination from './pagination';
import PagingFilter from './paging_filter';

class DataTable extends React.Component {

    constructor(){
        super();
        this.state = {
            data : [],
            perPage : 10,
            rangePrev : 3,
            rangeNext : 3,
            current : 3,
            filtered : [],
            is_filtered : false
        };
        this.changePage = this.changePage.bind(this);
        this.changePerPageHandler = this.changePerPageHandler.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
    }

    componentDidMount(){
        $.ajax({
            url : this.props.url,
            type : 'POST',
            dataType : 'JSON',
            success : function(result){
                var start = ((parseInt(this.state.current) - 1) * parseInt(this.state.perPage));
                var end = start + parseInt(this.state.perPage);
                var filtered_data = result.filter(function(v, ix){
                    if(ix > start && ix <= end){
                        return true;
                    }
                });
                this.setState({
                    data : result,
                    filtered : filtered_data
                });

            }.bind(this)
        });
    }

    changePage(page){
        var start = ((page - 1) * parseInt(this.state.perPage));
        var end = start + parseInt(this.state.perPage);
        var filtered_data = this.state.data.filter(function(v, ix){
            if(ix > start && ix <= end){
                return true;
            }
        });
        this.setState({
            filtered : filtered_data,
            current : page
        });
    }

    changePerPageHandler(e){
        var perPage = e.target.value;
        var start = 0;
        var end = start + parseInt(perPage);
        var filtered_data = this.state.data.filter(function(v, ix){
            if(ix > start && ix <= end){
                return true;
            }
        });
        this.setState({
            filtered : filtered_data,
            perPage : perPage,
            current : 1
        });
    }

    filterHandler(e){
        console.log(e);
        console.log(e.target.value);
        console.log(e.target.name);
        
        var is_filtered = false;

        var filtered_data = this.state.data.filter(function(v, ix){
            var fname = '';
            var fgender = '';
            var fcompany = '';
            var femail = '';
            if(e.target.name == 'filter_1' && e.target.value != '')
            {
                fname = e.target.value;
            }

            if(e.target.name == 'filter_2' && e.target.value != '')
            {
                fgender = e.target.value;
            }

            if(e.target.name == 'filter_3' && e.target.value != '')
            {
                fcompany = e.target.value;
            }

            if(e.target.name == 'filter_4' && e.target.value != '')
            {
                femail = e.target.value;
            }

            if(fname != '' && fgender != '' && fcompany != '' && femail != ''){
                is_filtered = true;
            }else{
                is_filtered = false;
            }

            if((fname == v.name && fname != '') || (fgender == v.gender && fgender != '') || (fcompany == v.company && fcompany != '') || (femail == v.email && femail != ''))
            {
                return true;
            }
            else
            {
                return false;
            }
            
        });

        this.setState({
            filtered : filtered_data,
            is_filtered : is_filtered
        });

    }

    render(){
        let function_mapping = function(item, t){
            return (
                <tr key={t}>
                    <td>{(((this.state.current - 1) * this.state.perPage) + t + 1)}</td>
                    <td className="text-left">{item.name}</td>
                    <td className="text-left">{item.gender}</td>
                    <td className="text-left">{item.company}</td>
                    <td className="text-left">{item.email}</td>
                </tr>
            );
        }.bind(this);

        let columnTitle = [
            {
                name : 'No',
                width : '50px',
                filter : false,
                sorter : false,
                index : true
            },
            {
                name : 'Name',
                filter : true,
                sorter : true
            },
            {
                name : 'Gender',
                filter : true,
                sorter : true
            },
            {
                name : 'Company',
                filter : true,
                sorter : true
            },
            {
                name : 'Email',
                filter : true,
                sorter : true
            }
        ];

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    
                </div>
                <div className="panel-body">
                    <table className="table table-bordered">
                        <Header
                            mapping={columnTitle}
                            filterAction={this.filterHandler}
                         />
                        <Body 
                            record={this.state.filtered}
                            mapping={function_mapping}
                        />
                    </table>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="pull-left">
                                        <Pagination
                                         clickEvent={this.changePage}
                                         currentPage={this.state.current}
                                         recordCount={(!this.state.is_filtered)?this.state.data.length:this.state.filtered}
                                         recPerPage={this.state.perPage}
                                         rangePrev={this.state.rangePrev}
                                         rangeNext={this.state.rangeNext}
                                         />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 hidden-xs">
                            <div className="row">
                                <div className="col-md-10 text-right text-middle col-sm-8 col-xs-6">Record Per Page : </div>
                                <PagingFilter changeEvent={this.changePerPageHandler} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default DataTable;