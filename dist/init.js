import { addMessage, removeInitialContent } from "./index.js";
const storedChats = localStorage.getItem('chats');
export const chats = storedChats
    ? JSON.parse(storedChats)
    : [{
            id: crypto.randomUUID(),
            name: 'blue',
            messages: []
        }];
console.log(chats);
// Means that messages were't sended yet
export let messagesFlag = false;
export function liftMessagesFlag() {
    messagesFlag = true;
    localStorage.setItem('messagesFlag', 'true');
}
const url = new URLSearchParams(window.location.search);
export const currentChatId = url.get('chat_id')
    ||
        localStorage.getItem('currentNewChatId')
    ||
        chats[0]?.id;
renderCurrentChatHistory();
function renderCurrentChatHistory() {
    chats.forEach(chat => {
        if (chat.id === currentChatId) {
            if (chat.messages.length !== 0) {
                removeInitialContent();
                renderMessages(chat.messages);
                return;
            }
        }
    });
}
function renderMessages(messages) {
    messages.forEach(message => {
        addMessage(message.sender, message.message, true);
    });
}
renderChats();
function renderChats() {
    const chatsContainer = document.querySelector('.chats-container');
    let html = '';
    chats.toReversed().forEach(chat => {
        html += `
      <a
        class="chat can-focus ${chat.id === currentChatId ? 'current-chat' : ''}"
        href="./new.html?chat_id=${chat.id}">
        ${chat.name}
      </a>
    `;
    });
    if (chatsContainer) {
        chatsContainer.innerHTML = html;
    }
}
//# sourceMappingURL=init.js.map