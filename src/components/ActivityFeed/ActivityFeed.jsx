import React, {useState}  from "react"
import CallListItem from "../CallListItem/CallListItem.jsx"
import {callData} from "../../../lib/call_data.js"
import { Button } from "@mui/material";


export default function ActivityFeed() {
    const[archivedCalls, setArchivedCalls] = useState([])
    const [unarchivedCalls, setUnarchivedCalls] = useState(callData);

    const archiveHandler = (id) =>{
        const archivedCall = unarchivedCalls.find((call) => call.id === id);
        setArchivedCalls((prevArchivedCalls) => [...prevArchivedCalls, archivedCall])
        setUnarchivedCalls((prevUnarchivedCalls) => prevUnarchivedCalls.filter((call) => call.id !== id));
    }

    const unarchiveHandler = (id) => {
        const callToUnarchive = archivedCalls.find((call) => call.id === id);
        setUnarchivedCalls((prevUnarchivedCalls) => [...prevUnarchivedCalls, callToUnarchive]);

        setArchivedCalls((prevArchivedCalls) =>
            prevArchivedCalls.filter((call) => call.id !== id)
        );
    };

    const archiveAllCallsHandler = () => {
        setArchivedCalls((prevArchivedCalls) => [...prevArchivedCalls, ...unarchivedCalls]);
        setUnarchivedCalls([]);
    };

    const unarchiveAllCallsHandler = () => {
        setUnarchivedCalls((prevUnarchivedCalls) => [...prevUnarchivedCalls, ...archivedCalls]);
        setArchivedCalls([]);
    };

  return (
        <div styles={{display:"flex"}}>
            <div>
                <h1 style={{color:"#424242", fontWeight:"500", fontFamily: "'Poppins', sans-serif", display:"flex", textAlign:"center", fontSize:"3rem", justifyContent:"center"}}>Who's Calling?</h1>
                    <div>
                        {unarchivedCalls.length > 0 && (
                            <Button key="#archive-all" variant="outlined" color="error" onClick={archiveAllCallsHandler}>Archive All</Button>
                        )}
                    </div>
                    {unarchivedCalls.map((call) => (
                    <CallListItem key={call.id} call={call} archiveHandler={archiveHandler} showArchiveButton={true} />
                    ))}

            </div>

            <div>
                <h1>Archived Calls</h1>
                    <div styles={{display:"flex", width:"100%", justifyContent:"center"}}>
                        {unarchivedCalls.length >= 0 &&  (
                            <Button color="success" key="#unarchive-all" variant="outlined" onClick={unarchiveAllCallsHandler}>Unarchive All</Button>
                        )}
                    </div>
                    {archivedCalls.map((call) => (
                    <CallListItem key={call.id} call={call} unarchiveHandler={unarchiveHandler} showArchiveButton={false} />
                    ))}


            </div>
        </div>
    );
}

