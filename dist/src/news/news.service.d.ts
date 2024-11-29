import { HttpStatus } from '@nestjs/common';
import { News } from './models/news.model';
import { NewsDto } from './dto/news.dto';
export declare class NewsService {
    private readonly NewsRepository;
    constructor(NewsRepository: typeof News);
    create(newsDto: NewsDto): Promise<{
        status: HttpStatus;
        data: News;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
    findAll(page: number): Promise<{
        status: HttpStatus;
        data: News[];
    } | {
        status: HttpStatus;
        error: any;
    }>;
    getGroupNews(newsgroup_id: number, page: number): Promise<{
        status: HttpStatus;
        data: {
            records: News[];
            pagination: {
                currentPage: number;
                total_pages: number;
                total_count: number;
            };
        };
    } | {
        status: HttpStatus;
        error: any;
    }>;
    findAllId(): Promise<News[] | {
        status: HttpStatus;
        error: any;
    }>;
    findById(id: string): Promise<{
        status: HttpStatus;
        data: News;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
    delete(id: string): Promise<{
        status: HttpStatus;
        data: string;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
}
