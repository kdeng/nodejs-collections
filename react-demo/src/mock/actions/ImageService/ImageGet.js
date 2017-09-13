import {api, header} from '../../../config';
import _ from 'lodash';


export default ((articleId, assetId) => {
    return new Promise((resolve, reject) => {
        fetch(api.article.get, {
            header: header
        }).then((response) => {
            return response.json();
        }).then((responseJson) => {
            let selectedArticle = _.find(responseJson.queryResults, function(item) {
                return item.assetId == articleId;
            });

            if (_.isObject(selectedArticle) && _.isArray(selectedArticle.relatedAssets)) {
                let selectedAsset = _.find(selectedArticle.relatedAssets, function(asset) {
                    return asset.assetId == assetId;
                });
                resolve(selectedAsset);
            } else {
                resolve(null);
            }
        }).catch((exception) => {
            console.group();
            console.log("Unexpected error from ArticleSearch");
            console.error(exception);
            console.groupEnd();
            reject(Error("Unexpected error from ArticleSearch"));
        });
    })



});