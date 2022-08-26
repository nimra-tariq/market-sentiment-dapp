import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Typography from "@mui/material/Typography";

function InfoModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Typography variant="body1" color="initial">
            {props.ticker}
          </Typography>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Typography variant="body1" color="initial">
          Up Count : {props._up}
        </Typography>
        <Typography variant="body1" color="initial">
          Down Count : {props._down}
        </Typography>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
          necessitatibus ullam eos eius repellat quam voluptates veritatis
          saepe. Voluptatibus illo illum ducimus architecto distinctio
          consequuntur hic odio harum maxime autem!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;
