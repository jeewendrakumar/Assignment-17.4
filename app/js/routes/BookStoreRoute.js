import Relay from "react-relay";

export default class BookStoreRoute extends Relay.Route {
    static routeName = "BookStoreRoute";
    static queries = {
        bookStore: () => Relay.QL `
            query{
                bookStore
            }
        `
    };
}
