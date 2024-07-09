function Book(title, author, numberOfPages) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = false; 
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

const book1 = new Book('Sam I am', 'Dr. Suess', '25');
const book2 = new Book('Catcher on the Rye', 'JD Salinger', '277');
const book3 = new Book('Fight Club','Chuck Palanuik','208');

const library = [book1, book2, book3];

function renderLibrary() {
    const bookListContainer = document.getElementById('booklist');
    bookListContainer.innerHTML = '';

    for (let i = 0; i < library.length; i++) {
        const book = library[i];
        const listItem = document.createElement("li");
        const bookDetails = `${book.title}\n${book.author}\n${book.numberOfPages} pages`;
        listItem.textContent = bookDetails;
        listItem.setAttribute('data-index', i);

        const toggleButton = document.createElement("button");
        toggleButton.textContent = book.read ? "Read" : "Unread";
        toggleButton.className = "read-button"
        listItem.appendChild(toggleButton);

        toggleButton.addEventListener('click', function() {
            book.toggleReadStatus();
            renderLibrary();

        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-button"
        listItem.appendChild(removeButton);

        removeButton.addEventListener('click', function() {
            const index = listItem.getAttribute('data-index');
            RemoveBookButton(index);
        });


        bookListContainer.appendChild(listItem);
    }
}

function AddBook() {
    const bname = document.getElementById('bname').value;
    const aname = document.getElementById('aname').value;
    const pageNums = document.getElementById('pageNums').value;
    const readBook = document.getElementById('readBook').checked;
    const newBook = new Book(bname, aname, pageNums);
    newBook.read = readBook;
    library.push(newBook);

    renderLibrary();
}

function RemoveBookButton(index) {
    library.splice(index, 1);
    renderLibrary();
}

renderLibrary();

