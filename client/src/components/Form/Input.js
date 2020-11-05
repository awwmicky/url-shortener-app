import { useContext } from 'react'
import { Context } from '../../assets/Context.js'
// import './Input.css'

export default function Input (props) {

  const { name,ph,focus='',val } = props;
  const { setState } = useContext(Context);


  const handleValue = (e) => {
    const { name,value } = e.target;
    setState(draft => { draft[name] = value; })
  };


  return (
    <fieldset>
      <label htmlFor={ name }>{ name }:</label>
      <input 
        type="text"
        name={ name }
        id={ name }
        placeholder={ ph }
        autoComplete="off"
        autoFocus={ focus ? true : false }
        value={ val }
        onChange={ handleValue }
      />
    </fieldset>
  );
}