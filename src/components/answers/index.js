import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// api
import api from "../../services/api";

export default function ListAnswers(props) {
  const [quizId, setQuizId] = useState(props.quizId);
  const [users, setUsers] = useState([]);

  const loadAnswers = () => {
      async function fetchData() {
        await api
          .get(api.version + "users/course/" + quizId)
          .then((response) => {
            const students = response.data;
            const studentsCourse = students.map((student) => {
             return {...student, score: Math.floor(Math.random() * 100)}
            });
            setUsers(studentsCourse);
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
        name: "score",
        label: "Nota",
        options: {
          filter: true,
          sort: true,
        },
      },
    ];

  useEffect(() => {
    loadAnswers();
  }, []);

  return (
    <Grid item xs={12}>
      <MUIDataTable
        data={users}
        columns={dataTableColumns}
        options={datatableOptions}
      />
    </Grid>
  );
}
