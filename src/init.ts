interface Message {
  sender: string
  message: string
}

interface Chats {
  id: string
  name: string
  messages: Message[]
}

const storedChats = localStorage.getItem('chats')

export const chats: Chats[] = storedChats
? (JSON.parse(storedChats) as Chats[])
: [{ 
  id: crypto.randomUUID(),
  name: 'blue',
  messages: []
}]
console.log(chats)

// Means that messages were't sended yet
export let messagesFlag: boolean = false

export function liftMessagesFlag() {
  messagesFlag = true
  localStorage.setItem('messagesFlag', 'true')
}

const url = new URLSearchParams(window.location.search)
export const chatId = url.get('chat_id')

const chatsContainer = document.querySelector<HTMLDivElement>('.chats-container')

let html = ''
chats.forEach(chat => {
  html += `
    <a class="chat can-focus" href="./new.html?chat_id=${chat.id}">
      ${chat.name}
    </a>
  `
})

if (chatsContainer) {
  chatsContainer.innerHTML = html
}