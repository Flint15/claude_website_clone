import { addChatSettingsListener } from "./chat.js"
import { renderChats, renderMessages } from "./chats.js"
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
console.log(currentChatId)

const storedChats = localStorage.getItem('chats')
export const chats: Chat[] = storedChats
  ? JSON.parse(storedChats)
  : []
console.log(chats)

renderChats(currentChatId)

export function changeCurrentChatId(chatId: string) {
  currentChatId = chatId
}

if (url.get('chat-id')) {
  renderMessages(currentChatId)
  liftMessagesFlag()
}

