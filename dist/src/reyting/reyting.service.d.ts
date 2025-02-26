import { Reyting } from './models/reyting.models';
import { ReytingDto } from './dto/reyting.dto';
export declare class ReytingService {
    private reytingRepository;
    constructor(reytingRepository: typeof Reyting);
    create(reytingDto: ReytingDto, user_id: number): Promise<object>;
    getAll(subject_id: number, group_id: number, user_id: number): Promise<object>;
    pagination(page: number, limit: number): Promise<object>;
    delete(id: number): Promise<object>;
}
