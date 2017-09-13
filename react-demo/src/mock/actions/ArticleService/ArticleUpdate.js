import {api, header} from '../../../config';
import _ from 'lodash';
export default ((articleId, articleEntry) => {

    fetch(`${api.article.post}\${articleId}`, {
        header: header,
        body: JSON.stringify(articleEntry)
    }.then((response) => {

        return response;

    }).catch((exception) => {
        console.group();
        console.log("Unexpected error from ArticleSearch");
        console.error(exception);
        console.groupEnd();
    }))

});