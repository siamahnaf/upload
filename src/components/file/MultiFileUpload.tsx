"use client";
import { useRef, useState, useCallback, ChangeEvent, DragEvent, useEffect } from "react";
import { FileAcceptType, MultiFilePropsTypes, MultiFileErrorTypes, MultiFileType } from "./typings";

//Utils
import { openFileDialog, getFileAccepts } from "../utils/utils";

export const DEFAULT_INDEX = -1;

const MultiFileUpload = ({ children, onChange, value, onError, inputProps, acceptType, maxFileSize, maxNumber = 10 }: MultiFilePropsTypes) => {
    //Validations
    //@ts-ignore
    if (Array.isArray(acceptType) && acceptType.includes(FileAcceptType.ALL)) {
        throw new Error("Invalid accept type: FileAccept.All cannot be included in an array.")
    }

    //Ref
    const inputRef = useRef<HTMLInputElement | null>(null);

    //State
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [indexKey, setIndexKey] = useState<number>(DEFAULT_INDEX);
    const [errors, setErrors] = useState<MultiFileErrorTypes>({ acceptType: false, maxFileSize: false, maxNumber: false });


    //Handle File
    const handleFile = (file: File) => {
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

    //Handle The File Change
    const handleChange = async (files: FileList | null) => {
        if (!files) return;
        var changeFiles: MultiFileType = [];
        let newErrors: MultiFileErrorTypes = {
            acceptType: false,
            maxFileSize: false,
            maxNumber: false,
        }

        if (files.length > maxNumber) newErrors.maxNumber = true;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uploadSize = Number((file.size / 1024).toFixed(2));

            //Accept Type Error
            if (!getFileAccepts(acceptType).includes(file.type)) newErrors.acceptType = true;

            //Max File Size Error
            if (maxFileSize && (uploadSize > maxFileSize)) newErrors.maxFileSize = true;

            //Get Files Ready
            changeFiles.push(handleFile(file));
        }
        setErrors(newErrors);

        if (newErrors.acceptType || newErrors.maxFileSize || newErrors.maxNumber) {
            onError?.(newErrors);
            return;
        }

        if (indexKey > DEFAULT_INDEX) {
            onChange(value.map((a, i) => {
                if (i === indexKey) {
                    return changeFiles[0];
                }
                return a;
            }))
        } else {
            onChange(changeFiles);
        }
    };

    //On File Remove ALl
    const onFileRemoveAll = () => {
        onChange([]);
    }

    //On File Remove Index
    const onFileRemove = (index: number) => {
        onChange(value.filter((_, i) => i !== index))
    }

    //Handle File Upload
    const onFileUpdate = (index: number) => {
        setIndexKey(index);
    }

    //In Component Method
    const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        await handleChange(e.target.files);
        indexKey > DEFAULT_INDEX && setIndexKey(DEFAULT_INDEX);
        if (inputRef.current) inputRef.current.value = '';
    }
    const handleClickInput = useCallback(() => openFileDialog(inputRef), [
        inputRef,
    ]);
    const onFileUpload = useCallback((): void => {
        setIndexKey(DEFAULT_INDEX);
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

    useEffect(() => {
        if (indexKey > DEFAULT_INDEX) {
            handleClickInput();
        }
    }, [indexKey])

    return (
        <>
            <input
                type="file"
                style={{ display: "none" }}
                accept={getFileAccepts(acceptType).join(",")}
                multiple={indexKey === DEFAULT_INDEX}
                onChange={onInputChange}
                ref={inputRef}
                {...inputProps}
            />
            {children?.({
                onFileUpload,
                onFileRemove,
                onFileUpdate,
                onFileRemoveAll: onFileRemoveAll,
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

export default MultiFileUpload;