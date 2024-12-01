import React, {useState} from 'react'
import MockProfilePic from "../../assets/images/profile_pic.jpg"

export default function CallNav({setCallsView, callsView}) {

    const [callsHovered, setCallsHovered] = useState(false);
    const [archivedHovered, setArchivedHovered] = useState(false);

    const [callsActive, setCallsActive] = useState(true);
    const [archivedActive, setArchivedActive] = useState(false);

    const navStyle = {
        display: "flex",
        flexDirection:"row",
        fontSize: "2rem",
        fontFamily: "'Poppins', sans-serif",
        gap: "1rem",
        alignItems: "center",
        padding:"1rem",
        justifyContent: "space-around",
        backgroundOpacity: "80%",
        color:"rgb(66, 66, 66)",
        listStyle:"none",
    };

    const callItemStyle = {
        fontSize: "2rem",
        fontFamily: "'Poppins', sans-serif",
        alignItems: "center",
        padding:"1rem",
        justifyContent: "space-around",
        backgroundOpacity: "80%",
        color:"rgb(66, 66, 66)",
        listStyle:"none",
        borderBottom: callsHovered || callsActive ? "0.35rem solid purple" : "transparent",
        cursor: "pointer",

    };

    const archiveItemStyle = {
        fontSize: "2rem",
        fontFamily: "'Poppins', sans-serif",
        alignItems: "center",
        padding:"1rem",
        justifyContent: "space-around",
        backgroundOpacity: "80%",
        color:"rgb(66, 66, 66)",
        listStyle:"none",
        borderBottom: archivedHovered || archivedActive ? "0.35rem solid purple" : "transparent",
        cursor: "pointer",

    };

    const profilePicDiv = {
        height: "7rem",
        width:"7rem",
        backgroundImage: `url(${MockProfilePic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "50%",

    }

  return (
    <div style={{display:"flex", flexDirection:"row", gap:"3rem", alignItems:"center"}}>
        <ul style={navStyle}>
            <li style={callItemStyle}
                onMouseEnter={() => setCallsHovered(true)}
                onMouseLeave={() => setCallsHovered(false)}
                onClick={() => {setCallsActive(true); setArchivedActive(false); setCallsView(true)}}
            >
                Calls
            </li>
            <li style={archiveItemStyle}
                onMouseEnter={() => setArchivedHovered(true)}
                onMouseLeave={() => setArchivedHovered(false)}
                onClick={() => {setArchivedActive(true); setCallsActive(false); setCallsView(false)}}

            >
                Archived
            </li>
        </ul>
        <div style={{display:"column", flexDirection:"row", justifyItems:"center"}}>
            <div style={profilePicDiv}></div>
            <p style={{fontSize:"1.5rem", color:"rgb(66, 66, 66)", fontFamily: "'Poppins', sans-serif", marginTop:"0.50rem"}}>Account</p>
        </div>
    </div>
  )
}




