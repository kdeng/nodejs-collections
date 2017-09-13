import _ from 'lodash';

const ArticleUtils = {

    collectTagsFromArticle(articleInstance) {
        let tags = [];
        if (_.isArray(articleInstance.relatedAssets) && articleInstance.relatedAssets.length > 0) {
            _.each(articleInstance.relatedAssets, function (asset, index) {

                if (_.isArray(asset.contentTags) && asset.contentTags.length > 0) {
                    _.each(asset.contentTags, function (tag) {

                        if (!_.includes(tags, tag.title)) {
                            tags.push(tag.title);
                        }

                    });
                }

            });
        }
        return tags;
    }

};

export default ArticleUtils;