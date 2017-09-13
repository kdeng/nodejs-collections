import findContentsByTags from './findContentsByTags';

const ImageService = {

    findContentsByTags: findContentsByTags,

    getAllTags: require('./getAllTags')

};

export default ImageService;