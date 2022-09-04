import React, { useState } from "react";
import { FormControl, TextField } from "@material-ui/core";

// api
import api from "../../services/api";

// styles
import useStyles from "../styles";

// components
import SubmitButton from "../../components/SubmitButton";

export default function CreateQuiz(props) {
  const style = useStyles(),
    [quizId, setQuizId] = useState(props.quizId),
    [title, setTitle] = useState(props.data?.name),
    [alternative, setAlternative] = useState(""),
    handleForm = async () => {
      const question = await api.post("v1/questions", {
        title,
        correctAlternative: alternative,
        quizId,
      });
      const questions = props.questions
      questions.push(question.data)
      props.setQuestions(questions)
      props.setShowModal(false)
    },
    subimitClick = async (event) => {
      event.preventDefault();
      await handleForm();
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
      <SubmitButton subimit={subimitClick} />
    </FormControl>
  );
}
