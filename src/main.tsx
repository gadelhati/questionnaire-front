import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Questionnaire } from './container/questionnaire.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Questionnaire />
  </StrictMode>,
)
