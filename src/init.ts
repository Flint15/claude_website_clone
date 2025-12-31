import { renderChats, renderMessages, storeChats } from "./chats.js"
import { liftMessagesFlag } from "./flags.js"

export interface Chat{
  chatId: string
  name: string
  messages: Message[]
  starred: boolean
}

interface Message{
  role: string
  content: string
}

const url = new URLSearchParams(window.location.search)
export let currentChatId: string = url.get('chat-id') || ''
console.log(currentChatId)

const storedChats = localStorage.getItem('chats')
export let chats: Chat[] = storedChats
  ? JSON.parse(storedChats)
  : []
console.log(chats)

renderChats()
if (currentChatId) {
  renderMessages(currentChatId)
  liftMessagesFlag()
  document.querySelector('.content')
    ?.classList.add('messages-filled')
}

export function deleteChatFromChats(chatId: string) {
  chats = chats.filter(chat => chat.chatId !== chatId)

  console.log(`Chat with id-"${chatId}" was deleted`)
  renderChats('delete chat')
  storeChats()

  if (currentChatId === chatId) {
    window.location.replace('./new.html')
  }
}

export function changeCurrentChatId(chatId: string) {
  currentChatId = chatId
}