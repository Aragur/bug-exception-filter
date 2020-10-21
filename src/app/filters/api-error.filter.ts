import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { ApiError } from '../utils/api.error';
import { FastifyReply } from 'fastify';

@Catch(ApiError)
export class ApiErrorFilter implements ExceptionFilter {

    private logger = new Logger(ApiErrorFilter.name);

    catch(exception: ApiError, host: ArgumentsHost): void {
        this.logger.error(`${exception.code} : ${exception.message}`);
        if(exception.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(exception.stack);
        }
        const response: FastifyReply = host.switchToHttp().getResponse();
        response.status(exception.status).send(exception);
    }
}