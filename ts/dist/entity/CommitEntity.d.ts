import { GithubRestEntityBase } from '../GithubRestEntityBase';
import type { GithubRestSDK } from '../GithubRestSDK';
import type { Control } from '../types';
import type { Commit, CommitListMatch } from '../GithubRestTypes';
declare class CommitEntity extends GithubRestEntityBase<Commit> {
    constructor(client: GithubRestSDK, entopts: any);
    make(this: CommitEntity): CommitEntity;
    list(this: any, reqmatch?: CommitListMatch, ctrl?: Control): Promise<CommitEntity[]>;
}
export { CommitEntity };
