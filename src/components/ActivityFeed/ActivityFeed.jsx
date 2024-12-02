import React, {useState, useEffect}  from "react"
import CallListItem from "../CallListItem/CallListItem.jsx"
// import {callData} from "../../../lib/call_data.js"
import { Button } from "@mui/material";


export default function ActivityFeed({callsView, setCallsView}) {
    const[archivedCalls, setArchivedCalls] = useState([])
    const [unarchivedCalls, setUnarchivedCalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isCallsView, setIsCallsView] = useState(true)

    const archiveHandler = async (id) =>{
        const archivedCall = unarchivedCalls.find((call) => call.id === id);

        try {
            await fetch(`https://aircall-api.onrender.com/activities/${id}` , {
                method:"PATCH",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ is_archived: true})
            });

            setArchivedCalls((prevArchivedCalls) => [...prevArchivedCalls, archivedCall])
            setUnarchivedCalls((prevUnarchivedCalls) => prevUnarchivedCalls.filter((call) => call.id !== id));
         } catch (error) {
            console.error(error)
        }
    };

    const unarchiveHandler = async (id) => {
        const callToUnarchive = archivedCalls.find((call) => call.id === id);

        try {
            await fetch(`https://aircall-api.onrender.com/activities/${id}` , {
                method:"PATCH",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ is_archived: false})
            });

            setUnarchivedCalls((prevUnarchivedCalls) => [...prevUnarchivedCalls, callToUnarchive]);
            setArchivedCalls((prevArchivedCalls) => prevArchivedCalls.filter((call) => call.id !== id));
        } catch (error) {
            console.error(error)
        }
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

    useEffect (() => {
        const fetchCallData = async () => {
            try {
                const response = await fetch("https://aircall-api.onrender.com/activities")
                const data = await response.json();
                setUnarchivedCalls(data);
            }
            catch (error){
                setError(error.message)
            }
            finally {
                setLoading(false)
            }
        };

        fetchCallData();
    },[])

    useEffect(() => {
        if (unarchivedCalls.length === 0) {
            setCallsView(false);
        }
        else if (archivedCalls.length === 0){
            setCallsView(true)
        }
    }, [unarchivedCalls, archivedCalls, setCallsView]);

    if (loading) {
        return <p style={{color:"#424242", fontWeight:"500", fontFamily: "'Poppins', sans-serif", display:"flex", textAlign:"center", fontSize:"2rem", justifyContent:"center"}}>We are loading your call history, hang tight!</p>;
    }

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
                <div style={{maxHeight: "80rem", overflowY: "auto", width: "100%", padding: "1rem"}}>
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
        </div>
    );
}
