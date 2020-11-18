import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Anchor.css'
import axios from 'axios'


export default function Anchor (props) {

  const { url, text, cName='', hide='' } = props;
  const { state:{ data } , setState , mainContainer 
  } = useContext(Context);

  ////

  // REVIEW : convert API
  const handleCount = async (e) => {
    const id = mainContainer(e).dataset.id;
    if ( data[id].checked ) return;
    const url = `/url/count/${ data[id].id }?count=${ data[id].count }`;

    try {
      await axios.patch(url)

      setState(draft => { 
        draft.data[id].count += 1;
        draft.data[id].checked = !draft.data[id].checked;
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
        title="go to link"
        hidden={ hide ? true : false }
        onClick={ handleCount }
      >{ text }</a>
    </>
  );
}