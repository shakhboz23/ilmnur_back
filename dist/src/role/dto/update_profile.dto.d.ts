import { GenderType } from '../../role/models/role.models';
export declare class UpdateProfileDto {
    image: string;
    name: string;
    surname: string;
    subjects: string[];
    class: string[][];
    region: string;
    district: string;
    school_number: number;
    gender: GenderType;
    get_answered: boolean;
    new_task: boolean;
    chat_messages: boolean;
}
