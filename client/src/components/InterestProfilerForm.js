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
  const [answerString, setAnswerString] = useState("");
  const errors = useSelector((state) => state.error.value);
  const dispatch = useDispatch();
  const me = useSelector((state) => state.me.value)

  useEffect(() => {
    fetch("/interest_profiler_questions").then((resp) => {
      if (resp.ok) {
        resp.json().then((questionsArr) => {
          setQuestions(questionsArr);
          const newFormData = formData;
          questionsArr.map((q, i) => {
            newFormData[`${i}`] = 0;
          });
          setFormData(newFormData);
        });
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  }, []);

  const developmentRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const developmentRandomAnswerString = () => {
    let answerString = "";
    let dataObj = {};
    for (let i = 0; i < 60; i++) {
      const n = developmentRandomNumber(1, 5);
      answerString += n;
      dataObj = { ...dataObj, [`${i}`]: `${n}` };
    }
    setAnswerString(answerString);
    setFormData(dataObj);
    console.log(answerString);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(formData);
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let answerString = "";

    for (let i = 0; i < questions.length; i++) {
      console.log(formData[i]);
      answerString += formData[i];
    }

    fetch("/interest_profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer_string: answerString, user: me })
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((profile) => {
          console.log(profile);
        });
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  };

  return (
    <div>
      {errors.length > 0 ? (
        <div className="alert alert-danger">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      ) : null}

      <button onClick={developmentRandomAnswerString}>
        Randomize For Development
      </button>

      <form onSubmit={onSubmit}>
        {questions.map((question, i) => (
          <div key={i}>
            <div className="row interest-profile-question">
              <div className=" fs-4">
                <p key={question.id}>{question.text}</p>
              </div>
              <div className="fs-5">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={i}
                    value={1}
                    onChange={onChange}
                  />{" "}
                  <label className="form-check-label"> Hate it</label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={i}
                    value={2}
                    onChange={onChange}
                  />{" "}
                  <label className="form-check-label"> Dislike it</label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={i}
                    value={3}
                    onChange={onChange}
                  />{" "}
                  <label className="form-check-label">Neutral</label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={i}
                    value={4}
                    onChange={onChange}
                  />{" "}
                  <label className="form-check-label">Like it</label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={i}
                    value={5}
                    onChange={onChange}
                  />{" "}
                  <label className="form-check-label">Really like it</label>
                </div>
              </div>
            </div>
          </div>
        ))}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default InterestProfilerForm;
