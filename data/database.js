let books = [
    {
        "id": "1",
        "title": "Lady Midnight",
        "author": "Midnight man"

    }, {
        "id": "2",
        "title": "Midnight Children",
        "author": "Lady Gaga"
    }, {
        "id": "3",
        "title": "Parent and children",
        "author":"John children"
    }
];

let idCounter = 100;



export function addBook(title, author) {
    idCounter++;
    const book = {
        "id": "" + idCounter,
        "title": title,
        "author": author
    };

    books.push(book);
    return book;
}

function serachBookByFilter(filterBy, title, author) {
    const filteredBooks = books.filter((book) => {
        if (book.title.search(new RegExp(filterBy || title, "i")) >= 0 && book.author.search(new RegExp(filterBy || author, "i")) >= 0) {
            return true;
        } else {
            return false;
        }
    });

    if(filteredBooks){
        return filteredBooks;
    }else{
        return [];
    }
}

export function getBooks(filterBy, title, author) {

    if (filterBy || title || author) {
        return serachBookByFilter(filterBy, title, author);
    }
    return books;
}

export function deleteBook(id) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            return books.splice(i, 1);
        }
    }
}
