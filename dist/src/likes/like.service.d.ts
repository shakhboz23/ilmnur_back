import { Like } from './models/like.models';
import { LikeDto } from './dto/like.dto';
import { UserService } from '../user/user.service';
import { UploadedService } from '../uploaded/uploaded.service';
export declare class LikeService {
    private likeRepository;
    private readonly userService;
    private uploadedService;
    constructor(likeRepository: typeof Like, userService: UserService, uploadedService: UploadedService);
    create(likeDto: LikeDto): Promise<object>;
    getAll(): Promise<object>;
    getById(id: number): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, likeDto: LikeDto): Promise<object>;
    delete(id: number): Promise<object>;
}
