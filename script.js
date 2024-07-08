
class libBook {
   constructor(id, title, author, pages, haveRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
   }

   updateReadStatus() {
    if (this.haveRead == "Yes") {this.haveRead = "No"}
    else {this.haveRead = "Yes"};
   }
}

class bookLibrary{
    constructor(){
        this.library = [];
    }

    addBookToLibrary(newBook) {
        let bookExists = this.library.filter(function(book) {
            if (newBook.title === book.title) {return book}
        })

        if (bookExists.length < 1) {
            this.library.push(newBook)
            return newBook.id}
            else {alert("Book is already in library");
            }
    }

    removeBookFromLibrary(book) {
        let bookIndex = this.library.indexOf(book);
        this.library.splice(bookIndex, 1);
    }
}

const libraryModule = function() {

    const bkLibrary = new bookLibrary();

    // DOM elements
    const bookTable = document.querySelector("#book-table");
    const dialogWindow = document.querySelector(".new-book-form");
    const modalButton = document.querySelector(".modal");
    const addBook = document.querySelector("#new-book");

    // Bind to elements
    modalButton.addEventListener("click", hideDialog.bind(this));
    addBook.addEventListener("click", addNewBook) 
    
    // Functions
    function addNewBook() {

        // DOM selectors
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = document.querySelector("#pages").value;
        let haveRead = document.querySelector("#have-read").value;

        let index = bkLibrary.library.length;
     
        //Ensure book does not exist in array
        let newBook = new libBook(index, title, author, pages, haveRead);
        let bookId = bkLibrary.addBookToLibrary(newBook);
        
        if (bookId !== undefined) {newTableRow(newBook)};
        dialogWindow.close();
    }

    function hideDialog() {
        dialogWindow.showModal();
    }

    function newTableRow(book) {

        // Define index for new row.
        let rowCount = bookTable.rows.length;
        let row = bookTable.insertRow(rowCount-1);
        row.id = book.id;

        // Add cell values
        row.insertCell(0).textContent = book.title;
        row.insertCell(1).textContent = book.author;
        row.insertCell(2).textContent = book.pages;
        let readStatus = row.insertCell(3);
        readStatus.textContent = book.haveRead;     

        // Button to remove book from Library
        let remButton = document.createElement("button");
        remButton.className = "remove-book";
        remButton.textContent = "Remove Book";
        remButton.addEventListener("click", function() {
            bkLibrary.removeBookFromLibrary(book);
            remButton.closest("tr").remove();
        });
        row.insertCell(4).append(remButton);

        // Button to update readStatus of row
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

    /* Add dummy values to test the table */
    const bookTwo = new libBook(1, "bok2", "author2", 312, "No");
    const bookOne = new libBook(0, "Abba", "Dabba", 213, "Yes");
    bkLibrary.addBookToLibrary(bookOne);
    bkLibrary.addBookToLibrary(bookTwo);

    uploadLibrary(bkLibrary.library);

}();
