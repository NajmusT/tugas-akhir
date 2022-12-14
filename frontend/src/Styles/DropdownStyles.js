import { makeStyles, createTheme } from "@material-ui/core";
import { Color } from "../Constants/Colors";
import { FontFamily } from "../Constants/FontFamily";

const theme = createTheme();

export const useDropdownStyles = makeStyles((theme) => ({
    dropdownContainer: {
        backgroundColor: Color.neutral[0],
        width: '100%',
        position: 'absolute',
        top: '80px',
        textAlign: 'start',
        borderTop: `4px solid ${Color.primary[300]}`
    },
    dropdownMenuContainer: {
        backgroundColor: Color.neutral[0],
        cursor: 'pointer',
        borderBottom: `0.1px solid ${Color.neutral[150]}`,

        "&:hover": {
            backgroundColor: '#F6F2FA'
        }
    },
    dropdownMenuContainerActive: {
        backgroundColor: '#F6F2FA',
        cursor: 'pointer',
        borderBottom: `0.1px solid ${Color.neutral[150]}`
    },
    dropdownLink: {
        display: 'block',
        height: '100%',
        width: 'inherit',
        textDecoration: 'none',
        fontFamily: FontFamily.POPPINS_REGULAR,
        color: Color.neutral[400],
        fontSize: '0.9rem',
        padding: '8px',

        "&:hover": {
            color: Color.primary[300]
        }
    }
}));