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
const form = document.querySelector('form')
let titleValue = ''
let authorValue = ''
let pagesValue = 1
let categoryValue = ''
let isReadValue = false

addButton.addEventListener('click', () => {
  dialog.showModal()
})

saveButton.addEventListener('click', (e) => {
  e.preventDefault()
  addBookToLibrary()
  dialog.close()
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

const myLibrary = [
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'fiction',
    pages: 295,
    isRead: false
  },
  {
    title: 'Ready Player One',
    author: 'Ernest Cline',
    category: 'fiction',
    pages: 480,
    isRead: true
  },
  {
    title: 'Habitos Atomicos',
    author: 'James Clear',
    category: 'nonfiction',
    pages: 336,
    isRead: true
  },
]

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
  console.log(newBook)
  resetValues()
  displayBooks()
}

function resetValues() {
  titleValue = ''
  authorValue = ''
  categoryValue = ''
  pagesValue = 1
  isReadValue = false
  form.reset()
}

function displayBooks() {
  library.innerHTML = ''
  myLibrary.forEach(book => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.classList.add(book.category === 'fiction' ? 'fiction' : 'nonfiction')
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
  })
}

displayBooks()