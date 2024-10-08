import { useNote } from '../components/Note-layout'
import { NoteData } from '../types/note'
import NoteForm from '../components/Note-form'
import { Tag } from '../types/tag'

type EditNoteProps = {
  updateNote: (id: string, note: NoteData) => void
  availableTags: Tag[]
  createTag: (tag: Tag) => void
}

const EditNote = ({ updateNote, availableTags, createTag }: EditNoteProps) => {
  const note = useNote();
  
  return (
    <>
      <h1>Edit Note</h1>
      <NoteForm
        onSubmit={(data) => updateNote(note.id, data)}
        availableTags={availableTags}
        createTag={createTag}
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
      />
    </>
  )
}
export default EditNote