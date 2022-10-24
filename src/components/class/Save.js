import React, { useEffect, useState } from "react";
import { FormControl, TextField } from "@material-ui/core";
// api
import api from "../../services/api";

// styles
import useStyles from "../../components/styles";

// components
import SubmitButton from "../../components/SubmitButton";

export default function SaveClass(props) {
  const style = useStyles(),
    [classeId, setClassId] = useState(
      props?.classeSelected?.id ?? props?.classeSelected?.classeId,
    ),
    [name, setName] = useState(props?.classeSelected?.name),
    [description, setDescription] = useState(
      props?.classeSelected?.description,
    ),
    createClass = async (event) => {
      event.preventDefault();
      const classe = { name, description, classeId, courseId: props?.courseId };
      const newClass = await api.post("v1/classes", classe);
      const classes = props.classes;
      classes.push(newClass.data);
      props.setCourseClasses(classes);
      props.setShowModal(false);
    },
    updateClass = async (event) => {
      event.preventDefault();
      const classe = {
        name,
        description,
        courseId: props?.courseId,
        id: classeId,
      };
      await api.put(`v1/classes/${classeId}`, classe);
      const classes = props.classes;
      const classesUpdate = classes.filter((classe) => classe.id !== classeId);
      classesUpdate.push(classe);

      const compare = (a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      };
      props.setCourseClasses(classesUpdate.sort(compare));
      props.setShowModal(false);
    };

  return (
    <FormControl className={style.form}>
      <TextField
        fullWidth
        required
        id="outlined-required"
        label="Nome"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        required
        rows={4}
        id="outlined-required"
        label="Descrição"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <SubmitButton subimit={classeId ? updateClass : createClass} />
    </FormControl>
  );
}
