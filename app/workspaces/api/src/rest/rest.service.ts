import { Injectable } from '@nestjs/common'
// import { BarcodesLayoutProps } from '../../../react/src/barcodes-layout/interfaces/BarcodesLayoutProps.interface'
// import { GenpdfService } from 'src/genpdf/genpdf.service'
import { pipe } from 'fp-ts/lib/function'

import { BarcodesLayoutDto } from './dto/barcodesLayout.dto'
// import { BarcodesLayout } from '../../../react/src/barcodes-layout/BarcodesLayout'
import ReactDOMServer from 'react-dom/server'

@Injectable()
export class RestService {}
