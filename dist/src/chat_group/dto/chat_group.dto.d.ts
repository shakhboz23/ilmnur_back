export declare enum ChatGroupType {
    private = "private",
    group = "group",
    channel = "channel"
}
export declare class ChatGroupDto {
    title: string;
    chat_type: ChatGroupType;
}
