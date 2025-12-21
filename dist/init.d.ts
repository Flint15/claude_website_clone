interface Message {
    sender: string;
    message: string;
}
interface Chats {
    id: string;
    name: string;
    messages: Message[];
}
export declare const chats: Chats[];
export declare const chatId: string | null;
export {};
//# sourceMappingURL=init.d.ts.map