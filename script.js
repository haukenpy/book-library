const myLibrary = [];

const bookTable = document.querySelector("#book-table");
const dialogWindow = document.querySelector(".new-book-form");

function Book(id, title, author, pages, haveRead) {
  this.id = id;
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.haveRead = haveRead
};

Book.prototype.updateReadStatus = function() {
    if (this.haveRead == "Yes") {this.haveRead = "No"}
    else {this.haveRead = "Yes"};
}

function addBookToLibrary(newBook) {

    let bookExists = myLibrary.filter(function(book) {
        if (newBook.title === book.title) {return book}
    }); 
    
    if (bookExists.length < 1) {
        myLibrary.push(newBook)
        return newBook.id}
    else {alert("Book in library");}
}

function removeBookFromLibrary(book) {
    let bookIndex = myLibrary.indexOf(book);
    myLibrary.splice(bookIndex, 1);
}

function newTableRow(book) {

    let rowCount = bookTable.rows.length;
    let row = bookTable.insertRow(rowCount-1);
    row.id = book.id;

        row.insertCell(0).textContent = book.title;
        row.insertCell(1).textContent = book.author;
        row.insertCell(2).textContent = book.pages;
        let readStatus = row.insertCell(3);
        readStatus.textContent = book.haveRead;

        // Delete button to remove entry from table and array.

        let remButton = document.createElement("button");
        remButton.className = "remove-book";
        remButton.textContent = "Remove Book";
        remButton.addEventListener("click", function() {
            removeBookFromLibrary(book);
            remButton.closest("tr").remove();
        });
        row.insertCell(4).append(remButton);

        // Update button to change the readstatus.

        let updButton = document.createElement("button");
        updButton.className = "updateRead";
        updButton.textContent = "Have Read";
        updButton.addEventListener("click", function() {
            book.updateReadStatus();
            readStatus.textContent = book.haveRead;  
        });
        row.insertCell(5).append(updButton);
}

function uploadLibrary(library) {
    for (let book of library) {
        newTableRow(book);
    }
}

const modalButton = document.querySelector(".modal");
modalButton.addEventListener("click", function() {
    dialogWindow.showModal();
});

/* Add dummy values to test the table */

const bookOne = new Book(0, "Abba", "Dabba", 213, "Yes");
const bookTwo = new Book(1, "bok2", "author2", 312, "No");
addBookToLibrary(bookOne);
addBookToLibrary(bookTwo);

uploadLibrary(myLibrary);

const addBook = document.querySelector("#new-book");
addBook.addEventListener("click", () => {
    
    let index = myLibrary.length;
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let haveRead = document.querySelector("#have-read").value;
 
    //Ensure book does not exist in array
    let newBook = new Book(index, title, author, pages, haveRead);
    let bookId = addBookToLibrary(newBook);

    if (bookId) {newTableRow(newBook)};
    dialogWindow.close();
});

