"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubRestError = void 0;
class GithubRestError extends Error {
    isGithubRestError = true;
    sdk = 'GithubRest';
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
exports.GithubRestError = GithubRestError;
//# sourceMappingURL=GithubRestError.js.map