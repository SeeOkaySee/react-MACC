import { makeStyles } from '@material-ui/core'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'

export default function InfoTable() {
  const [users, setUser] = useState([])

  const useStyles = makeStyles((theme) => ({
    display: {
      display: "flex",
      height: "200",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    },
  }));

  useEffect(
    () =>
      onSnapshot(collection(db, "Sensor Data"), (snapshot) =>
        setUser(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const classes = useStyles();

  return (
    <div className={classes.display}>
      {users.map((user) => (
        <div>
          Oxygen:{user.SpO2} TLC:{user.TLC} Temperature:{user.Temp} 
        </div>
      ))}
    </div>
  )
}

