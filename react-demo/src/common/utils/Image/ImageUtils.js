import _ from 'lodash';

const ImageUtils = {

    collectTagsFromImage(imageInstance) {
        let tags = [];
        if (_.isObject(imageInstance) && _.isArray(imageInstance.contentTags) && imageInstance.contentTags.length > 0) {
            _.each(imageInstance.contentTags, function (tag, index) {
                if (!_.includes(tags, tag.title.toLowerCase())) {
                    tags.push(tag.title);
                }
            });
        }
        return tags;
    }

};

export default ImageUtils;