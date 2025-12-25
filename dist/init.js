import { addChatSettingsListener } from "./chat.js";
import { renderChats, renderMessages } from "./chats.js";
import { liftMessagesFlag } from "./flags.js";
const url = new URLSearchParams(window.location.search);
export let currentChatId;
currentChatId = url.get('chat-id') || '';
console.log(currentChatId);
const storedChats = localStorage.getItem('chats');
export const chats = storedChats
    ? JSON.parse(storedChats)
    : [];
console.log(chats);
renderChats(currentChatId);
export function changeCurrentChatId(chatId) {
    currentChatId = chatId;
}
if (url.get('chat-id')) {
    renderMessages(currentChatId);
    liftMessagesFlag();
}
//# sourceMappingURL=init.js.map