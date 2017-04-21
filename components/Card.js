'use strict'

import Panel from 'muicss/lib/react/panel'

export default (props) => (
  <Panel>
    <h1>{props.data.name}</h1>
    <p>{props.data.description}</p>
    <a href={props.data.url} target='_blank'>Show</a>
  </Panel>
)
