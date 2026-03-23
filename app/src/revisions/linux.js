// Correct answer: 0 = A, 1 = B, 2 = C, 3 = D
// One revision = one module (Linux Fundamentals). Later: windows.js, ad.js, networking.js, etc.
export const id = 'linux'
export const title = 'Linux Fundamentals'
export const description = 'TryHackMe Linux Fundamentals — commands, filesystem, permissions, processes, cron, APT, logs'

export const questions = [
  {
    text: 'What does the `pwd` command display?',
    options: [
      'The current logged-in username',
      'The full path of your current directory',
      'The list of files in the current directory',
      'Running processes',
    ],
    correct: 1,
    hint: 'pwd = Print Working Directory → current path',
  },
  {
    text: 'Which `ls` option shows hidden files (names starting with a dot)?',
    options: ['ls -l', 'ls -h', 'ls -a', 'ls -f'],
    correct: 2,
    hint: 'ls -a shows all files, including hidden ones',
  },
  {
    text: 'What does `cd ..` do?',
    options: [
      'Go to your home directory',
      'Go up one level to the parent directory',
      'Show the current directory',
      'List the parent directory contents',
    ],
    correct: 1,
    hint: '.. means parent directory',
  },
  {
    text: 'Which command creates an empty file?',
    options: ['mkdir', 'create', 'touch', 'new'],
    correct: 2,
    hint: 'touch creates an empty file (or updates its timestamp)',
  },
  {
    text: 'To search for text inside files (e.g. an IP in a log file), you use:',
    options: ['find', 'search', 'grep', 'locate'],
    correct: 2,
    hint: 'grep searches inside file contents; find searches by filename',
  },
  {
    text: 'What does the `>` (redirect) operator do?',
    options: [
      'Append output to the end of the file',
      'Overwrite the file with the command output',
      'Run the command in the background',
      'Chain two commands (second runs only if first succeeds)',
    ],
    correct: 1,
    hint: '> overwrites; >> appends',
  },
  {
    text: 'The correct SSH connection syntax is:',
    options: [
      'ssh IP_ADDRESS username',
      'ssh username@IP_ADDRESS',
      'connect username IP_ADDRESS',
      'ssh -u username IP_ADDRESS',
    ],
    correct: 1,
    hint: 'ssh username@IP_ADDRESS',
  },
  {
    text: 'To get the full manual (help) for a command like `ls`, you type:',
    options: ['ls --help', 'help ls', 'man ls', 'ls -h'],
    correct: 2,
    hint: 'man = manual pages',
  },
  {
    text: 'In numeric permissions, what value is "read + write + execute" (rwx) for one group?',
    options: ['6', '5', '7', '4'],
    correct: 2,
    hint: 'r=4, w=2, x=1 → rwx = 7',
  },
  {
    text: '`chmod 600 private.txt` gives:',
    options: [
      'Read/write for everyone',
      'Read/write/execute for owner only',
      'Read/write for owner only, nothing for others',
      'Read-only for owner',
    ],
    correct: 2,
    hint: '6 = rw- for owner; 0 = nothing for group and others',
  },
  {
    text: 'Which command switches to user2 with a clean environment (recommended)?',
    options: ['su user2', 'switch user2', 'su -l user2', 'login user2'],
    correct: 2,
    hint: 'su -l (or su -) = clean login with target user\'s environment',
  },
  {
    text: 'Where are temporary data stored that are wiped on every reboot?',
    options: ['/etc', '/var', '/root', '/tmp'],
    correct: 3,
    hint: '/tmp = temporary, cleared on reboot',
  },
  {
    text: 'Where are system configuration files and the user list (e.g. /etc/passwd) usually stored?',
    options: ['/var', '/tmp', '/etc', '/root'],
    correct: 2,
    hint: '/etc = system configuration',
  },
  {
    text: 'In Nano, which shortcut saves the file?',
    options: ['Ctrl + X', 'Ctrl + O', 'Ctrl + W', 'Ctrl + S'],
    correct: 1,
    hint: 'Ctrl + O = Write Out (save); Ctrl + X = exit',
  },
  {
    text: 'To run a command in the background and keep using the terminal, you add:',
    options: ['&& at the end', '& at the end', '>> at the end', 'nohup at the start'],
    correct: 1,
    hint: '& at the end runs the command in the background',
  },
  {
    text: 'Which command shows all running processes on the system?',
    options: ['top only', 'ps only', 'ps aux', 'process list'],
    correct: 2,
    hint: 'ps aux lists all processes (all users)',
  },
  {
    text: 'To force a process to stop immediately (e.g. PID 1234), you use:',
    options: ['kill 1234', 'kill -TERM 1234', 'kill -9 1234', 'stop 1234'],
    correct: 2,
    hint: 'kill -9 sends SIGKILL (force stop)',
  },
  {
    text: 'The format of a crontab line is:',
    options: [
      'COMMAND MIN HOUR DAY MONTH',
      'MIN HOUR DOM MON DOW COMMAND',
      'HOUR MIN DAY COMMAND',
      'MIN HOUR COMMAND',
    ],
    correct: 1,
    hint: 'MIN HOUR DOM (day of month) MON DOW (day of week) COMMAND',
  },
  {
    text: 'To install a package with APT (Ubuntu), you use:',
    options: [
      'apt get install package_name',
      'sudo apt install package_name',
      'sudo apt get package_name',
      'install package_name',
    ],
    correct: 1,
    hint: 'sudo apt install (after sudo apt update if needed)',
  },
  {
    text: 'Where are login attempts and sudo usage recorded?',
    options: [
      '/var/log/syslog',
      '/etc/auth.log',
      '/var/log/auth.log',
      '/var/log/login.log',
    ],
    correct: 2,
    hint: '/var/log/auth.log (Debian/Ubuntu)',
  },
  {
    text: 'Which command displays the current logged-in username?',
    options: ['pwd', 'whoami', 'id', 'user'],
    correct: 1,
    hint: 'whoami prints the effective username',
  },
  {
    text: 'What does the `>>` (redirect) operator do?',
    options: [
      'Overwrite the file with the command output',
      'Append output to the end of the file',
      'Run the command in the background',
      'Pipe output to the next command',
    ],
    correct: 1,
    hint: '>> appends; > overwrites',
  },
  {
    text: 'With `command1 && command2`, when does command2 run?',
    options: [
      'Always, in parallel',
      'Only if command1 succeeds',
      'Only if command1 fails',
      'After a 2-second delay',
    ],
    correct: 1,
    hint: '&& = AND: second runs only if first exits successfully',
  },
  {
    text: 'Which command finds files by name (e.g. every .txt in the current directory)?',
    options: ['grep -name "*.txt"', 'find -name "*.txt"', 'locate "*.txt"', 'search "*.txt"'],
    correct: 1,
    hint: 'find -name searches by filename; grep searches inside file contents',
  },
  {
    text: 'Which command displays the entire content of a file in the terminal?',
    options: ['ls', 'type', 'cat', 'read'],
    correct: 2,
    hint: 'cat = concatenate, often used to display a single file',
  },
  {
    text: 'To download a file from the web (HTTP/HTTPS), you can use:',
    options: ['curl only', 'wget', 'download', 'get'],
    correct: 1,
    hint: 'wget downloads from a URL; scp is for SSH copy',
  },
  {
    text: 'To copy a file securely over SSH from remote to local, you use:',
    options: [
      'scp user@remote_ip:/path/file.txt local_name.txt',
      'ssh copy user@remote file.txt',
      'cp -s user@remote:/path/file.txt .',
      'wget user@remote:/path/file.txt',
    ],
    correct: 0,
    hint: 'scp user@host:/remote/path local_path (download)',
  },
  {
    text: 'Which command starts a simple HTTP server in the current directory on port 8000?',
    options: [
      'python3 -m http.server 8000',
      'http-server 8000',
      'serve -p 8000',
      'nginx -p 8000',
    ],
    correct: 0,
    hint: 'Python built-in: python3 -m http.server 8000',
  },
  {
    text: 'What does `kill -9` send to the process?',
    options: ['SIGTERM (graceful stop)', 'SIGKILL (force stop)', 'SIGSTOP (pause)', 'SIGINT (interrupt)'],
    correct: 1,
    hint: 'SIGKILL (-9) cannot be caught; process stops immediately',
  },
  {
    text: 'Which command brings a suspended or background process back to the foreground?',
    options: ['bg', 'fg', 'resume', 'front'],
    correct: 1,
    hint: 'fg = foreground; Ctrl+Z suspends, fg restores',
  },
  {
    text: 'In a crontab, what does `0 0 * * * /backup.sh` mean?',
    options: [
      'Every hour at minute 0',
      'Every day at midnight',
      'Every Sunday at 00:00',
      'Every month on the 1st',
    ],
    correct: 1,
    hint: 'MIN HOUR DOM MON DOW → 0 0 * * * = 00:00 every day',
  },
  {
    text: 'To refresh the list of available packages before installing with APT, you run:',
    options: ['apt refresh', 'sudo apt update', 'apt get update', 'sudo apt refresh'],
    correct: 1,
    hint: 'sudo apt update then sudo apt install <package>',
  },
  {
    text: 'Where are system logs (e.g. Apache access, auth) stored on Linux?',
    options: ['/etc/log', '/tmp/log', '/var/log', '/usr/log'],
    correct: 2,
    hint: '/var/log = variable data, logs; auth.log, syslog, etc.',
  },
  {
    text: 'Which command checks or starts a systemd service (e.g. SSH)?',
    options: ['service ssh status', 'systemctl status ssh', 'start ssh', 'run ssh'],
    correct: 1,
    hint: 'systemctl status/start/stop/enable <service>',
  },
  {
    text: 'What does the `file` command do?',
    options: [
      'Lists files in the directory',
      'Identifies the file type (text, executable, etc.)',
      'Opens the file in the default editor',
      'Shows file permissions',
    ],
    correct: 1,
    hint: 'file filename → e.g. "ASCII text", "ELF executable"',
  },
  {
    text: 'Which directory is the home of the root (administrator) user?',
    options: ['/home/root', '/etc/root', '/root', '/admin'],
    correct: 2,
    hint: '/root; normal users are under /home/<username>',
  },
]
