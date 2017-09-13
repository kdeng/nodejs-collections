import React from 'react';
import _ from 'lodash';
import ImageService from '../../../mock/actions/ImageService';
import ArticleService from '../../../mock/actions/ArticleService';

import RelatedContentList from '../../components/RelatedContentList';
import ArticleUtils from '../../utils/Article';
import ImageUtils from '../../utils/Image';
import {Link} from 'react-router';

import TagList from '../../components/TagList';

require('./Image.css');

export default class ImageContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            articleId: props.params.articleId,
            assetId: props.params.assetId,
            article: {
                headline: ''
            },
            image: {},
            tags: []
        }
    }

    componentWillMount() {
        // console.log("componentWillMount -> ");
        this.fetch(this.state.articleId, this.state.assetId);
    }

    componentDidMount() {
        // console.log("componentDidMount -> ");
        // this.fetch();
        //let tags = ArticleUtils.collectTagsFromArticle(this.state.article);
        // let tags = ImageUtils.collectTagsFromImage(this.state.image);

    }

    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps -> ");

        if (nextProps.params.assetId !== this.state.assetId || nextProps.params.articleId !== this.state.articleId) {
            this.fetch(nextProps.params.articleId, nextProps.params.assetId);
        }

    }

    fetch = (articleId, assetId) => {
        const _this = this;

        ArticleService.get(articleId).then((articleReseponse) => {

            ImageService.get(articleId, assetId).then((response) => {
                this.setState({
                    articleId: articleId,
                    assetId: assetId,
                    article: articleReseponse,
                    image: response,
                    tags: ImageUtils.collectTagsFromImage(response)
                });
            });

        });


    };

    render() {
        let images = _.isObject(this.state.article) && _.isArray(this.state.article.relatedAssets) ? this.state.article.relatedAssets : [];
        return (
            <div>

                <h2 className="h2 h2--header">{ this.state.article.headline }</h2>

                <TagList tags={this.state.tags}/>

                <div className="row">
                    <div className="col-xs-8">
                        <div className="thumbnail"><img src={this.state.image.href} alt=""/></div>
                    </div>
                    <div className="col-xs-4">
                        <div className="row">
                            {
                                images.map((image, idx) => {
                                    return (
                                        <div className="col-xs-6" key={'image_' + idx}>
                                            <div
                                                className={'thumbnail' + (this.state.assetId == image.assetId ? ' thumbnail--selected' : '') }>
                                                <Link to={'/articles/' + this.state.articleId + '/asset/' + image.assetId}>
                                                    <img src={image.href} alt="" width='100%'
                                                         style={{maxHeight: "100px"}}/>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <RelatedContentList tags={this.state.tags} exclude={this.state.articleId}/>
            </div>
        )
    }

}