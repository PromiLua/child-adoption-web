import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import Paper from '@mui/material/Paper';
import { ScreenCrudToolbar } from '../../components/toolbar/ScreenCrudToolbar';
import NumberFormat from 'react-number-format';
import { useFormik } from 'formik';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { getPersonId } from '../../services/PeopleService';

const PersonGet = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      cpf: '',
      rg: '',
      street: '',
      number: '',
      district: '',
      city: '',
      country: '',
      birth_date: '',
      active: '',
      civil_state: '',
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getPersonId(uuid));
      if (response) {
        await formik.setFieldValue('name', response.name);
        await formik.setFieldValue('cpf', response.cpf);
        await formik.setFieldValue('rg', response.rg);
        await formik.setFieldValue('street', response.street);
        await formik.setFieldValue('number', response.number);
        await formik.setFieldValue('district', response.district);
        await formik.setFieldValue('city', response.city);
        await formik.setFieldValue('country', response.country);
        await formik.setFieldValue('birth_date', response.birth_date);
        await formik.setFieldValue('civil_state', response.civil_state);
      }
    };
    if (!isLoaded) {
      setIsLoaded(true);
      fetchData().then();
    }
  }, [formik]);

  return (
    <>
      <Helmet>
        <title>Visualizar Pessoa</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenCrudToolbar title={formik.values.name} goBackPath="/admin/pessoa" />
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <NumberFormat
                          format="###.###.###-##"
                          mask="_"
                          fullWidth
                          label="CPF"
                          type="text"
                          name="cpf"
                          value={formik.values.cpf}
                          customInput={TextField}
                          variant="filled"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          fullWidth
                          label="Nome"
                          type="text"
                          name="name"
                          value={formik.values.name}
                          variant="filled"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <NumberFormat
                          format="##.###.###-#"
                          mask="_"
                          fullWidth
                          label="RG"
                          type="text"
                          name="rg"
                          value={formik.values.rg}
                          customInput={TextField}
                          variant="filled"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <NumberFormat
                          format="##/##/####"
                          mask="_"
                          fullWidth
                          label="DATA DE NASCIMENTO"
                          type="text"
                          name="birth_date"
                          value={formik.values.birth_date}
                          customInput={TextField}
                          variant="filled"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          fullWidth
                          label="RUA"
                          type="text"
                          name="street"
                          value={formik.values.street}
                          variant="filled"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          fullWidth
                          label="NÚMERO"
                          type="text"
                          name="number"
                          value={formik.values.number}
                          variant="filled"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          fullWidth
                          label="BAIRRO"
                          type="text"
                          name="district"
                          value={formik.values.district}
                          variant="filled"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          fullWidth
                          label="CIDADE"
                          type="text"
                          name="city"
                          value={formik.values.city}
                          variant="filled"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          fullWidth
                          label="PAÍS"
                          type="text"
                          name="country"
                          value={formik.values.country}
                          variant="filled"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          fullWidth
                          label="ESTADO CIVIL"
                          type="text"
                          name="civil_state"
                          value={formik.values.civil_state}
                          variant="filled"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
              </Card>
            </form>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PersonGet;
