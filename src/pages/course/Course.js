import React from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import CustomCrudToolBar from "../../components/CustomCrudToolBar";

const datatableData = [
  ["Teste", 1, "teste"],
  ["Teste1", 45, "teste1"],
  ["Teste2", 32, "teste2"],
];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
})),
teste = function(click = false){
    if(click){
    console.log("teste");
    }
},
deleteFunction = function(click = false){
    if(click){
    console.log("deleteFunction");
    }
},
updateFunction = function(click = false){
    if(click){
   console.log("updateFunction");
    }
},
options = {
    filterType: "checkbox",
    download: false,
    print: false,
    customToolbar: () => {
      return (
        <CustomCrudToolBar
        isertFunction={teste}
        deleteFunction={deleteFunction}
        updateFunction={updateFunction}
        tableContext="course"
        />
      );
    }
  },
selectedRows = null; 

export default function Courses() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Courses" />
        <Grid item xs={12}>
          <MUIDataTable
            title="My courses"
            data={datatableData}
            columns={["Name", "Studens' quantity", "Description", "State"]}
            options={options}
          />
        </Grid>
    </>
  );
}
