import { useState,useEffect,useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Button.css'
const [ COPY , EDIT , DELETE ] = [
  'copy','edit','delete'
];


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

  const openModal = (id, ) => {
    setModal(draft => {
      draft.isShowing = true;
      draft.id = id;
      draft.type = cName;
    })

    if (cName === EDIT) return setValue(draft => { 
      draft.custom = data[id].custom; 
    });
    if (cName === DELETE) return setState(draft => { 
      draft.target = data[id]; 
    });
  };

  const handleCopy = (e) => {
    const id = mainContainer(e).dataset.id;
    const domain = window.location.href;
    const customLink = domain + data[id].custom;

    copyLink( customLink )
  };

  const handleEdit = (e) => openModal( mainContainer(e).dataset.id );
  const handleDelete = (e) => openModal( mainContainer(e).dataset.id );

  const checkEvent = (
    (cName === COPY && handleCopy) || 
    (cName === EDIT && handleEdit) || 
    (cName === DELETE && handleDelete)
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