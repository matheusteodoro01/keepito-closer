import React, { useState, useEffect } from 'react';
import { Grid, Modal, Box } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// api
import api from '../../../services/api'

// components
import CustomCrudToolBar from "../../../components/CustomCrudToolBar";
import ClassesForm from "./ClassesForm"

// styles
import useStyles from "../../../components/styles";

export default function Classes(props) {
    let classesNames = useStyles();
    const context = "class",
        [showForm, setShowForm] = useState(false),
        [titleForm, setTitleForm] = useState(''),
        [isUpdate, setIsUpdate] = useState(false),
        [dataForm, setDataForm] = useState({}),
        [classes, setClasses] = useState(props?.classes),
        [selectionModel, setSelectionModel] = React.useState([]),
        [configsGrid, setConfigsGrid] = React.useState({
            params: {
                page: 0,
                linesPerPage: 10,
                direction: 'ASC',
                orderBy: 'id'
            }
        }),
        onRowSelectionChange = (currentRowsSelected, allRowsSelected, rowsSelected) => {
            let rowData = classes[currentRowsSelected[0].index];
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
                let classesAux = classes;
                classesAux.push(dataForm);
                setClasses(classesAux);
            } else {
                let classesAux = classes,
                index = classesAux.findIndex( element => element.id == dataForm.id);
                classesAux[index] = dataForm;
                setClasses(classesAux);
                setSelectionModel(dataForm);
            }

            if (!isUpdate) {
                async function addCourse() {
                  await api.post(api.version + 'classes', dataForm)
                    .then((response) => {
                      handleCloseForm()
                    //   updateFunction(1)
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
            let classesAux = classes,
            index = classesAux.findIndex( element => element.id == setSelectionModel.id);
            classesAux.splice(index, 1);
            setSelectionModel(dataForm);
            setClasses(classesAux);
        },
        updateFunction = function () {
            setTitleForm('Update the ' + context);
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

    return (
        <>
            <Modal
                open={showForm}
                onClose={handleCloseForm}
            >
                <Box className={classesNames.boxModalClassesForm}>
                    <ClassesForm title={titleForm} submitFuntion={submitFuntion} data={dataForm} isUpdate={isUpdate} />
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