import { useState,useEffect,useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Button.css'


export default function Button (props) {

  const { cName='' , i='text' } = props;
  const {
    state:{ data } , setState , setValue, 
    setModal , useClipboard , mainContainer 
  } = useContext(Context);
  const [ text,setText ] = useState(i);
  const [ isCopied,copyLink ] = useClipboard(1500);

  ////

  useEffect(() => {
    (isCopied) ? setText('📦') : setText( i )
  }, [ i,isCopied ])

  const openModal = (id) => {
    setModal(draft => {
      draft.isShowing = true;
      draft.id = id;
      draft.type = cName;
    })
  };

  const handleCopy = (e) => {
    const id = mainContainer(e).dataset.id;
    const domain = window.location.href;
    const customLink = domain + data[id].custom;

    copyLink( customLink )
  };

  const handleEdit = (e) => {
    const id = mainContainer(e).dataset.id;
    openModal( id )
    setValue(draft => { draft.custom = data[id].custom; })
  };

  const handleDelete = (e) => {
    const id = mainContainer(e).dataset.id;
    openModal( id )
    setState(draft => { draft.target = data[id]; })
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
        className={ `btns tbl-btn ${cName}` }
        title={ `${cName} link` }
        onClick={ checkEvent }
      >{ text }</button>
    </>
  );
}