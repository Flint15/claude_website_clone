import { removeInitialContent, renderMessage } from "./chat.js"
import { liftMessagesFlag } from "./flags.js"

interface Chat{
  chatId: string
  name: string
  messages: Message[]
}

interface Message{
  sender: string
  message: string
}

const url = new URLSearchParams(window.location.search)
export let currentChatId: string
currentChatId = url.get('chat-id') || ''

const storedChats = localStorage.getItem('chats')
const chats: Chat[] = storedChats
  ? JSON.parse(storedChats)
  : []
console.log(chats)

if (url.get('chat-id')) {
  renderMessages(currentChatId)
  liftMessagesFlag()
}

export function createNewChat() {
  const chatId = crypto.randomUUID()
  window.history.replaceState({}, "", `?chat-id=${chatId}`)
  currentChatId = chatId

  storedNewChat(chatId)
  renderChat(chatId)
}

function storedNewChat(chatId: string) {
  chats.push({
    chatId,
    name: `chat_${chats.length}`,
    messages: []
  })
  storeChats()
}

renderChat(currentChatId)
function renderChat(chatId: string) {
  const chatsContainer = document.querySelector('.chats-container')
  let html = ``
  console.log(chats, currentChatId)
  chats.toReversed().forEach(chat => {
    html += `
      <a
        class="chat can-focus ${chat.chatId === currentChatId  ? 'current-chat' : ''}"
        href="./new.html?chat-id=${chat.chatId}">
        ${chat.name}
      </a>
    `
  })
  chatsContainer!.innerHTML = html
}

export function storeMessage(sender: string, message: string) {
  console.log(chats, currentChatId)
  chats.forEach(chat => {
    if (chat.chatId === currentChatId) {
      chat.messages.push({
        sender,
        message
      })
    }
  })
  storeChats()
}

function storeChats() {
  localStorage.setItem('chats', JSON.stringify(chats))
}

function renderMessages(currentChatId: string) {
  removeInitialContent()
  chats.forEach(chat => {
    if (chat.chatId === currentChatId) {
      chat.messages.forEach(message => {
        renderMessage(message.message, message.sender)
      })
    }
  })
}