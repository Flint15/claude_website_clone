interface Chats {
  name: string
}

const storedChats = localStorage.getItem('chats')

export const chats: Chats[] = storedChats
  ? (JSON.parse(storedChats) as Chats[])
  : [{ name: 'blue' }]

const chatsContainer = document.querySelector<HTMLDivElement>('.chats-container')

let html = ''
chats.forEach(chat => {
  html += `
    <a class="chat can-focus" href="./new.html">${chat.name}</a>
  `
})

if (chatsContainer) {
  chatsContainer.innerHTML = html
}