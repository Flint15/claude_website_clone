import { chats } from "./init.js"

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
    const userMessage = inputElement.value
    removeInitialContent()
    addMessage('user', userMessage)
    addMessage('llm', createLLMResponse(userMessage))
  }
})

const messagesContainer = document.querySelector<HTMLDivElement>('.messages-container')!

sendButton?.addEventListener('click', () => {
  const userMessage = inputElement.value
  removeInitialContent()
  addMessage('user', userMessage)
  addMessage('llm', createLLMResponse(userMessage))
  })

function removeInitialContent() {
  document.querySelector('.initial-content')?.remove()  
}

function addMessage(sender: string, message: string): void {
  const html = `
  <div class="${sender}-message">${message}</div>
  <div class="stretch-container"></div>
  `
  messagesContainer.innerHTML += html
  inputElement.value = ''
}

function createLLMResponse(message: string): string {
  const claudeResponse = message
  return claudeResponse
}

const newChatButton = document.querySelector<HTMLButtonElement>('.new-chat-link')
newChatButton?.addEventListener('click', () => {
  const chatsQuantity = chats.length

  chats.push({ name: `chat_${chatsQuantity}`, id: crypto.randomUUID(), messages: []})

  localStorage.setItem('chats', JSON.stringify(chats))
})