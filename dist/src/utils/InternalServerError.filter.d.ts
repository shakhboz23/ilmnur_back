import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export default class InternalServerErrorExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): void;
}
