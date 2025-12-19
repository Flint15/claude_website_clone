const sidebarButton = document.getElementById('ts-sidebar-button')
const sidebarElement = document.querySelector('aside')

if (sidebarButton) {
  sidebarButton?.addEventListener('click', () => {
    sidebarElement?.classList.toggle('closed')
  })
}

const inputElement = document.querySelector<HTMLInputElement>('#input-element')!
const sendButton = document.querySelector('.send-button')
const sendSVG = document.querySelector<SVGPathElement>('.arrow-icon path')

inputElement?.addEventListener('input', () => {
  if (inputElement.value && !sendButton?.classList.contains('active')) {
    sendButton?.classList.add('active')
    if (sendSVG) sendSVG.style.fill = '#ffffffff'
  } else if (!inputElement.value) {
    sendButton?.classList.remove('active')
    if (sendSVG) sendSVG.style.fill = '#9C9A92'
  }
})

inputElement.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    console.log(inputElement.value)
    removeInitialContent()
    addMessage(inputElement.value)
  }
})

const messagesContainer = document.querySelector<HTMLDivElement>('.messages-container')!

sendButton?.addEventListener('click', () => {
  console.log(inputElement.value)
    removeInitialContent()
    addMessage(inputElement.value)
})

function removeInitialContent() {
  document.querySelector('.initial-content')?.remove()  
}

function addMessage(message: string): void {
  const html = `
  <section class="user-message">${message}</section>
  `
  messagesContainer.innerHTML += html
  inputElement.value = ''
}