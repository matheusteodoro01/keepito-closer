import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    boxModalCourseForm: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1150,
        background: '#FFFFFF',
        'border-radius': '25px',
        padding: 5,
        'max-height': '95%',
        overflow: "hidden",
        overflowY: "scroll", // added scroll
        'background-color': 'rgba(255,255,255,0.87)'
    },
    boxModalClassesForm: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        background: '#FFFFFF',
        'border-radius': '25px',
        padding: 5,
        'background-color': 'rgba(255,255,255,0.87)',
        'max-height': '95%',
        overflow: "hidden",
        overflowY: "scroll" // added scroll
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(4),

        '& .MuiTextField-root': {
            margin: theme.spacing(4),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(1),
        },
        '& .MuiGrid-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

