import { GithubRestEntityBase } from '../GithubRestEntityBase';
import type { GithubRestSDK } from '../GithubRestSDK';
import type { Control } from '../types';
import type { Branch, BranchListMatch } from '../GithubRestTypes';
declare class BranchEntity extends GithubRestEntityBase<Branch> {
    constructor(client: GithubRestSDK, entopts: any);
    make(this: BranchEntity): BranchEntity;
    list(this: any, reqmatch?: BranchListMatch, ctrl?: Control): Promise<BranchEntity[]>;
}
export { BranchEntity };
