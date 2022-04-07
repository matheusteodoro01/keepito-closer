import React, { useState } from 'react';
import { Grid, Modal, Box } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import CustomCrudToolBar from "../../components/CustomCrudToolBar";
import CourseForm from "../../components/CourseForm";

// styles
import useStyles from "../../components/styles";

const datatableData = [
  ["Teste", 1, "teste"],
  ["Teste1", 45, "teste1"],
  ["Teste2", 32, "teste2"],
];

export default function Courses() {
  var classes = useStyles();
  const [showForm, setShowForm] = useState(false),
    [titleForm, setTitleForm] = useState(''),
    [context, setContext] = useState('course'),
    [isUpdate, setIsUpdate] = useState(false),
    [dadosForm, setDadosForm] = useState(),
    handleOpenForm = () => setShowForm(true),
    handleCloseForm = () => setShowForm(false),
    insertFunction = function () {
      setTitleForm('Insert a new ' + context)
      setIsUpdate(false);
      handleOpenForm()
    },
    submitFuntion = function () {      
      console.log("submitFunction");
    },
    deleteFunction = function () {
      console.log("deleteFunction");
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
  return (
    <>
      <PageTitle title='My courses' />

      <Modal
        open={showForm}
        onClose={handleCloseForm}
      >
        <Box className={classes.boxModalForm}>
          <CourseForm title={titleForm} submitFuntion={submitFuntion} dados={dadosForm} isUpdate={isUpdate}/>
        </Box>
      </Modal>
      <Grid item xs={12}>
        <MUIDataTable
          data={datatableData}
          columns={["Name", "Studens' quantity", "Description", "State"]}
          options={options}
        />
      </Grid>
    </>
  );
}