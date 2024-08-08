import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { useNote } from '../components/Note-layout';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Note = () => {
  const note = useNote();

  return (
    <>
      <Row className='mb-4 align-items-center'>
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack direction='horizontal' className='flex-wrap' gap={1}>
              {note.tags.map((tag) => (
                <Badge key={tag.id} className='text-truncate'>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs='auto'>
          <Stack direction='horizontal' gap={2}>
            <Link to={`/${note.id}/edit`} >
              <Button>Edit</Button>
            </Link>
            <Button variant='outline-danger'>Delete</Button>
            <Link to='/'>
              <Button variant='outline-secondary'>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  )
}
export default Note;
