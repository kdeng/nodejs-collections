
const ENDPOINTS = {

    /**
     *
     */
    article: {
        get : '//localhost:8080/api/articles.json',
        list: '//localhost:8080/api/articles.json',
        post: '//localhost:8080/api/article',

        // get : 'https://staging-nzcms.fairfaxmedia.co.nz/services/content/v1/article/',
        // post: 'https://staging-nzcms.fairfaxmedia.co.nz/services/content/v1/article/',
        // get: '//localhost:4502/services/content/v1/article?q=(indexIntroText%3Dmatch%3D"messi")&offset=0&limit=45&orderby=assetId&direction=asc',
        // list: '//dev.stuff.co.nz:81/api/content/v1/article?q=(indexIntroText=match=%22messi%22)&offset=0&limit=45&orderby=assetId&direction=asc',
    }

};

const HEADER = {
    'Accept': 'application/json',
    "Allow-Headers": "Content-Type",
    // 'Authorization': 'Basic Ympvcm4uYW5kZXJzc29uOnBhc3N3b3JkMQ=='
    'Authorization': 'Basic YWRtaW46YWRtaW4='
};


export {ENDPOINTS as api, HEADER as header};