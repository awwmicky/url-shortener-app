// import { useRef,useEffect,useCallback } from 'react'
import { useRef,useCallback, useContext } from 'react'
import Context from '../../utils/Context.js';
import useEventListener from '../../utils/useEventListener.js'
// import './Modal.css'


const ESC_KEY = 27;

export default function Modal () {

  const { modal:{ isShowing,url },setModal } = useContext(Context);
  const modalRef = useRef();

  const closeModal = useCallback(() => (
    setModal(draft => { draft.isShowing = false; }
  )), [ setModal ]);

  const handleEscKey = useCallback((e) => {
    if (isShowing && e.which === ESC_KEY) closeModal();
  }, [ isShowing,closeModal ]);

  const handleClickOut = (e) => {
    if (isShowing && modalRef.current === e.target) closeModal();
  };

  const handleExitBtn = (e) => closeModal();

  // useEffect(() => {
  //   document.addEventListener('keyup', handleEscKey)
  //   return () => document.removeEventListener('keyup', handleEscKey)
  // }, [ handleEscKey ])

  useEventListener('keyup',handleEscKey)

  ////

  return isShowing && (
    <div 
      className="modal-scope" 
      ref={ modalRef }
      onClick={ handleClickOut }
    >
      <div className="modal-box">
        <button 
          className="close-btn"
          onClick={ handleExitBtn }
        >×</button>

        <a 
          href={ url }
          target="_blank"
          rel="noopener noreferrer"
        >{ url }</a>
      </div>
    </div>
  );
}