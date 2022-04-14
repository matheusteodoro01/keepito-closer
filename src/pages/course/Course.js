import React, { useState, useEffect } from 'react';
import { Grid, Modal, Box } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import api from '../../services/api'

// components
import PageTitle from "../../components/PageTitle";
import CustomCrudToolBar from "../../components/CustomCrudToolBar";
import CourseForm from "../../components/CourseForm";

// styles
import useStyles from "../../components/styles";

// context
import { EditCourse, AddCourse, DeleteCourse } from "../../context/CourseContext";

export default function Courses() {
  var classes = useStyles();
  const [showForm, setShowForm] = useState(false),
    [titleForm, setTitleForm] = useState(''),
    [isUpdate, setIsUpdate] = useState(false),
    [dadosForm, setDadosForm] = useState(),
    [courses, setCourses] = useState([]),
    handleOpenForm = () => setShowForm(true),
    handleCloseForm = () => setShowForm(false),
    insertFunction = function () {
      setTitleForm('Insert a new Curso')
      setIsUpdate(false);
      handleOpenForm()
    },
    submitFuntion = function (isUpdate, dadosForm) {
      if (isUpdate)
        EditCourse(dadosForm)
      else
        AddCourse(dadosForm)
    },
    deleteFunction = function (idCourse) {
      DeleteCourse(idCourse)
    },
    updateFunction = function () {
      setTitleForm('Update the Curso')
      setIsUpdate(true);
      setDadosForm({
        name: 'teste'
      })
      handleOpenForm()
    },

    options = {
      filterType: "checkbox",
      download: false,
      print: false,
      customToolbar: () => {
        return (
          <CustomCrudToolBar
            insertFunction={insertFunction}
            deleteFunction={deleteFunction}
            updateFunction={updateFunction}
            tableContext={'Curso'}
          />
        );
      }
    };

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
      <PageTitle title='My courses' />

      <Modal
        open={showForm}
        onClose={handleCloseForm}
      >
        <Box className={classes.boxModalForm}>
          <CourseForm title={titleForm} submitFuntion={submitFuntion} dados={dadosForm} isUpdate={isUpdate} />
        </Box>
      </Modal>
      <Grid item xs={12}>
        <MUIDataTable
          data={courses}
          columns={["id", "name", "description"]}
          options={options}
        />
      </Grid>
    </>
  );
}