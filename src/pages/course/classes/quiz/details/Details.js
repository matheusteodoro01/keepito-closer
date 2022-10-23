import React, { useState, useEffect } from "react";
import {
  Grid,
  CardContent,
  Modal,
  Box,
} from "@material-ui/core";
import {  useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "../../../../../components/styles";

// components
import {
  Typography,
  Button,
} from "../../../../../components/Wrappers/Wrappers";
import SaveQuestion from "../../../../../../src/components/quiz/question/Save";
import CardMedia from "@material-ui/core/CardMedia";
import api from "../../../../../services/api";
import { decoder } from "../../../../../services/decoder";

export default function DetailsQuiz(props) {
  var classesNames = useStyles();
  const token = localStorage.getItem("keepitoAuthorization");
  const [showModal, setShowModal] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [question, setQuestion] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const { id } = decoder(token);
  let { quizId } = useParams();

  async function getQuiz() {
    try {
      const quiz = await api.get(`/v1/quizzes/${quizId}`);
      setQuiz(quiz.data);
      const compare = (a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      };
      const questions = quiz.data.questions;
      setQuizQuestions(questions.sort(compare));
    } catch (error) {
      setQuiz([]);
      setQuizQuestions([]);
    }
  }

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box className={classesNames.boxModalCreateQuizForm}>
          <SaveQuestion
            quizId={quiz.id}
            questionId={question?.id}
            question={question}
            questions={quizQuestions}
            setQuestions={setQuizQuestions}
            setShowModal={setShowModal}
          />
        </Box>
      </Modal>
      <Grid container spacing={1}>
        <Grid item sm={4} md={4}>
          <Card
            style={{
              boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
              backgroundColor: "#fafafa",
            }}
          >
            <CardMedia
              component="img"
              maxWidth="345"
              maxHeight="345"
              image="https://escuelafullstack.com/web/image/slide.channel/18/image_512"
              alt="green iguana"
            />
          </Card>
        </Grid>

        <Grid item sm={8} md={8}>
          <CardContent>
            <Typography gutterBottom variant="h1" component="div">
              {quiz.name}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {quizQuestions.length}{" "}
              {quizQuestions.length == 1 ? "questão" : "questões"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {quiz.description}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                setShowModal(true);
                setQuestion(null);
              }}
            >
              Adicionar Questão
            </Button>


          </CardContent>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={12} md={12} lg={12}>
          <Typography gutterBottom variant="h2" component="div">
            Questões
          </Typography>
        </Grid>
        {quizQuestions.map((question, index) => (
          <Grid item sm={12} md={12} lg={12} key={question.id}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="p">
                  {index + 1} - {question.title}
                </Typography>
                <Typography>
                  {question?.alternatives?.length}{" "}
                  {question?.alternatives?.length === 1 ? "alternativa" : "alternativas"}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => {
                    setShowModal(true);
                    setQuestion(question);
                  }}
                >
                  Editar Questão
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}