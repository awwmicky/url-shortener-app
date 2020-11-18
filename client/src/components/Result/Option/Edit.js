import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Input.css'
const [ ENTER_KEY,ESC_KEY ] = [13,27];


export default function Input (props) {

  const { handleEdit,handleCancel } = props.opts;
  const { state:{ custom },setState } = useContext(Context);

  const handleValue = (e) => {
    const { name,value } = e.target;
    setState(draft => { draft[name] = value; })
  };

  const handleKeys = (e) => {
    if (e.which === ENTER_KEY) return handleEdit();   
    if (e.which === ESC_KEY) return handleCancel();
  };

  ////

  return (
    <>
      <input 
        type="text"
        name="custom"
        id="custom"
        className="c-edit-inp"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        autoFocus={ true }
        value={ custom }
        onChange={ handleValue }
        onKeyUp={ handleKeys }
      />
    </>
  );
}