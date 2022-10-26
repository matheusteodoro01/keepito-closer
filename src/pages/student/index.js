import React, { useState, useEffect } from "react";
import { Grid, Modal, Box } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// api
import api from "../../services/api";

// components

// styles
import useStyles from "../../components/styles";

// // services
import { decoder } from "../../services/decoder";

export default function Courses() {
  let classes = useStyles();
  const token = localStorage.getItem("keepitoAuthorization"),
    [userId, setUserId] = useState(undefined),
    [users, setUsers] = useState([]),
    [selectionModel, setSelectionModel] = React.useState([]),
    loadCourses = (id) => {
      async function fetchData() {
        await api.get(api.version + "users/course/" + id).then((response) => {
          const courses = response.data;
          const coursesData = courses.map((user) => ({
            ...user,
            courses: user.courses.map((course) => `${course.name}, `),
          }));
          setUsers(coursesData);
        });
      }
      fetchData();
    },
    datatableOptions = {
      filterType: "dropdown",
      download: false,
      print: false,
      selectableRows: "single",
      selectToolbarPlacement: "none",
    },
    dataTableColumns = [
      {
        name: "id",
        label: "Matricula",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "name",
        label: "Nome",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "email",
        label: "Email",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "courses",
        label: "Cursos",
        options: {
          filter: true,
          sort: true,
        },
      },
    ];

  useEffect(() => {
    const { id } = decoder(token);
    setUserId(id);
    loadCourses(id);
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <MUIDataTable
          data={users}
          columns={dataTableColumns}
          options={datatableOptions}
        />
      </Grid>
    </>
  );
}
