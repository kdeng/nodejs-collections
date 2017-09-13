import React from 'react';

import {browserHistory} from 'react-router';

require('./styles.css');
import Search from '../../common/components/Search';

export default class SearchPage extends React.Component {

    render() {
        return (
            <div className="row">
                <Search/>
            </div>
        );
    }
}