import React from "react";
import Relay from "react-relay";
import DeleteBookMutation from "../mutations/DeleteBookMutation";

class Book extends React.Component {

    deleteBook(event, id) {
        event.stopPropagation();
        console.log("Deleting Book with id: ", id);

        const onSuccess = (response) => {
            console.log("Mutation successful!: response: ", response);
        };
        const onFailure = (transaction) => {
            let error = transaction.getError() || new Error("Mutation failed.");
            console.error(error);
        };

        const mutation = new DeleteBookMutation({id: id, bookStore: this.props.bookStore});

        Relay.Store.commitUpdate(mutation, {onFailure, onSuccess});
    }
    highlightedText(text, higlight) {
        // Split on higlight term and include term into parts, ignore case
        let parts = text.split(new RegExp(`(${higlight})`, "gi"));
        return (<span> {parts.map((part, i) => 
            <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? {fontWeight: "bold"} : {}}>
                {part}
            </span>)
        } </span>);
    }
    render() {
        const {index, book, searchTitle, searchAuthor} = this.props;
        const {id, title, author} = book;
        return (
            <tr>
                <td>{index}</td>
                <td>{this.highlightedText(title, searchTitle)}</td>
                <td>{this.highlightedText(author, searchAuthor)}</td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={(event) => this.deleteBook(event, id)}>Delete</button>
                </td>
            </tr>
        );
    }
}

export default Relay.createContainer(Book, {
    fragments: {

        bookStore: () => Relay.QL `
            fragment on BookStore{
                id
            }
        `,
        
        book: () => Relay.QL `
        fragment book on Book {
            id,
            title,
            author
        }
        `
    }
});
