const library = document.querySelector('#library')
const addButton = document.querySelector('#add-button')
const dialog = document.querySelector('#add-book')
const inputTitle = document.querySelector('#input-title')
const inputAuthor = document.querySelector('#input-author')
const inputPages = document.querySelector('#input-pages')
const inputToRead = document.querySelector('#radio-to-read')
const inputRead = document.querySelector('#radio-read')
const inputFiction = document.querySelector('#radio-fiction')
const inputNonFiction = document.querySelector('#radio-nonfiction')
const saveButton = document.querySelector('#saveButton')
const cancelButton = document.querySelector('#cancelButton')
const form = document.querySelector('form')
let titleValue = ''
let authorValue = ''
let pagesValue = 1
let categoryValue = ''
let isReadValue = false
let isEditing = false
let index = ''
let myLibrary = []

addButton.addEventListener('click', () => {
  dialog.showModal()
  cancelButton.textContent = 'Cancel'
})

saveButton.addEventListener('click', (e) => {
  e.preventDefault()

  if (!isEditing) {
    addBookToLibrary()
  } else {
    saveChanges(index)
  }

  dialog.close()
  isEditing = false
})

cancelButton.addEventListener('click', () => {
  if (isEditing) {
    deleteBook(index)
    resetValues()
    dialog.close()
  } else {
    dialog.close()
  }
})

inputTitle.addEventListener('change', () => {
  titleValue = inputTitle.value
})

inputAuthor.addEventListener('change', () => {
  authorValue = inputAuthor.value
})

inputPages.addEventListener('change', () => {
  pagesValue = inputPages.value
})

inputToRead.addEventListener('change', () => {
  isReadValue = false
})

inputRead.addEventListener('change', () => {
  isReadValue = true
})

inputFiction.addEventListener('change', () => {
  categoryValue = 'fiction'
})

inputRead.addEventListener('change', () => {
  categoryValue = 'nonfiction'
})

function Book(title, author, category, pages, isRead) {
  this.title = title
  this.author = author
  this.category = category
  this.pages = pages
  this.isRead = isRead
}

function addBookToLibrary() {
  const newBook = new Book(titleValue, authorValue, categoryValue, pagesValue, isReadValue)
  myLibrary.push(newBook)
  resetValues()
  displayBooks()
}

function editBook() {
  dialog.showModal()
  cancelButton.textContent = 'Delete'
  titleValue = myLibrary[index].title
  authorValue = myLibrary[index].author
  pagesValue = myLibrary[index].pages
  inputTitle.value = myLibrary[index].title
  inputAuthor.value = myLibrary[index].author
  inputPages.value = myLibrary[index].pages

}

function saveChanges(indexBook) {
  myLibrary[indexBook].title = titleValue
  myLibrary[indexBook].author = authorValue
  myLibrary[indexBook].category = categoryValue
  myLibrary[indexBook].pages = pagesValue
  myLibrary[indexBook].isRead = isReadValue
  resetValues()
  displayBooks()
}

function deleteBook(indexBook) {
  const booksFiltered = myLibrary.filter((book, i) => i != indexBook)
  myLibrary = booksFiltered
  resetValues()
  displayBooks()
}

function resetValues() {
  titleValue = ''
  authorValue = ''
  categoryValue = ''
  pagesValue = 1
  isReadValue = false
  index = ''
  isEditing = false
  form.reset()
}

function displayBooks() {
  library.innerHTML = ''
  myLibrary.forEach((book, index) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.classList.add(book.category === 'fiction' ? 'fiction' : 'nonfiction')
    card.setAttribute('data-index', index)
    const title = document.createElement('h3')
    title.classList.add('title')
    title.textContent = book.title
    const author = document.createElement('p')
    author.classList.add('author')
    author.textContent = book.author
    const pages = document.createElement('p')
    pages.classList.add('pages')
    pages.textContent = book.pages
    const status = document.createElement('p')
    status.classList.add('status')
    status.textContent = book.isRead ? 'Read' : 'To read'

    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(pages)
    card.appendChild(status)
    library.appendChild(card)

    addEvents()
  })
}

function addEvents() {
  const cards = document.querySelectorAll('.card')

  cards.forEach(card => {
    card.addEventListener('click', () => {
      isEditing = true
      index = card.getAttribute('data-index')
      editBook()
    })
  })
}

!library.innerHTML ? displayBooks() : null
