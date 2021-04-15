import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, FormControl, OutlinedInput, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../../services/api';

import { setNomeUsuario, login, setIdUsuario, setEmailUsuario } from '../../services/auth';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {

    await api.post('/api/users/login', { email, senha })
      .then(res => {
        if (res.status === 200) {
          if (res.data.status === 1) {
            login(res.data.token);
            setIdUsuario(res.data.id_client);
            setNomeUsuario(res.data.user_name);
            setEmailUsuario(res.data.client_email);
            window.location.href = '/'
          } else if (res.data.status === 2) {
            alert('Atenção: ' + res.data.error);
          }
          setLoading(false);
        } else {
          alert('Erro no servidor');
          setLoading(false);
        }
      })
  }
  function loadSubmit() {
    setLoading(true);
    setTimeout(
      () => handleSubmit(),
      2000
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Digite seu email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <FormControl variant="outlined" style={{ width: '100%', marginTop: 10 }}>
          <InputLabel htmlFor="campoSenha">Digite sua senha</InputLabel>
          <OutlinedInput
            id="campoSenha"
            type={showPassword ? 'text' : 'password'}
            value={senha}
            onChange={e => setSenha(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={e => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={120}
          />
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={loadSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "ENTRAR"}
        </Button>
        <Grid item>
          <Link href="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </div>
    </Container>
  );
}