import React, {useState, useEffect} from 'react';
import './App.css';
import Form from "./Form"
import axios from 'axios';
import * as yup from "yup"
import schema from "./formSchema"
import User from "./User"

const initialFormValues = {
  userame: '',
  email: '',
  password: '',
  tos: false
}

const initialErrors = {
  username: '',
  password: ''
}

const initialUsers = []

const initialDisabled = true

function App() {
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
    .then((res) => {
      console.log(res.data.data)
      setUsers(res.data.data)
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  const postNewUser = (newUser) => {
    axios.post('https://reqres.in/api/users', newUser)
    .then((res) => {
      setUsers([res.data, ...users])
      setFormValues(initialFormValues)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const inputChange = (name, value) => {
    yup
      .reach(schema, name) // get to this part of the schema
      //we can then run validate using the value
      .validate(value) // validate this value
      .then(() => {
        // happy path and clear the error
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })

    // YUP, ERRORS
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const formSubmit = () => {
    const newUser = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid)
    })
  }, [formValues])


  return (
    <div className="App">
      <header className="App-header">
        App!
      </header>
      <Form 
        values={formValues}
        disabled={disabled}
        change={inputChange}
        submit={formSubmit}
        errors={formErrors}
      />

      {users.map((user) => {
        return (
          <User key={user.id} details={user} />
        )
      })}
    </div>
  );
}

export default App;
