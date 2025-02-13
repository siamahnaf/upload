"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_INDEX = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const typings_1 = require("./typings");
//Utils
const utils_1 = require("../utils/utils");
exports.DEFAULT_INDEX = -1;
const MultiFileUpload = ({ children, onChange, value, onError, inputProps, acceptType, maxFileSize, maxNumber = 10 }) => {
    //Validations
    //@ts-ignore
    if (Array.isArray(acceptType) && acceptType.includes(typings_1.FileAcceptType.ALL)) {
        throw new Error("Invalid accept type: FileAccept.All cannot be included in an array.");
    }
    //Ref
    const inputRef = (0, react_1.useRef)(null);
    //State
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const [indexKey, setIndexKey] = (0, react_1.useState)(exports.DEFAULT_INDEX);
    const [errors, setErrors] = (0, react_1.useState)({ acceptType: false, maxFileSize: false, maxNumber: false });
    //Handle File
    const handleFile = (file) => ({
        file,
        fileInfo: {
            name: file.name.split(".")[0] || file.name,
            size: Number((file.size / 1024 * 1024).toFixed(2)),
            type: file.type,
        }
    });
    //Handle The File Change
    const handleChange = (files) => __awaiter(void 0, void 0, void 0, function* () {
        if (!files)
            return;
        var changeFiles = [];
        let newErrors = {
            acceptType: false,
            maxFileSize: false,
            maxNumber: false,
        };
        if (files.length > maxNumber)
            newErrors.maxNumber = true;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uploadSize = Number((file.size / 1024).toFixed(2));
            //Accept Type Error
            if (!(0, utils_1.getFileAccepts)(acceptType).includes(file.type))
                newErrors.acceptType = true;
            //Max File Size Error
            if (maxFileSize && (uploadSize > maxFileSize))
                newErrors.maxFileSize = true;
            //Get Files Ready
            changeFiles.push(handleFile(file));
        }
        setErrors(newErrors);
        if (newErrors.acceptType || newErrors.maxFileSize || newErrors.maxNumber) {
            onError === null || onError === void 0 ? void 0 : onError(newErrors);
            return;
        }
        if (indexKey > exports.DEFAULT_INDEX) {
            onChange(value.map((a, i) => {
                if (i === indexKey) {
                    return changeFiles[0];
                }
                return a;
            }));
        }
        else {
            onChange(changeFiles);
        }
    });
    //On File Remove ALl
    const onFileRemoveAll = () => {
        onChange([]);
    };
    //On File Remove Index
    const onFileRemove = (index) => {
        onChange(value.filter((_, i) => i !== index));
    };
    //Handle File Upload
    const onFileUpdate = (index) => {
        setIndexKey(index);
    };
    //In Component Method
    const onInputChange = (e) => __awaiter(void 0, void 0, void 0, function* () {
        yield handleChange(e.target.files);
        indexKey > exports.DEFAULT_INDEX && setIndexKey(exports.DEFAULT_INDEX);
        if (inputRef.current)
            inputRef.current.value = '';
    });
    const handleClickInput = (0, react_1.useCallback)(() => (0, utils_1.openFileDialog)(inputRef), [
        inputRef,
    ]);
    const onFileUpload = (0, react_1.useCallback)(() => {
        setIndexKey(exports.DEFAULT_INDEX);
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
    (0, react_1.useEffect)(() => {
        if (indexKey > exports.DEFAULT_INDEX) {
            handleClickInput();
        }
    }, [indexKey]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ type: "file", style: { display: "none" }, accept: (0, utils_1.getFileAccepts)(acceptType).join(","), multiple: indexKey === exports.DEFAULT_INDEX, onChange: onInputChange, ref: inputRef }, inputProps)), children === null || children === void 0 ? void 0 : children({
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
            })] }));
};
exports.default = MultiFileUpload;
//# sourceMappingURL=MultiFileUpload.js.map