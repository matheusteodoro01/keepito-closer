import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import PageviewIcon from "@material-ui/icons/Pageview";
import AttachFileIcon from "@material-ui/icons/AttachFile";

export default function FileButtons(props) {
    const [disableViewFile, setDisableViewFile] = useState(true),
        [file, setFile] = useState(null),
        [fileName, setFileName] = useState(null),
        hiddenFileInput = React.useRef(null);

    let uploadFile = event => {
        hiddenFileInput.current.click();
    }, handleChange = event => {
        const fileUploaded = event.target.files[0];
        setFileName(fileUploaded.name);
        setFile(fileUploaded);
        setDisableViewFile(false);
    }, openFile = () => {
        window.open(file);
    };

    return (
        <div>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                accept="application/pdf"
                style={{ display: 'none' }} />

            <TextField
                required
                id="outlined-required"
                label="File"
                name="fielName"
                value={fileName}
                InputProps={{
                    readOnly: true
                }}
            />
            <Button
                onClick={uploadFile}
                variant="outlined"
                color="primary"
                endIcon={<AttachFileIcon />}>
                Upload a file
            </Button>
            <Button
                onClick={openFile}
                variant="outlined"
                color="primary"
                endIcon={<PageviewIcon />}
                disabled={disableViewFile}>
                View the file
            </Button>
        </div>
    );
}