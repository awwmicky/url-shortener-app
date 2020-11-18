import axios from 'axios'


// TODO : client-side API calls
module.exports = {
  getAll: async () => {
    try {
      console.log('val:','ALL')
    } catch (err) { console.error(err) }
  },

  getOne: async (path) => {
    try {
      console.log('val:',path)
    } catch (err) { console.error(err) }
  },
  
  postUrl: async (url,body) => {
    try {
      console.log('val:',url,body)
    } catch (err) { console.error(err) }
  },
  
  updateCustom: async (id,query) => {
    try {
      console.log('val:',id,query)
    } catch (err) { console.error(err) }
  },
  
  updateCount: async (id,query) => {
    try {
      console.log('val:',id,query)
    } catch (err) { console.error(err) }
  },
  
  deleteOne: async (id) => {
    try {
      console.log('val:',id)
    } catch (err) { console.error(err) }
  }
}