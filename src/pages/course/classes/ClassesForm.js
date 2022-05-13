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
        [courseId, setcourseId] = useState(props.data ?.courseId),
        subimitClick = (event) => {
            props.submitFuntion(props.isUpdate, { id, name, description, courseId });
            event.preventDefault();
        },
        uploadFile = file => {
            // async function addCourse() {
            //     await api.post(api.version + 'courses', dataForm)
            //         .then((response) => {
            //             loadCourses();
            //             reloadAll(response.data.id)
            //         })
            //         .catch(function (error) {
            //             console.log(error);
            //         });
            // }
            // addCourse();
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
            <FilesPanel />
            <SubmitButton subimit={subimitClick} uploadFile={uploadFile} />
        </FormControl >
    );
}