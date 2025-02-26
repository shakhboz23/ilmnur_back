"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifySalesmanForOrderSMSSchema = exports.orderCompleteSMSSchema = exports.otpCodeSMSSchema = exports.sendSMS = void 0;
const common_1 = require("@nestjs/common");
async function sendSMS(phone, message) {
    try {
        const axios = require('axios');
        const FormData = require('form-data');
        const data = new FormData();
        data.append('mobile_phone', phone);
        data.append('message', message);
        data.append('from', 'florify');
        data.append('callback_url', 'http://0000.uz/test.php');
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://notify.eskiz.uz/api/message/sms/send',
            headers: {
                ...data.getHeaders(),
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTYxODU4NTIsImlhdCI6MTcxMzU5Mzg1Miwicm9sZSI6InRlc3QiLCJzaWduIjoiZGRiNzc5NDM1OGMyNDgzYmFjMWFiYjEzNTkxMDYyMWE2MDJhZTJjMjczZWM3M2U4ZGQ2NjA0OWFiNGE5YWJmNiIsInN1YiI6IjcwODAifQ.81vIEsNdZu1Tkzz15jYwpFww-jsxOvqVvNycmTFNmiM',
            },
            data,
        };
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
exports.sendSMS = sendSMS;
function otpCodeSMSSchema(code) {
    return 'Sizning kod raqamingiz ' + code;
}
exports.otpCodeSMSSchema = otpCodeSMSSchema;
function orderCompleteSMSSchema(id) {
    return 'Sizning buyurtmangiz №' + id;
}
exports.orderCompleteSMSSchema = orderCompleteSMSSchema;
function notifySalesmanForOrderSMSSchema(id) {
    return 'Sizga ushbu order №' + id + ` bo'yicha yangi buyurtma kelib tushdi`;
}
exports.notifySalesmanForOrderSMSSchema = notifySalesmanForOrderSMSSchema;
//# sourceMappingURL=sendSMS.js.map