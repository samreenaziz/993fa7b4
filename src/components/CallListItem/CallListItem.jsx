import {useState, React} from 'react'
import {callData} from '../../../lib/call_data.js'
import "../../css/CallListItem.css"
import "../../css/app.css"
import PhoneInTalkSharpIcon from '@mui/icons-material/PhoneInTalkSharp';
import PhoneMissedSharpIcon from '@mui/icons-material/PhoneMissedSharp';
import PermPhoneMsgSharpIcon from '@mui/icons-material/PermPhoneMsgSharp';
import { Button } from "@mui/material";

const formatDate = (timestamp) => {

    const date = new Date(timestamp);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    return date.toLocaleDateString('en-US', options);
};

const formatTime = (timestamp) => {

    const date = new Date(timestamp);
    const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    };
    return date.toLocaleString('en-US', options);
};

const callItemCardStyle = {
    display: "flex",
    flexDirection:"row",
    fontSize: "1rem",
    fontFamily: "'Poppins', sans-serif",
    border: "1px solid #2ac41f",
    borderRadius: "0.50rem",
    gap: "2rem",
    alignItems: "center",
    padding:"0.50rem 3rem",
    margin: "0rem 2rem 1rem 2rem",
    justifyContent: "space-between",
};

const dateStyle = {
    color: "#c8c8c7",
    fontWeight: "600",
    textTransform: "upperCase",
    fontSize: "1.5rem",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
    padding: "1rem 0.50rem",
}

const callItemDetails = {
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontFamily: "'Poppins', sans-serif",
    gap:"0.25rem",
    alignItems:"center",
}


export function CallListItem({call, archiveHandler, unarchiveHandler}) {
    const formattedDate = formatDate(call.created_at);
    const formattedTime = formatTime(call.created_at);

    let callIcon;
    let callDesc;
        switch (call.call_type) {
            case 'answered':
                callIcon = <PhoneInTalkSharpIcon style={{ fontSize: 50, color: "green"}} />;
                callDesc = <span style={{ color: "green"}}>answered call on{" "}</span>
                break;
            case 'missed':
                callIcon = <PhoneMissedSharpIcon style={{ fontSize: 50, color: "red" }} />;
                callDesc = <span style={{ color: "red"}}>tried to call on{" "}</span>
                break;
            case 'voicemail':
                callIcon = <PermPhoneMsgSharpIcon style={{ fontSize: 50, color: "#ffbf00" }} />;
                callDesc = <span style={{ color: "#ffbf00"}}>voicemail left on{" "}</span>
                break;
            default:
                callIcon = null;
                callDesc = null;
            }

            return (
                <div>
                    <div style={dateStyle}>{formattedDate}</div>
                    <div style={callItemCardStyle}>
                        <div style={{ display: "flex", flexDirection: "row", gap: "1.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>{callIcon}</div>
                            <div style={callItemDetails}>
                                <div style={{ color: "#424242", fontWeight: "600", fontSize: "2rem", fontFamily: "'Poppins', sans-serif" }}>
                                    {call.from}
                                </div>
                                <div style={{ color: "#424242", fontSize: "1.25rem", fontWeight: "400", fontFamily: "'Poppins', sans-serif" }}>
                                    {callDesc} {call.via}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", fontSize: "1.5rem" }}>
                            {formattedTime}
                            <Button onClick={() => archiveHandler(call.id)}>Archive</Button>
                            <Button onClick={() => unarchiveHandler(call.id)}>Unarchive</Button>
                        </div>
                    </div>
                </div>
            );
        };

        export default CallListItem;