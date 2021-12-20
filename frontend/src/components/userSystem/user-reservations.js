import React, { useState, useEffect } from "react";
import ReservationsDataService from "../../services/reservation";
import { Link } from "react-router-dom";
import BackgroundSlider from 'react-background-slider'
import image1 from './images/image1.jpg'
import image2 from './images/image2.jpg'
import image3 from './images/image3.jpg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ButtonGroup from '@mui/material/ButtonGroup';

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

const UserReservations = props => {

 

    const user = props.user;
    const userid = user._id
    console.log(userid)
    const [reservations, setReservations] =useState([]);
    const forceUpdate = useForceUpdate();

    const deleteReservations = (resid) => {
      ReservationsDataService.delete(resid)
      .then(response => {
        retrieveReservations();
      })
        .catch(e => {
          console.log(e);
        });

    };
   const retrieveReservations = () => {
        ReservationsDataService.get(userid)
        
          .then(response => {
            setReservations(response.data.ReservationsList);
          })
          .catch(e => {
            console.log(e);
          });
      };


      useEffect(() => {
        retrieveReservations();
      }, []);

      const noRes = () => {

        if (reservations.length==0) return true; return false;
    
    
      }


      return(
        <div>
           <BackgroundSlider
          images={[image1,image2, image3]}
          duration={4}
          transition={2}
        />
        <Box
    opacity='[0,0,0]'
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 3, width: '65ch' },
      }}
      noValidate
      textAlign='left'
      autoComplete="off"
      height="0px"
      
    >
        <div className="row" style= {{width:"250rem"}}>
          <h1>My Reservations </h1><br/>

          {noRes() && ( <strong>You have no Reservations.</strong>)} 

        {reservations.map((reservation) => {
          
          return (
           <div >
             
              <div className="col-lg-4 pb-1">
              <div className="card" style={{border : "1px solid #111111"}}>
                <div className="card-body">
                  <h4 className="card-title">{reservation.DepartureFlight.DepartureAirport} TO {reservation.DepartureFlight.DestinationAirport }  </h4>
                  <h5>Booking Number :{reservation.BookingNumber}</h5>
                  <p className="card-text" >
                  <div class="row">
                    
                  <div class="col-sm">
                  <h5 className="card-title"> Departure Flight</h5>
                  <p className="card-text" >
                   <strong>Date: </strong>{reservation.DepartureFlight.Date}<br/>
                    <strong>Departure Time : </strong>{reservation.DepartureFlight.DepartureTime} <br/>
                    <strong>Arrival Time : </strong>{reservation.DepartureFlight.ArrivalTime}<br/>
                    <strong>Flight Number : </strong>{reservation.DepartureFlight.FlightNumber}<br/>
                    <strong>Baggage Allowance : </strong>{reservation.DepartureFlight.BaggageAllowance}<br/>
                    <strong>Trip Duration : </strong>{reservation.DepartureFlight.TripDuration}<br/>
                    <strong>Seats : </strong>{reservation.DepSeats.sort().toString()}<br/>
                    <strong>Cabin Class : </strong>{reservation.CabinClass}<br/>
                    </p>
                    </div>
                    <div class="col-sm">
                  <h5 className="card-title">  Return Flight</h5>
                  <p className="card-text">
                    <strong>Date: </strong>{reservation.ReturnFlight.Date}<br/>
                    <strong>Departure Time : </strong>{reservation.ReturnFlight.DepartureTime} <br/>
                    <strong>Arrival Time : </strong>{reservation.ReturnFlight.ArrivalTime}<br/>
                    <strong>Flight Number : </strong>{reservation.ReturnFlight.FlightNumber}<br/>
                    <strong>Baggage Allowance : </strong>{reservation.ReturnFlight.BaggageAllowance}<br/>
                    <strong>Trip Duration : </strong>{reservation.ReturnFlight.TripDuration}<br/>
                    <strong>Seats : </strong>{reservation.RetSeats.sort().toString()}<br/>
                    <strong>Cabin Class : </strong>{reservation.CabinClass}<br/>
                    </p>
                    </div>
                    <div class="col-sm">
                  <h5 className="card-title">  User info</h5>
                  <p className="card-text">
                    <strong>First Name : </strong>{reservation.User.firstname}<br/>
                    <strong>Last Name : </strong>{reservation.User.lastname}<br/>
                    <strong>Passport Number : </strong>{reservation.User.passportnumber}<br/>
                    <strong>Email : </strong>{reservation.User.email}<br/>
                    <strong>Total Price : </strong>${reservation.Price}<br/>
                    
                   
                    </p>
                    </div>
                    </div>
                    
                    <ButtonGroup style={{display: 'flex',  justifyContent:'right', alignItems:'right', height: '4vh'}}>
                    <Button variant='contained'  size='small' color='info' >Mail My Booking</Button>  
                    <Button variant='contained'  size='small' color='primary' href="/flights/SelectDeparture" state={reservation}>Edit Departure Flight</Button>  
                    <Button variant='contained'  size='small' color='primary' href="/flights/SelectReturn" state={reservation}>Edit Return Flight</Button>  
                    <Link to={{ pathname: "/flights/EditDepSeats", state: reservation }} className="btn btn-success">Edit Departure Seats</Link>  
                    <Button variant='contained'  size='small' color='warning' href="/flights/EditRetSeats" state={reservation}>Edit Return Seats</Button>  
                    <Button variant='contained'  size='small' color='error' onClick={() => {if(window.confirm('Are you sure you want to cancel this reservation?')){deleteReservations(reservation._id)}}}>Cancel Reservation</Button> 
                      </ButtonGroup>
                    
                  </p>
                </div>
              </div>
            </div>
           </div>
          );
        })}
      </div>
      </Box>
      </div>
      )
}
export default UserReservations;