import path from 'path';

export const documentationService = () => {
    const documentation = path.join(`${__dirname}/../../`, 'Green World API Documentation.html');
    return documentation;
}
