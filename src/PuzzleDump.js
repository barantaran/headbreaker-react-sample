import md5 from 'md5';

export function getPuzzleKey (imgPath) {
    return md5(imgPath.split('/').pop());
}
