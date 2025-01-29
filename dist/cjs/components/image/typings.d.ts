import { DragEvent } from "react";
export type ImageType = {
    file?: File;
    dataURL?: string;
} | null;
type TExportTypes = {
    dragProps: {
        onDrop: (e: DragEvent<HTMLDivElement>) => void;
        onDragEnter: (e: DragEvent<HTMLDivElement>) => void;
        onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
        onDragOver: (e: DragEvent<HTMLDivElement>) => void;
        onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    };
    isDragging: boolean;
    onImageUpload: () => void;
};
type TPropsTypes = {
    inputProps?: React.HTMLProps<HTMLInputElement>;
    acceptType?: ImageAcceptType | Exclude<ImageAcceptType, ImageAcceptType.ALL>[];
    maxFileSize?: number;
    resolutionWidth?: number;
    resolutionHeight?: number;
    resolutionType?: ResolutionType;
};
export declare enum ImageAcceptType {
    ALL = "all",
    SVG = "image/svg+xml",
    PNG = "image/png",
    JPEG = "image/jpeg",
    GIF = "image/gif",
    BMP = "image/bmp",
    WEBP = "image/webp",
    TIFF = "image/tiff",
    ICO = "image/x-icon",
    HEIC = "image/heic",
    HEIF = "image/heif"
}
export type ImageErrorTypes = {
    maxFileSize: boolean;
    acceptType: boolean;
    resolution: boolean;
};
export interface ImageExportTypes extends TExportTypes {
    imageInfo: ImageType;
    errors: ImageErrorTypes;
    onImageRemove: () => void;
}
export interface ImagePropsTypes extends TPropsTypes {
    children: (props: ImageExportTypes) => React.ReactNode;
    onChange: (value: ImageType) => void;
    value: ImageType;
    onError?: (errors: ImageErrorTypes) => void;
}
export type MultiImageType = ImageType[];
export interface MultiImageErrorTypes extends ImageErrorTypes {
    maxNumber: boolean;
}
export interface MultiImageExportTypes extends TExportTypes {
    imageInfo: MultiImageType;
    errors: MultiImageErrorTypes;
    onImageRemove: (index: number) => void;
    onImageUpdate: (index: number) => void;
    onImageRemoveAll: () => void;
}
export interface MultiImagePropsTypes extends TPropsTypes {
    children: (props: MultiImageExportTypes) => React.ReactNode;
    onChange: (value: MultiImageType) => void;
    value: MultiImageType;
    onError?: (errors: MultiImageErrorTypes) => void;
    maxNumber?: number;
}
export type ResolutionType = "absolute" | "less" | "more" | "ratio";
export {};
