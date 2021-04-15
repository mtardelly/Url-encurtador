import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, ButtonGroup, LinearProgress, Link

} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ClearIcon from '@material-ui/icons/Clear';

import api from '../services/api';
import { getIdUsuario, getEmailUsuario, getToken, logout } from '../services/auth';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',

  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),

  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

}));

export default function UrlListagem() {
  const classes = useStyles();

  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [full, setFull] = useState('');

  //CARREGA AS URLS

  useEffect(() => {

    async function loadUrls() {
      const response = await api.get("/api/users.details/" + getIdUsuario());
      setUrls(response.data.urls)
      setLoading(false);
    }
    loadUrls();
  }, []);

  //CADASTRA UMA URL

  async function handleSubmit() {

    var url_pattern = /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;

    const data = {
      url_full: full,
      email_user: getEmailUsuario()
    }

    if (full !== '' && full.match(url_pattern)) {

      const response = await api.post('/api/urls', data);

      if (response.status === 200) {
        alert('Url cadastrada com sucesso')
        window.location.href = '/';

      } else {
        alert('Erro ao cadastrar a Url');
      }

    } else {
      alert('Por favor, Insira uma Url Valida');
    }

  }
  
  // DELETA UMA URL
  
  async function handleDelete(id) {
    if (window.confirm("Deseja realmente excluir esta Url?")) {
      var result = await api.delete('/api/urls/delete/' + id);
      if (result.status === 200) {
        alert('Url deleteda com sucesso')
        window.location.href = '/';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  //LOGOUT 
  //APAGAR TOKEN

  async function confirmSair() {
    if (window.confirm("Deseja realmente sair do sistema?")) {
      const response = await api.get("/api/users/destroytoken", { headers: { token: getToken() } });
      if (response.status === 200) {
        logout();
        window.location.href = '/login'
      } else {
        alert("Não foi possível fazer o logout!");
      }
    }
  }

  //REDIRECIONAMENTO DA URL

  async function Redirect(url) {
    window.open(url)
  
  }
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Grid align='right'><Button align='right' style={{ marginBottom: 10 }} variant="contained" color="default" onClick={confirmSair}>Logout</Button></Grid>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button style={{ marginBottom: 10 }} variant="contained" color="primary" onClick={handleSubmit}>
                <AddIcon />
              Cadastrar URl
            </Button>
              <Grid item xs={6} sm={6}>
                <TextField
                  variant="outlined"
                  align="center"
                  required
                  id="full"
                  name="full"
                  label='URL com "http"'
                  fullWidth
                  autoComplete="none"
                  value={full}
                  onChange={e => setFull(e.target.value)}
                />
              </Grid>
              <Paper className={classes.paper}>
                <h2>Lista de URL'S</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      {loading ? (<LinearProgress style={{ width: '50%', margin: '20px auto' }} />) : (
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Full Url</TableCell>
                              <TableCell align="center">Short Url</TableCell>
                              <TableCell align="center">Data de Cadastro</TableCell>
                              <TableCell align="right">Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {urls.map((row) => (
                              <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                  {row.url_full}
                                </TableCell>
                                <TableCell align="center" href={row.url_short}>
                                  <Link href='/' onClick={() => Redirect(row.url_full)}>
                                    {row.url_short}
                                  </Link>
                                </TableCell>
                                <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                                <TableCell align="right">
                                  <ButtonGroup aria-label="outlined primary button group">
                                    <Button variant="contained" color="primary" onClick={() => Redirect(row.url_full)}><AutorenewIcon />open</Button>
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
