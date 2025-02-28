document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to the New Project');
    displayBooks();

    const newBookBtn = document.getElementById('new-book-btn');
    const newBookForm = document.getElementById('new-book-form');

    newBookBtn.addEventListener('click', () => {
        newBookForm.style.display = 'block';
    });

    newBookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;
        addBookToLibrary(title, author, pages, read);
        newBookForm.reset();
        newBookForm.style.display = 'none';
    });
});

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function displayBooks() {
    const libraryContainer = document.getElementById('library-container');
    libraryContainer.innerHTML = ''; // Clear previous content

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const bookInfo = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <button class="toggle-read-btn" data-index="${index}">Toggle Read Status</button>
            <button class="remove-book-btn" data-index="${index}">Remove</button>
        `;

        bookCard.innerHTML = bookInfo;
        libraryContainer.appendChild(bookCard);
    });

    const toggleReadButtons = document.querySelectorAll('.toggle-read-btn');
    toggleReadButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            myLibrary[index].toggleReadStatus();
            displayBooks();
        });
    });

    const removeButtons = document.querySelectorAll('.remove-book-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            removeBookFromLibrary(index);
        });
    });
}
