import { createNewChat, currentChatId, storeMessage } from "./chats.js"
import { liftMessagesFlag, messagesFlag } from "./flags.js"
import { createLLMResponse } from "./llm.js"

const inputElement = document.querySelector<HTMLInputElement>('#input-element')
const sendButton = document.querySelector('.send-button')
const sendSVG = document.querySelector<SVGPathElement>('.arrow-icon path')
const messagesContainer = document.querySelector<HTMLDivElement>('.messages-container')!

addInputElementListeners()
addSendButtonListener()

function addInputElementListeners() {
  inputElement?.addEventListener('input', () => {
    if (inputElement.value && !sendButton?.classList.contains('active')) {
      sendButton?.classList.add('active')
      if (sendSVG) sendSVG.style.fill = '#ffffffff'
    } else if (!inputElement.value) {
      sendButton?.classList.remove('active')
      if (sendSVG) sendSVG.style.fill = '#9C9A92'
    }
  })

  inputElement?.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      const userMessage = inputElement.value
      displayMessages(userMessage)
    }
  })
}

function addSendButtonListener() {
  sendButton?.addEventListener('click', () => {
    const userMessage = inputElement?.value
      displayMessages(userMessage as string)
    })
}

function displayMessages(message: string) {
  console.log(currentChatId)
  if (!messagesFlag) {
    liftMessagesFlag()
    removeInitialContent()
    createNewChat()
    console.log('Messages were sended')
  } else {
    console.log('Messages were already sended before')
  }
  
  console.log(currentChatId)

  const llmResponse = createLLMResponse(message)
  renderMessage(message)
  renderMessage(llmResponse, 'llm')

  storeMessage('user', message)
  storeMessage('llm', llmResponse)
}

export function removeInitialContent() {
  document.querySelector('.initial-content')?.remove()  
  console.log('Initial content was deleted')
}

export function renderMessage(message: string, sender: string = 'user') {
  const html = `
  <div class="${sender}-message">${message}</div>
  <div class="stretch-container"></div>
  `
  messagesContainer.innerHTML += html
  inputElement!.value = ''
}
