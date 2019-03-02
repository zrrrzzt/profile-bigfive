'use strict'

export default ({ loading }) => (
  <div>
    {
      loading
        ? <span className='loading'>
          <p>
            <img src='static/images/icons/loading.svg' style={{ width: 100 }} />
          </p>
          <p>
            <big>Working ...</big></p>
          <style>
            {`
              .loading {
                text-align: center;
              }
            `}
          </style>
        </span>
        : null
    }
  </div>
)
