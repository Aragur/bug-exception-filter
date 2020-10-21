import { HttpStatus, ValidationError } from '@nestjs/common';

export enum ErrorCode {
    INTERNAL_SERVER_ERROR = 500,
}

export const ErrorString = new Map<number, string>();
ErrorString.set(ErrorCode.INTERNAL_SERVER_ERROR, 'Internal Server Error');

export interface IParameterKeyValuePair {
    key: string;
    value: unknown;
}

export class ApiError extends Error {
    public static InternalServerError(): ApiError {
        return this.ErrorConstructor(HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.INTERNAL_SERVER_ERROR);
    }

    private static ErrorConstructor(status: HttpStatus, code: ErrorCode, errors?: IApiSubError[], parameters?: IParameterKeyValuePair[]): ApiError {
        return new ApiError(status, code, ErrorString.get(code), errors, parameters);
    }
    public status: number;
    public statusText: string;
    public code: number;
    public timestamp: Date;
    public message: string;
    public errors: IApiSubError[];
    public parameters: IParameterKeyValuePair[];

    constructor(status: HttpStatus, code: ErrorCode, message?: string, errors?: IApiSubError[], parameters?: IParameterKeyValuePair[]) {
        super(message);

        this.timestamp = new Date();
        this.status = status;
        this.statusText = HttpStatus[status];
        this.message = message;
        this.code = code;
        this.errors = errors;
        this.parameters = parameters;

        const originalStack = this.stack.split('\n');
        // remove trace which is part of error creation
        originalStack.splice(1, 2);

        this.stack = originalStack.join('\n');

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    public getStatus(): number {
        return this.status;
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IApiSubError {}