import { Color } from "../Constants/Colors";
import { FontFamily } from "../Constants/FontFamily";

export const BeginStyles = theme => ({
    root: {
        height: '100vh',
        width: '90%'
    },
    paper: {
        margin: "256px 128px",
        flexDirection: 'column',
        zIndex: 9
    },
    form: {
        width: '100%',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: Color.success[300],
        color: "#FFFFFF",
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: 16,
        fontWeight: 600,
        boxShadow: 'none',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: Color.success[200],
            boxShadow: 'none',
        }
    },
    title: {
        fontSize: 28,
        fontFamily: FontFamily.POPPINS_SEMI_BOLD,
        textAlign: "left",
        color: Color.neutral[600]
    },
    textBody: {
        fontSize: 14,
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontWeight: 500,
        color: Color.neutral[700]
    }
});