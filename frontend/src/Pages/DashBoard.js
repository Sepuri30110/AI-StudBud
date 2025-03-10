import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function DashBoard() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    subject: '',
    topics: '',
    proficiency: '',
    weekday: '',
    weekend: '',
    timeLeft: ''
  })

  const [studyPlan,setStudyPlan] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')
    if (!token || !name || token.trim() === "" || name.trim() === "") {
      toast.error("Not Authorized", { position: 'top-right' })
      navigate('/login')
    }
  }, [navigate])

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "weekday" || name === "weekend" || name === "timeLeft" || name === "proficiency") {
      value = value.replace(/[^0-9]/g, '')
    }
    if(name === "proficiency"){
      if(value>10) value ="10"
      if(value==="0") value ="1"
    }
    if(name === "weekday" || name === "weekend"){
      if(value>24) value = "24"
      if(value==="0") value = "1"
    }
    if(name === "timeLeft"){
      if(value==="0") value = "1" 
    }
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { subject, topics, proficiency, weekday, weekend, timeLeft } = data;
    if (!subject.trim() || !topics.trim() || !proficiency.trim() || !weekday.trim() || !weekend.trim() || !timeLeft.trim()) {
      toast.error("Enter all the values");
      return;
    }
    try {
      await axios.post('http://localhost:4999/user/studbud', { subject, topics, proficiency, weekday, weekend, timeLeft }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }, { withCredentials: true })
        .then(res => {
          console.log(res)
          setStudyPlan(res.data)
        })
        .catch(err => {
          toast.dismiss()
          toast.error(err);
          console.log(err)
        })
    } catch (err) {
      console.log('Axios error : ', err)
    }
  }

  return (
    <div style={styles.body}>
      <header style={styles.header}>

      </header>
      <div style={styles.container}>
        <div style={styles.subContainer}>

        </div>
        <div style={styles.formContainer}>
          <p style={styles.formTitle}>Submit the form</p>
          <form style={styles.form}>
            <div style={styles.formItem}>
              <label style={styles.formLabel}>Subject:</label>
              <input style={styles.formInput} type='text' value={data.subject} name='subject' onChange={handleChange} />
            </div>
            <div style={styles.formItem}>
              <label style={styles.formLabel}>Topics:</label>
              <input style={styles.formInput} type='text' value={data.topics} name='topics' onChange={handleChange} />
            </div>
            <div style={styles.formItem}>
              <label style={styles.formLabel}>Proficiency Level:</label>
              <input style={styles.formInput} type='text' value={data.proficiency} name='proficiency' onChange={handleChange} />
            </div>
            <div style={styles.formItem}>
              <label style={styles.formLabel}>Time allocated to study in Weekdays(in hrs):</label>
              <input style={styles.formInput} type='text' value={data.weekday} name='weekday' onChange={handleChange} />
            </div>
            <div style={styles.formItem}>
              <label style={styles.formLabel}>Time allocated to study in Weekends(in hrs):</label>
              <input style={styles.formInput} type='text' value={data.weekend} name='weekend' onChange={handleChange} />
            </div>
            <div style={styles.formItem}>
              <label style={styles.formLabel}>Time Left to reach the goal(in weeks):</label>
              <input style={styles.formInput} type='text' value={data.timeLeft} name='timeLeft' onChange={handleChange} />
            </div>
            <div style={styles.formItem}>
              <input style={styles.submit} type='submit' onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const styles = {
  body: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  header: {

  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  subContainer: {
    display: 'flex',
    width: '65%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '35%',
    alignItems: 'center',
    backgroundColor: '#99f',
    borderRadius: '2vw'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  formTitle: {
    marginTop: '2vw',
    marginBottom: '0',
    fontSize: '26px',
    fontWeight: 'bold'
  },
  formItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    marginBottom: '1.5vw'
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
  }
}

export default DashBoard