import React from 'react';

import { Link } from 'react-router';

import ArticleService from '../../../mock/actions/ArticleService';
import ArticleList from '../../components/ArticleList';

export default class  ArticleListContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showMore: props.showMore === true,
            articles: []
        };
    }

    componentDidMount() {
        let _this = this;
        ArticleService.list().then(function (response) {
            _this.setState({
                articles: response.queryResults
            });
        });
    }

    render() {
        if (this.state.articles.length > 0) {
            return (
                <div className="row ArticleList">
                    <div className="col-xs-12">
                        <h2 className="h2 h2--header ArticleList__title">
                            Articles
                            {this.state.showMore ? <span className="h2__morelink pull-right"><Link to="/articles">more</Link></span> : ''}
                        </h2>
                        <ArticleList articles={this.state.articles} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row">
                    <div className="col-xs-12 loading">
                        Loading...
                    </div>
                </div>
            )
        }
    }

}