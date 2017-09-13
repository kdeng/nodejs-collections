import React from 'react';
import _ from 'lodash';

import ContentApi from '../../../mock/actions/ContentApi';
import TagList from '../../components/TagList';
import {Link} from 'react-router';
require('./styles.css');

export default class RelatedContentList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tags: [],
            exclude: "",
            relatedContents: []
        };
    }

    fetch = (tags, exclude) => {
        ContentApi.findContentsByTags(tags, exclude).then((response) => {
            this.setState({
                tags: tags,
                exclude: exclude,
                relatedContents: response
            });
        })
    };

    componentWillReceiveProps(nextProps) {
        let currentTags = _.sortBy(this.state.tags).join(","),
            nextTags = _.sortBy(nextProps.tags).join(",");

        if (nextTags !== currentTags || this.state.exclude != nextProps.exclude) {
            this.fetch(nextProps.tags, nextProps.exclude);
        }

    }


    render() {
        return (
            <div className="row relatedContent">
                <hr />
                <h4 className="relatedContent__title">Similar Images</h4>
                {
                    this.state.relatedContents.map((content, idx) => {
                        return (
                            <div className="col-xs-3" key={"related_asset_" + idx}>
                                <div className="thumbnail">
                                    <Link to={'/articles/' + content.article.assetId + '/asset/' + content.image.assetId}><img width="100%" height="100%" className="relatedContent__thumbnail" src={content.image.href} alt="" /></Link>
                                    <div className="caption">
                                        <TagList tags={content.tags} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}


