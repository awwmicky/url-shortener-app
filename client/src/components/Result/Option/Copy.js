import { useState,useEffect,useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Copy.css'


export default function Copy () {
  
  const { state,useClipboard } = useContext(Context);
  const { custom } = state.recent;
  const [ text,setText ] = useState( '/' + custom );
  const [ isCopied,copyLink ] = useClipboard(1500);

  useEffect(() => {
    if (isCopied) setText('COPIED')
    else setText( '/' + custom )
  }, [ custom,isCopied ])

  const handleCopy = (e) => {
    const customLink = '/' + custom;
    copyLink( customLink )
    console.log( isCopied,customLink )
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