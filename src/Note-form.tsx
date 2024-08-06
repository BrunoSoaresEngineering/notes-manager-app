import { FormEvent, useRef, useState } from 'react';
import { Form, Stack, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CreatableReactSelect from 'react-select/creatable';

import { NoteData } from './note';
import { Tag } from './tag';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void,
  createTag: (tag: Tag) => void,
  availableTags: Tag[]
}

const NoteForm = ({
  onSubmit,
  createTag,
  availableTags,
  tags = []
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

  function handleSubmit (ev: FormEvent) {
    ev.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                isMulti
                onChange={(tags) => {
                  setSelectedTags(tags.map((tag) => ({ id: tag.value, label: tag.label })))
                }}
                onCreateOption={(label) => {
                  const newTag = {id: uuidv4(), label: label};
                  createTag(newTag);
                  setSelectedTags((prevTags) => [...prevTags, newTag]);
                }}
                value={selectedTags.map((selectedTag) => ({
                  value: selectedTag.id,
                  label: selectedTag.label
                }))}
                options={availableTags.map((tag) => ({
                  value: tag.id,
                  label: tag.label
                }))}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='markdown'>
          <Form.Label>Body</Form.Label>
          <Form.Control required as='textarea' rows={20} ref={markdownRef}/>
        </Form.Group>
        <Stack direction='horizontal' gap={2} className='justify-content-end'>
          <Button type='submit' variant='primary'>Save</Button>
          <Link to='..'>
            <Button type='button' variant='outline-secondary'>Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}

export default NoteForm;
