import {useState} from 'react';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {IconButton, InputAdornment, TextField} from '@mui/material';
import type {TextFieldProps} from '@mui/material';

export function PasswordTextField(props: TextFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
