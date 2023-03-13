import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMe } from "../redux/me/meSlice";
import { updateErrors } from "../redux/error/errorSlice";
/*
This data uses information from O*NET
*/

function InterestProfilerForm() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/interest_profiler_questions").then((resp) => {
      if (resp.ok) {
        resp.json().then((questionsArr) => {
          setQuestions(questionsArr);
          const newFormData = formData;
          questionsArr.map((q, i) => {
            newFormData[`${i}`] = 0
          })
          setFormData(newFormData);
        });
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  }, []);

  const developmentRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const developmentRandomAnswerString = () => {
    let answer_string = "";
  }

  

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(formData)
    setFormData({...formData, [name]: value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let answerString = "";
    
    for (let i = 0; i < questions.length; i++) {
       answerString += formData[i];
       console.log(answerString)
    }

    console.log(answerString);

    fetch("/interest_profiles", {
      method: 'CREATE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({answer_string: "553421321134342523523523254115342111351145453111231155343444"})
    })
    .then(resp => {
      if (resp.ok) {
        resp.json().then(profile => {
          console.log(profile)
        })
      } else {
        resp.json().then(json => dispatch(updateErrors([json.errors])));
      }
    })
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        {questions.map((question, i) => (
          <div key={i} className="interest-profile-question">
            <span><p key={question.id}>{question.text}</p></span>
            <span>
              <div className="form-group">
                <label><input type="radio" name={i} value={1} onChange={onChange} /> Hate it</label>
                <label><input type="radio" name={i} value={2} onChange={onChange} /> Dislike it</label>
                <label><input type="radio" name={i} value={3} onChange={onChange} /> Neutral</label>
                <label><input type="radio" name={i} value={4} onChange={onChange} /> Like it</label>
                <label><input type="radio" name={i} value={5} onChange={onChange} /> Really like it</label>
              </div>
            </span>
          </div>
        ))}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default InterestProfilerForm;
