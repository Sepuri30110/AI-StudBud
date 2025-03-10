const model = require('../model/user.model')
const axios = require('axios')

const studyPlan = async (req, res) => {
    const { subject, topics, proficiency, weekday, weekend, timeLeft } = req.body;
    console.log(req.body)
    const payload = {
        subject,
        topics,
        proficiency,
        hours_weekday: weekday,
        hours_weekend: weekend,
        duration: timeLeft
    };
    let response = await axios.post('http://127.0.0.1:5000/study_plan', payload, {
        headers: { "Content-Type": "application/json" }
    })
    console.log(response.data)
    // response = response.data.study_plan
    return res.status(200).json("hi")
}

module.exports = {
    studyPlan
}