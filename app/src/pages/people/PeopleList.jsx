import React, { useEffect, useState } from 'react';
import { Container, Fab, TableCell, Tooltip } from '@mui/material';
import { Helmet } from 'react-helmet';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ScreenListToolbar } from '../../components/toolbar/ScreenListToolbar';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePerson, getAllPerson } from '../../services/PeopleService';

const columns = [
  { id: 'name', label: 'NOME', minWidth: 200 },
  { id: 'cpf', label: 'DOCUMENTO', minWidth: 200 },
  { id: 'city', label: 'ENDEREÇO', minWidth: 100 },
  {
    id: 'actions',
    align: 'center',
    minWidth: 130,
    disablePadding: false,
    label: 'AÇÕES',
  },
];

const PeopleList = () => {
  const dispatch = useDispatch();
  const [querySearch, setQuerySearch] = useState({
    pagina: 0,
    tamanhoPagina: 5,
  });
  const [rows, setRows] = useState([]);

  const builderData = (responsePerson) => {
    setRows(responsePerson?.items || []);
  };

  const searchPeople = async () => {
    const _querySearch = { ...querySearch, pagina: 0 };
    setQuerySearch(_querySearch);
    const responsePerson = await dispatch(getAllPerson(_querySearch));
    builderData(responsePerson);
  };

  const [isLoadData, setLoadData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await searchPeople();
    };
    if (!isLoadData && rows.length <= 0) {
      setLoadData(true);
      fetchData().then();
    }
    return () => {
      builderData(null);
    };
  }, [isLoadData]);

  const handleSubmit = async (uuid) => {
    await dispatch(deletePerson(uuid));
    await searchPeople();
  };

  return (
    <>
      <Helmet>
        <title>Lista de Pessoas</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenListToolbar
            title="Lista de Pessoas"
            goAddRegisterPath="/admin/pessoa/adicionar"
          ></ScreenListToolbar>
          <PerfectScrollbar>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 1, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.uuid}>
                        {columns.map((column) => {
                          if (column.id === 'actions') {
                            return (
                              <TableCell key={column.id} align="center">
                                <Link to={`/admin/pessoa/visualizar/${row.uuid}`}>
                                  <Tooltip
                                    title="Detalhes"
                                    sx={{
                                      marginRight: 1,
                                      marginBottom: 0.3,
                                      marginTop: 0.3,
                                      padding: 2,
                                    }}
                                  >
                                    <Fab color="default" size="small">
                                      <VisibilityIcon />
                                    </Fab>
                                  </Tooltip>
                                </Link>
                                <Link to={`/admin/pessoa/editar/${row.uuid}`}>
                                  <Tooltip
                                    title="Alterar"
                                    sx={{
                                      marginRight: 1,
                                      marginBottom: 0.3,
                                      marginTop: 0.3,
                                      padding: 2,
                                    }}
                                  >
                                    <Fab color="default" size="small">
                                      <EditIcon />
                                    </Fab>
                                  </Tooltip>
                                  <Tooltip
                                    title="Deletar"
                                    sx={{
                                      marginRight: 1,
                                      marginBottom: 0.3,
                                      marginTop: 0.3,
                                      padding: 2,
                                    }}
                                  >
                                    <Fab
                                      color="default"
                                      size="small"
                                      onClick={() => handleSubmit(row.uuid)}
                                    >
                                      <DeleteIcon />
                                    </Fab>
                                  </Tooltip>
                                </Link>
                              </TableCell>
                            );
                          }
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </PerfectScrollbar>
        </Paper>
      </Container>
    </>
  );
};

export default PeopleList;
