import { useState,useEffect,useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Button.css'
// import axios from 'axios'


export default function Button (props) {

  const { cName='' , i='text' } = props;
  const { 
    state:{ data } , setState , setModal,
    useClipboard , mainContainer 
  } = useContext(Context);
  const [ text,setText ] = useState(i);
  const [ isCopied,copyLink ] = useClipboard(1500);

  ////

  useEffect(() => {
    (isCopied) ? setText('📦') : setText( i )
  }, [ i,isCopied ])

  // TODO : apply hostname
  const handleCopy = (e) => {
    const id = mainContainer(e).dataset.id;
 
    const customLink = '/' + data[id].custom;
    copyLink( customLink )
    console.log( isCopied,customLink )
  };

  const handleEdit = (e) => {
    const id = mainContainer(e).dataset.id;

    setState(draft => { draft.custom = data[id].custom; })
    setModal(draft => {
      draft.isShowing = true;
      draft.id = id;
      draft.type = cName;
    })
  };

  const handleDelete = (e) => {
    const id = mainContainer(e).dataset.id;
    
    setModal(draft => {
      draft.isShowing = true;
      draft.id = id;
      draft.type = cName;
    })
  };

  const checkEvent = (
    (cName === 'copy' && handleCopy) || 
    (cName === 'edit' && handleEdit) || 
    (cName === 'delete' && handleDelete)
  );

  ////

  return (
    <>
      <button 
        className={ `tbl-btn ${cName}` }
        title={ `${cName} link` }
        onClick={ checkEvent }
      >{ text }</button>
    </>
  );
}