import { removeInitialContent, renderMessage } from "./chat.js";
import { liftMessagesFlag } from "./flags.js";
const url = new URLSearchParams(window.location.search);
export let currentChatId;
currentChatId = url.get('chat-id') || '';
const storedChats = localStorage.getItem('chats');
const chats = storedChats
    ? JSON.parse(storedChats)
    : [];
console.log(chats);
if (url.get('chat-id')) {
    renderMessages(currentChatId);
    liftMessagesFlag();
}
export function createNewChat() {
    const chatId = crypto.randomUUID();
    window.history.replaceState({}, "", `?chat-id=${chatId}`);
    currentChatId = chatId;
    storedNewChat(chatId);
    renderChat(chatId);
}
function storedNewChat(chatId) {
    chats.push({
        chatId,
        name: `chat_${chats.length}`,
        messages: []
    });
    storeChats();
}
renderChat(currentChatId);
function renderChat(chatId) {
    const chatsContainer = document.querySelector('.chats-container');
    let html = ``;
    console.log(chats, currentChatId);
    chats.toReversed().forEach(chat => {
        html += `
      <div class="chat-container ${chat.chatId === currentChatId ? 'current-chat' : ''}">
        <a
          class="chat"
          href="./new.html?chat-id=${chat.chatId}">
          ${chat.name}
        </a>
        <button class="chat-settings">
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#F3F3F3"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
        </button>
      </div>
    `;
    });
    chatsContainer.innerHTML = html;
}
export function storeMessage(sender, message) {
    console.log(chats, currentChatId);
    chats.forEach(chat => {
        if (chat.chatId === currentChatId) {
            chat.messages.push({
                sender,
                message
            });
        }
    });
    storeChats();
}
function storeChats() {
    localStorage.setItem('chats', JSON.stringify(chats));
}
function renderMessages(currentChatId) {
    removeInitialContent();
    chats.forEach(chat => {
        if (chat.chatId === currentChatId) {
            chat.messages.forEach(message => {
                renderMessage(message.message, message.sender);
            });
        }
    });
}
//# sourceMappingURL=chats.js.map