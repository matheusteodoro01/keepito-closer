import React, { useEffect, useState } from "react";
import { FormControl, TextField } from "@material-ui/core";
// api
import api from "../../services/api";

// styles
import useStyles from "../../components/styles";

// components
import SubmitButton from "../../components/SubmitButton";

export default function SaveCourse(props) {
  const style = useStyles(),
    [courseId, setCourseId] = useState(props?.courseSelected?.id ?? props?.courseSelected?.courseId),
    [name, setName] = useState(props?.courseSelected?.name),
    [description, setDescription] = useState(props?.courseSelected?.description),
    createCourse = async (event) => {
      event.preventDefault();
      const course = { name, description, courseId, creatorId: props?.userId };
      await api.post("v1/courses", course);
      const courses = props.courses;
      courses.push(course);
      props.setCourses(courses);
      props.setShowModal(false);
    },
    updateCourse = async (event) => {
      event.preventDefault();
      const course = { name, description, courseId, creatorId: props?.userId };
      await api.put(`v1/courses/${courseId}`, course);
      const courses = props.courses;
      const coursesUpdate = courses.filter((course) => course.id !== courseId);
      coursesUpdate.push(course);

      const compare = (a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      };
      props.setCourses(coursesUpdate.sort(compare));
      props.setShowModal(false);
    };
    useEffect(()=>{console.log("CURSO SELECIONADO",props.courseSelected)},[])

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

      <SubmitButton subimit={courseId? updateCourse : createCourse} />
    </FormControl>
  );
}
