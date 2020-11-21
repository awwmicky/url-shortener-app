import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Anchor.css'
// import axios from 'axios'


export default function Anchor (props) {

  const { url, text, cName='' } = props;
  const { state:{ data } , setState, mainContainer, API
  } = useContext(Context);
  const title = cName === "domain" 
  ? new URL(url).hostname : "go to link";

  ////

  const handleCount = async (e) => {
    const id = mainContainer(e).dataset.id;
    if ( data[id].checked ) return;
    const { id:dId , count:query } = data[id];

    try {
      await API.updateCount( dId,query )
      
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