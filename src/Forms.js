import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Rating } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import StarIcon from '@mui/icons-material/Star';
import { type } from "@testing-library/user-event/dist/type";
//contains the textfields needed to send a message
const Forms = (props) => {
  
  const {
    values: {
      FirstName,
      LastName,
      Email,
      OverallRating,
      SafetyRating,
      PollutionRating,
      SurveyDate,
    },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    handleSubmit,
  } = props;
  //updates the state of the form, tracks the touched fields
  const change = (name, e) => {
    if (name === "SurveyDate") {
      Window.SurveyDate = e.$d;
    } else {
      e.persist();
      handleChange(e);
    }
    setFieldTouched(name, true, false);
  };
 
  return (
    <div className="DataForm mt-10 flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="border-2 p-4 rounded-md">
        <TextField
          id="FirstName"
          name="FirstName"
          label="Your First Name"
          value={FirstName}
          fullWidth
          helperText={touched.FirstName ? errors.FirstName : ""}
          error={touched.FirstName && Boolean(errors.FirstName)}
          onChange={change.bind(null, "FirstName")}
          
          
          variant="outlined"
        />
       
        <TextField
          id="LastName"
          name="LastName"
          label="Your Last Name"
          value={LastName}
          fullWidth
          helperText={touched.LastName ? errors.LastName : ""}
          error={touched.LastName && Boolean(errors.LastName)}
          onChange={change.bind(null, "LastName")}
          
          sx={{marginTop:'20px'}}
        />

        <TextField
          id="Email"
          name="Email"
          label="Your Email Address"
          value={Email === null? "" : Email}
          fullWidth
          helperText={touched.Email ? errors.Email : ""}
          error={touched.Email && Boolean(errors.Email)}
          onChange={change.bind(null, "Email")}
         sx={{marginTop:'20px'}}
        />

        <Box className="flex justify-between my-5">
          <Box>
            <Typography mb={2} component="legend">Overall Rating</Typography>
            <Rating
              id="OverallRating"
              name="OverallRating"
              label="Please give your over all rating"
              value={OverallRating}
              fullWidth
              helperText={touched.OverallRating ? errors.OverallRating : ""}
              error={touched.OverallRating && Boolean(errors.OverallRating)}
              onChange={change.bind(null, "OverallRating")}
              defaultValue={5}
              size="large"
              emptyIcon={<StarIcon style={{ opacity: 0.55,color:'white' }} fontSize="inherit" />}
            />
          </Box>
          <Box>
            <Typography mb={2} component="legend">Safety Rating</Typography>
            <Rating
              id="SafetyRating"
              name="SafetyRating"
              label="Please give your Safety rating"
              value={SafetyRating}
              fullWidth
              helperText={touched.SafetyRating ? errors.SafetyRating : ""}
              error={touched.SafetyRating && Boolean(errors.SafetyRating)}
              onChange={change.bind(null, "SafetyRating")}
              defaultValue={5}
              size="large"
              emptyIcon={<StarIcon style={{ opacity: 0.55,color:'white' }} fontSize="inherit" />}

            />
          </Box>

          <Box>
            <Typography mb={2} component="legend">Pollution Rating</Typography>
            <Rating
              id="PollutionRating"
              name="PollutionRating"
              label="Please give your Safety rating"
              value={PollutionRating}
              fullWidth
              helperText={touched.PollutionRating ? errors.PollutionRating : ""}
              error={touched.PollutionRating && Boolean(errors.PollutionRating)}
              onChange={change.bind(null, "PollutionRating")}
              defaultValue={1}
              size="large"
              emptyIcon={<StarIcon style={{ opacity: 0.55,color:'white' }} fontSize="inherit" />}
            />
          </Box>
        </Box>
        <Box className='flex my-2 justify-center w-full'>
        <LocalizationProvider   dateAdapter={AdapterDayjs}>
          <DatePicker
            id="SurveyDate"
            name="SurveyDate"
            label="Please Enter Survey Date"
            minDate={dayjs(Date())}
            value={SurveyDate}
            
            helperText={touched.SurveyDate ? errors.SurveyDate : ""}
            error={touched.SurveyDate && Boolean(errors.SurveyDate)}
            onChange={(e) => change("SurveyDate", e)}
           
          
          />
        </LocalizationProvider>
        </Box>
       
        <Button
          type="submit"
          fullWidth
          variant="raised"
          color="primary"
          disabled={!isValid}
          sx={{
            marginTop: '10px',
            backgroundColor: 'green',
            '&:hover': {
              backgroundColor: 'green',
            },
          }}
          
        >
          Submit Data
        </Button>
        
      </form>
     
    </div>
  );
};

export default Forms;
