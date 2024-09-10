import { SetMetadata } from '@nestjs/common'

type Permission = 'admin' | 'nonadmin'

export enum PERMISSIONS {
	ADMIN = 'admin',
	NONADMIN = 'nonadmin',
}

export const PERMISSIONS_METADATA_KEY = 'PERMISSIONS_METADATA_KEY'

export function RequirePermissions(...permissions: Permission[]) {
	return SetMetadata(PERMISSIONS_METADATA_KEY, [...permissions])
}
