"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResolutionValid = exports.getBase64 = exports.getImage = exports.getImageAccepts = exports.getFileAccepts = exports.openFileDialog = void 0;
const typings_1 = require("../file/typings");
const typings_2 = require("../image/typings");
const openFileDialog = (inputRef) => {
    if (inputRef.current)
        inputRef.current.click();
};
exports.openFileDialog = openFileDialog;
const getFileAccepts = (acceptType) => {
    if (!acceptType || acceptType === typings_1.FileAcceptType.ALL) {
        const defaultArray = Object.values(typings_1.FileAcceptType).filter(value => value !== typings_1.FileAcceptType.ALL);
        return defaultArray;
    }
    else {
        return acceptType;
    }
};
exports.getFileAccepts = getFileAccepts;
const getImageAccepts = (acceptType) => {
    if (!acceptType || acceptType === typings_2.ImageAcceptType.ALL) {
        const defaultArray = Object.values(typings_2.ImageAcceptType).filter(value => value !== typings_2.ImageAcceptType.ALL);
        return defaultArray;
    }
    else {
        return acceptType;
    }
};
exports.getImageAccepts = getImageAccepts;
const getImage = (file) => {
    const image = new Image();
    return new Promise((resolve) => {
        image.addEventListener('load', () => resolve(image));
        image.src = URL.createObjectURL(file);
    });
};
exports.getImage = getImage;
const getBase64 = (file) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.addEventListener('load', () => resolve(String(reader.result)));
        reader.readAsDataURL(file);
    });
};
exports.getBase64 = getBase64;
const isResolutionValid = (image, resolutionType, resolutionWidth, resolutionHeight) => {
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
exports.isResolutionValid = isResolutionValid;
//# sourceMappingURL=utils.js.map