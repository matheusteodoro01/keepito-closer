import React, { useState } from 'react';
import { FormControl, TextField, Button } from '@material-ui/core';

// styles
import useStyles from "./styles";


export default function CourseForm(props) {
    const classes = useStyles(),
    [state, setState] = useState(props.data),
    handleChange = (event) => { 
        let auxState = state ?? {};
        auxState[event.target.name] = event.target.value;
        setState(auxState);  
    },
    subimitClick = (event)=>{
        props.submitFuntion(props.isUpdate, state);
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
                value={state?.name}
                onChange={handleChange}
                InputProps={{
                    readOnly: props.isUpdate,
                }}
            />
            <TextField
                required
                id="outlined-required"
                label="Description" 
                name="description"
                value={state?.description}
                onChange={handleChange}
                InputProps={{
                    readOnly: props.isUpdate,
                }}
                />
            <Button variant="raised" onClick={subimitClick}>Submit</Button>
        </FormControl >
    );
}