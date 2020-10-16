import React, { Component } from 'react'; 
import MiniPalette from './MiniPalette'; 
import { Link } from 'react-router-dom'; 
import { withStyles } from '@material-ui/styles'; 
import styles from './styles/PaletteListStyles'; 
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
import Button from '@material-ui/core/Button'; 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/Check'; 
import CloseIcon from '@material-ui/icons/Close'; 

class PaletteList extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      deleteDialogOpen: false, 
      deletePaletteId: '', 
    }; 

    this.goToPalette = this.goToPalette.bind(this); 
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this); 
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this); 
    this.openDeleteDialog = this.openDeleteDialog.bind(this); 
  }

  goToPalette(id) { 
    this.props.history.push(`/palette/${id}`); 
  } 

  closeDeleteDialog() {
    this.setState({ deleteDialogOpen: false, deletePaletteId: '' }); 
  }

  handleConfirmDelete() { 
    this.props.deletePalette(this.state.deletePaletteId); 
    this.setState({ deleteDialogOpen: false, deletePaletteId: '' }); 
  }
  
  openDeleteDialog(id) {
    this.setState({ deleteDialogOpen: true, deletePaletteId: id }); 
  }

  render() {
    const { palettes, classes } = this.props; 
    const { deleteDialogOpen } = this.state; 
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.nav}>
            <h1>React Colors</h1>
            <Link to='/palette/new'>New Palette</Link>
          </div>
          <TransitionGroup className={classes.palettes}> 
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames="fade" timeout={300}>
                <MiniPalette key={palette.id} {...palette} 
                  gotToPalette={this.goToPalette}
                  openDeleteDialog={this.openDeleteDialog}
                /> 
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={deleteDialogOpen}
          onClose={this.closeDeleteDialog}
          aria-labelledby="delete-palette-dialog-title"
          aria-describedby="delete-palette-dialog-description"
        >
          <DialogTitle id="delete-palette-dialog-title">Delete Palette?</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-palette-dialog-description">
              Are you sure you want to delete this palette?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleConfirmDelete} variant="outlined" color="primary">
              <CheckIcon fontSize="small" /> Yes
            </Button>
            <Button onClick={this.closeDeleteDialog} variant="outlined" color="secondary">
              <CloseIcon fontSize="small" /> No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList)