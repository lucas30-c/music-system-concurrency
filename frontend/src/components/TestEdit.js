import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../TestEdit.css";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#003F7D",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});




export default function FullWidthGrid() {
  let tests = [
    {
      question: 1,
      answerType: "Text",
      audioFile: "song1.mp3",
  
    },
    {
      question: 2,
      answerType: "Text & Canvas",
      audioFile: "song2.mp3",
  
    },
    {
      question: 3,
      answerType: "Text",
      audioFile: "song3.mp3",
  
    }
  ];
  const [answer, setAnswer] = React.useState("Text");

  const [file, setFile] = React.useState(null);
  const [progress, setProgress] = React.useState({started: false, percentage:0});
  const [message, setMessage] = React.useState(null);

  const [testState, setTestState] = React.useState(tests);

  let selectedAnswer = null;

const handleAddQuestion = () => {
  if(!file){
    setMessage("no file selected")
    return;
  }
  console.log(answer)
  const fd = new FormData();
  fd.append('file',file)
  setMessage("Uploading...")
  setProgress(prevState => {
    return {...prevState, started: true}
  })
  axios.post('http://httpbin.org/post', fd, {
    onUploadProgress: (progressEvent) => {
      setProgress(prevState => {
        return {...prevState, percentage: progressEvent.progress*100}
      })
      console.log(progressEvent.progress*100)
    }, headers: {
      "Custom-Header":"value",
    }
  })
  .then(res => {
    setMessage("Upload Successful")
    console.log(res.data)
    let newQuestion = {
      question: testState.length + 1,
      answerType: answer,
      audioFile: file.name,
    }
    testState.push(newQuestion)
    setTestState(testState)
    console.log(testState)
  } )
  .catch(error => {
    setMessage("Upload Failed")
    console.error(error)});
}

  const handleChange = (event) => {
    setAnswer(event.target.value);
    selectedAnswer = event.target.value;
  };
  const handleDeleteTest = (index) => {
    let updatedTests = tests.filter(test => test.question - 1 !== index)
    updatedTests.forEach((test, index) => {
      test.question = index + 1;
    });
    tests = updatedTests
    setTestState(updatedTests)
    console.log(`Deleted question ${index + 1}`);
  };

  
  
  //communicate with backend
  const handleEditTest = (index) => {
    console.log(`Edited question ${index + 1}`);
  };
  return (
    <React.Fragment>
      <div className="header-container">
        <h6 className="list-heading" style={{margin: "auto auto 10px auto"}}>Test Settings</h6>
      </div>
      <Box sx={{ flexGrow: 1, width: "75vh", margin: 'auto', backgroundColor: '#ececec', borderRadius: '1%' }}>
        <Grid container spacing={2}>
        <Grid item xs={12}style={{ marginTop:"0", paddingTop: "0" }}>
            <Item>Create Question</Item>
          </Grid>
          <Grid item xs={4} style={{ justifyItems: "center", display: "grid", margin:"auto" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              style={{ alignSelf: "end", backgroundColor: "#003F7D" }}
              //onClick={handleUpload}
            >
              Upload file
              <VisuallyHiddenInput onChange= {(e)=>{setFile(e.target.files[0]); setMessage(e.target.files[0].name);}} type="file" accept="audio/mpeg"/>
            </Button>
            {progress.started && <progress max="100" value={progress.percentage}></progress>}
            {message && <span>{message}</span>}
          </Grid>
          <Grid item xs={4} style={{ justifyItems: "center", display: "grid", margin:"auto" }}>
            <FormControl sx={{ m: 1, minWidth: 138 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Answer Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                defaultValue={'Text'}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                autoWidth
                label="Answer Type"
              >
                <MenuItem value={'Text'}>Text</MenuItem>
                <MenuItem value={'Text & Canvas'}>Text & Canvas</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} style={{ justifyItems: "center", display: "grid", margin:"auto" }}>
          <Button variant="contained" onClick={handleAddQuestion}style={{ backgroundColor: "#003F7D" }}>Add Question</Button>
          </Grid>
          <Grid item xs={12}>
            <Item>Test Questions</Item>
          </Grid>
          <Grid item xs={2} style={{ justifyItems: "center", display: "grid" }}>
            Question
          </Grid>
          <Grid item xs={3} style={{ justifyItems: "center", display: "grid" }}>
            Answer Type
          </Grid>
          <Grid item xs={5} style={{ justifyItems: "center", display: "grid" }}>
            Audio File
          </Grid>
          <Grid item xs={2} style={{ justifyItems: "center", display: "grid" }}>
            Action
          </Grid>
          {testState.map((test, index) => (
            <React.Fragment key={test.question}>
          <Grid item xs={2} style={{ justifyItems: "center", display: "grid" }}>
            {test.question}
          </Grid>
          <Grid item xs={3} style={{ justifyItems: "center", display: "grid" }}>
            {test.answerType}
          </Grid>
          <Grid item xs={5} style={{ justifyItems: "center", display: "grid" }}>
            {test.audioFile}
          </Grid>
          <Grid item xs={2} style={{ justifyItems: "center", display: "grid" }}>
          <div style={{ justifyItems: "center", display: "inline" }}>
          <DeleteIcon
            onClick={() => handleDeleteTest(test.question - 1)}
            style={{ cursor: "pointer", margin: "auto" }}
          />
          </div>
          </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}
