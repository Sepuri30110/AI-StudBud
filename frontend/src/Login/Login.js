import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

function Login() {

  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.clear();
  },[])

  const [user, setUser] = useState({
    name: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit =async (e) => {
    if(!user.name || !user.password){
      toast.dismiss()
      toast.error("Enter name and password!!!",{autoClose:1500,position:'top-right'})
      return;
    }
    try {
      await axios.post('http://localhost:4999/login', { name: user.name, password: user.password })
        .then(res => {
          toast.dismiss()
          toast.success("Login Successfull");
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("name", res.data.name)
          navigate('/dashboard')
        })
        .catch(err => {
          toast.dismiss()
          toast.error(err.response.data);
          console.log(err)
        })
    } catch (err) {
      console.log('Axios error : ', err)
    }
  }

  const handleSignUp = () => {
    navigate('/signUp')
  }

  return (
    <div style={styles.body}>
      <header style={styles.header}>

      </header>
      <div style={styles.container}>
        <h1 style={styles.title}>Login</h1>
        <form style={styles.form}>
          <div style={styles.formItem}>
            <label style={styles.formLabel}>Name:</label>
            <input style={styles.formInput} type='text' value={user.name} name='name' onChange={handleChange} />
          </div>
          <div style={styles.formItem}>
            <label style={styles.formLabel}>Password:</label>
            <input style={styles.formInput} type='password' value={user.password} name='password' onChange={handleChange} />
          </div>
        </form>
        <div style={{marginBottom:'1vw'}}>
          <input style={styles.submit} onClick={handleSubmit} type='submit' />
        </div>
        <div style={{display:'flex',justifyContent:'flex-end',width:'100%'}}>
          <h6 style={{margin:'0',display:'flex',fontSize:'1vw'}}>Don't have an account. <p onClick={handleSignUp} style={styles.signUp}>SignUp</p></h6>
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
    height: '45vh',
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
  buttonContainer: {

  },
  submit: {
    padding: '0.5vw',
    fontSize: '1.4vw',
    borderRadius: '1vw',
    border: '1.5px solid #999',
    boxShadow: '0.1vw 0.1vw 0.1vw 0.1vw rgba(0,0,0,0.2)',
    color: '#6af'
  },
  signUp: {
    cursor: 'pointer',
    margin: '0',
    textDecoration: 'underline',
    color: '#00f'
  }
};

export default Login
