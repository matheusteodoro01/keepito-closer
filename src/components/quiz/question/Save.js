import React, { useState, useEffect } from "react";
import {
  FormControl,
  TextField,
  Modal,
  Box,
  IconButton,
  RadioGroup,
  Radio,
  FormControlLabel,
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
import Button from "@mui/material/Button";

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

      const alternatives = question.data.alternatives.map((alternative) => {
        const checked = alternative.id == question.data.correctAlternative;
        return {
          ...alternative,
          selected: checked,
        };
      });
      setCorrectAlternative(question.data.correctAlternative);
      setAlternatives(alternatives);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    questionId && getQuestion();
  }, []);

  const onInputChange = (e) => {
    const correctAlternativeId = e.target.value;
    const nexState = alternatives.map((alternative) => {
      const checked = alternative.id == correctAlternativeId;
      return {
        ...alternative,
        selected: checked,
      };
    });
    setCorrectAlternative(correctAlternativeId);
    setAlternatives(nexState);
  };

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box className={classesNames.boxModalSaveAlternativeForm}>
          <SaveAlternative
            setShowModal={setShowModal}
            setAlternatives={setAlternatives}
            questionId={questionId}
            alternative={alternative}
            alternatives={alternatives}
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
        <RadioGroup>
          {alternatives.map((alternative, index_alternative) => (
            <Stack
              key={alternative.id}
              direction="row"
              alignItems="center"
              width="100%"
            >
              <FormControlLabel
                value={alternative.description}
                label={alternative.description}
                control={
                  <Radio
                    color="primary"
                    key={index_alternative}
                    name={questionId}
                    value={alternative.id}
                    checked={!!alternative.selected}
                    onChange={onInputChange}
                  />
                }
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
        </RadioGroup>

        <Stack key={alternative.id} direction="row" width="100%">
          {questionId && (
            <Button
              variant="contained"
              color="success"
              size="medium"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Adicionar alternativa
            </Button>
          )}

          <Button
            variant="contained"
            color="primary"
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
