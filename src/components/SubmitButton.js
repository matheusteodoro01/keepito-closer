import React from 'react';
import { Button } from '@material-ui/core';
import DoneIcon from "@material-ui/icons/Done";

export default function SubmitButton(props) {
    return (
        <Button
            onClick={props.subimit}
            variant="outlined"
            color="primary"
            endIcon={<DoneIcon />}>
            Salvar
        </Button>
    );
}