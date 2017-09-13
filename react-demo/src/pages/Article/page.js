import React from 'react';
import {Route, IndexRoute} from 'react-router';

require('./style.css');

import ArticleList from '../../common/containers/ArticleList';
import Article from '../../common/containers/Article';

export default (
    <Route path="/" component={ArticleList}>
        <IndexRoute component={ArticleList}/>
        <Route path="/articles/:articleId" component={Article}/>
    </Route>
);