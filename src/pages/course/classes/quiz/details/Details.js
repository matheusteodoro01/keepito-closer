import React, { useState, useEffect } from "react";
import { Grid, CardContent, CardActions, IconButton } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./styles";

// components

import { Typography, Button } from "../../../../../components/Wrappers/Wrappers";
import CardMedia from "@material-ui/core/CardMedia";
import api from "../../../../../services/api";
import { decoder } from "../../../../../services/decoder";

export default function DetailsQuiz(props) {
  var classes = useStyles();
  const token = localStorage.getItem("keepitoAuthorization");
  const [Quiz, setQuiz] = useState([]);
  const [subscribe, setSubscribe] = useState(true);
  const [QuizQuestions, setQuizQuestions] = useState([]);
  const { id } = decoder(token);
  let {quizId } = useParams();


  async function getQuiz() {
    try {
      const quiz = await api.get(`/v1/quizzes/${quizId}`);
      setQuiz(quiz.data);
      setQuizQuestions(quiz.data.questions);
    } catch (error) {
      setQuiz([]);
      setQuizQuestions([]);
    }
  }

  useEffect( () => {
     getQuiz();
  }, []);

  function handleSubscribe({ QuizId, userId }) {
    console.log(QuizId, userId);
    api
      .post(`/v1/registers?userId=${userId}&QuizId=${QuizId}`)
      .then((response) => {
        setSubscribe(true);
      });
  }

  return (
    <>
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
              {Quiz.name}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {QuizQuestions.length} questões
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {Quiz.description}
            </Typography>

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </CardContent>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={12} md={12} lg={12} >
          <Typography gutterBottom variant="h2" component="div">
            Questões
          </Typography>
        </Grid>
        {QuizQuestions.map((question) => (
          <Grid item sm={12} md={12} lg={12} key={question.id}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="p">
                  {question.title}
                </Typography>
                <Typography>
                  Alternativa correta: {question.correctAlternative}
                </Typography>
                <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.buttonsContainer}
                component={Link}
                to={`/app/subscribe/Quiz/${Quiz.id}`}
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
