import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useAddTicker from "../../hooks/useAddTicker";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import Button from "@mui/material/Button";

export default function AddTickerModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newTicker, setNewTicker] = useState("");
  const [message, setError] = useState("");
  const { addTicker, loading, isError, error } = useAddTicker(newTicker);
  return (
    <>
      <Button
        variant="outlined"
        component="div"
        onClick={handleShow}
        color="primary"
      >
        Add New Ticker
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Ticker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ticker Name</Form.Label>
              <Form.Control
                value={newTicker}
                onChange={(e) => {
                  setError("");
                  setNewTicker(e.target.value);
                }}
                type="text"
                placeholder="ETH"
                autoFocus
              />
            </Form.Group>
            <Typography variant="body1" color="red">
              {message}
            </Typography>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {loading ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<CloudQueueIcon />}
              variant="outlined"
            >
              Pending
            </LoadingButton>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                newTicker ? addTicker() : setError("ticker name required");
              }}
            >
              Add
            </Button>
          )}
        </Modal.Footer>
        {isError ? (
          <Typography textAlign="center" variant="body1" color="red">
            {error.message}
          </Typography>
        ) : null}
      </Modal>
    </>
  );
}
