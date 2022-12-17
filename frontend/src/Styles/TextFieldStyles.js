import { Color } from "../Constants/Colors";

export const TextFieldStyles = theme => ({
    begin: {
        '& label.Mui-focused': {
            color: Color.primary[300],
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: Color.primary[300],
        }
    },
    main: {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                border: `2px solid ${Color.primary[300]}`            // focus
            }
        },
        "& .MuiOutlinedInput-root.Mui-disabled": {
            background: '#F2F2F2',
            color: '#000000'
        }
    },
    option: {
        backgroundColor: Color.neutral[0],
        color: Color.neutral[300],

        '&:hover': {
            backgroundColor: Color.primary[300],
            color: Color.neutral[0]
        }
    }
});