// One questionnaire per module: Linux, Windows, AD, Networking, etc.
// Add a new revision by creating e.g. windows.js and importing it here.
import { id as idLinux, title as titleLinux, description as descLinux, questions as qLinux } from './linux.js'
import { id as idWindows, title as titleWindows, description as descWindows, questions as qWindows } from './windows.js'

export const revisions = [
  { id: idLinux, title: titleLinux, description: descLinux, questions: qLinux },
  { id: idWindows, title: titleWindows, description: descWindows, questions: qWindows },
]
