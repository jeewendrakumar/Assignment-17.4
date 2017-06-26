import Relay from "react-relay";

export default class AddBookMutation extends Relay.Mutation {

    /**
     * This method should return a GraphQL operation that represents
     * the mutation to be performed. This presumes that the server
     * implements a mutation type named AddBookMutation.
     */

    getMutation() {
        return Relay.QL `mutation AddBookMutation{addBook}`;
    }

    /**
     * Use this method to prepare the variables that will be used as
     * input to the mutation. Our AddBookMutation mutation takes exactly
     * one variable as input – the title of the Book.
     */
    getVariables() {
        return {title: this.props.title, author: this.props.author};
    }

    /**
     * Use this method to design a ‘fat query’ – one that represents every field in your data
     * model that could change as a result of this mutation.
     * Relay will intersect this query with a ‘tracked query’ that represents the data that your application actually uses,
     * and instruct the server to include only those fields in its response.
     */
    getFatQuery() {
        return Relay.QL `
        fragment on AddBookPayload{
            bookStore{
                books
            }
            bookEdge
        }
    `;
    }

    /**
     * These configurations advise Relay on how to handle the AddBookPayload returned by the server.
     * Here, we tell Relay to use the payload to add a edge, "booEdge" in books connection.
     */

    getConfigs() {
        return [
            {
                type: "RANGE_ADD",
                parentName: "bookStore",
                parentID: this.props.bookStore.id,
                connectionName: "books",
                edgeName: "bookEdge",
                rangeBehaviors: {
                    "": "append"
                }
            }
        ];
    }
}
