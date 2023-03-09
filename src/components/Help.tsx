import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";

const FAQs = [
  { question: "How do I save?", answer: "Easy Task automatically saves to your browser, without you having to do anything!" },
  {
    question: "Can I access my tasks on another device?",
    answer:
      "As this is currently only a frontend project, this is not yet supported. This feature will hopefully be available in the future.",
  },
  {
    question: "Why have all my tasks disappeared?",
    answer:
      "As everything is stored locally in your browser, if you clear your cookies or try to access them in another browser they will disappear. There is currently no work-around for this, but it will be addressed in the future.",
  },

];

const instructions = [
  { icon: "add", text: "Click the 'add' button to add a task or preset" },
  {
    icon: "arrow_selector_tool",
    text: "Double click the name of a task or preset to edit",
  },
  { icon: "library_add", text: "Introduce subtasks for a task or preset" },
  {
    icon: "delete_forever",
    text: "Delete a task or preset",
  },
  {
    icon: "temp_preferences_custom",
    text: "Click this button to generate a random task as inspiration!",
  },
  {
    icon: "check_box",
    text: "Check off items as you go and see your progress!",
  },
];

export default function Help() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span className="material-symbols-outlined" onClick={handleShow}>
        help
      </span>

      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title as="h4">Help</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                {instructions.map((item) => {
                  return (
                    <ListGroup.Item className="instruction">
                      <span className="material-symbols-outlined">
                        {item.icon}
                      </span>
                      {item.text}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header as="h5">FAQs</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {FAQs.map((item) => {
                  return (
                    <ListGroup.Item className="FAQ">
                      <strong>Q:</strong>
                      {item.question}
                      <strong>A:</strong>
                      {item.answer}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
