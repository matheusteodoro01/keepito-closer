import React, { useState, useEffect } from 'react';
import { Grid } from "@material-ui/core";


import api from '../../services/api'

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";


export default function Menu() {
  var classes = useStyles();
  const [courses, setCourses] = useState([])

  useEffect(() => {

    async function fetchData() {
      await api.get('/v1/courses', {
      })
        .then((response) => {
          setCourses(response.data.content)
        })


    }
    fetchData();


  }, []);

  return (
    <>
      <PageTitle title="Cursos" />
      <Grid container spacing={2}>
        {courses.map(course => (

          <Grid item xs={4} md={4}>
            <Widget title={course.name} disableWidgetMenu>
              <div className={classes.dashedBorder}>
                <p>{course.description}</p>
              </div>
            </Widget>

          </Grid>
        ))}
      </Grid>
    </>
  );
}
