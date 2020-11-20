import { useState,useEffect,useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Copy.css'


export default function Copy () {
  
  const { state:{result:{ custom }} , useClipboard 
  } = useContext(Context);
  const [ text,setText ] = useState( '/' + custom );
  const [ isCopied,copyLink ] = useClipboard(1500);

  useEffect(() => {
    (isCopied) ? setText('COPIED') : setText( '/' + custom )
  }, [ custom,isCopied ])

  const handleCopy = (e) => {
    const domain = window.location.href;
    const customLink = domain + custom;

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