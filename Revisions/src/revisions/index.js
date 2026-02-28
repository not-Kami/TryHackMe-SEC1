// One questionnaire per module: Linux, Windows, AD, Networking, etc.
// Add a new revision by creating e.g. windows.js and importing it here.
import { id as idLinux, title as titleLinux, description as descLinux, questions as qLinux } from './linux.js'

export const revisions = [
  { id: idLinux, title: titleLinux, description: descLinux, questions: qLinux },
  // Later: { id: 'windows', title: 'Windows Fundamentals', ... },
  // { id: 'ad', title: 'Active Directory', ... },
  // { id: 'networking', title: 'Networking', ... },
]
