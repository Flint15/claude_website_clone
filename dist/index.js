import { chats, currentChatId, liftMessagesFlag, messagesFlag } from "./init.js";
const sidebarButton = document.getElementById('ts-sidebar-button');
const sidebarElement = document.querySelector('aside');
if (sidebarButton) {
    sidebarButton?.addEventListener('click', () => {
        sidebarElement?.classList.toggle('closed');
    });
}
const inputElement = document.querySelector('#input-element');
const sendButton = document.querySelector('.send-button');
const sendSVG = document.querySelector('.arrow-icon path');
inputElement?.addEventListener('input', () => {
    if (inputElement.value && !sendButton?.classList.contains('active')) {
        sendButton?.classList.add('active');
        if (sendSVG)
            sendSVG.style.fill = '#ffffffff';
    }
    else if (!inputElement.value) {
        sendButton?.classList.remove('active');
        if (sendSVG)
            sendSVG.style.fill = '#9C9A92';
    }
});
inputElement.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        const userMessage = inputElement.value;
        removeInitialContent();
        addMessage('user', userMessage);
        addMessage('llm', createLLMResponse(userMessage));
    }
});
const messagesContainer = document.querySelector('.messages-container');
sendButton?.addEventListener('click', () => {
    const userMessage = inputElement.value;
    removeInitialContent();
    addMessage('user', userMessage);
    addMessage('llm', createLLMResponse(userMessage));
});
export function removeInitialContent() {
    document.querySelector('.initial-content')?.remove();
}
export function addMessage(sender, message, renderExistedMessages = false) {
    liftMessagesFlag();
    const html = `
  <div class="${sender}-message">${message}</div>
  <div class="stretch-container"></div>
  `;
    messagesContainer.innerHTML += html;
    inputElement.value = '';
    if (renderExistedMessages) {
        return;
    }
    chats.forEach(chat => {
        if (chat.id === currentChatId) {
            console.log(chat);
            chat.messages.push({
                sender,
                message
            });
        }
    });
    localStorage.setItem('chats', JSON.stringify(chats));
}
function createLLMResponse(message) {
    const claudeResponse = message;
    return claudeResponse;
}
const newChatButton = document.querySelector('.new-chat-link');
newChatButton?.addEventListener('click', () => {
    const chatsQuantity = chats.length;
    if (!messagesFlag) {
        return;
    }
    const chatId = crypto.randomUUID();
    chats.push({ id: chatId, name: `chat_${chatsQuantity}`, messages: [] });
    localStorage.setItem('chats', JSON.stringify(chats));
    localStorage.setItem('currentNewChatId', chatId);
});
//# sourceMappingURL=index.js.map