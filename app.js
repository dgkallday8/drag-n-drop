const input = document.querySelector('#input')
const addBtn = document.querySelector('#add-btn')
const startPlaceholder = document.querySelector('#start-placeholder')
const placeholders = document.querySelectorAll('.placeholder')

addBtn.addEventListener('click', addNewCardToStartPlaceholder)
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addNewCardToStartPlaceholder()
  }
})
let item = null

for (const placeholder of placeholders) {
  placeholder.addEventListener('dragover', dragOver)
  placeholder.addEventListener('dragenter', dragEnter)
  placeholder.addEventListener('dragleave', dragLeave)
  placeholder.addEventListener('drop', drop)
}

function getInputValue() {
  const value = input.value.trim()
  input.value = ''
  return value
}

function addNewCardToStartPlaceholder() {
  createNewCard()
  getAllCards()
}

function createNewCard() {
  const div = createElementWithClass('div', 'card')
  const span = createElementWithClass('span', 'close-card')
  const text = getInputValue()
  if (text) {
    div.textContent = text
    div.setAttribute('draggable', 'true')
    span.innerHTML = `<p>&times;</p>`
    startPlaceholder.append(div)
    div.append(span)
    div.classList.add('slide-in')
    span.onclick = () => {
      div.classList.add('slide-out')
      setTimeout(() => div.remove(), 900)
      getAllCards()
    }
  }
  return
}

function createElementWithClass(tagName, className) {
  const $el = document.createElement(tagName)
  $el.classList.add(className)
  return $el
}

function dragOver (e) {
  e.preventDefault()
}
function dragEnter (e) {
  e.target.classList.add('hovered')
}
function dragLeave (e) {
  e.target.classList.remove('hovered')
}
function drop (e) {
  e.target.classList.remove('hovered')
  e.target.append(item)
}

function getAllCards() {
  const cards = document.querySelectorAll('.card')
  for (const card of cards) {
    card.addEventListener('dragstart', dragStart)
    card.addEventListener('dragend', dragEnd)
  }
}

function dragStart(e) {
  item = e.target
  item.classList.remove('slide-in')
  e.target.classList.add('hold')
  setTimeout(() => e.target.classList.add('hide'), 0)
}

function dragEnd(e) {
  e.target.className = 'card'
}
