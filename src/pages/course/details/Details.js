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

import { Typography, Button } from "../../../components/Wrappers/Wrappers";
import CardMedia from "@material-ui/core/CardMedia";
import api from "../../../services/api";
import { decoder } from "../../../services/decoder";

export default function DetailsCourse(props) {
  var classes = useStyles();
  const token = localStorage.getItem("keepitoAuthorization");
  const [course, setCourse] = useState([]);
  const [subscribe, setSubscribe] = useState(true);
  const [courseClasses, setCourseClasses] = useState([]);
  const { id } = decoder(token);
  let { course_id } = useParams();

  function isSubscribe(course) {
    if (course.id == id) return true; 
    return false;
  }

  async function getCourse() {
    try {
      const response = await api.get(`/v1/courses/${course_id}`);
      setCourse(response.data);
      setCourseClasses(response.data.classes);
    } catch (error) {
      setCourse([]);
      setCourseClasses([]);
    }
  }
  async function getSubscribe() {
    try {
      const response = await api.get(`/v1/users/${id}`);
     response.data?.courses.filter(isSubscribe).length == 0 && setSubscribe(true)
    } catch (error) {
      setSubscribe(false)
    }
  }
  useEffect( () => {
     getCourse();
     getSubscribe();
  }, []);

  function handleSubscribe({ courseId, userId }) {
    console.log(courseId, userId);
    api
      .post(`/v1/registers?userId=${userId}&courseId=${courseId}`)
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
              {course.name}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {courseClasses.length} aula(s)
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {course.description} Um curso totalmente focado em Java para Web!
              Com ele você aprenderá a desenvolver seus próprios websites e
              sistemas com essa linguagem! Tudo o que há de mais recente nessa
              tecnologia você encontra em nosso curso que é totalmente focado em
              projetos práticos para você desenvolver aplicações poderosas com o
              Java no Back-end.
              {subscribe}
            </Typography>

            <CardActions disableSpacing>
               <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.buttonsContainer}
                component={Link}
                onClick={() =>
                  handleSubscribe({ courseId: course.id, userId: id })
                }
                to={`/app/subscribe/course/${course.id}`}
              >
              {!subscribe ? 'Inscrever-se': 'Acessar'}
              </Button>
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
        <Grid item sm={10} md={8}>
          <Typography gutterBottom variant="h2" component="div">
            Conteudo
          </Typography>
        </Grid>
        {courseClasses.map((course) => (
          <Grid item key={course.id}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="p">
                  {course.name}
                </Typography>
                <Typography>
                  {course.description} Neste curso o aluno irá aprender as
                  partes básicas como: Configuração do Ambiente; Algoritmo e
                  Estrutura de Dados; Fundamentos da Linguagem Java; Estruturas
                  de Controle; Classes, Objetos e Métodos. Dessa forma, o aluno
                  estará preparado para conceitos mais avançados, como a
                  Orientação a Objetos, por exemplo.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
