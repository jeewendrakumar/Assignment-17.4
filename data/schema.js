import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID} from "graphql";

import {
    globalIdField,
    fromGlobalId,
    toGlobalId,
    connectionDefinitions,
    connectionArgs,
    connectionFromArray,
    nodeDefinitions,
    mutationWithClientMutationId,
    cursorForObjectInConnection
} from "graphql-relay";

import {getBooks, addBook, deleteBook} from "./database";

let {nodeInterface, nodeField} = nodeDefinitions((globalId) => {
    let {type} = fromGlobalId(globalId);
    switch (type) {
        case "BookStore":
            return bookStore;
        default:
            return null;
    }

}, (obj) => {

    if (obj instanceof BookStore) {
        return bookStoreType;
    }
    return null;
});

let bookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => toGlobalId("Book", obj.id)
        },
        title: {
            type: GraphQLString
        },
        author: {
            type: GraphQLString
        }
    })
});

const bookConnection = connectionDefinitions({name: "Book", nodeType: bookType});

const bookStoreType = new GraphQLObjectType({
    name: "BookStore",
    interfaces: [nodeInterface],
    fields: () => ({
        id: globalIdField("BookStore"),
        "books": {
            type: bookConnection.connectionType,
            args: {
                ...connectionArgs,
                filterBy: {
                    type: GraphQLString
                },
                title:{
                    type: GraphQLString
                },
                author:{
                    type: GraphQLString
                }
            },
            resolve: (_, args) => {
                const {filterBy, title, author} = args;
                return connectionFromArray(getBooks(filterBy, title, author), args);
            }
        }
    })
});

class BookStore {}
const bookStore = new BookStore();

const query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        node: nodeField,
        bookStore: {
            type: bookStoreType,
            resolve: () => (bookStore)
        }
    })
});


const addBookMutation = mutationWithClientMutationId({
    name: "AddBook",
    inputFields: {
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        author: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    //This define the Payload fragment.
    outputFields: {
        bookEdge: {
            type: bookConnection.edgeType,
            resolve: (book) => {
                const edge = {
                    cursor: cursorForObjectInConnection(getBooks(), book),
                    node: book
                };
                return edge;
            }
        },

        bookStore: {
            type: bookStoreType,
            resolve: () => bookStore
        }
    },
    mutateAndGetPayload: ({title, author}) => {
        const addedBook = addBook(title, author);
        console.log("addedBook: ", addedBook);
        return addedBook;
    }
});


const deleteBookMutation = mutationWithClientMutationId({
    name: "DeleteBook",
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    outputFields: {
        deletedBookId: {
            type: GraphQLID,
            resolve: ({id}) => id
        },
        bookStore: {
            type: bookStoreType,
            resolve: () => bookStore
        }
    },
    mutateAndGetPayload: ({id}) => {
        let {id: localId} = fromGlobalId(id);
        deleteBook(localId);
        return {id};
    }
});


const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({addBook: addBookMutation, deleteBook: deleteBookMutation})
});

export default new GraphQLSchema({query, mutation});
