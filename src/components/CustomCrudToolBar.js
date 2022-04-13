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
  
  constructor(props) {
    super(props);
    this.insertFunction = this.insertFunction.bind(this);
    this.updateFunction = this.updateFunction.bind(this);
    this.deleteFunction = this.deleteFunction.bind(this);
    this.tableContext = this.tableContext.bind(this);
  }

  insertFunction = () => {      
    this.props.insertFunction()
  }
  updateFunction = () => {    
    this.props.updateFunction()
  }
  deleteFunction = () => {    
    this.props.deleteFunction()
  }
  tableContext = () => {
    return this.props.tableContext ?? "record";
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"Add a new " + this.tableContext}>
          <IconButton className={classes.iconButton} onClick={this.insertFunction}>
            <AddIcon className={classes.AddIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Update a " + this.tableContext}>
          <IconButton className={classes.iconButton} onClick={this.updateFunction}>
            <EditIcon className={classes.Edit} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Delete a " + this.tableContext}>
          <IconButton className={classes.iconButton} onClick={this.deleteFunction}>
            <DeleteForeverIcon className={classes.DeleteForever} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomCrudToolBar" })(CustomCrudToolBar);
