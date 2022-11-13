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
});