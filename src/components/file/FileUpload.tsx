"use client";
import { useRef, useState, useCallback, ChangeEvent, DragEvent } from "react";
import { FileAcceptType, FilePropsTypes, FileErrorTypes } from "./typings";

//Utils
import { openFileDialog, getFileAccepts } from "../utils/utils";

const FileUpload = ({ children, onChange, value, onError, inputProps, acceptType, maxFileSize }: FilePropsTypes) => {
    //Validations
    //@ts-ignore
    if (Array.isArray(acceptType) && acceptType.includes(FileAcceptType.ALL)) {
        throw new Error("Invalid accept type: FileAcceptType.All cannot be included in an array.")
    }

    //Ref
    const inputRef = useRef<HTMLInputElement | null>(null);

    //State
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [errors, setErrors] = useState<FileErrorTypes>({ acceptType: false, maxFileSize: false });


    //Handle Change
    const handleChange = async (files: FileList | null) => {
        if (!files) return null;
        const file = files[0];
        if (!file) return null;

        //Default
        const newErrors: FileErrorTypes = {
            acceptType: false,
            maxFileSize: false,
        }

        const uploadSize = Number((file.size / 1024).toFixed(2));

        if (maxFileSize && uploadSize > maxFileSize) newErrors.maxFileSize = true;
        if (!getFileAccepts(acceptType).includes(file.type)) newErrors.acceptType = true;

        setErrors(newErrors)

        if (newErrors.acceptType || newErrors.maxFileSize) {
            onError?.(newErrors);
            return;
        }

        onChange({
            file: file, fileInfo: {
                name: file.name.split(".")[0],
                size: uploadSize,
                type: file.type,
            }
        });
    };


    //On File Remove
    const onFileRemove = () => {
        onChange(null);
    }


    //In Component Handler
    const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        await handleChange(e.target.files);
        if (inputRef.current) inputRef.current.value = '';
    }

    const handleClickInput = useCallback(() => openFileDialog(inputRef), [
        inputRef,
    ]);

    const onFileUpload = useCallback((): void => {
        handleClickInput();
    }, [handleClickInput]);

    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragIn = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };

    const handleDragOut = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleChange(e.dataTransfer.files);
        }
    };
    const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.clearData();
    };
    return (
        <>
            <input
                type="file"
                style={{ display: "none" }}
                accept={getFileAccepts(acceptType).join(",")}
                multiple={false}
                onChange={onInputChange}
                ref={inputRef}
                {...inputProps}
            />
            {children?.({
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
            })}
        </>
    );
};

export default FileUpload;