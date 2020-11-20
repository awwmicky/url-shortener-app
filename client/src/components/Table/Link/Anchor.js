import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Anchor.css'
import axios from 'axios'

// API:{ updateCount }
export default function Anchor (props) {

  const { url, text, cName='' } = props;
  const { state:{ data } , setState , mainContainer
  } = useContext(Context);
  const title = cName === "domain" 
  ? new URL(url).hostname : "go to link";

  ////

  // REVIEW : TEST convert API
  const handleCount = async (e) => {
    const id = mainContainer(e).dataset.id;
    if ( data[id].checked ) return;
    const url = `/url/${ data[id].id }?count=${ data[id].count }`;
    // const [ dId,query ] = [data[id].id,data[id].count];

    try {
      // await updateCount( dId,query )
      await axios.patch(url)
      
      setState(draft => { 
        draft.data[id].count += 1;
        draft.data[id].checked = true;
      })
    } catch (err) { console.error(err) }
  };

  ////

  return (
    <>
      <a
        className={ `tbl-link ${cName}` }
        href={ url }
        target="_blank"
        rel="noopener noreferrer"
        title={ title }
        onClick={ handleCount }
      >{ text }</a>
    </>
  );
}