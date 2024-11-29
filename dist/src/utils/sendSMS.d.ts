export declare function sendSMS(phone: string, message: string): Promise<void>;
export declare function otpCodeSMSSchema(code: string): string;
export declare function orderCompleteSMSSchema(id: number): string;
export declare function notifySalesmanForOrderSMSSchema(id: number): string;
