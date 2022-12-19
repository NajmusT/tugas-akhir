import { makeStyles, createTheme } from "@material-ui/core";
import { Color } from "../Constants/Colors";
import { FontFamily } from "../Constants/FontFamily";

const theme = createTheme();

export const useNavbarStyles = makeStyles((theme) => ({
    navbarContainer: {
        backgroundColor: Color.neutral[0],
        height: '80px',
        display: 'flex',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1rem',
        // position: 'fixed',
        // top: 0

    },
    navbarLogo: {
        color: Color.neutral[400],
        justifySelf: 'start',
        alignItems: 'center',
        marginLeft: '20px',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '1.5rem'
    },
    navbarMenu: {
        display: 'flex',
        fontFamily: FontFamily.POPPINS_SEMI_BOLD,
        alignItems: 'center',
        gridGap: '24px',
        textAlign: 'center',
        justifyContent: 'flex-end'
    },
    navbarItem: {
        display: 'flex',
        alignItems: 'center',
        height: '80px'
    },
    navbarLinks: {
        color: Color.neutral[400],
        textDecoration: 'none',
        padding: 8,
        alignItems: 'center',
        display: 'flex',

        "&:hover": {
            color: Color.primary[300],
            borderRadius: '4px',
            transition: 'all 0.2s ease-out'
        }
    },
    navbarLinksActive: {
        color: Color.primary[300],
        textDecoration: 'none',
        padding: 8,
        alignItems: 'center',
        display: 'flex',

        "&:hover": {
            color: Color.primary[300],
            borderRadius: '4px',
            transition: 'all 0.2s ease-out'
        }
    }
}));