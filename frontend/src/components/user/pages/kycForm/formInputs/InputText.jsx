import { TextField } from "@mui/material";

const REQUIRED_MSG = "This field is required";

const InputText = ({register, type, errors, name, label}) => {
    let pattern=null;

    if(type==="email"){
        pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    }
    if(type==="number"){
        pattern = /^\d+$/;
    }

    return(
      <TextField
      {...register(name, { required: true, pattern:{value: pattern, message:`${label} is not valid`}})}
      error={!!errors[name]}
      label={label}
      fullWidth
      helperText={errors[name]?.type === 'required' ? REQUIRED_MSG : errors[name]?.message}
    />
    )
  }

export default InputText;