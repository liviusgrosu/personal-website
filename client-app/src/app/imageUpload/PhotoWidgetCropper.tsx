import React from "react";
import 'cropperjs/dist/cropper.css';
import { Cropper } from "react-cropper";

interface Props {
    imagePreview: string;
    setCropper: (cropper: Cropper) => void;
}

export default function PhotoWidgetCropper({imagePreview, setCropper}: Props) {
    return (
        <Cropper
            src={imagePreview}
            style={{height: 300, width: '100%'}}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
        />
    )
}