import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/base';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { getToken } from '../utils/auth';
import TopNavLayout from './pageLayout';

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/home');
  };

  if (!token) {
    return (
      <TopNavLayout>
          <Dialog open onClose={handleClose}>
            <DialogTitle>{"Error"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
          You are not logged in, please log in first.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
      </TopNavLayout>
    );
  }

  return children;
};

export default ProtectedRoute;