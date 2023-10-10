import React from 'react';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const MarkAsDoneButton = ({ onClick, isDone }) => (
    <Button variant="contained" color={isDone ? "success" : "primary"} onClick={onClick} style={{ margin: '20px', padding: '10px 30px' }}>
        {isDone ? <CheckIcon /> : "Mark As Done"}
    </Button>
);

export default MarkAsDoneButton;
