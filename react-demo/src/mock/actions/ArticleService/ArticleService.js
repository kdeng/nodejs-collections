
import ArticleGet from './ArticleGet';
import ArticleList from './ArticleList';
import ArticleUpdate from './ArticleUpdate';

const ArticleService = {
    list: ArticleList,
    get: ArticleGet,
    update: ArticleUpdate
};

// export {
//     ArticleGet as get,
//     ArticleUpdate as update
// };

export default ArticleService;