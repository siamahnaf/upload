"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useCallback } from "react";
import { FileAcceptType } from "./typings";
//Utils
import { openFileDialog, getFileAccepts } from "../utils/utils";
const FileUpload = ({ children, onChange, value, onError, inputProps, acceptType, maxFileSize }) => {
    //Validations
    //@ts-ignore
    if (Array.isArray(acceptType) && acceptType.includes(FileAcceptType.ALL)) {
        throw new Error("Invalid accept type: FileAcceptType.All cannot be included in an array.");
    }
    //Ref
    const inputRef = useRef(null);
    //State
    const [isDragging, setIsDragging] = useState(false);
    const [errors, setErrors] = useState({ acceptType: false, maxFileSize: false });
    //Handle File
    const handleFile = (file) => {
        const lastDotIndex = file.name.lastIndexOf(".");
        const hasExtension = lastDotIndex !== -1 && lastDotIndex !== 0;
        return {
            file,
            fileInfo: {
                name: hasExtension ? file.name.slice(0, lastDotIndex) : file.name,
                ext: hasExtension ? file.name.slice(lastDotIndex + 1) : "",
                size: Number((file.size / 1024 / 1024).toFixed(2)),
                type: file.type,
            }
        };
    };
    //Handle Change
    const handleChange = (files) => __awaiter(void 0, void 0, void 0, function* () {
        if (!files)
            return null;
        const file = files[0];
        if (!file)
            return null;
        //Default
        const newErrors = {
            acceptType: false,
            maxFileSize: false,
        };
        const uploadSize = Number((file.size / 1024).toFixed(2));
        if (maxFileSize && uploadSize > maxFileSize)
            newErrors.maxFileSize = true;
        if (!getFileAccepts(acceptType).includes(file.type))
            newErrors.acceptType = true;
        setErrors(newErrors);
        if (newErrors.acceptType || newErrors.maxFileSize) {
            onError === null || onError === void 0 ? void 0 : onError(newErrors);
            return;
        }
        onChange(handleFile(file));
    });
    //On File Remove
    const onFileRemove = () => {
        onChange(null);
    };
    //In Component Handler
    const onInputChange = (e) => __awaiter(void 0, void 0, void 0, function* () {
        yield handleChange(e.target.files);
        if (inputRef.current)
            inputRef.current.value = '';
    });
    const handleClickInput = useCallback(() => openFileDialog(inputRef), [
        inputRef,
    ]);
    const onFileUpload = useCallback(() => {
        handleClickInput();
    }, [handleClickInput]);
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };
    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleChange(e.dataTransfer.files);
        }
    };
    const handleDragStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.clearData();
    };
    return (_jsxs(_Fragment, { children: [_jsx("input", Object.assign({ type: "file", style: { display: "none" }, accept: getFileAccepts(acceptType).join(","), multiple: false, onChange: onInputChange, ref: inputRef }, inputProps)), children === null || children === void 0 ? void 0 : children({
                onFileUpload,
                onFileRemove: onFileRemove,
                dragProps: {
                    onDrop: handleDrop,
                    onDragEnter: handleDragIn,
                    onDragLeave: handleDragOut,
                    onDragOver: handleDrag,
                    onDragStart: handleDragStart
                },
                isDragging,
                errors,
                fileInfo: value
            })] }));
};
export default FileUpload;
//# sourceMappingURL=FileUpload.js.map