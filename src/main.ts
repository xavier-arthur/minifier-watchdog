import { ArgumentParser } from 'argparse';
import { WatchDog } from './watchdog';

const parser = new ArgumentParser();
let args: any;

function getArgs() {
    parser.add_argument('path');
    parser.add_argument('-n', '--now', { const: true, nargs: '?', help: 'run the minifier before start watching the files' });
    parser.add_argument('-r', '--recursive', { default: true, const: true, nargs: '?', help: 'search recursively in all subdirectories'});
    args = parser.parse_args();
}

function main() {
    let Suzy = new WatchDog(args.path, args.recursive);

    if (args.now) {
        Suzy.minifyFromDir();
    }

    Suzy.watch();
}

getArgs();
main();