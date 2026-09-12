import { GithubRestEntityBase } from '../GithubRestEntityBase';
import type { GithubRestSDK } from '../GithubRestSDK';
import type { Control } from '../types';
import type { Pull, PullLoadMatch, PullListMatch, PullCreateData } from '../GithubRestTypes';
declare class PullEntity extends GithubRestEntityBase<Pull> {
    constructor(client: GithubRestSDK, entopts: any);
    make(this: PullEntity): PullEntity;
    load(this: any, reqmatch?: PullLoadMatch, ctrl?: Control): Promise<PullEntity>;
    list(this: any, reqmatch?: PullListMatch, ctrl?: Control): Promise<PullEntity[]>;
    create(this: any, reqdata?: PullCreateData, ctrl?: Control): Promise<PullEntity>;
}
export { PullEntity };
