import  React, { useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from 'yup';
import axios from  'axios'
import styled from 'styled-components'
import Loader from 'react-loader-spinner';
import { 
  Button, 
  Form as SemanticForm, 
  Grid, 
  Header, 
  Segment 
} from 'semantic-ui-react'

import history from './../utils/history'
import axiosWithAuth from './../utils/axiosWithAuth'

const FormContainer = styled.div`
  height: 95vh;
  width: 100vw;
  background-color: #F7F7F7;
`
const FieldContainer = styled.div`
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
const StyledErrorMessage = styled.p`
  color: red;
  margin: 10px;
`

function FormBuilder({ errors, touched, setUserToken, status, isSubmitting }) {
  useEffect(() => {
    if (status) {
      setUserToken(status)
    }
  }, [status])

  return (
    <FormContainer>
      <Form>
        <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              Welcome Back!
            </Header>
            <SemanticForm size='large'>
              <Segment stacked>
                <FieldContainer>
                  <Field type="text" name="username" placeholder="Username"/>
                  <Field type="password" name="password" placeholder="Password" />
                    <Button color='blue' fluid size='large'>
                      {isSubmitting ? 
                        <Loader type="ThreeDots" color="white" height={10} /> 
                        : 
                        'Login' 
                      }
                    </Button>
                </FieldContainer>
              </Segment>
            </SemanticForm>
            {touched.username && errors.username && <StyledErrorMessage>{errors.username}</StyledErrorMessage>}
            {touched.password && errors.password && <StyledErrorMessage>{errors.password}</StyledErrorMessage>}
          </Grid.Column>
        </Grid>
      </Form>
    </FormContainer>
  )
}

const FormikForm = withFormik({
  mapPropsToValues({ username, password }) {
    return { 
      username: username || "",
      password: password || "",
    }
  },

  //======VALIDATION SCHEMA START==========
  validationSchema: Yup.object().shape({
    username: Yup.string()
      // .email()
      .required("Username required"),
    password: Yup.string()
      // .min(6)
      .required("Password required"),
  }),
  //======VALIDATION SCHEMA END============
    
  handleSubmit(values, { resetForm, setSubmitting, setStatus } ) {
    setSubmitting(true);
    console.log(values)
    axios
      .post("https://prisoner-skills-cj.herokuapp.com/api/login", values)
      .then(res => {
        console.log('axios login res', res)
        resetForm()
        setTimeout(() => {
          setSubmitting(false);
        }, 2000);
        localStorage.setItem('token', res.data.token);
        setStatus(res.data.token)
        localStorage.setItem('username', values.username)
        
        axiosWithAuth()
          .get('https://prisoner-skills-cj.herokuapp.com/api/users')
          .then(result => {
            const adminInfo = result.data.filter(admin => admin.username === values.username)
            history.push(`/admin/prison/${adminInfo[0].id}`)
          })
          .catch(error => console.log('axios get users error: ', error))
      })
      .catch(err => {
        console.log('axios login err', err)
        setSubmitting(false)
      })
  }
})(FormBuilder);

export default FormikForm