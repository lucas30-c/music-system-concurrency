import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#5d5fef',
        },
    },
});

const Textbox = ({ onChange }) => {
    return (
        <ThemeProvider theme={theme}>
            <div style={{ margin: '20px' }}>
                <TextField
                    label='Enter Text'
                    margin='normal'
                    onChange={onChange}
                    fullWidth
                    required
                />
            </div>
        </ThemeProvider>
    );
};
export default Textbox;

// const Textbox = ({ onChange }) => {
//     const [text, setText] = useState('');

//     const handleSubmit = async () => {
//         try {
//             // const response = await axios.post('http://localhost:5000/submitText', { text });
//             console.log("Successfully submitted text:", text);
//             // console.log("Backend response:", response.data);
//         } catch (error) {
//             console.error("Error during text submission:", error);
//         }
//     };

//     const theme = createTheme({
//         palette: {
//             primary: {
//                 main: '#5d5fef',
//             },
//         },
//     });

//     return (
//         <ThemeProvider theme={theme}>
//             <div style={{ margin: '20px' }}>
//                 <TextField
//                     label='Enter Text'
//                     margin='normal'
//                     onChange={e => setText(e.target.value)}
//                     fullWidth
//                     required
//                 />
//             </div>
//         </ThemeProvider>
//     );
// };

// export default Textbox;
