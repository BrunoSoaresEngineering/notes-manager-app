import { useMemo, useState } from 'react';
import { Row, Col, Stack, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';

import { Tag } from '../types/tag';
import { SimplifiedNote } from '../types/note';
import NoteCard from '../components/note-card/Note-card';
import EditTagsModal from '../components/Edit-tags-modal';

type NoteListProps = {
  availableTags: Tag[],
  notes: SimplifiedNote[],
  updateTag: (id: string, label: string) => void,
  deleteTag: (id: string) => void
}

const NoteList = ({
  availableTags,
  notes,
  updateTag,
  deleteTag
}: NoteListProps) => {
  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const titleIsMatching = (title === '' || note.title.toLowerCase().includes(title.toLowerCase()));
      const tagsAreIncluded = selectedTags.every((selectedTag) => {
        return note.tags.some((noteTag) => selectedTag.id === noteTag.id);
      });
      const tagsAreMatching = (tagsAreIncluded || selectedTags.length === 0);

      return titleIsMatching && tagsAreMatching;
    });
  }, [title, selectedTags, notes]);
  
  return (
    <>
      <Row>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs='auto'>
          <Stack direction='horizontal' gap={2}>
            <Link to={'/new'}>
              <Button variant='primary'>Create</Button>
            </Link>
            <Button variant='outline-secondary' onClick={() => setEditTagsModalIsOpen(true)}>
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id
                }))}
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id
                }))
                }
                onChange={(newTags) => setSelectedTags(newTags.map(newTag => ({
                  id: newTag.value,
                  label: newTag.label
                })))}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
        {filteredNotes.map((filteredNote) => (
          <Col key={filteredNote.id}>
            <NoteCard title={filteredNote.title} tags={filteredNote.tags} id={filteredNote.id}/>
          </Col>
        ))}
      </Row>
      <EditTagsModal
        show={editTagsModalIsOpen}
        availableTags={availableTags}
        handleClose={() => setEditTagsModalIsOpen(false)}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </>
  )
}
export default NoteList;
