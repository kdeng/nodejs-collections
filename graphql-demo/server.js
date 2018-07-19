var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

class RandomDie {
    constructor(numSides) {
        this.numSides = numSides;
    }

    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    roll({ numRolls }) {
        var output = [];
        for (var i = 0; i < numRolls; i++) {
            output.push(this.rollOnce());
        }
        return output;
    }
}

// 如果 Message 拥有复杂字段，我们把它们放在这个对象里面。
class Message {
    constructor(id, { content, author }) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}

// 使用 GraphQL Schema Language 创建一个 schema
var schema = buildSchema(`

    type User {
        id: String
        name: String
    }

    input MessageInput {
        content: String
        author: String
    }

    type Message {
        id: ID!
        content: String
        author: String
    }

    type Query {
        getDie(numSides: Int): RandomDie

        getMessage(id: ID!): Message

        user(id: String): User
    }

    type RandomDie {
        numSides: Int!
        rollOnce: Int!
        roll(numRolls: Int!): [Int]
    }

    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
    }

`);

var fakeDatabase = {
    'a': {
        id: 'a',
        name: 'alice',
    },
    'b': {
        id: 'b',
        name: 'bob',
    },
};

// root 将会提供每个 API 入口端点的解析函数
var root = {
    user: ({id}) => {
        return fakeDatabase[id];
    },

    getDie: function ({ numSides }) {
        return new RandomDie(numSides || 6);
    },

    getMessage: function ({ id }) {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id);
        }
        return new Message(id, fakeDatabase[id]);
    },
    createMessage: function ({ input }) {
        // Create a random id for our "database".
        var id = require('crypto').randomBytes(10).toString('hex');

        fakeDatabase[id] = input;
        return new Message(id, input);
    },
    updateMessage: function ({ id, input }) {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id);
        }
        // This replaces all old data, but some apps might want partial update.
        fakeDatabase[id] = input;
        return new Message(id, input);
    }

};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.use('/', express.static('static'))

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');