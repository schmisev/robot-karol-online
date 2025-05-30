import { backend } from '../../backend'
import { Core } from '../state/core'
import { getUserId } from '../storage/storage'

export function submit_event(event: string, core: Core) {
  if (core.state.enableStats && backend.statsEndpoint) {
    const userId = getUserId()

    // only log on production or to local server
    if (
      window.location.host !== 'karol.arrrg.de' &&
      window.location.host !== 'karol-neu.arrrg.de' &&
      !backend.statsEndpoint.includes('localhost')
    ) {
      // console.log('debug:submit_event', event)
      return
    }

    void (async () => {
      await fetch(backend.statsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event, userId }),
      })
    })()
  }
}
