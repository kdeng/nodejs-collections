import ArticleService from '../ArticleService';
import ArticleUtils from '../../../common/utils/Article';

import _ from 'lodash';

const GetAllTags = () => {

    return new Promise((resolve, reject) => {

        ArticleService.list()
            .then((responseJson) => {
                let results = [],
                    allContents = responseJson.queryResults;

                _.each(allContents, (content) => {
                    let tags = ArticleUtils.collectTagsFromArticle(content);
                    results = _.union(results, tags);
                });

                resolve(_.uniq(results));
            })
            .catch((error) => {
                console.group();
                console.log("Unexpected error from GetAllTags");
                console.error(error);
                console.groupEnd();
                reject(Error("Unexpected error from GetAllTags"));
            });
    })


};


export default GetAllTags;