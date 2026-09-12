import { GithubRestEntityBase } from '../GithubRestEntityBase';
import type { GithubRestSDK } from '../GithubRestSDK';
import type { Control } from '../types';
import type { Notification, NotificationListMatch } from '../GithubRestTypes';
declare class NotificationEntity extends GithubRestEntityBase<Notification> {
    constructor(client: GithubRestSDK, entopts: any);
    make(this: NotificationEntity): NotificationEntity;
    list(this: any, reqmatch?: NotificationListMatch, ctrl?: Control): Promise<NotificationEntity[]>;
}
export { NotificationEntity };
