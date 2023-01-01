import { FontFamily } from "../Constants/FontFamily";
import { Color } from "../Constants/Colors";

export const ButtonStyles = theme => ({
    begin: {
        marginTop: 8,
        backgroundColor: Color.primary[300],
        color: "#FFFFFF",
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: 14,
        fontWeight: 600,
        boxShadow: 'none',
        textTransform: 'none',

        '&:hover': {
            backgroundColor: Color.primary[400],
            width: 'inherit',
            boxShadow: 'none'
        }
    },
    mainPrimary: {
        backgroundColor: Color.primary[300],
        color: Color.neutral[0],
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: 12,
        fontWeight: 600,
        boxShadow: 'none',
        borderRadius: 20,
        textTransform: 'none',

        '&:hover': {
            backgroundColor: Color.primary[400],
            width: 'inherit',
            boxShadow: 'none'
        }
    },
    mainWarning: {
        backgroundColor: Color.warning[600],
        color: Color.neutral[0],
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: 12,
        fontWeight: 600,
        boxShadow: 'none',
        borderRadius: 20,
        textTransform: 'none',

        '&:hover': {
            backgroundColor: Color.warning[700],
            width: 'inherit',
            boxShadow: 'none',
        }
    },
    mainDanger: {
        backgroundColor: Color.danger[100],
        color: Color.neutral[0],
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: 12,
        fontWeight: 600,
        boxShadow: 'none',
        borderRadius: 20,
        textTransform: 'none',

        '&:hover': {
            backgroundColor: Color.danger[300],
            width: 'inherit',
            boxShadow: 'none',
        }
    },
    mainSuccess: {
        backgroundColor: Color.success[100],
        color: Color.neutral[0],
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: 12,
        fontWeight: 600,
        boxShadow: 'none',
        borderRadius: 20,
        textTransform: 'none',

        '&:hover': {
            backgroundColor: Color.success[200],
            width: 'inherit',
            boxShadow: 'none',
        }
    },
    iconButton: {
        backgroundColor: Color.primary[300],
        color: Color.neutral[0],
        boxShadow: 'none',
        textTransform: 'none',

        '&:hover': {
            backgroundColor: Color.primary[400],
            width: 'inherit',
            boxShadow: 'none',
        }
    },
});