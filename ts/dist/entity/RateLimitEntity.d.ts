import { GithubRestEntityBase } from '../GithubRestEntityBase';
import type { GithubRestSDK } from '../GithubRestSDK';
import type { Control } from '../types';
import type { RateLimit, RateLimitLoadMatch } from '../GithubRestTypes';
declare class RateLimitEntity extends GithubRestEntityBase<RateLimit> {
    constructor(client: GithubRestSDK, entopts: any);
    make(this: RateLimitEntity): RateLimitEntity;
    load(this: any, reqmatch?: RateLimitLoadMatch, ctrl?: Control): Promise<RateLimitEntity>;
}
export { RateLimitEntity };
