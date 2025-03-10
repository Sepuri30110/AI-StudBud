import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

function SignUp() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const verifyEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const handleSubmit = async () => {
    if (!verifyEmail(user.email.trim())) {
      return toast.error("Inavlid Email")
    }
    if (user.name.trim() === "") {
      return toast.error("Enter a name")
    }
    if (user.password.trim() === "" || user.confirmPassword.trim() === "") {
      return toast.error("Enter a Password")
    }
    if (user.password.length < 6) {
      return toast.error("Password too short")
    }
    if (user.password.trim() !== user.confirmPassword.trim()) {
      return toast.error("Passwords don't match")
    }
    try {
      await axios.post('http://localhost:4999/signup', { name: user.name.trim(), email: user.email.trim(), password: user.password.trim() })
        .then(res => {
          toast.success("Login Successfull");
          navigate('/login');
        })
        .catch(err => {
          toast.error();
          console.log(err)
        })
    } catch (err) {
      console.log('Axios error : ', err)
    }
  }

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <div style={styles.body}>
      <header style={styles.header}>

      </header>
      <div style={styles.container}>
        <h1 style={styles.title}>SignUp</h1>
        <form style={styles.form}>
          <div style={styles.formItem}>
            <label style={styles.formLabel}>Name:</label>
            <input style={styles.formInput} type='text' value={user.name} name='name' onChange={handleChange} />
          </div>
          <div style={styles.formItem}>
            <label style={styles.formLabel}>Email:</label>
            <input style={styles.formInput} type='text' value={user.email} name='email' onChange={handleChange} />
          </div>
          <div style={styles.formItem}>
            <label style={styles.formLabel}>Password:</label>
            <input style={styles.formInput} type='password' value={user.password} name='password' onChange={handleChange} />
          </div>
          <div style={styles.formItem}>
            <label style={styles.formLabel}>Confirm Password:</label>
            <input style={styles.formInput} type='password' value={user.confirmPassword} name='confirmPassword' onChange={handleChange} />
          </div>
        </form>
        <div style={{ marginBottom: '1vw' }}>
          <input style={styles.submit} onClick={handleSubmit} type='submit' />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <h6 style={{ margin: '0', display: 'flex', fontSize: '1vw' }}>Already have an account. <p onClick={handleLogin} style={styles.login}>Login</p></h6>
        </div>
      </div>
    </div>
  )
}

const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  header: {

  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70vh',
    width: '28vw',
    backgroundColor: '#fff',
    padding: '1.5vw',
    borderRadius: '1vw',
    boxShadow: '0.3vw 0.3vw 1vw 0.5vw rgba(175, 175, 175,1)',
  },
  title: {
    margin: '0',
    padding: '0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  formItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%'
  },
  formLabel: {
    fontSize: '1.5vw',
    fontStyle: 'italic',
    color: '#333',
    textTransform: 'capitalize',
  },
  formInput: {
    fontSize: '1.4vw',
    padding: '0.2vw',
    fontStyle: 'italic'
  },
  submit: {
    padding: '0.5vw',
    fontSize: '1.4vw',
    borderRadius: '1vw',
    border: '1.5px solid #999',
    boxShadow: '0.1vw 0.1vw 0.1vw 0.1vw rgba(0,0,0,0.2)',
    color: '#6af'
  },
  login: {
    cursor: 'pointer',
    margin: '0',
    textDecoration: 'underline',
    color: '#00f'
  }
}

export default SignUp