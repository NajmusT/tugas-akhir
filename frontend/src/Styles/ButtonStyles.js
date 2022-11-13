import { FontFamily } from "../Constants/FontFamily";
import { Color } from "../Constants/Colors";

export const ButtonStyles = theme => ({
    begin: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: Color.primary[300],
        color: "#FFFFFF",
        fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: 14,
        fontWeight: 600,
        boxShadow: 'none',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: Color.primary[400],
            boxShadow: 'none',
        }
    },
});