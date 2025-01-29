import React from "react";
import { FileAcceptType } from "../file/typings";
import { ImageAcceptType, ResolutionType } from "../image/typings";
export declare const openFileDialog: (inputRef: React.RefObject<HTMLInputElement | null>) => void;
export declare const getFileAccepts: (acceptType?: FileAcceptType | Exclude<FileAcceptType, FileAcceptType.ALL>[]) => string[];
export declare const getImageAccepts: (acceptType?: ImageAcceptType | Exclude<ImageAcceptType, ImageAcceptType.ALL>[]) => string[];
export declare const getImage: (file: File) => Promise<HTMLImageElement>;
export declare const getBase64: (file: File) => Promise<string>;
export declare const isResolutionValid: (image: HTMLImageElement, resolutionType: ResolutionType, resolutionWidth: number | undefined, resolutionHeight: number | undefined) => boolean;
