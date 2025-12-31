import { renderChats, renderMessages, storeChats } from "./chats.js";
import { liftMessagesFlag } from "./flags.js";
const url = new URLSearchParams(window.location.search);
export let currentChatId = url.get('chat-id') || '';
console.log(currentChatId);
const storedChats = localStorage.getItem('chats');
export let chats = storedChats
    ? JSON.parse(storedChats)
    : [];
console.log(chats);
renderChats();
if (currentChatId) {
    renderMessages(currentChatId);
    liftMessagesFlag();
    document.querySelector('.content')
        ?.classList.add('messages-filled');
}
export function deleteChatFromChats(chatId) {
    chats = chats.filter(chat => chat.chatId !== chatId);
    console.log(`Chat with id-"${chatId}" was deleted`);
    renderChats('delete chat');
    storeChats();
    if (currentChatId === chatId) {
        window.location.replace('./new.html');
    }
}
export function changeCurrentChatId(chatId) {
    currentChatId = chatId;
}
//# sourceMappingURL=init.js.map