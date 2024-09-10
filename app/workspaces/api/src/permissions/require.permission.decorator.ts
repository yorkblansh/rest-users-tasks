import { SetMetadata } from '@nestjs/common'

export type Permissions = 'admin' | 'nonadmin'

export enum PERMISSIONS {
	ADMIN = 'admin',
	NONADMIN = 'nonadmin',
}

export const PERMISSIONS_METADATA_KEY = 'PERMISSIONS_METADATA_KEY'

export function RequirePermissions(...permissions: Permissions[]) {
	return SetMetadata(PERMISSIONS_METADATA_KEY, [...permissions])
}
