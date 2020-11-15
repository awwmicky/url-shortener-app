import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Input.css'


const [ ENTER_KEY,ESC_KEY ] = [ 13,27 ];

export default function Input (props) {

  const { save,cancel } = props;
  const { state:{ custom },setState } = useContext(Context);

  const handleValue = (e) => {
    const { name,value } = e.target;
    setState(draft => { draft[name] = value; })
  };

  const handleKeys = (e) => {
    if (e.which === ENTER_KEY) return save();
    if (e.which === ESC_KEY) return cancel();
  };

  ////

  return (
    <>
      <input 
        type="text"
        name="custom"
        id="custom"
        autoComplete="off"
        autoFocus={ true }
        value={ custom }
        onChange={ handleValue }
        onKeyUp={ handleKeys }
      />
    </>
  );
}