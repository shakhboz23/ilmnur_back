import { Test_settings } from './models/test_settings.models';
import { Test_settingsDto } from './dto/test_settings.dto';
export declare class Test_settingsService {
    private test_settingsRepository;
    constructor(test_settingsRepository: typeof Test_settings);
    create(test_settingsDto: Test_settingsDto): Promise<object>;
    getAll(): Promise<object>;
    getById(id: number): Promise<object>;
    getByLessonId(id: number): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, test_settingsDto: Test_settingsDto, user_id: number): Promise<object>;
    delete(id: number): Promise<object>;
}
