interface Chat {
    chatId: string;
    name: string;
    messages: Message[];
}
interface Message {
    sender: string;
    message: string;
}
export declare let currentChatId: string;
export declare const chats: Chat[];
export declare function changeCurrentChatId(chatId: string): void;
export {};
//# sourceMappingURL=init.d.ts.map