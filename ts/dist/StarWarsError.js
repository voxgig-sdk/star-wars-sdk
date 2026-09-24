"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarWarsError = void 0;
class StarWarsError extends Error {
    isStarWarsError = true;
    sdk = 'StarWars';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.StarWarsError = StarWarsError;
//# sourceMappingURL=StarWarsError.js.map