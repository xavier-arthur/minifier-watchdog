import { readdirSync, readFileSync, statSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';

import { minify, MinifyOptions } from 'terser';
import watch from 'node-watch';

export class WatchDog {

    public path: string;
    public recursive: boolean;

    constructor(path: string, recursive = true) {
        this.path = path;
        this.recursive = recursive;
    }

    public watch = () => {
        watch(this.path, { filter: /\.js/, recursive: true }, (evtType, filePath) => {
            if (evtType == 'remove')
                return;
            this._minify(readFileSync(filePath, 'utf-8'), filePath);
        });
    }

    public minifyFromDir = () => {
        let files: string[] = Array.from(this._getFiles());
        files.forEach(elem => this._minify(String(readFileSync(elem, 'utf-8')), elem));
    }

    private _minify = async(content: string, file: string, options?: MinifyOptions) => {
        minify(content, options ?? {}).then(code => { 
            if (code.code! != content)  {
                writeFile(file, code.code!) 
            }
        });
    }

    private *_getFiles(dir = this.path): any {
        const files = readdirSync(dir);

        for (const file of files) {
            const pathToFile = join(dir, file);
            const isDirectory = statSync(pathToFile).isDirectory();
            if (isDirectory) {
                yield *this._getFiles(pathToFile);
            } else {
                yield pathToFile;
            }
        }
    }
}