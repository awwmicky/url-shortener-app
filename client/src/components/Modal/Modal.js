import { useRef,useEffect,useCallback,useContext } from 'react'
import Context from '../../utils/Context.js'
import './Modal.scss'
import Delete from './Option/Delete'
import Save from './Option/Save'
const [EDIT , DELETE , ESC_KEY] = [
  'edit','delete',27
];


export default function Modal () {

  const { 
    modal:{ isShowing , type }, 
    setModal , setValue , useEventListener
  } = useContext(Context);
  const modalRef = useRef();

  ////

  useEffect(() => {
    if ( isShowing ) {
      const X = window.scrollX;
      const Y = window.scrollY;
      window.onscroll = () => window.scrollTo(X,Y);
    } else { window.onscroll = null; }
  }, [ isShowing ])

  const closeModal = useCallback(() => {
    setValue(draft => { draft.type = "" })
    setModal(draft => { draft.isShowing = false; })
  }, [ setValue,setModal ]);

  const handleEscKey = useCallback((e) => {
    if (isShowing && e.which === ESC_KEY) closeModal();
  }, [ isShowing,closeModal ]);

  const handleClickOut = (e) => {
    if (isShowing && modalRef.current === e.target) closeModal();
  };

  const handleExitBtn = (e) => closeModal();

  useEventListener( 'keyup',handleEscKey )

  ////

  return isShowing && (
    <div 
      className="modal-scope" 
      ref={ modalRef }
      onClick={ handleClickOut }
    >
      <div className="modal-box">
        <button onClick={ handleExitBtn }>×</button>

        { (type === EDIT) && <Save /> }
        { (type === DELETE) && <Delete /> }
      </div>
    </div>
  );
}