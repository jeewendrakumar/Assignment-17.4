import React from "react";
import Relay from "react-relay";
import Books from "./Books";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {searchTitle: "", searchAuthor:""};
    }
    handleSearch = () => {
        //const filterBy = event.target.value;
        this.setState({"searchTitle": this.searchTitle.value, "searchAuthor": this.searchAuthor.value});
    }
    render() {
        /* Data passed by parent component can be received in child using 'props' */
        const {bookStore, deleteBook} = this.props;
        const {searchTitle, searchAuthor} = this.state;

        return (
            <div className="container">
                <input type="text" ref={c => this.searchTitle = c} className="form-control" placeholder="Enter Title" onChange={this.handleSearch}/>
                <input type="text" ref={c => this.searchAuthor = c} className="form-control" placeholder="Enter Author Name" onChange={this.handleSearch}/>
                <br/>
                <Books searchTitle={searchTitle} searchAuthor={searchAuthor} bookStore={bookStore} deleteBook={deleteBook}/>
            </div>
        );
    }
}

export default Relay.createContainer(Home, {
    fragments: {
        bookStore: () => Relay.QL `
        fragment on BookStore {
            ${Books.getFragment("bookStore")}
        }
        `
    }
});
