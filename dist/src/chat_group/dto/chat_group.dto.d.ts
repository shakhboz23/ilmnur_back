export declare enum ChatGroupType {
    private = "private",
    group = "group",
    channel = "channel"
}
export declare class ChatGroupDto {
    title: string;
    group_id: number;
    chat_type: ChatGroupType;
}
