import React from "react";

import styles from "./style.css";

import ArticleList from '../../common/containers/ArticleList';
import Article from '../../common/components/Article';

import _ from 'lodash';

export default class HomePage extends React.Component {
    render() {
        return (
            <ArticleList showMore={true} />
        );
    }
}
