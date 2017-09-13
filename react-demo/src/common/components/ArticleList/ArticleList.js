import React from 'react';
import ArticleItem from './ArticleItem';
require('./ArticleList.css');

export default (props) => {

    if (props.articles.length > 0) {
        return (<div className="ArticleList">
            {props.articles.map((item, index) => {
                return (
                    <ArticleItem id={item.id} key={'article_' + index} article={item}>
                        {item.headline}
                    </ArticleItem>
                )
            })}
        </div>)
    } else {
        return null;
    }
}
