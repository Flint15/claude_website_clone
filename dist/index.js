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
        console.log(inputElement.value);
        removeInitialContent();
        addMessage(inputElement.value);
    }
});
const messagesContainer = document.querySelector('.messages-container');
sendButton === null || sendButton === void 0 ? void 0 : sendButton.addEventListener('click', () => {
    console.log(inputElement.value);
    removeInitialContent();
    addMessage(inputElement.value);
});
function removeInitialContent() {
    var _a;
    (_a = document.querySelector('.initial-content')) === null || _a === void 0 ? void 0 : _a.remove();
}
function addMessage(message) {
    const html = `
  <div class="user-message">${message}</div>
  <div class="stretch-container"></div>
  `;
    messagesContainer.innerHTML += html;
    inputElement.value = '';
}
export {};
//# sourceMappingURL=index.js.map