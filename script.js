const library = document.querySelector('#library')
const addButton = document.querySelector('#add-button')
const dialog = document.querySelector('#add-book')

addButton.addEventListener('click', () => {
  dialog.showModal()
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

function Book() {

}

function addBookToLibrary() {

}

function displayBooks() {
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