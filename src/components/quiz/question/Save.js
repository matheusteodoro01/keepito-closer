import React, { useState } from "react";
import { FormControl, TextField } from "@material-ui/core";

// api
import api from "../../../services/api";

// styles
import useStyles from "../../styles";

// components
import SubmitButton from "../../../components/SubmitButton";

export default function SaveQuestion(props) {
  const style = useStyles(),
    [quizId, setQuizId] = useState(props.quizId),
    [title, setTitle] = useState(props?.question?.title),
    [alternative, setAlternative] = useState(
      props?.question?.correctAlternative,
    ),
    createQuestion = async (event) => {
      event.preventDefault();
      const question = await api.post("v1/questions", {
        title,
        correctAlternative: alternative,
        quizId,
      });
      const questions = props.questions;
      questions.push(question.data);
      props.setQuestions(questions);
      props.setShowModal(false);
    },
    updateQuestion = async (event) => {
      event.preventDefault();
      const questionUpdate = props?.question;
      const question = await api.put(`v1/questions/${questionUpdate.id}`, {
        id: questionUpdate.id,
        title,
        correctAlternative: alternative,
        quizId,
      });
      const questions = props.questions;
      const questionsUpdate = questions.filter(
        (question) => question.id !== questionUpdate.id,
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
        value={alternative}
        onChange={(e) => setAlternative(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Alternativa 3"
        name="alternative"
        value={alternative}
        onChange={(e) => setAlternative(e.target.value)}
      />
      <SubmitButton
        subimit={props?.question ? updateQuestion : createQuestion}
      />
    </FormControl>
  );
}
