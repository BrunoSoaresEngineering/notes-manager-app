import { Tag } from "./tag";

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
};

export type RawNote = {
  id: string
  title: string,
  markdown: string,
  tagIds: string[]
}