import Dexie from 'dexie'

const db = new Dexie('ticketManagerDB')
db.version(1).stores({
  users: 'id++, name',
  engineer: 'id++, name',
  ticket: 'id++, engineer, user'
})


export default db