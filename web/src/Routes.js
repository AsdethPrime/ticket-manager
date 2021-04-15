// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/ticket" page={TicketPage} name="ticket" prerender/>
      <Route path="/user" page={UserPage} name="user" prerender />
      <Route path="/engineer" page={EngineerPage} name="engineer" prerender />
      <Route path="/" page={HomePage} name="home"  prerender/>
      <Route notfound page={NotFoundPage} prerender />
    </Router>
  )
}

export default Routes
