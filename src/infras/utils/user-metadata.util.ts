import { User } from '../../core/domain/models/user.model';

export function getUserMetadataParams(user: User): any[] {
  return [
    user.getVersion(),
    user.getCreatedAt(),
    user.getCreatedBy(),
    user.getUpdatedBy(),
    user.getUpdatedAt(),
  ];
}
