export declare enum ChatGroupType {
    private = "private",
    group = "group",
    channel = "channel"
}
export declare class ChatGroupDto {
    course_id: number;
    group_id: number;
    chat_type: ChatGroupType;
}
