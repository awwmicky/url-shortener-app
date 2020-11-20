import { useRef,useState,useEffect,useCallback,useContext } from 'react'
import Context from '../../utils/Context.js'
import useEventListener from '../../utils/useEventListener.js'
import './Modal.scss'
import Delete from './Option/Delete'
import Save from './Option/Save'
const [EDIT , DELETE , ESC_KEY] = [
  'edit','delete',27
];


export default function Modal () {

  const { modal:{ isShowing , type } , setModal , setValue 
  } = useContext(Context);
  const [offSetY, setOffSetY] = useState(0);
  const modalRef = useRef();

  ////

  useEffect(() => {
    if (isShowing) setOffSetY(window.scrollY)
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

  // FIXME : disable scroll
  const handleScroll = useCallback((e) => {
    if ( !isShowing ) return;
    // console.log( offSetY,window )
    window.scrollTo(0, offSetY)
  }, [ isShowing,offSetY ]);

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
        <button onClick={ handleExitBtn }>×</button>

        { (type === EDIT) && <Save /> }
        { (type === DELETE) && <Delete /> }
      </div>
    </div>
  );
}