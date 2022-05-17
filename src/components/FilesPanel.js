import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import AttachFileIcon from "@material-ui/icons/AttachFile";

export default function FilesPanel(props) {
    const [files, setFiles] = useState(null),
        hiddenFileInput = React.useRef(null);

    let uploadFileButton = event => {
        hiddenFileInput.current.click();
    }, changeFile = event => {
        const fileUploaded = event.target.files[0];
        props.uploadFile(fileUploaded);
    }, getFiles = () => {
        let files = props.getFiles();
        setFiles(files);
    };

    useEffect(() => {
        getFiles();
    }, []);

    return (
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
                Upload a file
            </Button>
            <div>
                <Grid item xs={4}>
                    {
                        files.map((file) => {
                            let lenthName = file.name.lenth,
                                qteChar = lenthName - 20,
                                nameButton = "",
                                clckButton = () => {

                                };
                            if (qteChar > 0)
                                nameButton = file.name.slice(-qteChar) + "....pdf";
                            else
                                nameButton = file.name + ".pdf";
                            <Button
                                onClick={clckButton}
                                variant="text"
                                color="primary"
                                endIcon={<AttachFileIcon />}>
                                {nameButton}
                            </Button>
                        })
                    }
                </Grid>
            </div>
        </div>
    );
}