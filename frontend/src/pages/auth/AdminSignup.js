// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Snackbar } from "@mui/material";
// import Alert from "@mui/material/Alert";

// const AdminSignup = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const [snackbarState, setSnackbarState] = useState({
//         open: false,
//         text: "",
//         severity: "success",
//     });
//     const navigate = useNavigate();

//     const signupAdmin = async () => {
//         try {
//             if (!username || !password || !email) {
//                 setSnackbarState({
//                     open: true,
//                     text: "All fields are required.",
//                     severity: "warning",
//                 });
//                 return;
//             }

//             const response = await axios.post("http://localhost:5000/admin/signup", {
//                 username,
//                 password,
//                 role: "Admin",
//                 email
//             }, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             });

//             if (response.status === 200) {
//                 setSnackbarState({
//                     open: true,
//                     text: "Admin registered successfully.",
//                     severity: "success",
//                 });
//                 navigate('/admin/dashboard'); // assuming you have a dashboard route for admin
//             }
//         } catch (err) {
//             console.error("Error registering admin: ", err);
//             setSnackbarState({
//                 open: true,
//                 text: "Error registering admin.",
//                 severity: "error",
//             });
//         }
//     };

//     return (
//         <div className="admin-signup">
//             <h1>Admin Sign Up</h1>

//             <label>Username:</label>
//             <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//             />

//             <label>Password:</label>
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />

//             <label>Email:</label>
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />

//             <button onClick={signupAdmin}>Sign Up</button>

//             <Snackbar
//                 open={snackbarState.open}
//                 autoHideDuration={6000}
//                 onClose={() => setSnackbarState({ ...snackbarState, open: false })}
//             >
//                 <Alert
//                     onClose={() => setSnackbarState({ ...snackbarState, open: false })}
//                     severity={snackbarState.severity}
//                     sx={{ width: "100%" }}
//                 >
//                     {snackbarState.text}
//                 </Alert>
//             </Snackbar>
//         </div>
//     );
// };

// export default AdminSignup;
