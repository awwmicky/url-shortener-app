import { useState,useEffect,useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Button.css'
import axios from 'axios'


export default function Button (props) {

  const { cName='', i='text' } = props;
  const { 
    state:{ data } , setState,
    useClipboard , container 
  } = useContext(Context);
  const [ text,setText ] = useState(i);
  const [ isCopied,copyLink ] = useClipboard(1500);

  ////

  useEffect(() => {
    if (isCopied) setText('📦')
    else setText( i )
  }, [ i,isCopied ])

  // ! apply tooltip style
  const handleVisibility = (e) => {
    console.log( e.target )
  };

  // const handleHidden = (e) => { };

  const handleCopy = (e) => {
    const id = container(e).dataset.id;
    const customLink = '/' + data[id].custom;
    copyLink( customLink )
    console.log( isCopied,customLink )
  };

  const handleDelete = async (e) => {
    const id = container(e).dataset.id;
    const url = `/url/${ data[id].id }`;
    
    try {
      const { data:res } = await axios.delete(url);
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

  const checkTitle = (className) => {
    switch (className) {
      case 'show'  : return 'show link';
      case 'copy'  : return 'copy link';
      case 'delete': return 'delete link';
      default: break;
    }
  };

  ////

  return (
    <>
      <button 
        className={ `btn ${cName}` }
        title={ checkTitle(cName) }
        onClick={ checkEvent(cName) }
      >{ text }</button>
    </>
  );
}