import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const Select = (props) => {
    const { value, handleChange, width, name, option, input } = props
    return (
        <FormControl style={{ paddingTop: 8, width: width }}>
            <NativeSelect
                value={value}
                onChange={handleChange}
                name={name}
                inputProps={{ 'aria-label': input }}
            >
                {
                    option.map((opt) => {
                        return (
                            <option value={opt}>{opt}</option>
                        )

                    })
                }
            </NativeSelect>
        </FormControl>
    )
}

Select.defaultProps = {
    value: null,
    handleChange: console.log("Clicked"),
    name: 'test',
    input: 'test',
    option: [
        'None', 10, 20, 30
    ]
}

export default Select
