"use client";
import { useRef, useState, useCallback, ChangeEvent, DragEvent } from "react";
import { ImageAcceptType, ImagePropsTypes, ImageErrorTypes } from "./typings";

//Utils
import { openFileDialog, getImageAccepts, getBase64, getImage, isResolutionValid } from "../utils/utils";

const ImageUpload = ({ inputProps, acceptType, maxFileSize, resolutionWidth, resolutionHeight, resolutionType = "absolute", children, onChange, value, onError }: ImagePropsTypes) => {
    //Validations
    //@ts-ignore
    if (Array.isArray(acceptType) && acceptType.includes(ImageAcceptType.ALL)) {
        throw new Error("Invalid accept type: ImageAcceptType.All cannot be included in an array.")
    }

    //Ref
    const inputRef = useRef<HTMLInputElement | null>(null);

    //State
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [errors, setErrors] = useState<ImageErrorTypes>({ acceptType: false, maxFileSize: false, resolution: false });


    //Handle Change
    const handleChange = async (files: FileList | null) => {
        if (!files) return null;
        const file = files[0];
        if (!file) return null;

        //Default
        const newErrors: ImageErrorTypes = {
            acceptType: false,
            maxFileSize: false,
            resolution: false,
        }

        const uploadSize = Number((file.size / 1024 * 1024).toFixed(2));

        //Max File Size Check
        if (maxFileSize && uploadSize > maxFileSize) newErrors.maxFileSize = true;

        //Accept Type Check
        if (!getImageAccepts(acceptType).includes(file.type)) newErrors.acceptType = true;

        //Resolution Check
        const image = await getImage(file);
        const checkRes = isResolutionValid(image, resolutionType, resolutionWidth, resolutionHeight);
        if (!checkRes) newErrors.resolution = true;

        setErrors(newErrors)

        if (newErrors.acceptType || newErrors.maxFileSize || newErrors.resolution) {
            onError?.(newErrors);
            return;
        }

        const dataUrl = await getBase64(file);

        onChange({
            file: file,
            dataURL: dataUrl,
        });
    };


    //On Image Remove
    const onImageRemove = () => {
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

    const onImageUpload = useCallback((): void => {
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
                accept={getImageAccepts(acceptType).join(",")}
                multiple={false}
                onChange={onInputChange}
                ref={inputRef}
                {...inputProps}
            />
            {children?.({
                onImageUpload,
                onImageRemove: onImageRemove,
                dragProps: {
                    onDrop: handleDrop,
                    onDragEnter: handleDragIn,
                    onDragLeave: handleDragOut,
                    onDragOver: handleDrag,
                    onDragStart: handleDragStart
                },
                isDragging,
                errors,
                imageInfo: value,
            })}
        </>
    );
};

export default ImageUpload;