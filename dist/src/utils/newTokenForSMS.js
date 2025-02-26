"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTokenForSMS = void 0;
const common_1 = require("@nestjs/common");
async function newTokenForSMS() {
    try {
        const axios = require('axios');
        const FormData = require('form-data');
        const data = new FormData();
        data.append('email', 'shahbozmamatkarimov2303@gmail.com');
        data.append('password', 'rhU2fVYJvzx7qm75sGfBNcTgGwt0vwUthrdv3jBG');
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'notify.eskiz.uz/api/auth/login',
            headers: {
                ...data.getHeaders(),
            },
            data,
        };
        console.log(data);
        axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    catch (error) {
        throw new common_1.BadRequestException(error.message);
    }
}
exports.newTokenForSMS = newTokenForSMS;
//# sourceMappingURL=newTokenForSMS.js.map