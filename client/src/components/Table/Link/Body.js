import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import Modal from '../../Modal/Modal'
// import './Body.css'
import Anchor from './Anchor'
import Button from './Button'


export default function Body () {

  const { state:{ data },setModal } = useContext(Context);

  return (
    <tbody>
      {
        data && data.map((link, id) => (
          <tr key={ link.id } data-id={ id }>
            <td className="count">{ link.count }</td>
            {/* <td>{ link.created_at }</td> */}

            <td><Anchor url={ link.url } text={ link.domain } /></td>
            <td><Anchor url={ link.url } text={ '/' + link.custom } /></td>

            <td><Button cName={ 'show' } i={ '👁‍🗨' } setModal={ setModal } /></td>
            <td><Button cName={ 'copy' } i={ '📋' } /></td>
            <td><Button cName={ 'delete' } i={ '❌' } /></td>
          </tr>
        ))
      }
    </tbody>
  );
}