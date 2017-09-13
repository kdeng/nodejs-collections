import React from 'react';

import {browserHistory} from 'react-router';

import TagList from '../../common/components/TagList';

import ArticleService from '../../mock/actions/ArticleService';

export default class ImagePage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            total: 0,
            tags: {},
            articles: []
        };

        this.searchArticles = this.loadAllArticles.bind(this);
        this.searchTags = this.reloadTags.bind(this);
    }

    componentDidMount() {
        console.log("Component did mount");
        console.group();
        // this.reloadTags.apply(this);
        this.loadAllArticles.apply(this);
        console.groupEnd();
    }

    loadAllArticles() {
        console.log("Start to load all articles");
        ArticleService.list().then((response) => {
            this.setState({
                total: response.total,
                articles: response.queryResults
            })
        });
    }

    reloadTags() {
        console.log("Start to load all tags");
        return fetch('/api/tags.json', {
            mode: 'no-cors',
            redirect: 'follow'
        })
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                this.setState({
                    tags: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }


    render() {
        return (
            <div className="container">
                {/*<TagList tags={this.state.tags}></TagList>*/}
                <div className="articles">
                    {
                        this.state.articles.map((item,index) => {
                            return (
                                <div className="articles__item" key={`article_` + index}>
                                    <a href={'/articles/' + item.assetId}>{item.headline}</a><br />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}