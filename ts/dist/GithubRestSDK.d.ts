import { BranchEntity } from './entity/BranchEntity';
import { CommitEntity } from './entity/CommitEntity';
import { GistEntity } from './entity/GistEntity';
import { IssueEntity } from './entity/IssueEntity';
import { NotificationEntity } from './entity/NotificationEntity';
import { OrgEntity } from './entity/OrgEntity';
import { PullEntity } from './entity/PullEntity';
import { RateLimitEntity } from './entity/RateLimitEntity';
import { RepoEntity } from './entity/RepoEntity';
import { SearchEntity } from './entity/SearchEntity';
import { UserEntity } from './entity/UserEntity';
export type * from './GithubRestTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { GithubRestEntityBase } from './GithubRestEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class GithubRestSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Branch(entopts?: Record<string, any>): BranchEntity;
    Commit(entopts?: Record<string, any>): CommitEntity;
    Gist(entopts?: Record<string, any>): GistEntity;
    Issue(entopts?: Record<string, any>): IssueEntity;
    Notification(entopts?: Record<string, any>): NotificationEntity;
    Org(entopts?: Record<string, any>): OrgEntity;
    Pull(entopts?: Record<string, any>): PullEntity;
    RateLimit(entopts?: Record<string, any>): RateLimitEntity;
    Repo(entopts?: Record<string, any>): RepoEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    User(entopts?: Record<string, any>): UserEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): GithubRestSDK;
    tester(testopts?: any, sdkopts?: any): GithubRestSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof GithubRestSDK;
export { stdutil, config, BaseFeature, GithubRestEntityBase, GithubRestSDK, SDK, };
