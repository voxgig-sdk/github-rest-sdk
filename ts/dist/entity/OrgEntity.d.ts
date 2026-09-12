import { GithubRestEntityBase } from '../GithubRestEntityBase';
import type { GithubRestSDK } from '../GithubRestSDK';
import type { Control } from '../types';
import type { Org, OrgLoadMatch } from '../GithubRestTypes';
declare class OrgEntity extends GithubRestEntityBase<Org> {
    constructor(client: GithubRestSDK, entopts: any);
    make(this: OrgEntity): OrgEntity;
    load(this: any, reqmatch?: OrgLoadMatch, ctrl?: Control): Promise<OrgEntity>;
}
export { OrgEntity };
