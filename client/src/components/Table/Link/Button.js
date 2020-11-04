import { useContext } from 'react'
import { Context } from '../../../assets/Context.js'
// import './Button.css'
import axios from 'axios'

const container = (e) => e.target.parentElement.parentElement;

export default function Button (props) {

  const { cName='', i } = props;
  const { state:{ data },setState } = useContext(Context);

  ////

  // ! apply tooltip style
  const handleVisibility = (e) => {
    console.log( e.target )
  };
  ////

  // ! apply copy to clipboard
  const handleCopy = (e) => {
    const id = container(e).dataset.id;
    const customLink = '/' + data[id].custom;
    console.log( customLink )
  };

  const handleDelete = async (e) => {
    const id = container(e).dataset.id;
    
    try {
      const { data:res } = await axios.delete(`/url/${ data[id].id }`);
      console.info( res )

      setState(draft => { 
        delete draft.data[id];
        draft.data = draft.data.filter(Boolean);
      })
    } catch (err) { console.error(err) }
  };

  const checkEvent = (className) => {
    switch (className) {
      case 'show'  : return handleVisibility;
      case 'copy'  : return handleCopy;
      case 'delete': return handleDelete;
      default: break;
    }
  };

  ////

  return (
    <>
      <button 
        className={ `btn ${cName}` }
        onClick={ checkEvent(cName) }
      >{ i }</button>
    </>
  );
}