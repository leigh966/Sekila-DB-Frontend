- [Getting Started](#getting-started)
    - [`npm start`](#npm-start)
- [Project Structure](#project-structure)

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

<br/>

# Project Structure

    src
    ┣ Dropdowns:  Dropdown boxes
    ┃   ┣ ActorFilmDropdown.js: Used to switch between Actor and Film seach pages
    ┃   ┣ LanguageDropdown.js: Fetch languages from server and present them as options
    ┃   ┗ RatingDropdown.js
    ┣ pages
    ┃   ┣ Add: Add record pages, derived from children of RecordPage
    ┃   ┃   ┣ AddActor.js: Page to add an Actor
    ┃   ┃   ┗ AddFilm.js: Page to add a Film
    ┃   ┣ All: All Record pages, uses unfiltered lists
    ┃   ┃   ┣ AllActors.js: Displays all Actors
    ┃   ┃   ┗ AllFilms.js: Displays all Films
    ┃   ┣ RecordPage: Pages For Individual Records
    ┃   ┃   ┣ Actor.js: Displays info for an actor with given ID
    ┃   ┃   ┣ Film.js: Displays info for a Film with given ID
    ┃   ┃   ┗ RecordPage.js: Parent class for FilmPage(Film.js) and ActorPage(Actor.js)
    ┃   ┣ Search: SearchBar + ActorFilmDropdown(/src/Dropdowns/ActorFilmDropdown) + List
    ┃   ┃   ┣ SearchActor.js: Display Actors queried by inputtedname
    ┃   ┃   ┣ SearchFilm.js: Display Films queried by inputted title
    ┃   ┃   ┗ SearchPage.js: Parent to SearchActor and SearchFilm
    ┃   ┣ Home.js: Welcome screen - incomplete - low priority
    ┃   ┣ Layout.js: Top bar - displays on every page
    ┃   ┗ NoPage.js
    ┣ TableList: Lists filterable by id, query and related id
    ┃   ┣ ActorList.js: List of actors, related id = film_id
    ┃   ┣ FilmList.js: List of Films, related id = actor_id
    ┃   ┗ TableList.js: Parent to ActorList and FilmList
    ┣ API_config.js: ip and port of the Springboot server, call getRoot() to get [ip]:[port]
    ┣ DescriptionEditable.js: Child of EditableField specific to Film description
    ┣ EditableField.js: A field with a button to toggle edit mode
    ┣ FilmContainer.js: Container for film info (used in /src/pages/RecordPage/Film.js)
    ┣ index.css: Stylesheet
    ┣ index.js: Routs user to the page associated with the current url
    ┗ SearchBar.js: Input textbox with search button
