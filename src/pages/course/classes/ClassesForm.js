import React, { useState } from 'react';
import { FormControl, TextField } from '@material-ui/core';

// api
import api from '../../../services/api'

// styles
import useStyles from "../../../components/styles";

// components
import SubmitButton from "../../../components/SubmitButton";
import FilesPanel from "../../../components/FilesPanel";

export default function CourseForm(props) {
    const style = useStyles(),
        [id, setId] = useState(props.data ?.id),
        [name, setName] = useState(props.data ?.name),
        [description, setDescription] = useState(props.data ?.description),
        [classId, setClassId] = useState(props.data ?.id),
        subimitClick = (event) => {
            props.submitFuntion(props.isUpdate, { id, name, description, classId });
            event.preventDefault();
        },
        uploadFile = (file, promise) => {


            async function addFile(data) {
                await api.post(api.version + 'classes/files?classId=' + classId, { file: data })
                    .then((response) => {
                        promise();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const onFileUpload = () => {
                // Create an object of formData 
                const formData = new FormData(),
                    userfile = file;

                formData.append(userfile.name, userfile);
                // Update the formData object 
                // formData.append(
                //     userfile.name,
                //     userfile,
                //     userfile.name
                // );

                // Request made to the backend api 
                // Send formData object 
                addFile(formData);
            };
            onFileUpload();
        }, getFiles = () => {
            async function loadFiles() {
                await api.get(api.version + 'classes/files?classId=' + classId, {})
                    .then((response) => {
                        return response.data.content
                    })
            }
            return loadFiles();
        };

    return (
        <FormControl className={style.form}>
            <legend>{props.title}</legend>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                // InputProps={{
                //     readOnly: props.isUpdate,
                // }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Description"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <FilesPanel uploadFile={uploadFile} getFiles={getFiles} />
            <SubmitButton subimit={subimitClick} />
        </FormControl >
    );
}