import React from 'react';
import {Link} from 'react-router';
require('./Search.css');

import SearchForm from './SearchForm';

import ContentApi from '../../../mock/actions/ContentApi';

import {Media} from 'react-bootstrap';

import TagList from '../TagList';


export default class SearchByTagsComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.doSearch = this.performSearch.bind(this);
        this.state = {
            didSearch: false,
            contents: []
        }
    }

    performSearch = (tags) => {
        console.log("Search : " + tags);
        if (!_.isEmpty(tags)) {
            this.fetchSearch(tags);
        }
    };

    fetchSearch = (tags) => {
        let _this = this;
        ContentApi.findContentsByTags(tags.split(/[\s,]+/)).then((response) => {
            _this.setState({
                didSearch: true,
                contents: response
            });
        });
    };

    render() {
        return (
            <div className="container SearchBlock">
                <div className="row SearchBlock__SearchForm">
                    <SearchForm doSearch={this.doSearch}/>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        { this.state.didSearch ? 'Search results:' : '' }
                        {
                            this.state.didSearch && this.state.contents.map((content, idx) => {
                                return (
                                    <Media key={'media__' + idx}>
                                        <Media.Left>
                                            <Link to={'/articles/' + content.article.assetId}><img src={content.image.href} alt="" width="64" height="64"/></Link>
                                        </Media.Left>
                                        <Media.Body>
                                            <Media.Heading>
                                                <Link to={'/articles/' + content.article.assetId}>{content.article.headline}</Link>
                                            </Media.Heading>
                                            <TagList tags={content.tags} />
                                        </Media.Body>
                                    </Media>
                                )
                            })
                        }
                    </div>
                </div>
            </div>


        )
    }

}