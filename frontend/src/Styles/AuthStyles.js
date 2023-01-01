import { makeStyles, createTheme } from "@material-ui/core";
import { Color } from "../Constants/Colors";
import { FontFamily } from "../Constants/FontFamily";
import image from "../asset/images/sawah.png"

const theme = createTheme();

export const useAuthStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    },
    paper: {
        display: 'flex',
        padding: '40px 52px',
        flexDirection: 'column',
        backgroundColor: "white",
        borderRadius: 20
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 20,
    },
    title: {
        fontSize: '1.75rem',
        fontFamily: FontFamily.POPPINS_SEMI_BOLD,
        textAlign: "left",
        color: Color.neutral[700]
    },
    textBody: {
        fontSize: '0.8rem',
        fontFamily: FontFamily.POPPINS_BOLD,
        fontWeight: 500,
        color: Color.neutral[700]
    },
    textBodyError: {
        fontSize: '0.6rem',
        fontFamily: FontFamily.POPPINS_REGULAR,
        color: Color.danger[500],
        textAlign: 'end'
    },
    submit: {
        marginTop: 24,
        backgroundColor: Color.primary[300],
        color: Color.neutral[0],
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: '0.5rem',
        fontWeight: 600,
        boxShadow: 'none',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: Color.primary[400],
            boxShadow: 'none',
        }
    },
    link: {
        fontSize: '0.75rem',
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontWeight: 500,
        color: Color.neutral[100]
    }
}));