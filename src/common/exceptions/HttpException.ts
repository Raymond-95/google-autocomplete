import BaseException, { Nullable } from "./BaseException"

export default class HttpException extends BaseException {
    constructor(
        status: Nullable<number | string> = "unknown",
        message: Nullable<string> = "unknown",
        url: Nullable<string> = "unknown",
        originalError: Nullable<object>
    ) {
        super(status, message, url, originalError)
        this._type = "HttpException"
    }
}

// Define a UnauthorizedException class
export class UnauthorizedException extends BaseException {
    constructor(message: string = 'Unauthorized access') {
        super(401, message, 'unknown', null);
        this._type = 'UnauthorizedException';
    }
}

// Define a TimeoutException class
export class TimeoutException extends BaseException {
    constructor(message: string = 'Request timed out') {
        super('timeout', message, 'unknown', null);
        this._type = 'TimeoutException';
    }
}