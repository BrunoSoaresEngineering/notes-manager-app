# Note Managing App

This is an intermediate-level personal portfolio project that showcases a Note Managing App built 
using React, TypeScript, and Bootstrap.
The app allows users to create, edit, delete, and manage notes with support for Markdown in the
note body. Notes can be classified using tags, and all data is stored in the browser's local storage
for persistence.

## Features

- **Note Creation**: Easily create new notes with a title, body (supporting Markdown), and
associated tags.
- **Note Editing**: Edit existing notes, including the ability to update the title, body, and tags.
- **Note Deletion**: Remove notes that are no longer needed.
- **Tag Management**: Create, edit, and delete tags for better note classification.
- **Markdown Support**: Write notes using Markdown syntax for better formatting and readability.
- **Local Storage Persistence**: All notes and tags are saved in the browser's local storage,
ensuring data persists across sessions.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: To ensure type safety and improve code quality.
- **Bootstrap**: For responsive and modern UI design.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/BrunoSoaresEngineering/notes-manager-app
    cd note-managing-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and go to `http://localhost:5173` to use the app.

## Usage

- **Create a Note**: Click on the "Create" button, fill in the title, body, and tags, then save.
- **Edit a Note**: Click on a note and then "Edit" button to edit its content or tags.
- **Delete a Note**: Use the delete button associated with each note to remove it.
- **Manage Tags**: Access the tag management modal to edit, or delete tags. To add new tags, just
type a new tag on Create Note page.


![Note Management App Screenshot](<app-screenshot.png>)