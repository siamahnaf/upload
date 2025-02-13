"use client";
import { useRef, useState, useCallback, ChangeEvent, DragEvent, useEffect } from "react";
import { ImageAcceptType, MultiImagePropsTypes, MultiImageErrorTypes, MultiImageType } from "./typings";

//Utils
import { openFileDialog, getImageAccepts, getBase64, getImage, isResolutionValid } from "../utils/utils";


const DEFAULT_INDEX = -1;

const MultiImageUpload = ({ inputProps, acceptType, maxFileSize, resolutionWidth, resolutionHeight, resolutionType = "absolute", children, onChange, value, onError, maxNumber = 10 }: MultiImagePropsTypes) => {
    //Validations
    //@ts-ignore
    if (Array.isArray(acceptType) && acceptType.includes(ImageAcceptType.ALL)) {
        throw new Error("Invalid accept type: FileAccept.All cannot be included in an array.")
    }

    //Ref
    const inputRef = useRef<HTMLInputElement | null>(null);

    //State
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [indexKey, setIndexKey] = useState<number>(DEFAULT_INDEX);
    const [errors, setErrors] = useState<MultiImageErrorTypes>({ acceptType: false, maxFileSize: false, resolution: false, maxNumber: false });


    //Handle The File Change
    const handleChange = async (files: FileList | null) => {
        if (!files) return;
        if (files.length === 0) return;
        var changeFiles: MultiImageType = [];
        let newErrors: MultiImageErrorTypes = {
            acceptType: false,
            maxFileSize: false,
            resolution: false,
            maxNumber: false,
        }

        if (files.length > maxNumber) newErrors.maxNumber = true;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uploadSize = Number((file.size / 1024).toFixed(2));

            //Accept Type Error
            if (!getImageAccepts(acceptType).includes(file.type)) newErrors.acceptType = true;

            //Max File Size Error
            if (maxFileSize && (uploadSize > maxFileSize)) newErrors.maxFileSize = true;

            //Resolution Check
            const image = await getImage(file);
            const checkRes = isResolutionValid(image, resolutionType, resolutionWidth, resolutionHeight);
            if (!checkRes) newErrors.resolution = true;

            const dataUrl = await getBase64(file);

            //Get Files Ready
            changeFiles.push({
                file: file,
                dataURL: dataUrl,
            });
        }

        setErrors(newErrors);

        if (newErrors.acceptType || newErrors.maxFileSize || newErrors.maxNumber || newErrors.resolution) {
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
    const onImageRemoveAll = () => {
        onChange([]);
    }

    //On File Remove Index
    const onImageRemove = (index: number) => {
        onChange(value.filter((_, i) => i !== index))
    }

    //Handle File Upload
    const onImageUpdate = (index: number): void => {
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
    const onImageUpload = useCallback((): void => {
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
                accept={getImageAccepts(acceptType).join(",")}
                multiple={indexKey === DEFAULT_INDEX}
                onChange={onInputChange}
                ref={inputRef}
                {...inputProps}
            />
            {children?.({
                onImageUpload,
                onImageRemove,
                onImageUpdate,
                onImageRemoveAll,
                dragProps: {
                    onDrop: handleDrop,
                    onDragEnter: handleDragIn,
                    onDragLeave: handleDragOut,
                    onDragOver: handleDrag,
                    onDragStart: handleDragStart
                },
                isDragging,
                errors,
                imageInfo: value
            })}
        </>
    );
};

export default MultiImageUpload;