"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Token {
    getToken(request) {
        if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
            return request.headers.authorization.split(' ')[1];
        }
        else if (request.query && request.query.token) {
            return request.query.token;
        }
        else if (request.cookies && request.cookies.authorization) {
            return request.cookies.authorization;
        }
        return '';
    }
}
exports.default = Token;
