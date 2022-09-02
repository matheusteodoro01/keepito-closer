import React, { useState, useEffect } from "react";
import { Grid, CardContent, CardActions, IconButton } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import AttachFileIcon from "@material-ui/icons/AttachFile";
// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./styles";

// components

import { Typography, Button } from "../../../../components/Wrappers/Wrappers";
import CardMedia from "@material-ui/core/CardMedia";
import api from "../../../../services/api";
import { decoder } from "../../../../services/decoder";

export default function DetailsClasse(props) {
  var classes = useStyles();
  const token = localStorage.getItem("keepitoAuthorization");
  const [Classe, setClasse] = useState([]);
  const [subscribe, setSubscribe] = useState(true);
  const [ClasseQuizzes, setClasseQuizzes] = useState([]);
  const { id } = decoder(token);
  let { classeId } = useParams();

  function isSubscribe(Classe) {
    if (Classe.id == id) return true; 
    return false;
  }

  async function getClasse() {
    try {
      const classe = await api.get(`/v1/classes/${classeId}`);
      setClasse(classe.data);
      setClasseQuizzes(classe.data.quizzes);
    } catch (error) {
      setClasse([]);
      setClasseQuizzes([]);
    }
  }

  useEffect( () => {
     getClasse();
  }, []);

  function handleSubscribe({ ClasseId, userId }) {
    console.log(ClasseId, userId);
    api
      .post(`/v1/registers?userId=${userId}&ClasseId=${ClasseId}`)
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
              {Classe.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {Classe.description}
              {subscribe}
            </Typography>

            <CardActions disableSpacing>
            <Typography gutterBottom variant="h1" component="div">
               <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.buttonsContainer}
                component={Link}
                to={`/app/subscribe/classe/${Classe.id}`}
              >
              Criar Quiz
              </Button>
              </Typography>
              <Typography gutterBottom variant="h1" component="div">
              <Button
                    onClick={''}
                    variant="outlined"
                    color="primary"
                    size="large"
                    endIcon={<AttachFileIcon />}>
                    Enviar Arquivo
            </Button>
            </Typography>
              
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
        <Grid item sm={15} md={12} lg={12} >
          <Typography gutterBottom variant="h2" component="div">
            Conteudo
          </Typography>
        </Grid>
        {ClasseQuizzes.map((quiz) => (
          <Grid item sm={12} md={12} lg={12} key={quiz.id}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="p">
                  {quiz.name}
                </Typography>
                <Typography>
                  {quiz.description}
                </Typography>
                <Typography>
                  {quiz.questions.length} Questões
                </Typography>
                <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.buttonsContainer}
                component={Link}
                to={`/app/course/classe/quiz/details/${quiz.id}`}
              >
              Editar Quiz
              </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
