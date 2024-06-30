import React from 'react'

import { FormControl, RadioGroup, FormControlLabel, FormHelperText, Radio } from '@mui/material'
import { Controller} from "react-hook-form";

const REQUIRED_MSG = "This field is required";

const InputRadio = ({name, values, control, errors}) => {
    //Here the label of the radio is dyanamically given by capitalizing the first letter from the values array
    return (
        <FormControl
            error={!!errors[name]}
            component="fieldset"
            >
            <Controller
                rules={{ required: true }}
                control={control}
                defaultValue={""}
                name={name}
                render={({ field }) => (
                    <RadioGroup {...field}>
                        {values.map((value, index)=>
                        <FormControlLabel
                            key={index}
                            value={value}
                            control={<Radio />}
                            label={value.charAt(0).toUpperCase() + value.slice(1)}
                        />
                        )}
                    </RadioGroup>
                )}
            />
            <FormHelperText>
                {errors[name] && REQUIRED_MSG}
            </FormHelperText>
        </FormControl>
    )
}

export default InputRadio;
