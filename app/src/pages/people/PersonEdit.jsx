import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
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
import SaveIcon from '@mui/icons-material/Save';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../store/messages/AlertReducer';
import { CodeAlertsMessage } from '../../constants/CodeAlertsMessage';
import { CodeSuccessMessage } from '../../constants/CodeSuccessMessage';
import { getPersonId, updatePerson } from '../../services/PeopleService';

const PersonEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const formik = useFormik({
    initialValues: {
      cnpj: '',
      razaoSocial: '',
      nomeFantasia: '',
      telefone: '',
      endereco: '',
      nomeDPO: '',
      emailDPO: '',
      resumo: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      cpf: Yup.string()
        .required('CPF é obrigatório')
        .matches(/^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/, 'CPF inválido'),
      rg: Yup.string()
        .required('RG é obrigatório')
        .matches(/^(\d{2}\.?\d{3}\.?\d{3}-?\d{1})$/, 'RG inválido'),
      birth_date: Yup.string().nullable(),
      street: Yup.string().required('Rua é obrigatória'),
      number: Yup.string().required('Número é obrigatório'),
      city: Yup.string().required('Cidade é obrigatória'),
      district: Yup.string().required('Bairro é obrigatório'),
      country: Yup.string().required('País é obrigatório'),
      civil_state: Yup.string().required('Estado Civil é obrigatório'),
    }),
    onSubmit: (values) => {},
  });

  const [isLoaded, setIsLoaded] = useState(false);
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
        await formik.setFieldValue('active', response.active);
      }
    };
    if (!isLoaded) {
      setIsLoaded(true);
      fetchData().then();
    }
  }, [formik]);

  const submitUpdatePerson = async () => {
    await formik.submitForm();
    if (
      formik.values.name !== '' &&
      formik.values.cpf !== '' &&
      formik.values.rg &&
      formik.values.street !== '' &&
      formik.values.number !== '' &&
      formik.values.district !== '' &&
      formik.values.city !== '' &&
      formik.values.country !== '' &&
      formik.values.birth_date !== '' &&
      formik.values.civil_state !== ''
    ) {
      await dispatch(updatePerson(uuid, formik.values, navigate));
    }
    addAlert({
      severity: CodeAlertsMessage.SUCCESS,
      message: CodeSuccessMessage.PERSON_CHANGED,
    });
  };

  return (
    <>
      <Helmet>
        <title>Editar Pessoa</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenCrudToolbar title="Editar Pessoa" goBackPath="/admin/pessoa" />
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(formik.touched.name && formik.errors.name)}
                          fullWidth
                          helperText={formik.touched.name && formik.errors.name}
                          label="Nome"
                          placeholder="Nome"
                          type="text"
                          name="name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <NumberFormat
                          format="###.###.###-##"
                          mask="_"
                          error={Boolean(formik.touched.cpf && formik.errors?.cpf)}
                          fullWidth
                          helperText={formik.touched.cpf && formik.errors?.cpf}
                          label="CPF"
                          placeholder="CPF"
                          type="text"
                          name="cpf"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.cpf}
                          customInput={TextField}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <NumberFormat
                          format="##.###.###-#"
                          mask="_"
                          error={Boolean(formik.touched.rg && formik.errors?.rg)}
                          fullWidth
                          helperText={formik.touched.rg && formik.errors?.rg}
                          label="RG"
                          placeholder="RG"
                          type="text"
                          name="rg"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.rg}
                          customInput={TextField}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <NumberFormat
                          format="####-##-##"
                          mask="_"
                          error={Boolean(
                            formik.touched.birth_date && formik.errors?.birth_date
                          )}
                          fullWidth
                          helperText={
                            formik.touched.birth_date && formik.errors?.birth_date
                          }
                          label="Data de Nascimento"
                          placeholder="Data de Nascimento"
                          type="text"
                          name="birth_date"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.birth_date}
                          customInput={TextField}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.street && formik.errors.street
                          )}
                          fullWidth
                          helperText={formik.touched.street && formik.errors.street}
                          label="Rua"
                          placeholder="Rua"
                          type="text"
                          name="street"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.street}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.number && formik.errors.number
                          )}
                          fullWidth
                          helperText={formik.touched.number && formik.errors.number}
                          label="Número"
                          placeholder="Número"
                          type="text"
                          name="number"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.number}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.district && formik.errors.district
                          )}
                          fullWidth
                          helperText={
                            formik.touched.district && formik.errors.district
                          }
                          label="Bairro"
                          placeholder="Bairro"
                          type="text"
                          name="district"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.district}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(formik.touched.city && formik.errors.city)}
                          fullWidth
                          helperText={formik.touched.city && formik.errors.city}
                          label="Cidade"
                          placeholder="Cidade"
                          type="text"
                          name="city"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.city}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.country && formik.errors.country
                          )}
                          fullWidth
                          helperText={
                            formik.touched.country && formik.errors.country
                          }
                          label="País"
                          placeholder="País"
                          type="text"
                          name="country"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.country}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.civil_state && formik.errors.civil_state
                          )}
                          fullWidth
                          helperText={
                            formik.touched.country && formik.errors.civil_state
                          }
                          label="Estado Civil"
                          placeholder="Estado Civil"
                          type="text"
                          name="civil_state"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.civil_state}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                  }}
                >
                  <Button
                    color="primary"
                    size="large"
                    type="submit"
                    onClick={submitUpdatePerson}
                    variant="contained"
                    startIcon={<SaveIcon fontSize="large" />}
                    sx={{ width: 150 }}
                    title="alterar"
                  >
                    ALTERAR
                  </Button>
                </Box>
              </Card>
            </form>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PersonEdit;
