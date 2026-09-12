import { GithubRestEntityBase } from '../GithubRestEntityBase';
import type { GithubRestSDK } from '../GithubRestSDK';
import type { Control } from '../types';
import type { Gist, GistListMatch, GistCreateData } from '../GithubRestTypes';
declare class GistEntity extends GithubRestEntityBase<Gist> {
    constructor(client: GithubRestSDK, entopts: any);
    make(this: GistEntity): GistEntity;
    list(this: any, reqmatch?: GistListMatch, ctrl?: Control): Promise<GistEntity[]>;
    create(this: any, reqdata?: GistCreateData, ctrl?: Control): Promise<GistEntity>;
}
export { GistEntity };
