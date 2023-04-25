import { React, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export const Name = () => {
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [namenext, setnamenext] = useState(true);
    const [numberOfWheels, setnumberOfWheels] = useState("");
    const [numberofwheelsnext, setnumberOfWheelsnext] = useState(false);
    const [typesofvehiclesnext, settypesofvehiclesnext] = useState(false);
    const [initialtypesofvehiclevalue, setinitialtypesofvehiclevalue] = useState("");
    const [vehiclelist, setvehicleList] = useState([]);
    const [typesofselectedmodel, settypesofselectedmodel] = useState(false);
    const [vehiclemodellist, setvehiclemodelList] = useState([]);
    const [choosemodellist, setchoosemodellist] = useState(null)
    const [showdaterangepickerform, setshowdaterangepickerform] = useState(false);
    const [startdate,setstartdate] =useState(null);
    const [enddate,setenddate] =useState(null);
    
    function handlefirstname(e) {
        setfname(e.target.value)
    }
    function handlelastname(e) {
        setlname(e.target.value)
    }
    function showWheels() {
        console.log("first name is:" + fname);
        console.log("last name is:" + lname);
        setnamenext(false);
        setnumberOfWheelsnext(true);
    }
    function getnumberofwheels(e) {
        setnumberOfWheels(e.target.value);
    }
    function showTypesofVehicle() {
        console.log("get number of wheels:" + numberOfWheels);
        getVehicleTypeFromDatabase()
        setnumberOfWheelsnext(false);
        settypesofvehiclesnext(true);
    }
    function getVehicleTypeFromDatabase() {

        fetch('/vehicletype', {
            method: 'POST',
            body: JSON.stringify({
                noofwheels: numberOfWheels
            }),
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            },
        }).then((result) => {
            result.json().then((resp) => {
                console.warn("result", resp)
                setvehicleList(resp);
            })
        })
            .catch(err => console.log(err))
    }
    function setVehicleSelected(e) {
        setinitialtypesofvehiclevalue(e.target.value);

    }
    function showspecificmodelform() {
        console.log("get selected vehicle name:" + initialtypesofvehiclevalue);
        fetch('/vehiclemodeltype', {
            method: 'POST',
            body: JSON.stringify({
                selectedvehicle: initialtypesofvehiclevalue
            }),
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            },
        }).then((result) => {
            result.json().then((resp) => {
                console.warn("result", resp)
                setvehiclemodelList(resp);
            })
        })
            .catch(err => console.log(err))
        settypesofvehiclesnext(false);
        settypesofselectedmodel(true);
    }
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.Model,
    });
    
    function showdaterangepicker() {
        console.log("selected model list is:"+choosemodellist);
        settypesofselectedmodel(false);
        setshowdaterangepickerform(true);
    }
    function getdateandsubmit()
    {
        
        console.log("first name is:"+fname);
        console.log("last name is:"+lname);
        console.log("types of wheel:"+numberOfWheels);
        console.log("get selected vehicle name:" + initialtypesofvehiclevalue);
        console.log("selected model list is:"+choosemodellist.Model);
        console.log("start date is:"+new Date(startdate));
        console.log("end date is:"+new Date(enddate));
        toast.success('🦄 You have Sucessfully Booked Your Ride from !'+new Date(startdate)+' With End Date '+new Date(enddate), {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
    
    return (
        <>

            <Container maxWidth="sm">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 1,
                                    width: "100%",
                                    height: "100",
                                },
                            }}
                        >
                            <Paper elevation={3} padding={3} margin={3}>
                                {namenext ? (
                                    <form style={{ padding: "20px" }}>
                                        <Typography variant="h5" gutterBottom>
                                            First Name
                                        </Typography>
                                        <TextField fullWidth id="standard-basic" variant="outlined" value={fname} onChange={handlefirstname} />
                                        <Typography variant="h5" gutterBottom>
                                            Last Name
                                        </Typography>
                                        <TextField fullWidth id="standard-basic" variant="outlined" onChange={handlelastname} /><br></br><br></br>
                                        {fname && lname !== '' ? (
                                            <Button fullWidth variant="contained" onClick={showWheels}>Next</Button>
                                        ) : (
                                            <Button disabled fullWidth variant="contained">Next</Button>
                                        )}
                                    </form>
                                ) : null}
                                {numberofwheelsnext ? (
                                    <form style={{ padding: "20px" }}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Number of Wheels</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={numberOfWheels}
                                                onChange={getnumberofwheels}
                                            >
                                                <FormControlLabel value="2" control={<Radio />} label="2" />
                                                <FormControlLabel value="4" control={<Radio />} label="4" />
                                            </RadioGroup>
                                        </FormControl>
                                        {numberOfWheels !== '' ? (
                                            <Button fullWidth variant="contained" onClick={showTypesofVehicle}>Next</Button>
                                        ) : (
                                            <Button disabled fullWidth variant="contained">Next</Button>
                                        )}
                                    </form>
                                ) : null}
                                {typesofvehiclesnext ? (
                                    <form style={{ padding: "20px" }}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">List of Vehicle Type</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                onChange={setVehicleSelected}
                                            >

                                                {
                                                    vehiclelist.map((item) =>
                                                        <FormControlLabel value={item.Name} control={<Radio />} key={item.sno} label={item.Name} />

                                                    )
                                                }


                                            </RadioGroup>
                                        </FormControl>
                                        {initialtypesofvehiclevalue !== '' ? (
                                            <Button fullWidth variant="contained" onClick={showspecificmodelform}>Next</Button>
                                        ) : (
                                            <Button disabled fullWidth variant="contained">Next</Button>
                                        )}
                                    </form>
                                ) : null}
                                {typesofselectedmodel ? (
                                    <form style={{ padding: "20px" }}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Types Of Selected Vehicle Model</FormLabel>
                                            <Autocomplete
                                                fullWidth={true}
                                                value={choosemodellist}
                                                onChange={(event, value) => setchoosemodellist(value)}
                                                id="filter-demo"
                                                options={vehiclemodellist}
                                                getOptionLabel={(option) => option.Model}
                                                filterOptions={filterOptions}
                                                sx={{ width: 500 }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </FormControl>
                                        {console.log("selected model using variable is:"+choosemodellist)}
                                        <br></br><br></br>
                                        {choosemodellist !== null ? (
                                            <Button fullWidth variant="contained" onClick={showdaterangepicker}>Next</Button>
                                        ) : (
                                            <Button disabled fullWidth variant="contained">Next</Button>
                                        )}
                                    </form>
                                ) : null}
                                {showdaterangepickerform ? (
                                    <form style={{ padding: "20px" }}>
                                            
                                            <FormLabel id="demo-row-radio-buttons-group-label">Date Range Picker</FormLabel>
                                            <br></br><br></br>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                label="Choose Start Date"
                                                value={startdate}
                                                onChange={(newValue)=>setstartdate(newValue)}
                                                >
                                                </DatePicker>
                                            </LocalizationProvider>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                label="Choose End Date"
                                                value={enddate}
                                                onChange={(newValue)=>setenddate(newValue)}
                                                >
                                                </DatePicker>
                                            </LocalizationProvider> 
                                        
                                        <br></br><br></br>
                                        {startdate && enddate !== null ? (
                                            <Button fullWidth variant="contained" onClick={getdateandsubmit}>Send</Button>
                                        ) : (
                                            <Button disabled fullWidth variant="contained">Send</Button>
                                        )}
                                    </form>
                                ) : null}
                            </Paper>
                        </Box>
                    </Grid>

                </Grid>

            </Container>
            <ToastContainer />
        </>
    )
}
export default Name;