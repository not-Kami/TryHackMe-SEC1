// One questionnaire per module: Linux, Windows, AD, Networking, etc.
// Add a new revision by creating e.g. windows.js and importing it here.
import { id as idLinux, title as titleLinux, description as descLinux, questions as qLinux } from './linux.js'
import { id as idWindows, title as titleWindows, description as descWindows, questions as qWindows } from './windows.js'
import {  id as idCommandLine,  title as titleCommandLine,  description as descCommandLine,  questions as qCommandLine,} from './commandline.js'

// Active modules (with questions)
const activeRevisions = [
  { id: idLinux, title: titleLinux, description: descLinux, questions: qLinux },
  { id: idWindows, title: titleWindows, description: descWindows, questions: qWindows },
  {    id: idCommandLine,    title: titleCommandLine,    description: descCommandLine,    questions: qCommandLine,  },
]

// Upcoming modules (greyed out, no quiz yet). Use `image` when filename differs from id (e.g. owasp.png, .svg).
const upcomingRevisions = [
  { id: 'networking', title: 'Networking', description: 'OSI model, TCP/IP, network fundamentals — coming soon', questions: [], upcoming: true },
  { id: 'cryptography', title: 'Cryptography', description: 'Symmetric vs asymmetric, hashing — coming soon', questions: [], upcoming: true },
  { id: 'exploitation', title: 'Exploitation Basics', description: 'Introduction to exploitation — coming soon', questions: [], upcoming: true },
  { id: 'web-hacking', title: 'Web Hacking', description: 'Learn about web applications, JavaScript, SQL and explore BurpSuite, a web application security testing platform.', questions: [], upcoming: true },
  { id: 'offensive-tooling', title: 'Offensive Security Tooling', description: 'Explore three offensive tools; Hydra, Gobuster, and SQLMap are used for penetration testing passwords, directories, and databases respectively.', questions: [], upcoming: true, image: 'offensive-security.svg' },
  { id: 'defensive-security', title: 'Defensive Security', description: 'This module will help you build your defensive security knowledge. It covers key topics such as SOC, digital forensics, and incident response.', questions: [], upcoming: true },
  { id: 'security-solutions', title: 'Security Solutions', description: 'Explore fundamental defensive security solutions like firewalls, IDS, vulnerability scanners, and SIEM through different hands-on exercises.', questions: [], upcoming: true },
  { id: 'defensive-tooling', title: 'Defensive Security Tooling', description: 'Dive into various defensive security tools and distributions such as CyberChef, CAPA, REMnux, and FlareVM.', questions: [], upcoming: true },
  { id: 'cyber-career', title: 'Build Your Cyber Security Career', description: 'Study the security principles that set the foundation for everything related to cyber security and discover the available careers in cyber.', questions: [], upcoming: true, image: 'cybersecurity-career.png' },
  { id: 'owasp-top10', title: 'OWASP Top 10 (2025)', description: 'Explore, exploit, and learn how to remediate the most critical web application security risks listed in the OWASP Top 10 (2025) list through interactive labs and practical recommendations.', questions: [], upcoming: true, image: 'owasp.png' },
]

// All cards to display (active + upcoming)
export const revisions = [...activeRevisions, ...upcomingRevisions]
