import React from "react";

export default class Header extends React.Component {

    openBookDrawer = () => {
        this.props.openBookDrawer();
    }

    render() {
        return (
            <div className="header">
                <h1>Book Store</h1>
                <button className="btn btn-primary float-right" onClick={this.openBookDrawer}>Add Book</button>
            </div>
        );
    }
}
