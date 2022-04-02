import { Router } from 'itty-router'
import Events from './events'
import Statistics from './statistics'
import Options from './options'

const router = Router()
router
  .post('/event', Events)
  .get('/stats', Statistics)
  .options('*', Options)
  .post('*', () => new Response('Not found', { status: 404 }))
  .get('*', () => new Response('Not found', { status: 404 }))
  .put('*', () => new Response('Not found', { status: 404 }))
  .delete('*', () => new Response('Not found', { status: 404 }))

export const handleRequest = (request: any) => router.handle(request)
