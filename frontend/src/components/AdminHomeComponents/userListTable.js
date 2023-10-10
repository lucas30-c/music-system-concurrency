import React from "react";
import axios from "axios";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';

const UserListTable = ({
    users = [],
    handleEdit,
    handleDelete,
    privilegeFilters,
    renderFilterMenu,
    countFilterApplied,
    setPrivilegeFilters,
    USERTYPES
}) => {

    const [privilegeAnchorEl, setPrivilegeAnchorEl] = useState(null);
    const [privilegeFilter, setPrivilegeFilter] = useState(null);
    const [privilegeFilterApplied, setPrivilegeFilterApplied] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [confirmationRowId, setConfirmationRowId] = useState(null);

    const startDeleteConfirmation = (id) => {
        setConfirmationRowId(id);
    };

    const cancelDeleteConfirmation = () => {
        setConfirmationRowId(null);
    };

    const confirmDelete = (id) => {
        handleDelete(id);
        setConfirmationRowId(null);
    };

    const handleClick = (event, id) => {
        setEditingId(id);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setEditingId(null);
        setAnchorEl(null);
    };

    return (
        <div>
            <div className="header-container">
                <h6 className="list-heading">User List</h6>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#ececec' }}>
                                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>User ID</TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Name</TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                                    Role {privilegeFilters.length > 0 && `(${countFilterApplied(privilegeFilters)})`}
                                    {renderFilterMenu("role", setPrivilegeFilter, privilegeFilters, setPrivilegeFilters, privilegeAnchorEl, setPrivilegeAnchorEl, USERTYPES)}
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Email</TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Verification</TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(users) ? users
                                .filter((user) => (
                                    !privilegeFilters.length || privilegeFilters.includes(user.role)
                                ))
                                .map((user, index) => (
                                    <TableRow key={user._id}>
                                        <TableCell>{user._id}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.isVerified ? 'Verified' : 'Not Verified'}</TableCell>
                                        <TableCell>
                                            {confirmationRowId === user._id ? (
                                                <>
                                                    <CheckIcon
                                                        onClick={() => confirmDelete(user._id)}
                                                        style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }}
                                                    />
                                                    <CloseIcon
                                                        onClick={cancelDeleteConfirmation}
                                                        style={{ cursor: 'pointer', color: 'red', marginRight: '10px' }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <DeleteIcon
                                                        onClick={() => startDeleteConfirmation(user._id)}
                                                        style={{ cursor: 'pointer', marginRight: '10px' }}
                                                    />
                                                    <EditIcon
                                                        onClick={(event) => handleClick(event, user._id)}
                                                        style={{ cursor: 'pointer', marginRight: '10px' }}
                                                    />
                                                    <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={editingId === user._id}
                                                        onClose={handleClose}
                                                    >
                                                        {USERTYPES.map((type, idx) => (
                                                            <MenuItem
                                                                key={idx}
                                                                onClick={() => {
                                                                    handleEdit(user._id, type);
                                                                    handleClose();
                                                                }}
                                                            >
                                                                {type}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )) : <TableRow><TableCell colSpan="6"></TableCell></TableRow>  // Provide a fallback
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default UserListTable;
