import crypto from 'crypto';

export default (string) => {
    const shasum = crypto.createHash('sha1');
    shasum.update(string);

    return shasum.digest('hex');
};
