import React, { useState, useEffect } from "react";
import {
  Grid,
  CardContent,
  CardActions,
  IconButton,
  Modal,
  Box,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Card from "@material-ui/core/Card";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";
// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "../../components/styles";

// components
import SaveClass from "../../components/class/Save";

import { Typography, Button } from "../../components/Wrappers/Wrappers";
import CardMedia from "@material-ui/core/CardMedia";
import api from "../../services/api";

export default function DetailsCourse(props) {
  var classes = useStyles();
  const [course, setCourse] = useState([]);

  const [courseClasses, setCourseClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [classeSelected, setClasseeSelected] = useState({});
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
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box className={classes.boxModalCreateQuizForm}>
          <SaveClass
            courseId={courseId}
            classes={courseClasses}
            classeSelected={classeSelected}
            setCourseClasses={setCourseClasses}
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
              {course.name}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {courseClasses.length} aula(s) {2} aluno(s)
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {course.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setShowModal(true)}
            >
              Criar Aula
            </Button>

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
          <Grid item sm={12} md={12} lg={12} key={classe.id}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="p">
                  {classe.name}
                </Typography>
                <Typography>{classe.description}</Typography>
                <Stack direction="row" alignItems={"flex-end"} width="100%">
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/app/course/${courseId}/classe/details/${classe.id}`}
                >
                  Acessar
                </Button>

                <Stack direction="column" alignItems={"flex-end"} width="100%">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setClasseeSelected(classe);
                      setShowModal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
