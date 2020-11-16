import { useRef,useState,useEffect,useCallback,useContext } from 'react'
import Context from '../../utils/Context.js';
import useEventListener from '../../utils/useEventListener.js'
import './Modal.scss'


const ESC_KEY = 27;

export default function Modal () {

  const { modal:{ isShowing,url },setModal } = useContext(Context);
  const [offSet, setOffSet] = useState(0);
  const modalRef = useRef();

  ////

  useEffect(() => {
    if (isShowing) setOffSet(window.scrollY)
  }, [ isShowing ])

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

  // ! FIX disable scroll
  const handleScroll = useCallback((e) => {
    if ( !isShowing ) return;
    console.log( offSet,window )
    window.scrollTo(0, offSet)
  }, [ isShowing,offSet ]);

  useEventListener('keyup',handleEscKey)
  useEventListener('scroll',handleScroll)

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