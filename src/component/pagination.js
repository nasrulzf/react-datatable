"use strict"

import React from 'react';

class Pagination extends React.Component {
    constructor(){
        super();
    }

    render(){
        let count = this.props.recordCount;
        let recordPerPage = this.props.recPerPage;
        let totalPage = Math.ceil(count / recordPerPage);
        let current = this.props.currentPage;
        let rangePrev = this.props.rangePrev;
        let rangeNext = this.props.rangeNext;
        
        let prevButton = <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>;

        let nextButton = <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>;

        nextButton = current < totalPage ? nextButton : '';
        prevButton = current > 1 ? prevButton : '';

        let paging = [];

        let startCount = (current - rangePrev > 0) ? (current-rangePrev) : 0;
        let endCount = (current + rangeNext < totalPage) ? (current + rangeNext) : totalPage;

        if(startCount != 0){
            paging.push(<li><a href="#" onClick={this.props.clickEvent.bind(this, 1)}>{1}</a></li>);
            paging.push(<li><a href="#">...</a></li>);
        }

        for(var i = startCount; i < endCount; i++){
            if(i == (current - 1)){
                paging.push(<li className="active"><a href="#">{(i + 1)}</a></li>);
            }else{
                paging.push(<li><a href="#" onClick={this.props.clickEvent.bind(this, i+1)}>{(i + 1)}</a></li>);
            }
        }

        if(endCount != totalPage){
            paging.push(<li><a href="#">...</a></li>);
            paging.push(<li><a href="#" onClick={this.props.clickEvent.bind(this, totalPage)}>{totalPage}</a></li>);
        }

        return(
            <ul className="pagination">
                <li>
                    {prevButton}
                </li>
                {paging}
                <li>
                    {nextButton}
                </li>
            </ul>
        );
    }
        
}

export default Pagination;