import React, { useState, useEffect } from 'react';
import { Grid, Modal, Box } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// api
import api from '../../services/api'

// components
import PageTitle from "../../components/PageTitle";
import CustomCrudToolBar from "../../components/CustomCrudToolBar";
import CourseForm from "../../components/CourseForm";

// styles
import useStyles from "../../components/styles";

export default function Courses() {
  const context = "course";
  let classes = useStyles();
  const [showForm, setShowForm] = useState(false),
    [titleForm, setTitleForm] = useState(''),
    [isUpdate, setIsUpdate] = useState(false),
    [dadosForm, setDadosForm] = useState(),
    [courses, setCourses] = useState([]),
    handleOpenForm = () => setShowForm(true),
    handleCloseForm = () => setShowForm(false),
    insertFunction = function () {
      setTitleForm('Insert a new ' + context)
      setIsUpdate(false);
      setDadosForm(null)
      handleOpenForm()
    },
    submitFuntion = function (isUpdate, dadosForm) {
     
    },
    deleteFunction = function (idCourse) {
    },
    updateFunction = function () {
      setTitleForm('Update the ' + context)
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
            tableContext={context}
          />
        );
      }
    };

  useEffect(() => {

    async function fetchData() {
      await api.get(api.version + 'courses', {
      })
        .then((response) => {
          setCourses(response.data.content)
        })
    }
    fetchData();
  }, [courses]);

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