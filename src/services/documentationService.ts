import path from 'path';

export const documentationService = () => {
    const documentation = path.join(`${__dirname}/../../view`, 'documentation.html');
    return documentation;
}
