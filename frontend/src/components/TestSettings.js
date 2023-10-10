import * as React from "react";
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



function createData(testName, creator, dateOfCreation) {
  return {
    testName,
    creator,
    dateOfCreation,
    content: [
      {
        question: 1,
        answerType: "Canvas",
        file: "song1.mp3",
      },
      {
        question: 2,
        answerType: "Text",
        file: "song2.mp3",
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const handleDeleteTest = (testName) => {
    console.log(`Deleted test with name: ${testName}`);
  };
  
  //communicate with backend
  const handleEditTest = (testName) => {
    console.log(`Edited test with name: ${testName}`);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.testName}
        </TableCell>
        <TableCell >{row.creator}</TableCell>
        <TableCell>
          {new Date(row.dateOfCreation).toLocaleDateString()}
        </TableCell>
        <TableCell>
          <DeleteIcon
            onClick={() => handleDeleteTest(row.testName)}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
          <EditIcon
            onClick={() => handleEditTest(row.testName)}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Test Questions:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Answer Type</TableCell>
                    <TableCell>File</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.content.map((contentRow) => (
                    <TableRow key={contentRow.date}>
                      <TableCell component="th" scope="row">
                        {contentRow.question}
                      </TableCell>
                      <TableCell>{contentRow.answerType}</TableCell>
                      <TableCell>{contentRow.file}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    testName: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    dateOfCreation: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.number.isRequired,
        answerType: PropTypes.string.isRequired,
        dateOfCreation: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData("Melbourne Test", "Solange", "2023-01-15T10:35:20.000Z"),
  createData("LaTrobe Test", "Researcher 1", "2023-01-15T10:35:20.000Z"),
  createData("Sydney Test", "Researcher 2", "2023-01-15T10:35:20.000Z"),
  createData("Monash Test", "Researcher 3", "2023-01-15T10:35:20.000Z"),
  createData("Deakin Test", "Researcher 4", "2023-01-15T10:35:20.000Z"),
];

export default function CollapsibleTable() {
  return (
    <div>
      <div className="header-container">
        <h6 className="list-heading">Test Settings</h6>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#ececec" }}>
                <TableCell />
                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Test Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Created By
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Date Created
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
