// DownloadCSV.js
import React from 'react';
import { Button } from '@mui/material';
//import index.css
import '../index.css';

const DownloadCSV = ({ selected, results }) => {

    const downloadSelectedCSV = () => {
        const header = "ID,Name,Age,Gender,Ethnicity\n";
        let csvData = header;

        selected.forEach((index) => {
            const result = results[index];

            const id = result._id || "";
            const name = result.name || "";
            const age = result.age || "";
            const gender = result.gender || "";
            const ethnicity = result.ethnicity || "";

            const row = `${id},${name},${age},${gender},${ethnicity}\n`;
            csvData += row;
        });

        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'selected_answers.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            style={{ fontWeight: 'bold' }}
            disabled={selected.length === 0}
            onClick={downloadSelectedCSV}
            size='large'
            className='custom-button'
        >
            Download ({selected.length})
        </Button>
    );
};

export default DownloadCSV;
