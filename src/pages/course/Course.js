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
    [dataForm, setDataForm] = useState({}),
    [courses, setCourses] = useState([]),
    loadCourses = () =>{
      const configsGetCourse = {
        page:0,
        linesPerPage: 10,
        direction: 'ASC',
        orderby: 'id'
      }
      async function fetchData() {
        await api.get(api.version + 'courses', configsGetCourse)
          .then((response) => {
            setCourses(response.data.content)
          })
      }
      fetchData();
    },
    handleOpenForm = () => setShowForm(true),
    handleCloseForm = () => setShowForm(false),
    insertFunction = function () {
      setTitleForm('Insert a new ' + context)
      setIsUpdate(false);
      setDataForm(null)
      handleOpenForm()
    },
    submitFuntion = function (isUpdate, dadosForm) {
     if(!isUpdate){
      async function addCourse() {
        await api.post(api.version + 'courses', dadosForm)
          .then((response) => {
            loadCourses();
            handleCloseForm();
          })
          .catch(function (error) {
            debugger
            console.log(error);
          });
      }
      addCourse();
     }else {

     }
    },
    deleteFunction = function (idCourse) {
    },
    updateFunction = function () {
      setTitleForm('Update the ' + context)
      setIsUpdate(true);
      setDataForm({
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
    loadCourses();
  }, [courses]);

  return (
    <>
      <PageTitle title='My courses' />

      <Modal
        open={showForm}
        onClose={handleCloseForm}
      >
        <Box className={classes.boxModalForm}>
          <CourseForm title={titleForm} submitFuntion={submitFuntion} data={dataForm} isUpdate={isUpdate} />
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