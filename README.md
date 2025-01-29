<br/>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780157/Personal%20Logo/logo-white_e6fujz.png">
  <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780152/Personal%20Logo/logo-dark_qqwrqu.png">
  <img alt="Siam Ahnaf" src="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780152/Personal%20Logo/logo-dark_qqwrqu.png" height="auto" width="240">
</picture> 
<br/> <br/>

# @siamf/upload
A fully headless React package for handling image and file uploads with complete UI control. It provides four flexible components— `ImageUpload`, `MultiImageUpload`, `FileUpload`, and `MultiFileUpload` —using render props for seamless customization. Perfect for developers who need total control over the upload experience.

<a href="https://www.buymeacoffee.com/siamahnaf" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

- Easy to use
- Full UI Control (This package only provide functionality)
- SSR Support
- Latest React Support

# Installation

```bash
$ npm i @siamf/upload
```

# Usage

### `ImageUpload`

```javascript
"use client"
import { useState } from "react";
import { ImageUpload, ImageType } from "@siamf/upload";

const Page = () => {
  //State
  const [selectedImage, setSelected] = useState<ImageType>(null);

  const onHandleFile = (value: ImageType) => {
    setSelected(value);
  }

  return (
    <div className="px-40 py-40">
      <ImageUpload
        onChange={onHandleFile}
        value={selectedImage}
      >
        {({
          isDragging,
          dragProps,
          onImageUpload,
          imageInfo,
          onImageRemove,
          errors,
        }) => (
          <div>
            <div className={`border border-solid border-red-600 p-8 ${isDragging && "bg-green-600"}`} {...dragProps} onClick={onImageUpload}>
              Upload Now
            </div>
            <div>
              {imageInfo &&
                <div className="my-4 border-4 p-5 border-solid border-black">
                  <img src={imageInfo.dataURL} />
                </div>
              }
              <button onClick={onImageRemove}>
                Remove File
              </button>
            </div>
          </div>
        )}
      </ImageUpload>
    </div>
  );
};

export default Page;
```


### `MultiImageUpload`

```javascript
"use client"
import { useState } from "react";
import { MultiImageUpload, MultiImageType } from "@siamf/upload";

const Page = () => {
  //State
  const [imageList, setImageList] = useState<MultiImageType>([]);

  const onHandleFile = (value: MultiImageType) => {
    setImageList(value);
  }

  return (
    <div className="px-40 py-40">
      <MultiImageUpload
        onChange={onHandleFile}
        value={imageList}
      >
        {({
          isDragging,
          dragProps,
          onImageUpload,
          imageInfo,
          onImageRemove,
          onImageRemoveAll,
          onImageUpdate,
          errors,
        }) => (
          <div>
            <div className={`border border-solid border-red-600 p-8 ${isDragging && "bg-green-600"}`} {...dragProps} onClick={onImageUpload}>
              Upload Now
            </div>
            <div>
              {imageInfo.map((item, i) => (
                <div className="my-4 border-4 p-5 border-solid border-black">
                  <img src={item?.dataURL} />
                  <button onClick={() => onImageRemove(i)}>Remove File</button>
                  <button onClick={() => onImageUpdate(i)}>Update File</button>
                </div>
              ))}
              <button onClick={onImageRemoveAll}>
                Remove All
              </button>
            </div>
          </div>
        )}
      </MultiImageUpload>
    </div>
  );
};

export default Page;
```

### `FileUpload`

```javascript
"use client"
import { useState } from "react";
import { FileUpload, FileType } from "@siamf/upload";

const Page = () => {
  //State
  const [selectedFile, setSelected] = useState<FileType>(null);

  const onHandleFile = (value: FileType) => {
    setSelected(value);
  }

  return (
    <div className="px-40 py-40">
      <FileUpload
        onChange={onHandleFile}
        value={selectedFile}
      >
        {({
          isDragging,
          dragProps,
          onFileUpload,
          fileInfo,
          onFileRemove,
          errors,
        }) => (
          <div>
            <div className={`border border-solid border-red-600 p-8 ${isDragging && "bg-green-600"}`} {...dragProps} onClick={onFileUpload}>
              Upload Now
            </div>
            <div>
              {fileInfo &&
                <div className="my-4 border-4 p-5 border-solid border-black">
                  <p>{fileInfo.fileInfo.name}</p>
                </div>
              }
              <button onClick={onFileRemove}>
                Remove File
              </button>
            </div>
          </div>
        )}
      </FileUpload>
    </div>
  );
};

export default Page;
```

### `MultiFileUpload`

```javascript
"use client"
import { useState } from "react";
import { MultiFileUpload, MultiFileType } from "@siamf/upload";

const Page = () => {
  //State
  const [fileList, setFileList] = useState<MultiFileType>([]);

  const onHandleFile = (value: MultiFileType) => {
    setFileList(value);
  }

  return (
    <div className="px-40 py-40">
      <MultiFileUpload
        onChange={onHandleFile}
        value={fileList}
      >
        {({
          isDragging,
          dragProps,
          onFileUpload,
          fileInfo,
          onFileRemove,
          onFileRemoveAll,
          onFileUpdate,
          errors,
        }) => (
          <div>
            <div className={`border border-solid border-red-600 p-8 ${isDragging && "bg-green-600"}`} {...dragProps} onClick={onFileUpload}>
              Upload Now
            </div>
            <div>
              {fileInfo.map((item, i) => (
                <div className="my-4 border-4 p-5 border-solid border-black">
                  <p>{item?.fileInfo.name}</p>
                  <button onClick={() => onFileRemove(i)}>Remove File</button>
                  <button onClick={() => onFileUpdate(i)}>Update File</button>
                </div>
              ))}
              <button onClick={onFileRemoveAll}>
                Remove All
              </button>
            </div>
          </div>
        )}
      </MultiFileUpload>
    </div>
  );
};

export default Page;
```

# Available Options

## `ImageUpload`

### Props
<table width="100%">
  <tr>
    <th> Name </th>
    <th> Description </th>
    <th> Type </th>
    <th> Default/Required </th>
  </tr>
  <tr>
    <td> inputProps </td>
    <td> Available props for input field </td>
    <td> HTMLProps<HTMLInputElement> </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> acceptType </td>
    <td> Image Accept type </td>
    <td> ImageAcceptType | Exclude<ImageAcceptType, ImageAcceptType.ALL>[] </td>
    <td> ImageAcceptType.ALL </td>
  </tr>
   <tr>
    <td> maxFileSize </td>
    <td> Max file size validation </td>
    <td> number </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> resolutionWidth </td>
    <td> Image resolution width validation </td>
    <td> number </td>
    <td> optional </td>
  </tr>
  <tr>
    <td> resolutionHeight </td>
    <td> Image resolution height validation </td>
    <td> number </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> resolutionType </td>
    <td> Resolution type for validations </td>
     <td> "absolute" | "less" | "more" | "ratio" </td>
    <td> "absolute" </td>
  </tr>
  <tr>
    <td> children </td>
    <td> UI for upload zone or button </td>
     <td> (props: ImageExportTypes) => React.ReactNode </td>
    <td> required </td>
  </tr>
  <tr>
    <td> onChange </td>
    <td> Image upload listener function </td>
     <td> (value: ImageType) => void; </td>
    <td> required </td>
  </tr>
  <tr>
    <td> value </td>
    <td> Default Value </td>
     <td> ImageType </td>
    <td> required </td>
  </tr>
   <tr>
    <td> onError </td>
    <td> Image upload error listener </td>
     <td> (errors: ImageErrorTypes) => void; </td>
    <td> optional </td>
  </tr>
</table>

### ImageExportTypes
<table width="100%">
  <tr>
    <th> dragProps </th>
    <th> Element for implementing drag and drop features </th>
    <th> Object </th>
  </tr>
  <tr>
    <td> isDragging </td>
    <td> Listen is it dragging or not </td>
    <td> boolean </td>
  </tr>
   <tr>
    <td> onImageUpload </td>
    <td> Handler for triggering image upload </td>
    <td> () => void </td>
  </tr>
   <tr>
    <td> imageInfo </td>
    <td> Selected image information </td>
    <td> ImageType </td>
  </tr>
   <tr>
    <td> errors </td>
    <td> Error listener </td>
    <td> ImageErrorTypes </td>
  </tr>
  <tr>
    <td> onImageRemove </td>
    <td> Handler for removing selected Image </td>
    <td> () => void </td>
  </tr>
</table>


## `MultiImageUpload`

### Props
<table width="100%">
  <tr>
    <th> Name </th>
    <th> Description </th>
    <th> Type </th>
    <th> Default/Required </th>
  </tr>
  <tr>
    <td> inputProps </td>
    <td> Available props for input field </td>
    <td> HTMLProps<HTMLInputElement> </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> acceptType </td>
    <td> Image Accept type </td>
    <td> ImageAcceptType | Exclude<ImageAcceptType, ImageAcceptType.ALL>[] </td>
    <td> ImageAcceptType.ALL </td>
  </tr>
   <tr>
    <td> maxFileSize </td>
    <td> Max file size validation </td>
    <td> number </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> resolutionWidth </td>
    <td> Image resolution width validation </td>
    <td> number </td>
    <td> optional </td>
  </tr>
  <tr>
    <td> resolutionHeight </td>
    <td> Image resolution height validation </td>
    <td> number </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> resolutionType </td>
    <td> Resolution type for validations </td>
     <td> "absolute" | "less" | "more" | "ratio" </td>
    <td> "absolute" </td>
  </tr>
  <tr>
    <td> children </td>
    <td> UI for upload zone or button </td>
     <td> (props: MultiImageExportTypes) => React.ReactNode </td>
    <td> required </td>
  </tr>
  <tr>
    <td> onChange </td>
    <td> Image upload listener function </td>
     <td> (value: MultiImageType) => void </td>
    <td> required </td>
  </tr>
  <tr>
    <td> value </td>
    <td> Default Value </td>
     <td> MultiImageType </td>
    <td> required </td>
  </tr>
   <tr>
    <td> onError </td>
    <td> Image upload error listener </td>
     <td> (errors: MultiImageErrorTypes) => void </td>
    <td> optional </td>
  </tr>
  <tr>
    <td> maxNumber </td>
    <td> Maximum files to be selected </td>
     <td> number </td>
    <td> 10 </td>
  </tr>
</table>

### MultiImageExportTypes
<table width="100%">
  <tr>
    <th> dragProps </th>
    <th> Element for implementing drag and drop features </th>
    <th> Object </th>
  </tr>
  <tr>
    <td> isDragging </td>
    <td> Listen is it dragging or not </td>
    <td> boolean </td>
  </tr>
   <tr>
    <td> onImageUpload </td>
    <td> Handler for triggering image upload </td>
    <td> () => void </td>
  </tr>
   <tr>
    <td> imageInfo </td>
    <td> Selected image information </td>
    <td> MultiImageType </td>
  </tr>
   <tr>
    <td> errors </td>
    <td> Error listener </td>
    <td> MultiImageErrorTypes </td>
  </tr>
  <tr>
    <td> onImageRemove </td>
    <td> Handler for removing selected Image </td>
    <td> (index: number) => void </td>
  </tr>
  <tr>
    <td> onImageUpdate </td>
    <td> Handler for updating a particular image </td>
    <td> (index: number) => void </td>
  </tr>
  <tr>
    <td> onImageRemoveAll </td>
    <td> Handler for removing all image </td>
    <td> () => void </td>
  </tr>
</table>


## `FileUpload`

### Props
<table width="100%">
  <tr>
    <th> Name </th>
    <th> Description </th>
    <th> Type </th>
    <th> Default/Required </th>
  </tr>
  <tr>
    <td> inputProps </td>
    <td> Available props for input field </td>
    <td> HTMLProps<HTMLInputElement> </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> acceptType </td>
    <td> File Accept type </td>
    <td> FileAcceptType | Exclude<FileAcceptType, FileAcceptType.ALL>[] </td>
    <td> FileAcceptType.ALL </td>
  </tr>
   <tr>
    <td> maxFileSize </td>
    <td> Max file size validation </td>
    <td> number </td>
    <td> optional </td>
  </tr>
  <tr>
    <td> children </td>
    <td> UI for upload zone or button </td>
     <td> (props: FileExportTypes) => React.ReactNode </td>
    <td> required </td>
  </tr>
  <tr>
    <td> onChange </td>
    <td> File upload listener function </td>
     <td> (value: FileType) => void </td>
    <td> required </td>
  </tr>
  <tr>
    <td> value </td>
    <td> Default Value </td>
     <td> FileType </td>
    <td> required </td>
  </tr>
   <tr>
    <td> onError </td>
    <td> File upload error listener </td>
     <td> (errors: FileErrorTypes) => void; </td>
    <td> optional </td>
  </tr>
</table>

### ImageExportTypes
<table width="100%">
  <tr>
    <th> dragProps </th>
    <th> Element for implementing drag and drop features </th>
    <th> Object </th>
  </tr>
  <tr>
    <td> isDragging </td>
    <td> Listen is it dragging or not </td>
    <td> boolean </td>
  </tr>
   <tr>
    <td> onImageUpload </td>
    <td> Handler for triggering file upload </td>
    <td> () => void </td>
  </tr>
   <tr>
    <td> fileInfo </td>
    <td> Selected file information </td>
    <td> FileType </td>
  </tr>
   <tr>
    <td> errors </td>
    <td> Error listener </td>
    <td> FileErrorTypes </td>
  </tr>
  <tr>
    <td> onFileRemove </td>
    <td> Handler for removing selected File </td>
    <td> () => void </td>
  </tr>
</table>


## `MultiFileUpload`

### Props
<table width="100%">
  <tr>
    <th> Name </th>
    <th> Description </th>
    <th> Type </th>
    <th> Default/Required </th>
  </tr>
  <tr>
    <td> inputProps </td>
    <td> Available props for input field </td>
    <td> HTMLProps<HTMLInputElement> </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> acceptType </td>
    <td> File Accept type </td>
    <td> FileAcceptType | Exclude<FileAcceptType, FileAcceptType.ALL>[] </td>
    <td> FileAcceptType.ALL </td>
  </tr>
   <tr>
    <td> maxFileSize </td>
    <td> Max file size validation </td>
    <td> number </td>
    <td> optional </td>
  </tr>
  <tr>
    <td> children </td>
    <td> UI for upload zone or button </td>
     <td> (props: MultiFileExportTypes) => React.ReactNode </td>
    <td> required </td>
  </tr>
  <tr>
    <td> onChange </td>
    <td> File upload listener function </td>
     <td> (value: MultiFileType) => void </td>
    <td> required </td>
  </tr>
  <tr>
    <td> value </td>
    <td> Default Value </td>
     <td> MultiFileType </td>
    <td> required </td>
  </tr>
   <tr>
    <td> onError </td>
    <td> File upload error listener </td>
     <td> (errors: MultiFileErrorTypes) => void </td>
    <td> optional </td>
  </tr>
  <tr>
    <td> maxNumber </td>
    <td> Maximum files to be selected </td>
     <td> number </td>
    <td> 10 </td>
  </tr>
</table>

### MultiImageExportTypes
<table width="100%">
  <tr>
    <th> dragProps </th>
    <th> Element for implementing drag and drop features </th>
    <th> Object </th>
  </tr>
  <tr>
    <td> isDragging </td>
    <td> Listen is it dragging or not </td>
    <td> boolean </td>
  </tr>
   <tr>
    <td> onFileUpload </td>
    <td> Handler for triggering file upload </td>
    <td> () => void </td>
  </tr>
   <tr>
    <td> fileInfo </td>
    <td> Selected file information </td>
    <td> MultiFileType </td>
  </tr>
   <tr>
    <td> errors </td>
    <td> Error listener </td>
    <td> MultiFileErrorTypes </td>
  </tr>
  <tr>
    <td> onFileRemove </td>
    <td> Handler for removing particular file </td>
    <td> (index: number) => void </td>
  </tr>
  <tr>
    <td> onFileUpdate </td>
    <td> Handler for updating a particular file </td>
    <td> (index: number) => void </td>
  </tr>
  <tr>
    <td> onFileRemoveAll </td>
    <td> Handler for removing all file </td>
    <td> () => void </td>
  </tr>
</table>

# Stay in touch

- Author - [Siam Ahnaf](https://www.siamahnaf.com/)
- Website - [https://www.siamahnaf.com/](https://www.siamahnaf.com/)
- LinkedIn - [https://www.linkedin.com/in/siamahnaf/](https://www.linkedin.com/in/siamahnaf/)
- Github - [https://github.com/siamahnaf](https://github.com/siamahnaf)