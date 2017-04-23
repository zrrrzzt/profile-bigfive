'use strict'

import Panel from 'muicss/lib/react/panel'

export default (props) => (
  <Panel>
    <a href={props.data.url} className='mui--text-headline mui--pull-right material-icons' title='Delete' target='_blank'>delete</a>
    <a href={props.data.url} className='mui--text-headline mui--pull-right material-icons' title='Edit' target='_blank'>mode_edit</a>
    <h1>{props.data.name}</h1>
    <p className='mui--text-headline'>{props.data.description}</p>
    <a href={props.data.url} className='mui--text-headline material-icons' title='Launch' target='_blank'>launch</a>
  </Panel>
)
