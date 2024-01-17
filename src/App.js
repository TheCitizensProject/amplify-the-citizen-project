import React, { useEffect, useState } from "react";
import { Amplify, API, Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import * as Yup from "yup";
import { Formik } from "formik";
import Forms from "./Forms";
import dayjs from "dayjs";
import "./App.css";
import Snackbar from "@mui/material/Snackbar";
import Chart from "./Chart";
import { Button, NativeSelect, ThemeProvider } from "@mui/material";
import theme from "./config/themeConfig";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
Amplify.configure(awsExports);

//rules that enforced data validation
const validationSchema = Yup.object({
  FirstName: Yup.string("Enter Your First Name").required(
    "Your First Name is Required"
  ),
  LastName: Yup.string("Enter Your Last Name").required(
    "Your Last Name is Required"
  ),
  Email: Yup.string("Enter Your Email Address").required(
    "Your Email Address is Required"
  ),
  SurveyDate: Yup.date("Please Select Your Date").required("Date is Required"),
});

function App({ signOut, user }) {
  const [GraphData, setGraphData] = useState([]);
  const [Notification, setNotification] = useState("");
  const [dataFetch, setDataFetch] = useState(false);
  const [days, setDays] = useState(7);
  const GetGraphData = async () => {
    setDataFetch(true);
  };
  console.log({ days });
  useEffect(() => {
    async function fetchData() {
      const userData = await Auth.currentAuthenticatedUser();
      const data = await API.get("MainApi", "/graphinfo", {});
      setGraphData(data?.Items);
      toast.success("Data has been retrived", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (dataFetch) {
      fetchData();
    }
  }, [dataFetch]);
  useEffect(() => {
    if(GraphData){
      const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - days);
   const newData=  GraphData.filter((entry) => {
      const surveyDate = new Date(entry.SurveyDate);
      return surveyDate >= startDate && surveyDate <= currentDate;
    });
    setGraphData(newData);
    }
  }, [days,GraphData]);
  const submitValues = async (values, { resetForm }) => {
    console.log({ values });
    if (Window.SurveyDate !== undefined) {
      values.SurveyDate = Window.SurveyDate;
    }
    const response = await API.post("MainApi", "/graphinfo", {
      body: {
        Email: values.Email,
        FirstName: values.FirstName,
        LastName: values.LastName,
        OverallRating: values.OverallRating.toString(),
        PollutionRating: values.PollutionRating.toString(),
        SafetyRating: values.SafetyRating.toString(),
        SurveyDate: values.SurveyDate.$d.toString(),
      },
    });

    // setNotification("submission was sucessful");
    toast.success("submission was sucessful", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setDataFetch(true);
    setTimeout(() => {
      setNotification(null);
    }, 6000);
    resetForm();
  };

  /*
  //updates the state of the form, tracks the touched fields
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
/*
  {/**





const deleteItem = async(timestamp) => {
  const response = await API.del('MainApi', '/items/object/' + user.username + '/' + timestamp, {})
  
  setNotification("Item has been deleted")
  setTimeout(() => {setNotification("")},6000)
}


*/

  const values = {
    FirstName: "",
    LastName: "",
    Email: null,
    SurveyDate: dayjs(Date()),
    OverallRating: 5,
    SafetyRating: 5,
    PollutionRating: 1,
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="container h-full mx-auto ">
        {/* <button onClick={() => GetGraphData()}>Submit Data</button> */}
        {/*
      <h1>Hello {user.username}</h1>
      <p>{Notification}</p>
      <button onClick={() => getUserItems()}> Get Data</button>
      <button onClick={() => addItem("tehe")}> Add Data</button>
      <p>        <label>
          Enter Time Stamp to Delete:
          <input type="text" id="timestamp" />
        </label>
        <button onClick={() => deleteItem(document.getElementById("timestamp").value)}> Delete Data</button>  
        </p>
      
      <button onClick={signOut}>Sign out</button>
      
      {info.map(SingleInfo => {
        return <p>{JSON.stringify(SingleInfo)}</p> 
      })}

      */}

        <Formik
          initialValues={values}
          onSubmit={submitValues}
          validationSchema={validationSchema}
          render={(props) => <Forms {...props} />}
          GetGraphData={GetGraphData}
        />
        <div className="flex justify-center">
          <Button
            type="button"
            variant="raised"
            color="primary"
            sx={{
              width: "600px",

              marginTop: "10px",
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            onClick={() => GetGraphData()}
          >
            Get Data
          </Button>
        </div>
        <div className="mt-5 ms-5 flex justify-center w-[800px]">
          <div className="">
            <NativeSelect
              defaultValue={days}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
              onChange={(e) => setDays(parseInt(e.target.value))}
            >
              <option value={7}>7 Days</option>
              <option value={30}>30 Days</option>
              <option value={90}>90 days</option>
            </NativeSelect>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-[50px]">
          <Chart GraphData={GraphData} />
        </div>

        <Snackbar
          open={Notification}
          autoHideDuration={6000}
          onClose={() => {
            setNotification(null);
          }}
          message={Notification}
        />
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default withAuthenticator(App);
