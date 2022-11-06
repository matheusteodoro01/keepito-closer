import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// api
import api from "../../services/api";

export default function ListStudents(props) {
  const [creatorId, setCreatorId] = useState(props.creatorId);
  const [courseId, setCourseId] = useState(props.courseId);
  const [users, setUsers] = useState([]);

  const loadStudents = () => {
      async function fetchData() {
        await api
          .get(api.version + "users/course/" + creatorId)
          .then((response) => {
            const students = response.data;
            const studentsCourse = students.map((student) => {
              if (student?.courses.filter((course) => course.id == courseId)) {
                return student;
              }
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
    ];

  useEffect(() => {
    loadStudents();
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
