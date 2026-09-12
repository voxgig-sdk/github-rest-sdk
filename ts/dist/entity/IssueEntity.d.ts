import { GithubRestEntityBase } from '../GithubRestEntityBase';
import type { GithubRestSDK } from '../GithubRestSDK';
import type { Control } from '../types';
import type { Issue, IssueLoadMatch, IssueListMatch, IssueCreateData, IssueUpdateData } from '../GithubRestTypes';
declare class IssueEntity extends GithubRestEntityBase<Issue> {
    constructor(client: GithubRestSDK, entopts: any);
    make(this: IssueEntity): IssueEntity;
    load(this: any, reqmatch?: IssueLoadMatch, ctrl?: Control): Promise<IssueEntity>;
    list(this: any, reqmatch?: IssueListMatch, ctrl?: Control): Promise<IssueEntity[]>;
    create(this: any, reqdata?: IssueCreateData, ctrl?: Control): Promise<IssueEntity>;
    update(this: any, reqdata?: IssueUpdateData, ctrl?: Control): Promise<IssueEntity>;
}
export { IssueEntity };
