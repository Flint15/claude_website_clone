import { chats } from "./init.js";
const sidebarButton = document.getElementById('ts-sidebar-button');
const sidebarElement = document.querySelector('aside');
if (sidebarButton) {
    sidebarButton === null || sidebarButton === void 0 ? void 0 : sidebarButton.addEventListener('click', () => {
        sidebarElement === null || sidebarElement === void 0 ? void 0 : sidebarElement.classList.toggle('closed');
    });
}
const inputElement = document.querySelector('#input-element');
const sendButton = document.querySelector('.send-button');
const sendSVG = document.querySelector('.arrow-icon path');
inputElement === null || inputElement === void 0 ? void 0 : inputElement.addEventListener('input', () => {
    if (inputElement.value && !(sendButton === null || sendButton === void 0 ? void 0 : sendButton.classList.contains('active'))) {
        sendButton === null || sendButton === void 0 ? void 0 : sendButton.classList.add('active');
        if (sendSVG)
            sendSVG.style.fill = '#ffffffff';
    }
    else if (!inputElement.value) {
        sendButton === null || sendButton === void 0 ? void 0 : sendButton.classList.remove('active');
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
sendButton === null || sendButton === void 0 ? void 0 : sendButton.addEventListener('click', () => {
    const userMessage = inputElement.value;
    removeInitialContent();
    addMessage('user', userMessage);
    addMessage('llm', createLLMResponse(userMessage));
});
function removeInitialContent() {
    var _a;
    (_a = document.querySelector('.initial-content')) === null || _a === void 0 ? void 0 : _a.remove();
}
function addMessage(sender, message) {
    const html = `
  <div class="${sender}-message">${message}</div>
  <div class="stretch-container"></div>
  `;
    messagesContainer.innerHTML += html;
    inputElement.value = '';
}
function createLLMResponse(message) {
    const claudeResponse = message;
    return claudeResponse;
}
const newChatButton = document.querySelector('.new-chat-link');
newChatButton === null || newChatButton === void 0 ? void 0 : newChatButton.addEventListener('click', () => {
    const chatsQuantity = chats.length;
    chats.push({ name: `chat_${chatsQuantity}`, id: crypto.randomUUID(), messages: [] });
    localStorage.setItem('chats', JSON.stringify(chats));
});
//# sourceMappingURL=index.js.map