import Relay from "react-relay";

export default class DeleteBookMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL `mutation DeleteBookMutation{deleteBook}`;
    }

    getVariables() {
        return {
            id: this.props.id
        };
    }

    getFatQuery() {
        return Relay.QL `
        fragment on DeleteBookPayload{
            deletedBookId,
            bookStore{
                books
            }
        }
    `;
    }

    getConfigs() {
        return [{
            type: "NODE_DELETE",
            parentName: "bookStore",
            parentID: this.props.bookStore.id,
            connectionName: "books",
            deletedIDFieldName: "deletedBookId"
        }];
    }
}
