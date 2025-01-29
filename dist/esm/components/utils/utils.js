import { FileAcceptType } from "../file/typings";
import { ImageAcceptType } from "../image/typings";
export const openFileDialog = (inputRef) => {
    if (inputRef.current)
        inputRef.current.click();
};
export const getFileAccepts = (acceptType) => {
    if (!acceptType || acceptType === FileAcceptType.ALL) {
        const defaultArray = Object.values(FileAcceptType).filter(value => value !== FileAcceptType.ALL);
        return defaultArray;
    }
    else {
        return acceptType;
    }
};
export const getImageAccepts = (acceptType) => {
    if (!acceptType || acceptType === ImageAcceptType.ALL) {
        const defaultArray = Object.values(ImageAcceptType).filter(value => value !== ImageAcceptType.ALL);
        return defaultArray;
    }
    else {
        return acceptType;
    }
};
export const getImage = (file) => {
    const image = new Image();
    return new Promise((resolve) => {
        image.addEventListener('load', () => resolve(image));
        image.src = URL.createObjectURL(file);
    });
};
export const getBase64 = (file) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.addEventListener('load', () => resolve(String(reader.result)));
        reader.readAsDataURL(file);
    });
};
export const isResolutionValid = (image, resolutionType, resolutionWidth, resolutionHeight) => {
    if (!resolutionWidth || !resolutionHeight || !image.width || !image.height)
        return true;
    switch (resolutionType) {
        case 'absolute': {
            if (image.width === resolutionWidth && image.height === resolutionHeight)
                return true;
            break;
        }
        case 'ratio': {
            const ratio = resolutionWidth / resolutionHeight;
            if (image.width / image.height === ratio)
                return true;
            break;
        }
        case 'less': {
            if (image.width <= resolutionWidth && image.height <= resolutionHeight)
                return true;
            break;
        }
        case 'more': {
            if (image.width >= resolutionWidth && image.height >= resolutionHeight)
                return true;
            break;
        }
        default:
            break;
    }
    return false;
};
//# sourceMappingURL=utils.js.map