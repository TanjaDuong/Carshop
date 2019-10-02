import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'; 
import { Button } from '@material-ui/core';
import { Snackbar } from "@material-ui/core";
import AddCar from "./AddCar";
import EditCar from "./EditCar"; 

export default function Carlist () {
const [cars, setCars] = useState([]);
const [open, setOpen] = React.useState(false);
const [message, setMessage] = useState(""); 

//Snackbar functions
const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

useEffect(() => {
    fetchData();
}, [])

const fetchData = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars) )
    .catch(err => console.error(err))
}
const saveCar = (newCar) => {
    fetch("https://carstockrest.herokuapp.com/cars", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCar)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
    .then(res => setMessage('Car saved and added!'))
}

const deleteCar = (link) => {
    if(window.confirm('Are you sure?')) {
        console.log(link);
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .then(res => setMessage('Car deleted!'))
        .then(res => setOpen(true)) 
        .catch(err => console.error(err))
    }
}

const editCar = (link, editedCar) => {
    fetch(link, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedCar)
    })
    .then(res => fetchData())
    .then(res => setMessage('Car edited!'))
    .catch(err => console.error(err))
   

};


const columns = [
    { Header: 'Brand', accessor: 'brand'},
    { Header: 'Model', accessor: 'model'},
    { Header: 'Color', accessor: 'color'},
    { Header: 'Fuel', accessor: 'fuel'},
    { Header: 'Year', accessor: 'year'},
    { Header: 'Price', accessor: 'price'},
    //Delete-step1: Add button-add Onclick that call deleteCar- taking link as value
    {   accessor: '_links.self.href',
        Cell: ({value}) => <Button color="secondary" onClick={() => deleteCar(value)}>Delete</Button>
    },
    //Edit-step2: 
    {   accessor: '_links.self.href',
    Cell: ({value,row}) => <EditCar editCar={editCar} link={value} clickedCar={row}/>

    }
]

return (
<div>
    <AddCar saveCar={saveCar} />
    <ReactTable 
    data={cars} 
    columns={columns} /> 
     <Snackbar
     open={open}
     autoHideDuration= {3000}
     onClose={handleClose}
     message={message}
     />
</div>
);
}


