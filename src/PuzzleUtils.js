import md5 from 'md5';

export function getPuzzleKey (imgPath) {
    return md5(imgPath.split('/').pop());
}

export function getPuzzleDumpName (imgPath) {
    return md5(imgPath.split('/').pop()) + '_dump';
}

export function getPuzzleSolvedFlagName (imgPath) {
    return md5(imgPath.split('/').pop()) + '_solved';
}