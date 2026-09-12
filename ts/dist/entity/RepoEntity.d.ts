import { GithubRestEntityBase } from '../GithubRestEntityBase';
import type { GithubRestSDK } from '../GithubRestSDK';
import type { Control } from '../types';
import type { Repo, RepoLoadMatch, RepoListMatch } from '../GithubRestTypes';
declare class RepoEntity extends GithubRestEntityBase<Repo> {
    constructor(client: GithubRestSDK, entopts: any);
    make(this: RepoEntity): RepoEntity;
    load(this: any, reqmatch?: RepoLoadMatch, ctrl?: Control): Promise<RepoEntity>;
    list(this: any, reqmatch?: RepoListMatch, ctrl?: Control): Promise<RepoEntity[]>;
}
export { RepoEntity };
