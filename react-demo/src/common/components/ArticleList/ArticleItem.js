import React from 'react';
import _ from 'lodash';
import {Media} from 'react-bootstrap';
import TagList from '../TagList';
import { Link } from 'react-router';
export default (props) => {

    let tags = [];
    if (_.isArray(props.article.relatedAssets) && props.article.relatedAssets.length > 0) {
        _.each(props.article.relatedAssets, function (asset, index) {

            if (_.isArray(asset.contentTags) && asset.contentTags.length > 0) {
                _.each(asset.contentTags, function (tag) {

                    if (!_.includes(tags, tag.title)) {
                        tags.push(tag.title);
                    }

                });
            }

        });
    }

    return (
        <Media>
            <Media.Left>
                <Link className="articleList__header" to={'/articles/' + props.article.assetId}>
                    <img className="articleList__thumbnail" src={props.article.relatedAssets[0].href} height="60" width="60"/>
                </Link>
            </Media.Left>
            <Media.Body>
                <Media.Heading>
                    <Link className="articleList__header" to={'/articles/' + props.article.assetId}>{props.children}</Link>
                </Media.Heading>
                <TagList tags={tags} />
            </Media.Body>
        </Media>
    )

}
