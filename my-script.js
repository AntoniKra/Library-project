const container = document.getElementById("bookContainer");
let myLibrary = [];
const dialog = document.getElementById("bookDialog");
const addButton = document.getElementById("addBookButton");
const submitButton = document.getElementById("submitButton");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");
const readInput = document.getElementById("readInput");
const inputContainer = document.getElementById("inputContainer");
const readTrue = document.getElementById("readTrue");
const readFalse = document.getElementById("readFalse");

addButton.addEventListener("click", () => {
  dialog.showModal();
});

inputContainer.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;

  if (readTrue.checked) {
    read = readTrue.value === "true";
  } else if (readFalse.checked) {
    read = readFalse.value === "true";
  }

  addBookToLibrary(title, author, pages, read);

  inputContainer.reset();
  dialog.close();
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  getReadStatus() {
    if (this.read === true) {
      return "Book has been read";
    } else {
      return "Book has not been read";
    }
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);
  displayBooks();
}

addBookToLibrary("muminmki", "jonny depp", "299", false);
addBookToLibrary("mumifghbmki", "jonny depp", "229", false);
addBookToLibrary("mumifghbmki", "jonny depp", "229", false);
addBookToLibrary("mumifghbmki", "jonny depp", "229", false);
addBookToLibrary("mumifghbmki", "jonny depp", "229", false);

function displayBooks() {
  container.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card-element");

    const title = document.createElement("h3");
    title.classList.add("title-element");
    title.textContent = `Title: ${myLibrary[i].title}`;

    const author = document.createElement("p");
    author.classList.add("author-element");
    author.textContent = `Author: ${myLibrary[i].author}`;

    const pages = document.createElement("p");
    pages.classList.add("pages-element");
    pages.textContent = `Pages: ${myLibrary[i].pages}`;

    const read = document.createElement("p");
    read.classList.add("read-element");
    read.textContent = myLibrary[i].getReadStatus();

    const id = document.createElement("p");
    id.classList.add("id-element");
    id.textContent = `Uniq ID: ${myLibrary[i].id}`;

    const label = document.createElement("label");
    label.textContent = "Did you read? YES or NO";

    const toggle = document.createElement("input");
    toggle.classList.add("toggle");
    toggle.type = "checkbox";
    toggle.checked = myLibrary[i].read;
    toggle.addEventListener("click", () => {
      myLibrary[i].toggleReadStatus();

      displayBooks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Remove Book";
    deleteButton.addEventListener("click", () => {
      removeFromLibrary(myLibrary[i].id);
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(id);
    card.appendChild(deleteButton);
    card.appendChild(label);
    card.appendChild(toggle);
    container.appendChild(card);
  }
}

displayBooks();

function removeFromLibrary(idToRemove) {
  myLibrary = myLibrary.filter((book) => book.id !== idToRemove);

  displayBooks();
}
