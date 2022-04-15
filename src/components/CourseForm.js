import React, { useState } from 'react';
import { FormControl, TextField, Button } from '@material-ui/core';

// styles
import useStyles from "./styles";


export default function CourseForm(props) {
    const classes = useStyles(),
        [name, setName] = useState(props.name),
        [description, setDescription] = useState(props.description),

        subimitClick = (event) => {
            props.submitFuntion(props.isUpdate, { name, description });
            event.preventDefault();
        };
    return (
        <FormControl className={classes.form}>
            <legend>{props.title}</legend>
            <TextField
                required
                id="outlined-required"
                label="Name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                InputProps={{
                    readOnly: props.isUpdate,
                }}
            />
            <TextField
                required
                id="outlined-required"
                label="Description"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                InputProps={{
                    readOnly: props.isUpdate,
                }}
            />
            <Button variant="raised" onClick={subimitClick}>Submit</Button>
        </FormControl >
    );
}