import { useState,useEffect,useContext } from 'react'
import Context from '../../utils/Context.js'
import './Result.scss'
import Copy from './Option/Copy'
import Edit from './Option/Edit'


export default function Result () {

  const { state:{ recent },setState } = useContext(Context);
  const [ option,setOption ] = useState(recent ? 'link-btn' : '');
  const subTitle = option && (option === 'link-btn') 
  ? 'click to copy link' : 'press enter to save';
  const display = option ? '' : 'hide';

  ////

  useEffect(() => {
    if ( recent ) setOption('link-btn');
  }, [ recent ])

  const handleEdit = (e) => {
    // ! ADD patch
    if (option === 'link-btn') {
      setState(draft => { draft.custom = draft.recent.custom; })
      setOption('custom')
    } else {
      setState(draft => { draft.recent.custom = draft.custom; })
      setOption('link-btn')
    }
  };

  const handleCancel = (e) => setOption('link-btn');

  ////

  return (
    <div className={`result ${display}`} data-id={ recent?.id }>
      { 
        recent && option === 'link-btn' ? <Copy /> : 
        <Edit  save={ handleEdit } cancel={ handleCancel } /> 
      }

      <label htmlFor={ option }>{ subTitle }</label>

      <div className="options">
        <button onClick={ handleEdit }>✏️</button>
        <button onClick={ handleCancel }>✖</button>
      </div>
    </div>
  );
}

/*  
= TASK FLOW =
- submit new URL
  - check if custom URL is new
  - display URL to Result Comp
- offest, position absolute container
  - edit/save btn (blue/green)
  - delete btn (red)
- Button Comp
  - pre-custom URL link
  - copy > wait > reset
- Input Comp
  - value = pre-custom URL link
  - cancel by esc-key or click outside
  - reverts back to Button Comp
*/