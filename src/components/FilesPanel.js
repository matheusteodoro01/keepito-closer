import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import AttachFileIcon from "@material-ui/icons/AttachFile";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { green } from '@material-ui/core/colors';

export default function FilesPanel(props) {
    const [files, setFiles] = useState([]),
        hiddenFileInput = React.useRef(null);

    let uploadFileButton = event => {
        hiddenFileInput.current.click();
    }, changeFile = event => {
        const fileUploaded = event.target.files[0];
        props.uploadFile(fileUploaded, getFiles);
    }, getFiles = async () => {
        let files = await props.getFiles() ?? [];
        setFiles(files);
    };

    useEffect(() => {
        getFiles();
    }, []);

    return (
        <div style={{ width: '100%'}}>
            <div>
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={changeFile}
                    accept="application/pdf"
                    style={{ display: 'none' }} />

                <Button
                    onClick={uploadFileButton}
                    variant="outlined"
                    color="primary"
                    endIcon={<AttachFileIcon />}>
                    Enviar
            </Button>
            </div>
            <div>
                <Grid container spacing={2} style={{ width: '100%' }}>
                    {
                        files ?.map((file) => {
                            let lengthName = file.length,
                                nameButton = "",
                                clckButton = () => {

                                };
                            if (lengthName > 0)
                                nameButton = file.slice(0, 5) + "....pdf";
                            else
                                nameButton = file;

                            return (
                                <Grid item xs={4} key={file} style={{ border: green }} >
                                    <Button
                                        onClick={clckButton}
                                        variant="outlined"
                                        color="primary"
                                        endIcon={<FileCopyIcon />}>
                                        {nameButton}
                                    </Button>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        </div>
    );
}