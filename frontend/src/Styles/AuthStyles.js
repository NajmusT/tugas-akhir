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
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    },
    paper: {
        display: 'flex',
        padding: 56,
        flexDirection: 'column',
        backgroundColor: "white",
        borderRadius: 20
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 20,
    },
    title: {
        fontSize: 28,
        fontFamily: FontFamily.POPPINS_SEMI_BOLD,
        textAlign: "left",
        color: Color.neutral[700]
    },
    textBody: {
        fontSize: 14,
        fontFamily: FontFamily.POPPINS_BOLD,
        fontWeight: 500,
        color: Color.neutral[700]
    },
    textBodyError: {
        fontSize: 10,
        fontFamily: FontFamily.POPPINS_REGULAR,
        color: Color.danger[500],
        textAlign: 'end'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: Color.primary[300],
        color: "#FFFFFF",
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: 16,
        fontWeight: 600,
        boxShadow: 'none',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: Color.primary[400],
            boxShadow: 'none',
        }
    },
    link: {
        fontSize: 12,
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontWeight: 500,
        color: Color.neutral[100]
    }
}));