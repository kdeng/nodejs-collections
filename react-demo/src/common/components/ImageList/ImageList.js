import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

require('./ImageList.css');

const ImageList = (props) => {

    if (_.isArray(props.images) && props.images.length > 0) {
        return (
            <div className="fluid-row imageList clearfix">
                {
                    props.images.map((image, idx) => {
                        return (
                            <div className="col-xs-3" key={'image__'+idx}>
                                <div className="thumbnail">
                                    <Link to={'/articles/' + props.articleId + '/asset/' + image.assetId}><img src={image.href} alt="" /></Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return null;


};


ImageList.propTypes = {

    images: React.PropTypes.array

};

export default ImageList;