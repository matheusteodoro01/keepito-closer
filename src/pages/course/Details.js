import React, { useState, useEffect } from "react";
import { Grid, CardContent, CardActions, IconButton } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./styles";

// components

import { Typography, Button } from "../../components/Wrappers/Wrappers";
import CardMedia from "@material-ui/core/CardMedia";
import api from "../../services/api";

export default function DetailsCourse(props) {
  var classes = useStyles();
  const [course, setCourse] = useState([]);
  const [subscribe, setSubscribe] = useState(true);
  const [courseClasses, setCourseClasses] = useState([]);
  let { courseId } = useParams();

  async function getCourse() {
    try {
      const response = await api.get(`/v1/courses/${courseId}`);
      setCourse(response.data);
      setCourseClasses(response.data.classes);
    } catch (error) {
      setCourse([]);
      setCourseClasses([]);
    }
  }
  useEffect(() => {
    getCourse();
  }, []);

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
              {course.description}
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
        <Grid item sm={15} md={12} lg={12}>
          <Typography gutterBottom variant="h2" component="div">
            Conteudo
          </Typography>
        </Grid>
        {courseClasses.map((classe) => (
          <Grid item sm={12} md={12} lg={12}  key={classe.id}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="p">
                  {classe.name}
                </Typography>
                <Typography>{classe.description}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  
                  component={Link}
                  to={`/app/course/${courseId}/classe/details/${classe.id}`}
                >
                  Acessar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
