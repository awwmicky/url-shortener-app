import axios from 'axios'


// TODO : client-side API calls
module.exports = {
  getAll: async () => {
    const path = '/all';
    try {
      console.log('val:',path)
      const { data } = await axios.get(path);
      return data;
    } catch (err) { console.error(err) }
  },

  redirectTo: async (path) => {
    try {
      console.log('val:',path)
      const { data } = await axios.get();
      return data;
      
    } catch (err) { console.error(err) }
  },
  
  postUrl: async (url,body) => {
    try {
      console.log('val:',url,body)
      const { data } = await axios.post();
      return data;
    
    } catch (err) { console.error(err) }
  },
  
  updateCustom: async (id,query) => {
    try {
      console.log('val:',id,query)
      const { data } = await axios.patch();
      return data;
    } catch (err) { console.error(err) }
  },
  
  updateCount: async (id,query) => {
    try {
      console.log('val:',id,query)
      const { data } = await axios.patch();
      return data;
    } catch (err) { console.error(err) }
  },
  
  deleteUrl: async (id) => {
    try {
      console.log('val:',id)
      const { data } = await axios.delete();
      return data;
    
    } catch (err) { console.error(err) }
  }
}