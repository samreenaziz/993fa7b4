import React, {useState, useEffect}  from "react"
import CallListItem from "../CallListItem/CallListItem.jsx"
import {callData} from "../../../lib/call_data.js"
import { Button } from "@mui/material";


export default function ActivityFeed({callsView, setCallsView}) {
    const[archivedCalls, setArchivedCalls] = useState([])
    const [unarchivedCalls, setUnarchivedCalls] = useState(callData);

    const [isCallsView, setIsCallsView] = useState(true)

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
        setCallsView(false);
    };

    const unarchiveAllCallsHandler = () => {
        setUnarchivedCalls((prevUnarchivedCalls) => [...prevUnarchivedCalls, ...archivedCalls]);
        setArchivedCalls([]);
        setCallsView(true)
    };

    useEffect(() => {
        if (unarchivedCalls.length === 0) {
            setCallsView(false);
        }
        else if (archivedCalls.length === 0){
            setCallsView(true)
        }
    }, [unarchivedCalls, archivedCalls, setCallsView]);

  return (
        <div styles={{display:"flex"}}>
            <div>
                <h1 style={{color:"#424242", fontWeight:"500", fontFamily: "'Poppins', sans-serif", display:"flex", textAlign:"center", fontSize:"3rem", justifyContent:"center"}}>
                    {callsView ? "Who's Calling You?" : "Archived"}
                </h1>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"right", paddingRight:"2rem"}}>
                {callsView && unarchivedCalls.length > 0 && (
                    <Button key="#archive-all" style={{ fontSize: "1.25rem" }} variant="outlined" color="error" onClick={archiveAllCallsHandler}>
                        Archive All
                    </Button>
                )}

                {!callsView && archivedCalls.length > 0 && (
                    <Button key="#unarchive-all" style={{ fontSize: "1.25rem" }} variant="outlined" color="error" onClick={unarchiveAllCallsHandler}>
                        Unarchive All
                    </Button>
                )}


                </div>
                {callsView ? unarchivedCalls.map((call) => (
                    <CallListItem key={call.id} call={call} archiveHandler={archiveHandler} showArchiveButton={true} />
                )) : archivedCalls.map((call) => (
                    <CallListItem key={call.id} call={call} archiveHandler={unarchiveHandler} showArchiveButton={false} />
                ))
                }

                { callsView && unarchivedCalls.length == 0 &&
                (<p style={{color:"#424242", fontWeight:"400", fontFamily: "'Poppins', sans-serif", padding: "0rem 6rem", display:"flex", textAlign:"center", fontSize:"2rem", justifyContent:"center"}}>
                    No call history here! Check your archived messages, or check back later for more updates.
                </p>)}

                { !callsView && archivedCalls.length == 0 &&
                (<p style={{color:"#424242", fontWeight:"400", fontFamily: "'Poppins', sans-serif", padding: "0rem 6rem", display:"flex", textAlign:"center", fontSize:"2rem", justifyContent:"center"}}>
                    No archived calls to see here!
                </p>)}
            </div>
        </div>
    );
}
