import { Color } from "../Constants/Colors";

export const TextFieldStyles = theme => ({
    begin: {
        '& label.Mui-focused': {
            color: Color.success[300],
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: Color.success[300],
        }
    },
});