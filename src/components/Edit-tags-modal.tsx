import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Tag } from "../types/tag"

type EditTagsModalProps = {
  show: boolean,
  availableTags: Tag[],
  handleClose: () => void,
  updateTag: (id: string, label: string) => void,
  deleteTag: (id: string) => void
}

const EditTagsModal = ({
  show,
  availableTags,
  handleClose,
  updateTag,
  deleteTag
}: EditTagsModalProps) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(ev) => updateTag(tag.id, ev.target.value)}
                  />
                </Col>
                <Col xs='auto'>
                  <Button variant='outline-danger' onClick={() => deleteTag(tag.id)}>
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
export default EditTagsModal