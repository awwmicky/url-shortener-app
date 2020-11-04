import { useContext } from 'react'
import { Context } from '../../../assets/Context.js'
// import './Body.css'
import Anchor from './Anchor'
import Button from './Button'


export default function Body () {

  const { state : { data }} = useContext(Context);

  return (
    <tbody>
      {
        data && data.map((link, id) => (
          <tr key={ link.id } data-id={ id }>
            <td>{ link.count }</td>

            <td><Anchor url={ link.url } text={ link.domain } /></td>
            <td><Anchor url={ link.url } text={ '/' + link.custom } /></td>

            <td>
              <Button 
                cName={ 'show' } 
                i={ '👁‍🗨' } 
              />
              <Anchor
                url={ link.url } 
                cName={ 'tooltip' } 
                text={ 'URL' } 
                hide={ 'hidden' } 
              />
            </td>

            <td><Button cName={ 'copy' } i={ '📋' } /></td>
            <td><Button cName={ 'delete' } i={ '❌' } /></td>
          </tr>
        ))
      }
    </tbody>
  );
}