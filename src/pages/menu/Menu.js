import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  CardActions,
  IconButton,
  Modal,
  Box,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Card from "@material-ui/core/Card";
import Button from "@mui/material/Button";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";

import api from "../../services/api";
import { decoder } from "../../services/decoder";

// components
import useStyles from "../../components/styles";
import SaveCourse from "../../components/course/Save";

export default function Menu() {
  const classesNames = useStyles(),
    token = localStorage.getItem("keepitoAuthorization");
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseSelected, setCourseSelect] = useState({});

  async function getCourses(id) {
    await api.get(`/v1/courses/user/${id}`, {}).then((response) => {
      setCourses(response.data);
    });
  }
  useEffect(() => {
    const { id } = decoder(token);
    setUserId(id);
    getCourses(id);
  }, []);

  return (
    <>
      <Grid container direction="column" alignItems="flex-end">
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box className={classesNames.boxModalCreateQuizForm}>
            <SaveCourse
              userId={userId}
              setShowModal={setShowModal}
              courseSelected={courseSelected}
              courses={courses}
              setCourses={setCourses}
            />
          </Box>
        </Modal>
        <Button
          variant="contained"
          color="success"
          style={{ margin: 10 }}
          onClick={() => {
            setShowModal(true);
            setCourseSelect({});
          }}
        >
          Criar Curso
        </Button>
        <Grid container spacing={2} w>
          {courses?.map((course) => (
            <Grid item  md={4}key={course.id}>
              <Card
                style={{
                  boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                  backgroundColor: "#fafafa",
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image="https://escuelafullstack.com/web/image/slide.channel/18/image_512"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h2" component="div">
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course?.classes?.length}{" "}
                    {course?.classes?.length === 1 ? "aula" : "aulas"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Stack direction="row" width="100%">
                    <Stack direction="row" width="100%">
                      <Button
                        variant="contained"
                        color="info"
                        component={Link}
                        to={`/app/course/details/${course.id}`}
                      >
                        Acessar
                      </Button>
                    </Stack>
                    <Stack
                      direction="column"
                      alignItems={"flex-end"}
                      width="100%"
                    >
                      <IconButton
                        size="small"
                        onClick={() => {
                          setCourseSelect(course);
                          setShowModal(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
