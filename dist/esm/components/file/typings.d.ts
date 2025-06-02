import { DragEvent } from "react";
export type FileType = {
    file: File;
    fileInfo: {
        name: string;
        size: number;
        type: string;
    };
} | null;
type TExportTypes = {
    dragProps: {
        onDrop: (e: DragEvent<any>) => void;
        onDragEnter: (e: DragEvent<any>) => void;
        onDragLeave: (e: DragEvent<any>) => void;
        onDragOver: (e: DragEvent<any>) => void;
        onDragStart: (e: DragEvent<any>) => void;
    };
    isDragging: boolean;
    onFileUpload: () => void;
};
type TPropsTypes = {
    inputProps?: React.HTMLProps<HTMLInputElement>;
    acceptType?: FileAcceptType | Exclude<FileAcceptType, FileAcceptType.ALL>[];
    maxFileSize?: number;
};
export declare enum FileAcceptType {
    ALL = "all",
    PDF = "application/pdf",
    DOC = "application/msword",
    DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    PPT = "application/vnd.ms-powerpoint",
    PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    XLS = "application/vnd.ms-excel",
    XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ODT = "application/vnd.oasis.opendocument.text",
    ODS = "application/vnd.oasis.opendocument.spreadsheet",
    ODP = "application/vnd.oasis.opendocument.presentation",
    RTF = "application/rtf",
    EPUB = "application/epub+zip",
    CSV = "text/csv",
    TEXT = "text/plain",
    MARKDOWN = "text/markdown",
    HTML = "text/html",
    XML = "application/xml",
    JSON = "application/json",
    YAML = "application/yaml",
    TSV = "text/tab-separated-values",
    ZIP = "application/zip",
    RAR = "application/vnd.rar",
    TAR = "application/x-tar",
    GZIP = "application/gzip",
    SEVENZ = "application/x-7z-compressed",
    MP3 = "audio/mpeg",
    WAV = "audio/wav",
    OGG = "audio/ogg",
    AAC = "audio/aac",
    FLAC = "audio/flac",
    MP4 = "video/mp4",
    AVI = "video/x-msvideo",
    MOV = "video/quicktime",
    WEBM = "video/webm",
    MKV = "video/x-matroska",
    WOFF = "font/woff",
    WOFF2 = "font/woff2",
    TTF = "font/ttf",
    OTF = "font/otf",
    JPG = "image/jpeg",
    JPEG = "image/jpeg",
    PNG = "image/png",
    GIF = "image/gif",
    WEBP = "image/webp",
    SVG = "image/svg+xml",
    EXE = "application/vnd.microsoft.portable-executable",
    DMG = "application/x-apple-diskimage"
}
export type FileErrorTypes = {
    maxFileSize: boolean;
    acceptType: boolean;
};
export interface FileExportTypes extends TExportTypes {
    fileInfo: FileType;
    errors: FileErrorTypes;
    onFileRemove: () => void;
}
export interface FilePropsTypes extends TPropsTypes {
    children: (props: FileExportTypes) => React.ReactNode;
    onChange: (value: FileType) => void;
    value: FileType;
    onError?: (errors: FileErrorTypes) => void;
}
export type MultiFileType = FileType[];
export interface MultiFileErrorTypes extends FileErrorTypes {
    maxNumber: boolean;
}
export interface MultiFileExportTypes extends TExportTypes {
    fileInfo: MultiFileType;
    errors: MultiFileErrorTypes;
    onFileRemove: (index: number) => void;
    onFileUpdate: (index: number) => void;
    onFileRemoveAll: () => void;
}
export interface MultiFilePropsTypes extends TPropsTypes {
    children: (props: MultiFileExportTypes) => React.ReactNode;
    onChange: (value: MultiFileType) => void;
    value: MultiFileType;
    onError?: (errors: MultiFileErrorTypes) => void;
    maxNumber?: number;
}
export {};
