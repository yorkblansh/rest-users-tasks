import { Injectable } from '@nestjs/common'
// import { BarcodesLayoutProps } from '../../../react/src/barcodes-layout/interfaces/BarcodesLayoutProps.interface'

import { pipe } from 'fp-ts/lib/function'
import { BarcodesLayoutDto } from './dto/barcodesLayout.dto'
import ReactDOMServer from 'react-dom/server'

@Injectable()
export class UserService {}
