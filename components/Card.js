'use strict'

import Panel from 'muicss/lib/react/panel'

export default (props) => (
  <Panel>
    <h1>{props.data.name}</h1>
    <p className='mui--text-headline'>{props.data.description}</p>
    <a href={props.data.url} className='mui--text-headline material-icons' title='Launch' target='_blank'>launch</a>
  </Panel>
)
