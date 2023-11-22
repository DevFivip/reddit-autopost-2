import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = function (moduleUrl: any) {
    const filename = fileURLToPath(moduleUrl)
    return path.dirname(filename)
}

export {
    __dirname
}