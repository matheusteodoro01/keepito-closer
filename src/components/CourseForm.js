import React from 'react';
import { FormControl, TextField, Button } from '@material-ui/core';

// styles
import useStyles from "./styles";


export default function CourseForm(props) {
    const classes = useStyles();
    let state = props.dados
    return (
        <FormControl className={classes.form}>
            <legend>{props.title}</legend>
            <TextField
                required
                id="outlined-required"
                label="Name"
                value={state?.name}
                InputProps={{
                    readOnly: props.isUpdate,
                }}
            />
            <TextField
                required
                id="outlined-required"
                label="Text" />
            <Button variant="raised" onClick={props.submitFuntion(props.isUpdate, state)}>Submit</Button>
        </FormControl >
    );
}