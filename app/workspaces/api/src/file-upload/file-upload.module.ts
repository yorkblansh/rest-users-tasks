import { Module } from '@nestjs/common'
import { FileUploadService } from './file-upload.service'
import { FileUploadController } from './file-upload.controller'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { UserModule } from '../user/user.module'

@Module({
	imports: [
		UserModule,
		MulterModule.register({
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const username = req.query.username as string

					cb(null, username + '.jpg')
				},
			}),
		}),
	],
	controllers: [FileUploadController],
	providers: [FileUploadService],
})
export class FileUploadModule {}
