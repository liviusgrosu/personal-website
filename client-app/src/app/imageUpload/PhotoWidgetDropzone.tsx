import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon, Segment } from 'semantic-ui-react';

interface Props {
    setFiles: (files: object[]) => void;
}

export default function PhotoWidgetDropzone({setFiles}: Props) {
    const onDrop = useCallback((acceptedFiles: object[]) => {
        setFiles(acceptedFiles.map((file: object) => Object.assign(file, {
            preview: URL.createObjectURL(file as Blob)
        })))
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <Segment placeholder className={`dropzone-segment ${isDragActive ? 'active' : ''}`}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Header icon>
                    <Icon name='upload'/>
                        Click or Drop image here
                </Header>
            </div>
        </Segment>
    )
}