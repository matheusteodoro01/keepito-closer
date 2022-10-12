import React, { useState } from "react";
import { FormControl, TextField } from "@material-ui/core";

// api
import api from "../../../services/api";

// styles
import useStyles from "../../styles";

// components
import SubmitButton from "../../../components/SubmitButton";
import { useEffect } from "react";

export default function SaveQuestion(props) {
  const style = useStyles(),
    [quizId, setQuizId] = useState(props.quizId),
    [questionId, setQuestionId] = useState(props.questionId),
    [title, setTitle] = useState(""),
    [alternative, setAlternative] = useState(""),
    [alternative1, setAlternative1] = useState(""),
    [alternative2, setAlternative2] = useState(""),
    [alternative3, setAlternative3] = useState(""),
    [alternative4, setAlternative4] = useState(""),
    createQuestion = async (event) => {
      event.preventDefault();
      const question = await api.post("v1/questions", {
        title,
        correctAlternative: alternative,
        quizId,
      });
      await Promise.all(
        [alternative, alternative1, alternative2, alternative3, alternative4].map(
          async (description) =>
            await api.post("v1/alternatives", { description, questionId }),
        ))
      const questions = props.questions;
      questions.push(question.data);
      props.setQuestions(questions);
      props.setShowModal(false);
    },
    updateQuestion = async (event) => {
      event.preventDefault();
      const question = await api.put(`v1/questions/${questionId}`, {
        id: questionId,
        title,
        correctAlternative: 1,
        quizId,
      });
      await Promise.all(
      [alternative, alternative1, alternative2, alternative3, alternative4].map(
        async (description) =>
          await api.post("v1/alternatives", { description, questionId }),
      ))
      const questions = props.questions;
      const questionsUpdate = questions.filter(
        (question) => question.id !== questionId,
      );
      questionsUpdate.push(question.data);

      const compare = (a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      };
      props.setQuestions(questionsUpdate.sort(compare));
      props.setShowModal(false);
    };
  async function getQuestion() {
    try {
      const question = await api.get(`/v1/questions/${props?.question?.id}`);
      setTitle(question.data.title);
      setAlternative(question.data.alternatives[0].description);
      setAlternative1(question.data.alternatives[1].description);
      setAlternative2(question.data.alternatives[2].description);
      setAlternative3(question.data.alternatives[3].description);
      setAlternative4(question.data.alternatives[4].description);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    questionId && getQuestion();
  }, []);

  return (
    <FormControl className={style.form}>
      <TextField
        required
        id="outlined-required"
        label="Titulo"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Alternativa 1"
        name="alternative"
        value={alternative}
        onChange={(e) => setAlternative(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Alternativa 2"
        name="alternative"
        value={alternative1}
        onChange={(e) => setAlternative1(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Alternativa 3"
        name="alternative"
        value={alternative2}
        onChange={(e) => setAlternative2(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Alternativa 4"
        name="alternative"
        value={alternative3}
        onChange={(e) => setAlternative3(e.target.value)}
      />

      <TextField
        required
        id="outlined-required"
        label="Alternativa 5"
        name="alternative"
        value={alternative4}
        onChange={(e) => setAlternative4(e.target.value)}
      />
      <SubmitButton subimit={questionId ? updateQuestion : createQuestion} />
    </FormControl>
  );
}
