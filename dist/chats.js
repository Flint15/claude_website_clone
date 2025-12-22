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
      <a
        class="chat can-focus ${chat.chatId === currentChatId ? 'current-chat' : ''}"
        href="./new.html?chat-id=${chat.chatId}">
        ${chat.name}
      </a>
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