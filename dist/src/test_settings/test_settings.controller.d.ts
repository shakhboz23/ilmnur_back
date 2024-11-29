import { Test_settingsService } from './test_settings.service';
import { Test_settingsDto } from './dto/test_settings.dto';
export declare class Test_settingsController {
    private readonly test_settingsService;
    constructor(test_settingsService: Test_settingsService);
    create(test_settingsDto: Test_settingsDto): Promise<object>;
    getById(id: number, class_name: number): Promise<object>;
    getAll(): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, test_settingsDto: Test_settingsDto, authHeader: string): Promise<object>;
    deleteTest_settings(id: number): Promise<object>;
}
