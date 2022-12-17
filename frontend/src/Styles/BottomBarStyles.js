import { makeStyles, createTheme } from "@material-ui/core";
import { Color } from "../Constants/Colors";
import { FontFamily } from "../Constants/FontFamily";
import image from "../asset/images/sawah.png"

const theme = createTheme();

export const useBottomBarStyles = makeStyles((theme) => ({
    title: {
        fontFamily: FontFamily.POPPINS_BOLD,
        fontSize: '1rem',
        color: Color.neutral[0]
    },
    bodyWebResmi: {
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: '0.75rem',
        color: Color.neutral[0]
    },
    bodyKontakKami: {
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: '0.75rem',
        color: Color.neutral[300],
        paddingLeft: '8px',

        "&:hover": {
            color: Color.primary[300]
        }
    },
    disdikpora: {
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: '2rem',
        color: Color.neutral[0],
        letterSpacing: -4
    },
    contactUs: {
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: '0.75rem',
        color: Color.neutral[300],
        paddingLeft: 8,
        paddingTop: 4,

        "&:hover": {
            color: Color.neutral[0]
        }
    },
    copyright: {
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: '0.75rem',
        color: Color.neutral[0]
    },
    icon: {
        color: '#797979',

        "&:hover": {
            color: Color.neutral[0]
        }
    },
    sosMedContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        alignItems: 'center',
        justifyItems: 'center',
        color: Color.neutral[300],

        "&:hover": {
            color: Color.neutral[0],
            backgroundColor: Color.primary[300]
        }
    }
}));