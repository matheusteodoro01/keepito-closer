import React, { useState, useEffect } from "react";
import {
  FormControl,
  TextField,
  Modal,
  Box,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Stack from "@mui/material/Stack";
// api
import api from "../../../services/api";

// styles
import useStyles from "../../styles";

// components
import SaveAlternative from "./alternative/Save";
import { Button } from "../../../components/Wrappers/Wrappers";

export default function SaveQuestion(props) {
  var classesNames = useStyles();
  const style = useStyles(),
    [showModal, setShowModal] = useState(false),
    [quizId, setQuizId] = useState(props.quizId),
    [questionId, setQuestionId] = useState(props.questionId),
    [title, setTitle] = useState(""),
    [correctAlternative, setCorrectAlternative] = useState(""),
    [alternatives, setAlternatives] = useState([]),
    [alternative, setAlternative] = useState({}),
    createQuestion = async (event) => {
      const question = await api.post("v1/questions", {
        title,
        correctAlternative,
        quizId,
      });
      const questions = props.questions;
      questions.push(question.data);
      props.setQuestions(questions);
      props.setShowModal(false);
    },
    updateQuestion = async (event) => {
      const question = await api.put(`v1/questions/${questionId}`, {
        id: questionId,
        title,
        correctAlternative,
        quizId,
      });
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

  const handleRemoveAlternative = (item) => {
    setAlternatives((alternative) => [
      ...alternative.filter((i) => i.id !== item.id),
    ]);
  };

  async function getQuestion() {
    try {
      const question = await api.get(`/v1/questions/${props?.question?.id}`);
      setTitle(question.data.title);
      setCorrectAlternative(question.data.correctAlternative);
      setAlternatives(question.data.alternatives);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    questionId && getQuestion();
  }, []);

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box className={classesNames.boxModalSaveAlternativeForm}>
          <SaveAlternative
            setShowModal={setShowModal}
            setAlternatives={setAlternatives}
            setCorrectAlternative={setCorrectAlternative}
            questionId={questionId}
            alternative={alternative}
            alternatives={alternatives}
            correctAlternative={correctAlternative}
          />
        </Box>
      </Modal>
      <FormControl className={style.form}>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Titulo"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {alternatives?.map((alternative) => (
          <Stack
            key={alternative.id}
            direction="row"
            alignItems="center"
            width="100%"
          >
            <TextField
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              id="outlined-required"
              label="Alternativa"
              name="alternative"
              value={alternative.description}
              onChange={(e) => setAlternative(e.target.value)}
            />
            <IconButton
              size="small"
              onClick={() => {
                setAlternative(alternative);
                setShowModal(true);
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => handleRemoveAlternative(alternative)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}

        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Alternativa Correta"
          name="alternative"
          value={correctAlternative}
          onChange={(e) => setCorrectAlternative(e.target.value)}
        />
        <Stack
          key={alternative.id}
          direction="row"
          alignItems="center"
          width="100%"
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Adicionar alternativa
          </Button>

          <Button
            variant="contained"
            color="secudary"
            size="large"
            onClick={() => (questionId ? updateQuestion() : createQuestion())}
          >
            Salvar
          </Button>
        </Stack>
      </FormControl>
    </>
  );
}
