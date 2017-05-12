'use strict'

import Panel from 'muicss/lib/react/panel'

export default (props) => (
  <Panel>
    <a className='mui--text-headline mui--pull-right material-icons delete' data-key={props.data.id} title='Delete' target='_blank' onClick={props.deleteMe}>delete</a>
    <a className='mui--text-headline mui--pull-right material-icons' title='Edit' target='_blank'>mode_edit</a>
    <h1>{props.data.name}</h1>
    <p className='mui--text-headline'>{props.data.description}</p>
    <a href={props.data.url} className='mui--text-headline material-icons' title='Launch' target='_blank'>launch</a>
    <style jsx>{`
      a.delete {
        cursor: pointer;
      }
    `}
    </style>
  </Panel>
 )
