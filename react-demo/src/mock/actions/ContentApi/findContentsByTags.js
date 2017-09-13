import ArticleService from '../ArticleService';
import ArticleUtils from '../../../common/utils/Article';

import _ from 'lodash';

const FindContentsByTags = (tags, exclude) => {

    const excludeArticleAssetIds = [exclude];

    return new Promise((resolve, reject) => {

        ArticleService.list()
            .then((responseJson) => {
                let results = [],
                    allContents = responseJson.queryResults;

                _.each(allContents, (content) => {

                    if (!_.includes(excludeArticleAssetIds, ''+content.assetId)) {
                        let contentTags = ArticleUtils.collectTagsFromArticle(content),
                            priority = _.intersection(contentTags, tags);
                        // console.group();
                        // console.log("Current tags: " + JSON.stringify(tags));
                        // console.log("Content tags: " + JSON.stringify(contentTags));
                        // console.log("Intersection tags: " + JSON.stringify(priority));
                        // console.groupEnd();
                        if (priority.length > 0) {
                            results.push({
                                tags: contentTags,
                                article: content,
                                image: content.relatedAssets[0],
                                priority: priority.length
                            })
                        }
                    }

                });

                if (results.length > 1) {
                    _.sortBy(results, (o) => {
                        return o.priority * -1;
                    });
                }

                resolve(results);
            })
            .catch((error) => {
                console.group();
                console.log("Unexpected error from FindContentsByTags");
                console.error(error);
                console.groupEnd();
                reject(Error("Unexpected error from FindContentsByTags"));
            });
    })


};


export default FindContentsByTags;