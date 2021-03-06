import { useContext } from 'react'
import Context from '../../../utils/Context.js'
// import './Body.css'
import Anchor from './Anchor'
import Button from './Button'
import Time from './Time'


export default function TBody () {

  const {state:{ data }} = useContext(Context);

  return (
    <tbody>
      {
        data && data.map((link, id) => (
          <tr key={ link.id } data-id={ id }>
            <td><span className="count">{ link.count }</span></td>
            <td><Time date={ link.created_at } /></td>

            <td><Anchor url={ link.url } cName={ 'domain' } text={ link.domain } /></td>
            <td><Anchor url={ link.url } cName={ 'custom' } text={ '/'+link.custom } /></td>

            <td className="link-opts">
              <Button cName={ 'copy' } i={ '📋' } />
              <Button cName={ 'edit' } i={ '✏️' } />
              <Button cName={ 'delete' } i={ '❌' } />
            </td>
          </tr>
        ))
      }
    </tbody>
  );
}