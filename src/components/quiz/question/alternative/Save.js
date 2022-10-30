import React, { useState } from "react";
import { FormControl, TextField } from "@material-ui/core";
// api
import api from "../../../../services/api";

// styles
import useStyles from "../../../styles";

// components
import SubmitButton from "../../../../components/SubmitButton";

export default function SaveAlternative(props) {
  const style = useStyles(),
    [questionId, setQuestionId] = useState(props?.questionId),
    [description, setDescription] = useState(props.alternative.description),
    [alternativeId, setAlternativeId] = useState(props?.alternative.id),
    createAlternative = async (event) => {
      event.preventDefault();
      const alternative = { description, questionId };
      await api.post("v1/alternatives", alternative);
      const alternatives = props.alternatives;
      alternatives.push(alternative);
      props.setAlternatives(alternatives);
      props.setShowModal(false);
    },
    updateAlternative = async (event) => {
      event.preventDefault();
      const alternative = { description, questionId };
      await api.put(`v1/alternatives/${alternativeId}`, alternative);
      const alternatives = props.alternatives;
      const alternativesUpdate = alternatives.filter(
        (alternative) => alternative.id !== alternativeId,
      );
      alternativesUpdate.push(alternative);

      const compare = (a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      };
      props.setAlternatives(alternativesUpdate.sort(compare));
      props.setShowModal(false);
    };

  return (
    <FormControl className={style.form}>
      <TextField
        fullWidth
        required
        multiline
        rows={4}
        id="outlined-required"
        label="Descrição"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <SubmitButton
        subimit={alternativeId ? updateAlternative : createAlternative}
      />
    </FormControl>
  );
}
