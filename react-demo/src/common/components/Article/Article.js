import React from 'react';
import TagList from '../TagList';
import ImageList from '../ImageList';
import {Media} from 'react-bootstrap';

export default (props) => {
    return (
        <div className="article">
            <h2 className="h2 h2--header article__introduction">{props.headline}</h2>
            <TagList linkable={true} tags={props.tags}></TagList>
            <ImageList articleId={props.articleId} images={props.relatedAssets}/>
        </div>
    )
}
