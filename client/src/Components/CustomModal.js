import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: " auto",
  height: "auto",
  //   bgcolor: "white",
  border: "none !important",
  //   borderRadius: "50%",
  //   p: 4,
  outline: "none",
};

export default function CustomModal({ open, type }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <img
              src={`gifs/${type}.gif`}
              className="img img-fluid rounded-circle"
              style={{
                border: "none !important",
                backgroundColor: "white",
                borderRadius: "70%",
                boxShadow: "0px 0px 13px 2.5px rgba(0,0,0,0.75)",
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
