import * as signalR from "@microsoft/signalr";

let connection; export const startConnection = (onSessionsUpdate) => {
     connection = new signalR.HubConnectionBuilder() 
      .withUrl("http://localhost:5176/sessionsHub") // match backend URL
      .withAutomaticReconnect() 
      .build(); 
      
      // Receive full sessions array 
      connection.on("ReceiveSessionsUpdate", onSessionsUpdate); 
      
      connection.start() 
        .then(() => console.log("SignalR connected"))
        .catch(err => console.error("SignalR connection error:", err)); 
    }; 
    
    export const stopConnection = () => {
         if (connection) connection.stop(); 
        };