import NoteForm from '../Note-form.tsx';
import { NoteData } from '../types/note.ts';
import { Tag } from '../types/tag.ts';

type NewNoteProps = {
  createNote: (note: NoteData) => void,
  createTag: (tag: Tag) => void,
  availableTags: Tag[]
};

const NewNote = ({createNote, createTag, availableTags}: NewNoteProps) => {
  return (
    <>
      <h1>New Note</h1>
      <NoteForm
        onSubmit={createNote}
        createTag={createTag}
        availableTags={availableTags}
      />
    </>
  )
}
export default NewNote;
