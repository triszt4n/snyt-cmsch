import { Event } from '../types/Event'

export const EVENTS: Map<string, Event[]> = new Map([
  [
    'Csütörtök',
    [
      {
        start: '9:30',
        end: '14:00',
        name: 'Random event',
        location: 'Pajta?'
      },
      {
        start: '9:30',
        end: '14:00',
        name: 'Random event',
        location: 'Pajta?'
      }
    ]
  ],
  [
    'Péntek',
    [
      {
        start: '9:30',
        end: '14:00',
        name: 'Random event',
        location: 'Pajta?'
      }
    ]
  ],
  [
    'Szombat',
    [
      {
        start: '9:30',
        end: '14:00',
        name: 'Random event',
        location: 'Pajta?'
      }
    ]
  ],
  [
    'Vasárnap',
    [
      {
        start: '9:30',
        end: '14:00',
        name: 'Random event',
        location: 'Pajta?'
      }
    ]
  ]
])
