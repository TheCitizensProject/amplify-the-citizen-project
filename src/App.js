import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from 'aws-amplify';
import {
  Button,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { DataStore } from '@aws-amplify/datastore';
import { Note } from './models';
import  NavBar  from './ui-components/NavBar';


const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    // const apiData = await API.graphql({ query: listNotes });
    // const notesFromAPI = apiData.data.listNotes.items;
    // await Promise.all(
    //   notesFromAPI.map(async (note) => {
    //     if (note.image) {
    //       const url = await Storage.get(note.name);
    //       note.image = url;
    //     }
    //     return note;
    //   })
    // );
    // setNotes(notesFromAPI);
    const notes = await DataStore.query(Note);
    console.log(notes);
  }

  return (
    <View className="App">
      <NavBar />
      <Heading level={1}>The Citizen Advocates</Heading>
      <Button onClick={signOut}>Sign Out (test123 )</Button>
    </View>
  );
};

export default withAuthenticator(App);