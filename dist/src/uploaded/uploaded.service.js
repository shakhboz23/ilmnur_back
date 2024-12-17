"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadedService = void 0;
const common_1 = require("@nestjs/common");
const uploaded_models_1 = require("./models/uploaded.models");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const files_service_1 = require("../files/files.service");
const axios_1 = require("axios");
let UploadedService = class UploadedService {
    constructor(uploadedRepository, jwtService, fileService) {
        this.uploadedRepository = uploadedRepository;
        this.jwtService = jwtService;
        this.fileService = fileService;
    }
    async getVideoDuration(youtube) {
        const apiKey = process.env.Youtube_key;
        const youtube_id = this.extractYoutubeId(youtube);
        try {
            const response = await axios_1.default.get(`https://www.googleapis.com/youtube/v3/videos?id=${youtube_id}&part=contentDetails&key=${apiKey}`);
            let duration = response.data.items[0].contentDetails.duration;
            return this.parseDuration(duration);
        }
        catch (error) {
            console.error('Error fetching video details:', error);
        }
    }
    extractYoutubeId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] || matches[2] : null;
    }
    parseDuration(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = parseInt(match[1], 10) || 0;
        const minutes = parseInt(match[2], 10) || 0;
        const seconds = parseInt(match[3], 10) || 0;
        return hours * 3600 + minutes * 60 + seconds;
    }
    async create(uploadedDto, file) {
        try {
            let data;
            if (uploadedDto.file_type != 'youtube') {
                const file_data = await this.fileService.createFile(file, uploadedDto.file_type);
                console.log(file_data.url);
                data = await this.uploadedRepository.create({
                    public_id: file_data.public_id,
                    duration: uploadedDto.duration ? Math.floor(file_data.duration) : null,
                    url: file_data.url,
                    file_type: uploadedDto.file_type,
                });
                console.log(data);
            }
            else {
                data = await this.uploadedRepository.create({
                    public_id: '1',
                    duration: 0,
                    url: uploadedDto.file1,
                    file_type: 'youtube',
                });
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Created successfully',
                data,
            };
        }
        catch (error) {
            console.log(error.message);
            return { statusCode: common_1.HttpStatus.BAD_REQUEST, error: error.message };
        }
    }
    async upload(uploadedDto, file) {
        try {
            const file_data = await this.fileService.createFile(file, uploadedDto.file_type);
            const data = await this.uploadedRepository.create({
                public_id: '1',
                duration: file_data.duration,
                url: file_data.url,
                file_type: uploadedDto.file_type,
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Created successfully',
                data,
            };
        }
        catch (error) {
            return { statusCode: common_1.HttpStatus.BAD_REQUEST, error: error.message };
        }
    }
    async getAll() {
        try {
            const uploaded = await this.uploadedRepository.findAll();
            return {
                statusCode: common_1.HttpStatus.OK,
                data: uploaded,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getById(public_id) {
        try {
            const uploaded = await this.uploadedRepository.findOne({
                where: { public_id },
            });
            if (!uploaded) {
                throw new common_1.NotFoundException('Uploaded not found');
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                data: uploaded,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async pagination(page) {
        try {
            const offset = (page - 1) * 10;
            const limit = 10;
            const classs = await this.uploadedRepository.findAll({ offset, limit });
            const total_count = await this.uploadedRepository.count();
            const total_pages = Math.ceil(total_count / 10);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                data: {
                    records: classs,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
            return response;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(id, updateDto) {
        try {
            const uploaded = await this.uploadedRepository.findByPk(id);
            if (!uploaded) {
                throw new common_1.NotFoundException('Uploaded not found');
            }
            const update = await this.uploadedRepository.update(updateDto, {
                where: { id },
                returning: true,
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Updated successfully',
                data: update[1][0],
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        try {
            const uploaded = await this.uploadedRepository.findByPk(id);
            if (!uploaded) {
                throw new common_1.NotFoundException('Uploaded not found');
            }
            uploaded.destroy();
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.UploadedService = UploadedService;
exports.UploadedService = UploadedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(uploaded_models_1.Uploaded)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        files_service_1.FilesService])
], UploadedService);
//# sourceMappingURL=uploaded.service.js.map