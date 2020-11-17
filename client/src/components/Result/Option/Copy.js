import { useState,useEffect,useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Copy.css'


export default function Copy () {
  
  const { state,useClipboard } = useContext(Context);
  const { custom } = state.recent;
  const [ text,setText ] = useState( '/' + custom );
  const [ isCopied,copyLink ] = useClipboard(1500);

  useEffect(() => {
    (isCopied) ? setText('COPIED') : setText( '/' + custom )
  }, [ custom,isCopied ])

  // TODO : apply hostname
  const handleCopy = (e) => {
    const customLink = '/' + custom;
    copyLink( customLink )
  };

  return (
    <>
      <button
        id="c-link-btn"
        className="c-link-btn"
        onClick={ handleCopy }
      >{ text }</button>
    </>
  );
}