interface Message {
    sender: string;
    message: string;
}
export interface Chat {
    id: string;
    name: string;
    messages: Message[];
}
export declare const chats: Chat[];
export declare let messagesFlag: boolean;
export declare function liftMessagesFlag(): void;
export declare const currentChatId: string | undefined;
export {};
//# sourceMappingURL=init.d.ts.map