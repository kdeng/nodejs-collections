var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

// Maps id to User object
var fakeDatabase = {
};

for (var i = 1; i <= 1000; i++) {
  if (i % 4 === 0) {
    fakeDatabase[i] = {
      id: i,
      name: `Robot #${i}`,
      address: {
        street: `Post Street name with ${i}`,
        number: i * 10,
        name: `name ${i}`
      }
    }
  } else {
    fakeDatabase[i] = {
      id: i,
      name: `Robot #${i}`,
      address: {
        street: `Post Street name with ${i}`,
        number: i * 10,
        apartment: `Apartment Building`
      }
    }
  }
}

console.log(`There are [${Object.keys(fakeDatabase).length}] person`)

class Address {
  constructor(street, number) {
    this.street = street;
    this.number = number;
  }}

class PostAddress extends Address {
  constructor(street, number, apartment) {
    super(street, number);
    this.apartment = apartment;
  }
}

class BillAddress extends Address {
  constructor(street, number, name) {
    super(street, number);
    this.name = name;
  }
}

const AddressType = new graphql.GraphQLInterfaceType({
  name: 'Address',
  fields: {
    street: { type: graphql.GraphQLString },
    number: { type: graphql.GraphQLInt },
  },
  resolveType: function(value) {
    return value.name ? BillAddressType : PostAddressType;
  }
})

const PostAddressType = new graphql.GraphQLObjectType({
  name: "PostAddress",
  interfaces: [ AddressType ],
  fields: {
    street: { type: graphql.GraphQLString },
    number: { type: graphql.GraphQLInt },
    apartment: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    formatted: {
      type: graphql.GraphQLString,
      resolve(object) {
        return object.apartment + ' -> ' + object.number + ' ' + object.street
      }
    }
  },
  isTypeOf: (value) => value.apartment ? PostAddress : Address
})

const BillAddressType = new graphql.GraphQLObjectType({
  name: "BillAddress",
  interfaces: [ AddressType ],
  fields: {
    street: { type: graphql.GraphQLString },
    number: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    formatted: {
      type: graphql.GraphQLString,
      resolve(object) {
        return object.name + " -> " + object.number + ' ' + object.street
      }
    }
  },
  isTypeOf: (value) => value.name ? BillAddress : Address
})

const PersonType = new graphql.GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    address: { type: PostAddressType }
  }
});

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: PersonType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: function (_, { id }) {
        console.log(`Lookup user by ID [${id}]`);
        return fakeDatabase[id];
      }
    }
    // ,
    // users: {
    //   type: new graphql.GraphQLList(PersonType),
    //   resolve: function() {
    //     return Object.values(fakeDatabase);
    //   }
    // }
  }
});

const schema = new graphql.GraphQLSchema({ query: queryType, types: [PersonType, PostAddressType, BillAddressType] });

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');