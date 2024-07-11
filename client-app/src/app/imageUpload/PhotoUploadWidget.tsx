import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import { useStore } from "../stores/store";
 
interface Props {
    uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({uploadPhoto}: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: object & {preview?: string}) => 
                URL.revokeObjectURL(file.preview!));
        }
    }, [files])

    return (
         <Grid>
            {files.length === 0 && (
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Header sub content='Step 1 - Add Photo'/>
                        <PhotoWidgetDropzone setFiles={setFiles}/>
                    </Grid.Column>
                </Grid.Row>
            )}
            {files && files.length > 0 && (
                <>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header sub content='Step 2 - Resize Image'/>
                            <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header sub content='Step 3 - Preview & Upload'/>
                            <div className='img-preview' style={{minHeight: 100, overflow: 'hidden'}}/>
                            <Button.Group widths={2}>
                                <Button onClick={onCrop} content="Upload" positive icon='save'/>
                                <Button onClick={() => setFiles([])} content="Reset" icon='trash'/>
                            </Button.Group>
                        </Grid.Column>
                    </Grid.Row>
                </>
            )}
            
         </Grid>
    )
}