import axios from 'axios'


// TODO : client-side API calls
module.exports = {
  getAll: async () => {
    const path = '/all';
    try {
      console.log('val:', path)
      const { data } = await axios.get(path);
      return data;
    } catch (err) { console.error(err) }
  },

  redirectTo: async (path) => {
    try {
      console.log('val:', path)
      const { data } = await axios.get(path);
      return data;
    } catch (err) { console.error(err) }
  },

  // REVIEW : TEST
  postUrl: async (link) => {
    const [ path,body ] = ['/url/new',{ url:link }];
    try {
      console.log('val:', link,path,body)
      const { data } = await axios.post(path,body);
      return data;
    } catch (err) { console.error(err) }
  },

  // REVIEW : TEST
  updateCustom: async (id,query) => {
    const path = `/url/custom/${ id }?custom=${ query }`;
    try {
      console.log('val:', id,query,path)
      const { data } = await axios.patch(path);
      return data;
    } catch (err) { console.error(err) }
  },

  updateCount: async (id,query) => {
    const path = `/url/${ id }?count=${ query }`;
    try {
      console.log('val:', id,query,path)
      const { data } = await axios.patch(path);
      return data;
    } catch (err) { console.error(err) }
  },

  deleteUrl: async (id) => {
    const path = `/url/${ id }`;
    try {
      console.log('val:', id,path)
      const { data } = await axios.delete(path);
      return data;
    } catch (err) { console.error(err) }
  }
}