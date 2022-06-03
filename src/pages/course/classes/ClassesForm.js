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
            const sendFile = async () => {
                const dataForm = new FormData();
                dataForm.append('file', file);
                const res = await api.post(api.version + 'classes/uploadFile?classId=' + classId, dataForm)
                    .then((response) => {
                        promise()
                    })
            };
            sendFile();
        }, getFiles = () => {
            async function loadFiles() {
                return await api.get(api.version + 'classes/files?classId=' + classId, {})
                    .then((response) => {
                        return response.data
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
                    label="Nome"
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
                    label="Descrição"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            { !props.isUpdate ? '': <FilesPanel uploadFile={uploadFile} getFiles={getFiles}/>}
            <SubmitButton subimit={subimitClick} />
        </FormControl >
    );
}