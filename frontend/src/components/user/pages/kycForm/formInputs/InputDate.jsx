import React from 'react'
import { StyledDatePicker, ErrorTypography } from '../KycFormStyles'

const REQUIRED_MSG = "This field is required";

const InputDate = ({register, name, errors}) => {
    return (
        <>
            <StyledDatePicker {...register(name, {required: true})} type="date" />
            {errors[name] && <ErrorTypography color='red' variant='subtitle2'>{REQUIRED_MSG}</ErrorTypography>}
        </>
    )
}

export default InputDate
