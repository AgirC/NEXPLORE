//dependencies
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const graphql = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const { MongoClient } = require('mongodb');
//url for mongo
const url = 'mongodb://localhost:27017';

var cors = require('cors');
var app = express();
app.use(cors());

//define Duty type
const DutyType = new graphql.GraphQLObjectType({
    name: "Duty",
    fields: {
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString }
    }
});

//define query
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        //query for the list of duties
        duties: {
            type: graphql.GraphQLList(DutyType),
            resolve: (root, args, context, info) => {
                return new Promise((resolve, reject) => {
                    return MongoClient.connect(url, (err, client) => {
                        if (err) {
                            console.log(err)
                            reject(err);
                            client.close();
                        } else {
                            console.log(3)
                            const db = client.db('DutyDB');
                            const cursor = db.collection('Duty').find();
                            let duties = []
                            cursor.forEach((duty) => {
                                const newDuty = { id: duty.id, name: duty.name };
                                duties.push(newDuty)
                            }).then(() => {
                                resolve(duties);
                                console.log("duties", duties)
                                client.close();
                            })

                        }
                    });
                });
            }
        },
        duty: {
            type: DutyType,
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }
            },
            resolve: (root, { id }, context, info) => {
                return new Promise((resolve, reject) => {
                    MongoClient.connect(url, (err, client) => {
                        if (err) {
                            console.log(err)
                            reject(err);
                            client.close();
                        } else {
                            console.log(3)
                            const db = client.db('DutyDB');
                            db.collection('Duty').findOne({ 'id': id }, (err, result) => {
                                console.log(result)
                                resolve(result);
                                client.close();
                            });

                        }
                    });
                });
            }
        }
    }
});

//mutations for create, update and delete a duty
var mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createDuty: {
            type: DutyType,
            args: {
                name: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                }
            },
            resolve: (root, { name }) => {
                return new Promise((resolve, reject) => {
                    MongoClient.connect(url, (err, client) => {
                        if (err) {
                            console.log(err)
                            reject(err);
                            client.close();
                        } else {
                            const db = client.db('DutyDB');
                            const newDuty = {
                                'id': uuidv4(),
                                'name': name
                            }
                            console.log(newDuty)
                            db.collection('Duty').insertOne(
                                newDuty
                            ).then(() => {
                                client.close();
                                resolve(newDuty);

                            });
                        }
                    });
                });

            }
        },
        updateDuty: {
            type: DutyType,
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                name: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                }
            },
            resolve: (root, { id, name }) => {
                return new Promise((resolve, reject) => {
                    MongoClient.connect(url, (err, client) => {
                        if (err) {
                            reject(err);
                            client.close();
                        } else {
                            const db = client.db('DutyDB');
                            db.collection('Duty').updateOne(
                                {
                                    'id': id
                                },
                                {
                                    $set: { "name": name }
                                }
                            ).then((duty) => {
                                console.log("then, ", duty)
                                resolve(`contact id:${id} updated`);
                                client.close();
                            })

                        }
                    });
                });
            }
        },
        deleteDuty: {
            type: DutyType,
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                }
            },
            resolve: (root, { id }) => {
                return new Promise((resolve, reject) => {
                    MongoClient.connect(url, (err, client) => {
                        if (err) {
                            reject(err);
                            client.close();
                        } else {
                            const db = client.db('DutyDB');
                            db.collection('Duty').deleteOne({ 'id': id }).then((duty) => {
                                resolve(duty);
                                client.close();
                            })

                        }
                    })
                });

            }
        }
    }
});


// GraphQL schema
const schema = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));