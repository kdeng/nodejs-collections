import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../App/App';

import HomePage from '../../../pages/Home';
import MoviePage from '../../../pages/Movie';
import NotFound from '../../../pages/NotFound';
import ImagePage from '../../../pages/Image';

import SearchPage from '../../../pages/Search';


import ArticleContainer from '../../../common/containers/Article';
import ArticleListContainer from '../../../common/containers/ArticleList';
import ImageContainer from '../../../common/containers/Image';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="search" component={SearchPage}/>
        <Route path="articles" component={ArticleListContainer}>
            <Route path=":articleId" component={ArticleContainer}>
                <Route path="asset/:assetId" component={ImageContainer}/>
            </Route>
        </Route>
        <Route path="*" component={NotFound}/>
    </Route>
);
