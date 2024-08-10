import { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import NewNote from './New-note';
import NoteList from './Note-list';
import { useLocalStorage } from './useLocalStorage';
import { RawNote, NoteData } from './note';
import { Tag } from './tag';

import 'bootstrap/dist/css/bootstrap.min.css';
import NoteLayout from './components/Note-layout';
import Note from './pages/Note';
import EditNote from './pages/Edit-note';

function App() {
  const [rawNotes, setRawNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  const notes = useMemo(() => rawNotes.map((rawNote) => ({
    ...rawNote,
    tags: tags.filter((tag) => rawNote.tagIds.includes(tag.id))
  })), [rawNotes, tags]);


  function createNote({tags, ...data}: NoteData) {
    setRawNotes((prevNotes) => {
      return [...prevNotes, {...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) }];
    });
  }

  function updateNote(id: string, {tags, ...data}: NoteData) {
    setRawNotes((prevNotes) => prevNotes.map((prevNote) => {
      if (prevNote.id !== id) {
        return prevNote;
      }

      return {
        id: id,
        ...data,
        tagIds: tags.map((tag) => tag.id)
      }
    }))
  }

  function createTag(tag: Tag) {
    setTags((previousTags) => [...previousTags, tag]);
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<NoteList availableTags={tags} notes={notes}/>}/>
        <Route path='/new' element={
          <NewNote
            createNote={createNote}
            createTag={createTag}
            availableTags={tags}
          />
          }/>
        <Route path=':id' element={<NoteLayout notes={notes}/>}>
          <Route index element={<Note />} />
          <Route path='edit' element={
            <EditNote
              updateNote={updateNote}
              createTag={createTag}
              availableTags={tags}
            />} 
          />
        </Route>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </Container>
  )
}

export default App
