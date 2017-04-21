'use strict'

export default (props) => (
  <div>
    <h1><img src={props.profile.photo} /> {props.profile.name}</h1>
  </div>
)
