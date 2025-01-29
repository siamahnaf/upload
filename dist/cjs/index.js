"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageAcceptType = exports.MultiImageUpload = exports.ImageUpload = exports.FileAcceptType = exports.MultiFileUpload = exports.FileUpload = void 0;
//Files
var FileUpload_1 = require("./components/file/FileUpload");
Object.defineProperty(exports, "FileUpload", { enumerable: true, get: function () { return __importDefault(FileUpload_1).default; } });
var MultiFileUpload_1 = require("./components/file/MultiFileUpload");
Object.defineProperty(exports, "MultiFileUpload", { enumerable: true, get: function () { return __importDefault(MultiFileUpload_1).default; } });
var typings_1 = require("./components/file/typings");
Object.defineProperty(exports, "FileAcceptType", { enumerable: true, get: function () { return typings_1.FileAcceptType; } });
//Image
var ImageUpload_1 = require("./components/image/ImageUpload");
Object.defineProperty(exports, "ImageUpload", { enumerable: true, get: function () { return __importDefault(ImageUpload_1).default; } });
var MultiImageUpload_1 = require("./components/image/MultiImageUpload");
Object.defineProperty(exports, "MultiImageUpload", { enumerable: true, get: function () { return __importDefault(MultiImageUpload_1).default; } });
var typings_2 = require("./components/image/typings");
Object.defineProperty(exports, "ImageAcceptType", { enumerable: true, get: function () { return typings_2.ImageAcceptType; } });
//# sourceMappingURL=index.js.map