import React from "react";
import { FileAcceptType } from "../file/typings";
import { ImageAcceptType, ResolutionType } from "../image/typings";

export const openFileDialog = (inputRef: React.RefObject<HTMLInputElement | null>): void => {
    if (inputRef.current) inputRef.current.click();
};

export const getFileAccepts = (acceptType?: FileAcceptType | Exclude<FileAcceptType, FileAcceptType.ALL>[]) => {
    if (!acceptType || acceptType === FileAcceptType.ALL) {
        const defaultArray: string[] = Object.values(FileAcceptType).filter(value => value !== FileAcceptType.ALL);
        return defaultArray;
    } else {
        return acceptType as string[];
    }
}

export const getImageAccepts = (acceptType?: ImageAcceptType | Exclude<ImageAcceptType, ImageAcceptType.ALL>[]) => {
    if (!acceptType || acceptType === ImageAcceptType.ALL) {
        const defaultArray: string[] = Object.values(ImageAcceptType).filter(value => value !== ImageAcceptType.ALL);
        return defaultArray;
    } else {
        return acceptType as string[];
    }
}

export const getImage = (file: File): Promise<HTMLImageElement> => {
    const image = new Image();
    return new Promise((resolve) => {
        image.addEventListener('load', () => resolve(image));
        image.src = URL.createObjectURL(file);
    });
};

export const getBase64 = (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.addEventListener('load', () => resolve(String(reader.result)));
        reader.readAsDataURL(file);
    });
};


export const isResolutionValid = (image: HTMLImageElement, resolutionType: ResolutionType, resolutionWidth: number | undefined, resolutionHeight: number | undefined): boolean => {
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
            if (image.width / image.height === ratio) return true;
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