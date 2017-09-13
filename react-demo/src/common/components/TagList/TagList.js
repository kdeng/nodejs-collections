import React from 'react';

import _ from 'lodash';
import {Link} from 'react-router';

require('./styles.css');


export default class TagList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            linkable: this.props.linkable === true,
            tags: this.props.tags
        };
    }

    componentWillReceiveProps(nextProps) {

        // if (nextProps.params.assetId !== this.state.assetId || nextProps.params.articleId !== this.state.articleId) {
        //     this.fetch(nextProps.params.articleId, nextProps.params.assetId);
        // }
        let nextTags = _.sortBy(nextProps.tags).join(","),
            currentTags = _.sortBy(this.state.tags).join(",");
        if (nextTags !== currentTags) {
            this.setState({
                tags: nextProps.tags
            });
        }

    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     let nextTags = _.sortBy(nextProps.tags).join(","),
    //         currentTags = _.sortBy(this.state.tags).join(",");
    //     console.log("Next tags: " + nextTags);
    //     console.log("Current Tags: " + currentTags);
    //     if (nextTags !== currentTags) {
    //         this.setState({
    //             tags: nextProps.tags
    //         });
    //         return true;
    //     }
    // }

    render() {
        let linkable = this.state.linkable;
        return (
            <div className="ContentTagList clearfix">{
                this.state.tags.map(function (tag, tagIdx) {
                    let tagLabel = (<span className="label label-info">{tag}</span>);
                    return (
                        <div className="ContentTagList_ContentTagItem" key={'tag' + tagIdx}>
                            { linkable ? <Link to={'/tags/' + tag}>{tagLabel}</Link> : tagLabel }
                        </div>
                    );
                })
            }</div>
        )
    }
};