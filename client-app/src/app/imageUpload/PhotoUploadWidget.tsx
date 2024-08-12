import { Button, Grid, Header, ModalActions, ModalContent, ModalHeader } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
 
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
        <>
            <ModalHeader className='modal-header'>
                Change Cover Photo
            </ModalHeader>
            <ModalContent>
                <Grid>
                    {files.length === 0 && (
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header content='Add Photo'/>
                                <PhotoWidgetDropzone setFiles={setFiles}/>
                            </Grid.Column>
                        </Grid.Row>
                    )}
                    {files && files.length > 0 && (
                        <>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Header content='Resize Image'/>
                                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview}/>
                                </Grid.Column>
                            </Grid.Row>
                        </>
                    )}
                </Grid>
            </ModalContent>
            {files && files.length > 0 && (
                <ModalActions>
                    <Button onClick={onCrop} content="Upload" positive icon='save'/>
                    <Button onClick={() => setFiles([])} content="Reset" icon='trash'/>
                </ModalActions>
            )}
        </>

    )
}