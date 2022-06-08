import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { Typography } from "../components/Wrappers/Wrappers";
import { InsertDriveFile } from "@material-ui/icons";
import {  makeStyles } from "@material-ui/styles";

var useStyles = makeStyles(theme => ({
    badge: {
      fontWeight: 600,
      height: 16,
      minWidth: 16,
    },
  }));

export default function FilesPanel(props) {
    var classes = useStyles();
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
                                <Typography key={file} variant="href" color="primary" className={classes.textRow}>
                                <InsertDriveFile
                                  key={file}
                                  href={`${{ file }}`}
                                />
                               <a href={`https://jornada-back.s3.amazonaws.com/classes/classId-${props.classId}/${file}`} target="blank">{file}</a> 
                              </Typography>
                            )
                        })
                    }
                </Grid>
            </div>
        </div>
    );
}