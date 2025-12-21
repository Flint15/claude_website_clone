const storedChats = localStorage.getItem('chats');
export const chats = storedChats
    ? JSON.parse(storedChats)
    : [{
            id: crypto.randomUUID(),
            name: 'blue',
            messages: []
        }];
console.log(chats);
// Define did messages was sended in the current chat or not
// If chat is new => storedMessagesFlag = false, storedMessagesFlag = true otherwise
const storedMessagesFlag = localStorage.getItem('messagesFlag');
export let messagesFlag;
if (storedMessagesFlag === 'true') {
    messagesFlag = true;
}
else {
    messagesFlag = false;
}
export function liftMessagesFlag() {
    messagesFlag = true;
    localStorage.setItem('messagesFlag', 'true');
}
const url = new URLSearchParams(window.location.search);
export const chatId = url.get('chat_id');
const storedChat = localStorage.getItem('chat');
const chatsContainer = document.querySelector('.chats-container');
let html = '';
chats.forEach(chat => {
    html += `
    <a class="chat can-focus" href="./new.html?chat_id=${chat.id}">
      ${chat.name}
    </a>
  `;
});
if (chatsContainer) {
    chatsContainer.innerHTML = html;
}
//# sourceMappingURL=init.js.map