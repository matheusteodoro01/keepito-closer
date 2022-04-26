import React, { useState, useEffect } from 'react';
import { Grid, Modal, Box } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// api
import api from '../../services/api'

// components
import PageTitle from "../../components/PageTitle";
import CustomCrudToolBar from "../../components/CustomCrudToolBar";
import CourseForm from "./CourseForm";

// styles
import useStyles from "../../components/styles";

export default function Courses() {
  let classes = useStyles();
  const context = "course",
    [showForm, setShowForm] = useState(false),
    [titleForm, setTitleForm] = useState(''),
    [isUpdate, setIsUpdate] = useState(false),
    [dataForm, setDataForm] = useState({}),
    [courses, setCourses] = useState([]),
    [selectionModel, setSelectionModel] = React.useState([]),
    [configsGetCourse, setConfigsGetCourse] = React.useState({
      params: {
        page: 0,
        linesPerPage: 10,
        direction: 'ASC',
        orderBy: 'id'
      }
    }),
    loadCourses = () => {
      async function fetchData() {
        await api.get(api.version + 'courses', configsGetCourse)
          .then((response) => {
            setCourses(response.data.content)
          })
      }
      fetchData();
    },
    onRowSelectionChange = (currentRowsSelected, allRowsSelected, rowsSelected) => {
      let rowData = courses[currentRowsSelected[0].index];
      setSelectionModel(rowData)
    },
    handleOpenForm = () => setShowForm(true),
    handleCloseForm = () => setShowForm(false),
    insertFunction = function () {
      setTitleForm('Insert a new ' + context)
      setIsUpdate(false);
      setDataForm(null)
      handleOpenForm()
    },
    submitFuntion = function (isUpdate, dataForm) {
      if (!isUpdate) {
        async function addCourse() {
          await api.post(api.version + 'courses', dataForm)
            .then((response) => {
              loadCourses();
              handleCloseForm();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        addCourse();
      } else {
        let params = { name: dataForm.name, description: dataForm.description };
        async function updateCourse() {
          await api.put(api.version + 'courses/' + dataForm.id, params)
            .then((response) => {
              loadCourses();
              handleCloseForm();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        updateCourse();
      }
    },
    deleteFunction = function () {
    },
    updateFunction = function () {
      let id = selectionModel.id;
      async function fetchData() {
        await api.get(api.version + 'courses/' + id, {})
          .then((response) => {
            setTitleForm('Update the ' + context)
            setIsUpdate(true);
            setDataForm(response.data)
            handleOpenForm()
          })
      }
      fetchData();
    },
    handleCustomToolbar = () => {
      return (
        <CustomCrudToolBar
          insertFunction={insertFunction}
          deleteFunction={deleteFunction}
          updateFunction={updateFunction}
          tableContext={context}
        />
      );
    },
    onChangeRowsPerPage = (numberOfRows) => {
      let configAUX = configsGetCourse;
      configAUX.params.linesPerPage = numberOfRows;
      setConfigsGetCourse(configAUX);
      loadCourses();
    },
    onChangePage = (currentPage) => {
      let configAUX = configsGetCourse;
      configAUX.params.page = currentPage;
      setConfigsGetCourse(configAUX);
      loadCourses();
    },
    datatableOptions = {
      filterType: "dropdown",
      download: false,
      print: false,
      selectableRows: "single",
      selectToolbarPlacement: 'none',
      customToolbar: handleCustomToolbar,
      onRowSelectionChange: onRowSelectionChange,
      onChangeRowsPerPage: onChangeRowsPerPage,
      onChangePage: onChangePage
    },
    dataTableColumns = [
      {
        name: "id",
        label: "Code",
        options: {
          filter: true,
          sort: true,
        }
      }, {
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        }
      }, {
        name: "description",
        label: "Description",
        options: {
          filter: true,
          sort: true,
        }
      }
    ];

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <>
      <PageTitle title='My courses' />

      <Modal
        open={showForm}
        onClose={handleCloseForm}
      >
        <Box className={classes.boxModalCourseForm}>
          <CourseForm title={titleForm} submitFuntion={submitFuntion} data={dataForm} isUpdate={isUpdate} />
        </Box>
      </Modal>
      <Grid item xs={12}>
        <MUIDataTable
          data={courses}
          columns={dataTableColumns}
          options={datatableOptions}
        />
      </Grid>
    </>
  );
}