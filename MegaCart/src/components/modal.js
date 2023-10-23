import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MediaControlCard from './mediaControlCard';
import '../App.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default function BasicModal({handleClose, open, product}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <MediaControlCard product={product} />
        </Box>
      </Modal>
    </div>
  );
}