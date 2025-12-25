import { changeChatName, createNewChat, storeMessage } from "./chats.js"
import { liftMessagesFlag, messagesFlag } from "./flags.js"
import { currentChatId } from "./init.js"
import { createLLMResponse } from "./llm.js"

const inputElement = document.querySelector<HTMLInputElement>('#input-element')
const sendButton = document.querySelector('.send-button')
const sendSVG = document.querySelector<SVGPathElement>('.arrow-icon path')
const messagesContainer = document.querySelector<HTMLDivElement>('.messages-container')!
const renameOverlay = document.querySelector('.rename-overlay-container')
const renameInput = document.querySelector<HTMLInputElement>('.rename-input')

let currentRenameChatId: string

addInputElementListeners()
addSendButtonListener()
addRenameChatButtonsListeners()

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

export function addChatSettingsListener() {
  document.querySelectorAll('.chat-settings-button')
    .forEach(settings => {
      settings.addEventListener('click', () => {
        const setting = settings as HTMLButtonElement
        const settingsChatId = setting.dataset.buttonChatId
        const drowpdownMenu = document
          .querySelector(`.dropdown-menu-chat-id-${settingsChatId}`)

        settings.classList.toggle('active')
        drowpdownMenu?.classList.toggle('active')
      })
    })
  console.log('Chat settings listeners were added')
}

export function addRenameChatListener() {
  document.querySelectorAll('.rename-chat-button')
    .forEach(button => {
      button.addEventListener('click', () => {
        const currentButton = button as HTMLElement
        
        currentRenameChatId = currentButton.dataset.chatId as string
        
        displayRenameOverlay()      
      })
    })
  console.log('Listeners for rename buttons were added')
}

function displayRenameOverlay() {
  renameOverlay?.classList.add('active')
}

function addRenameChatButtonsListeners() {
  document.querySelector('.cancel-rename')
    ?.addEventListener('click', () => {
      renameOverlay?.classList.remove('active')
    })
  document.querySelector('.save-rename')
    ?.addEventListener('click', () => {
      changeChatName(currentRenameChatId, renameInput?.value as string)
      renameInput!.value = ''
      renameOverlay?.classList.remove('active')
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
