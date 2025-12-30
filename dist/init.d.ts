export interface Chat {
    chatId: string;
    name: string;
    messages: Message[];
    starred: boolean;
}
interface Message {
    sender: string;
    message: string;
}
export declare let currentChatId: string;
export declare let chats: Chat[];
export declare function deleteChatFromChats(chatId: string): void;
export declare function changeCurrentChatId(chatId: string): void;
export {};
//# sourceMappingURL=init.d.ts.map