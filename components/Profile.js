'use strict'

import Button from 'muicss/lib/react/button'

function handleLogout (event) {
  event.preventDefault()
  const url = event.target.dataset.logout
  window.location = url
}

export default (props) => (
  <div>
    <Button onClick={handleLogout} data-logout={props.logoutUrl} variant='fab' className='mui--text-headline mui--pull-right material-icons' title='Log out' target='_blank'>power_settings_new</Button>
    <h1><img src={props.profile.photo} /> {props.profile.name}</h1>
  </div>
)
