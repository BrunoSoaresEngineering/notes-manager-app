import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import NewNote from './New-note';
import { useLocalStorage } from './useLocalStorage';
import { RawNote, NoteData } from './note';
import { Tag } from './tag';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [rawNotes, setRawNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);


  function createNote({tags, ...data}: NoteData) {
    setRawNotes((prevNotes) => {
      return [...prevNotes, {...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) }];
    });
  }

  function createTag(tag: Tag) {
    setTags((previousTags) => [...previousTags, tag]);
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<h1>Home</h1>}/>
        <Route path='/new' element={
          <NewNote
            createNote={createNote}
            createTag={createTag}
            availableTags={tags}
          />
          }/>
        <Route path=':id'>
          <Route index element={<h1>Show</h1>} />
          <Route path='edit' element={<h1>Edit</h1>} />
        </Route>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </Container>
  )
}

export default App
