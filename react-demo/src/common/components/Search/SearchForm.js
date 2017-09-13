import React from 'react';

import ContentApi from '../../../mock/actions/ContentApi';

export default class SearchForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            searchTags : ''
        };
    }

    handleChanges = (event) => {
        console.log("Handled change event");
        this.setState({
            searchTags: event.target.value
        });
    };

    performSearch = (event) => {
        console.log("Do search");
        this.props.doSearch(this.state.searchTags);
        event.preventDefault();
        return false;
    };

    render() {
        return (
                <form className="form-horizontal" onSubmit={this.performSearch} formAction="POST">
                    <div className="form-group">
                        <label className="col-sm-2 sr-only" htmlFor="search-input">Search</label>
                        <div className="input-group col-sm-10">
                            <div className="input-group-addon">Tags:</div>
                            <input type="text" className="form-control" value={this.state.searchTags} onChange={this.handleChanges} id="search-input" placeholder="(e.g. auckland,kitchen)" />
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-primary">Search</button>
                            </span>
                        </div>
                    </div>
                </form>
        )
    }

}
