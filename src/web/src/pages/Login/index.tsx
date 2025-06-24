import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {Link as RouterLink} from 'react-router-dom';
import {Box, Button, Link, styled, TextField, Typography} from '@mui/material';
import {PasswordTextField} from '@components/form';
import {Flex} from '@components/ui';
import {loginSchema} from './validations';
import type {LoginSchema} from './validations';

const StyledForm = styled('form')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  paddingInline: '20px',
  [theme.breakpoints.up('lg')]: {
    width: '50%',
    paddingInline: '0px',
  },
}));

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => console.log(data);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{minHeight: '100vh'}}
    >
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{textAlign: 'center', marginBottom: '2rem !important'}}
          variant="h4"
        >
          Login
        </Typography>

        <Controller
          name="email"
          control={control}
          render={({field}) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({field}) => (
            <PasswordTextField
              {...field}
              label="Password"
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{height: '3.5rem'}}
          fullWidth
        >
          <Typography textTransform="none">Login</Typography>
        </Button>
      </StyledForm>
      <Box mt="10px">
        <Typography color="text.secondary">
          Don't have an account?{' '}
          <Link
            component={RouterLink}
            to="/signup"
            color="primary"
            underline="hover"
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Flex>
  );
}
