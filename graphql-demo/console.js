// get-start/console.js
var { graphql, buildSchema } = require('graphql');

//定义schema
var schema = buildSchema(`
    type User{
        name: String
        sex: String
        intro: String
    }
    type Query {
        user:User
    }
`);
//定义服务端数据
var root= {
    user: {
        name: 'aimar',
        sex: 'male',
        intro: 'haha'
    }
};
//解析查询
graphql(schema, '{\
        user{\
            name\
            intro\
        }\
    }', root).then((response) => {
    console.log(response);
});