import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, CardActionArea } from "@material-ui/core";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

import api from "../../services/api";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

export default function Menu() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await api.get("/v1/courses", {}).then((response) => {
        setCourses(response.data.content);
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <PageTitle title="Cursos" />
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={12} sm={4} key={course.id}>
            <Card
              style={{
                maxWidth: 345,
                maxHeight: 345,
                boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                backgroundColor: "#fafafa",
              }}
            >
              <CardActionArea
                component={RouterLink}
                to={`/app/course/details/${course.id}`}
              >
                <CardMedia
                  component="img"
                  height="200"
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
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
