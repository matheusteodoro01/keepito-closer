import React, { useState, useEffect } from "react";
import { Grid, Modal, Box } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
// api
import api from "../../../services/api";

// components
import CustomCrudToolBar from "../../../components/CustomCrudToolBar";
import ClassesForm from "./ClassesForm";

// styles
import useStyles from "../../../components/styles";

export default function Classes(props) {
  let classesNames = useStyles();
  let history = useHistory();
  const context = "aula",
    [showForm, setShowForm] = useState(false),
    [titleForm, setTitleForm] = useState(""),
    [isUpdate, setIsUpdate] = useState(false),
    [dataForm, setDataForm] = useState({}),
    [classes, setClasses] = useState(props?.classes),
    [selectionModel, setSelectionModel] = React.useState([]),
    [courseId, setCourseId] = React.useState(props.courseId),
    [configsGrid, setConfigsGrid] = React.useState({
      params: {
        page: 0,
        linesPerPage: 10,
        direction: "ASC",
        orderBy: "id",
      },
    }),
    onRowSelectionChange = (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected,
    ) => {
      let rowData = classes[currentRowsSelected[0].index];
      console.log(rowData);
      setSelectionModel(rowData);
    },
    handleOpenForm = () => setShowForm(true),
    handleCloseForm = () => setShowForm(false),
    insertFunction = function () {
      setTitleForm("Adicionar nova " + context);
      setIsUpdate(false);
      setDataForm(null);
      handleOpenForm();
    },
    submitFuntion = function (isUpdate, dataForm) {
      let addInGrid = (data) => {
        let classesAux = classes;
        classesAux.push(data);
        setClasses([]);
        setClasses(classesAux);
      };
      if (!isUpdate) {
        async function addCourse() {
          dataForm.courseId = props.courseId;
          await api
            .post(api.version + "classes", dataForm)
            .then((response) => {
              addInGrid(response.data);
              handleCloseForm();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        addCourse();
      } else {
        let params = {
          name: dataForm.name,
          description: dataForm.description,
          courseId: props.courseId,
        };
        async function updateCourse() {
          await api
            .put(api.version + "classes/" + dataForm.id, params)
            .then((response) => {
              let classesAux = classes,
                index = classesAux.findIndex(
                  (element) => element.id == dataForm.id,
                );
              classesAux[index] = dataForm;
              setClasses(classesAux);
              setSelectionModel(dataForm);
              handleCloseForm();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        updateCourse();
      }

      handleCloseForm();
    },
    deleteFunction = function () {
      // let classesAux = classes,
      // index = classesAux.findIndex( element => element.id == setSelectionModel.id);
      // classesAux.splice(index, 1);
      // setSelectionModel(dataForm);
      // setClasses(classesAux);
    },
    updateFunction = function () {
      setTitleForm("Atualizar " + context);
      setIsUpdate(true);
      setDataForm(selectionModel);
      handleOpenForm();
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
      let configAUX = configsGrid;
      configAUX.params.linesPerPage = numberOfRows;
      setConfigsGrid(configAUX);
    },
    onChangePage = (currentPage) => {
      let configAUX = configsGrid;
      configAUX.params.page = currentPage;
      setConfigsGrid(configAUX);
    },
    datatableOptions = {
      filterType: "dropdown",
      download: false,
      print: false,
      selectableRows: "single",
      selectToolbarPlacement: "none",
      customToolbar: handleCustomToolbar,
      onRowSelectionChange: onRowSelectionChange,
      onChangeRowsPerPage: onChangeRowsPerPage,
      onChangePage: onChangePage,
      onRowClick: (rowData) => history.push("/app/course/classe/details/1")
    },
    dataTableColumns = [
      {
        name: "id",
        label: "Code",
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
        name: "description",
        label: "Descrição",
        options: {
          filter: true,
          sort: true,
        },
      },
    ];

  return (
    <>
      <Modal open={showForm} onClose={handleCloseForm}>
        <Box className={classesNames.boxModalClassesForm}>
          <ClassesForm
            title={titleForm}
            submitFuntion={submitFuntion}
            data={dataForm}
            isUpdate={isUpdate}
          />
        </Box>
      </Modal>
      <Grid item xs={12}>
        <MUIDataTable
          data={classes}
          columns={dataTableColumns}
          options={datatableOptions}
        />
      </Grid>
    </>
  );
}
