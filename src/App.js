import React, { useState } from 'react';
import { Amplify, API  } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

 

function App({ signOut, user }) {
 const [info, setInfo] = useState([]);
 const [Notification, setNotification] = useState("")

const getUserItems = async () =>  {
    const data = await API.get('MainApi', '/items/' + user.username, {})
    setInfo(data)
    setNotification("Data has been retrived")
    setTimeout(() => {setNotification("")},6000)
}

const addItem = async (itemName) => {
  const response = await API.post('MainApi', '/items', {
      body: {
          timestamp: new Date().getTime(),
          user: user.username,
          itemName
      }
  })
  setNotification("Item has been added")
  setTimeout(() => {setNotification("")},6000)
}

const deleteItem = async(timestamp) => {
  const response = await API.del('MainApi', '/items/object/' + user.username + '/' + timestamp, {})
  
  setNotification("Item has been deleted")
  setTimeout(() => {setNotification("")},6000)
}

  return (
    <div>
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
      
    </div>
  );
}

export default withAuthenticator(App);