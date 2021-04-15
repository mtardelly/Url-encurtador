import React, { useState, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import ClearIcon from '@material-ui/icons/Clear';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', },
  title: { flexGrow: 1, },
  appBarSpacer: theme.mixins.toolbar,
  content: { flexGrow: 1, height: '100vh', },
  container: { paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4), },
  paper: { padding: 15, display: 'flex', overflow: 'auto', flexDirection: 'column', },
  formControl: { width: '100%' }
}));

export default function UsuarioCadastrar() {
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  //CARREGA OS USUARIOS
  useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get("/api/users");
      setUsuarios(response.data)
      setLoading(false);
    }
    loadUsuarios();
  }, []);

  //DELETA UM USUARIO

  async function handleDelete(id) {
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      var result = await api.delete('/api/users/' + id);
      if (result.status === 200) {
        window.location.href = '/register';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  //CADASTRA UM USUARIO

  async function handleSubmit() {

    const data = {
      name_user: nome,
      email_user: email,
      password_user: senha,
    }
    if (nome !== '' && email !== '' && senha !== '') {

      const response = await api.post('/api/users', data);

      if (response.status === 200) {
        alert('Cadastro realizado com sucesso')
        window.location.href = '/login'
      } else {
        alert('Erro ao cadastrar o usuário');
      }

    } else {
      alert('Por favor, Preencha todos os campos');
    }

  }


  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid align='right'><Button align='right' style={{ marginBottom: 10 }} variant="contained" color="default" href='/login'>Login</Button></Grid>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Cadastro de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      align="center"
                      required
                      id="nome"
                      name="nome"
                      label="Nome completo"
                      fullWidth
                      autoComplete="none"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}></Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      variant="outlined"
                      type="password"
                      required
                      id="senha"
                      name="senha"
                      label="Senha"
                      fullWidth
                      autoComplete="senha"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}></Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" onClick={handleSubmit} color="primary">
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
                <h2>Listagem de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      {loading ? (<LinearProgress style={{ width: '50%', margin: '20px auto' }} />) : (
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome</TableCell>
                              <TableCell align="center">Email</TableCell>
                              <TableCell align="center">Data</TableCell>
                              <TableCell align="right">Apagar</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {usuarios.map((row) => (
                              <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                  {row.name_user}
                                </TableCell>
                                <TableCell align="center">{row.email_user}</TableCell>
                                <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                                <TableCell align="right">
                                  <ButtonGroup aria-label="outlined primary button group">
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(row._id)}><ClearIcon /></Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>)}
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
          </Box>
        </Container>
      </main>
    </div>
  );
}