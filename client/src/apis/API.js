import axios from 'axios'

// TODO : 4/6 : test API calls
export const getAll = async () => {
  const path = '/all';
  console.log('val:', path)

  try { return await axios.get(path); } 
  catch (err) { throw err; }
};


export const redirectTo = async (path) => {
  console.log('val:', path)
  try {
    const { data } = await axios.get(path);
    if (data === 'false') throw data;
    else return data;
  } catch (err) { throw err; }
};


// LINK to be TESTED 1
export const postUrl = async (url) => {
  const [ path,body ] = ['/url/new',{ url }];
  console.log('val:', path,body)
  
  try {
    const { data } = await axios.post(path,body);
    console.info(data)

    if (data?.error) throw data.error;
    else return data;
  } catch (err) { throw err; }
};


// LINK to be TESTED 2
export const updateCustom = async (id,query) => {
  // query = encodeURIComponent(query);
  const path = `/url/custom/${ id }?custom=${ query }`;
  console.log('val:', id,query,path)
  
  try {
    const { data } = await axios.patch(path);
    console.info(data)

    if (data?.error) throw data.error;
    else return data;
  } catch (err) { throw err; }
};


export const updateCount = async (id,query) => {
  const path = `/url/${ id }?count=${ query }`;
  // console.log('val:', id,query,path)
  
  try { return await axios.patch(path) } 
  catch (err) { throw err; }
};


export const deleteUrl = async (id) => {
  const path = `/url/${ id }`;
  // console.log('val:', id,path)
  
  try { return await axios.delete(path); } 
  catch (err) { throw err; }
}