import {api, header} from '../../../config';
import _ from 'lodash';


export default ((articleId) => {
    return new Promise((resolve, reject) => {

        fetch(api.article.list, {
            header: header
        }).then((response) => {

            resolve(response.json());

        }).catch((exception) => {

            console.group();
            console.log("Unexpected error from ArticleList");
            console.error(exception);
            console.groupEnd();
            reject(Error("Unexpected error from ArticleList"));

        });

    })
});