import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {
  },
};

class CustomCrudToolBar extends React.Component {
  
  teste = (click = false) => {
      if(click)
    this.props.teste(click)
  }
  updateFunction = (click = false) => {
    if(click)
    this.props.updateFunction(click)
  }
  deleteFunction = (click = false) => {
    if(click)
    this.props.deleteFunction(click)
  }
  tableContext = () => {
    return this.props.tableContext ?? "record";
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"Add a new " + this.tableContext()}>
          <IconButton className={classes.iconButton} onClick={this.teste(true)}>
            <AddIcon className={classes.AddIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Update a " + this.tableContext()}>
          <IconButton className={classes.iconButton} onClick={this.updateFunction(true)}>
            <EditIcon className={classes.Edit} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Delete a " + this.tableContext()}>
          <IconButton className={classes.iconButton} onClick={this.deleteFunction(true)}>
            <DeleteForeverIcon className={classes.DeleteForever} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomCrudToolBar" })(CustomCrudToolBar);
