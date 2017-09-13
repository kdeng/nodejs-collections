import React from 'react';

import ArticleService from '../../../mock/actions/ArticleService';

import ArticleUtils from '../../utils/Article';

import Article from '../../components/Article';

export default class ArticleContainer extends React.Component {

    constructor(props, context) {

        super(props, context);
        this.state = {
            article: {},
            articleId: this.props.params.articleId
        };

    }

    componentDidMount() {
        console.log("Loading article from remote server");
        ArticleService.get(this.state.articleId).then((response) => {
            this.setState({
                article: response
            });
        });

    }

    render() {
        let tags = ArticleUtils.collectTagsFromArticle(this.state.article);
        return (
            <Article
                tags={tags}
                articleId={this.state.articleId}
                headline={this.state.article.headline}
                relatedAssets={this.state.article.relatedAssets}
            />
        )
    }

}
