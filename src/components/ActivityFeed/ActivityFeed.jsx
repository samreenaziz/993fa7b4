import React, {useState}  from "react"
import CallListItem from "../CallListItem/CallListItem.jsx"
import {callData} from "../../../lib/call_data.js"

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

  return (
        <div styles={{display:"flex"}}>
            <div>
                <h1>Unarchived Calls</h1>
                    {unarchivedCalls.map((call) => (
                    <CallListItem key={call.id} call={call} archiveHandler={archiveHandler} />
                ))}
            </div>

            <div>
                <h1>Archived Calls</h1>
                    {archivedCalls.map((call) => (
                    <CallListItem key={call.id} call={call} unarchiveHandler={unarchiveHandler} />
                 ))}
            </div>
        </div>
    );
}

