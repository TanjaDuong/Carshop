import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const[car, setCar] = useState(
    {brand: '', model: '', color: '', fuel: '', year: '', price: ''}
  )

  const handleClickOpen = () => {
    setOpen(true);
    setCar({
        brand: props.clickedCar.brand,
        model: props.clickedCar.model,
        color: props.clickedCar.color,
        fuel: props.clickedCar.fuel,
        year: props.clickedCar.year,
        price: props.clickedCar.price});
  };
  const handleInputChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value});
  };
  const editCar = () => {
      const newCar = {
          brand: car.brand,
          model: car.model,
          color: car.color,
          fuel: car.fuel,
          year: car.year,
          price: car.price
      }
      props.editCar(props.link, newCar);
      handleClose(); 
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{margin:10}}>
    <div>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
     Edit car
    </Button>

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit car information here
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          name="brand"
          value= {car.brand}
          onChange={e => handleInputChange(e)} 
          label="Brand"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          name="model"
          value= {car.model}
          onChange={e => handleInputChange(e)} 
          label="Model"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          name="color"
          value= {car.color}
          onChange={e => handleInputChange(e)} 
          label="Color"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          name="fuel"
          value= {car.fuel}
          onChange={e => handleInputChange(e)} 
          label="Fuel"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          name="year"
          type = "number"
          value= {car.year}
          onChange={e => handleInputChange(e)} 
          label="Year"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          name="price"
          type= "number"
          value= {car.price}
          onChange={e => handleInputChange(e)} 
          label="Price"
          fullWidth
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={editCar} color="primary">
          Save
        </Button>

      </DialogActions>
    </Dialog>
  </div>
  </div>
)
}

