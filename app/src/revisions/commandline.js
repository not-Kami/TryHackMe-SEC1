// Correct answer: 0 = A, 1 = B, 2 = C, 3 = D
// Command Line (TryHackMe) — PowerShell + CMD + Linux shells
export const id = 'commandline'
export const title = 'Command Line Fundamentals'
export const description =
  'TryHackMe Command Line — PowerShell objects, cmdlets, pipeline, admin & security (CMD and Linux shells later).'
export const image = 'commandline.png'

export const questions = [
  // ==== PowerShell basics & architecture ====
  {
    text: 'Compared to cmd.exe, what is the biggest architectural difference in PowerShell?',
    options: [
      'It only runs on Linux',
      'It treats everything as plain text',
      'It is object-oriented and passes .NET objects through the pipeline',
      'It cannot access the filesystem',
    ],
    correct: 2,
    hint: 'Objects with properties and methods flow through the pipeline instead of raw text.',
  },
  {
    text: 'PowerShell cmdlets follow a strict naming convention. Which pattern is used?',
    options: ['Noun-Verb', 'Verb-Noun', 'snake_case', 'camelCase only'],
    correct: 1,
    hint: 'Examples: Get-Service, Set-Location, New-Item.',
  },
  {
    text: 'Which cmdlet is the primary discovery tool to list available cmdlets, functions, and aliases in the current session?',
    options: ['Get-Help', 'Get-Command', 'Get-Alias', 'Get-Member'],
    correct: 1,
    hint: 'Use it to see what exists before diving into help for a specific command.',
  },
  {
    text: 'Which cmdlet shows the manual, examples, and detailed parameters for other cmdlets?',
    options: ['Get-Help', 'Get-Command', 'Get-Alias', 'Select-String'],
    correct: 0,
    hint: 'Add -Examples, -Detailed, or -Full for more information.',
  },

  // ==== Objects, pipeline & filtering ====
  {
    text: 'In PowerShell, what does the pipeline (|) pass between commands?',
    options: [
      'Only strings',
      'Only numbers',
      'Full objects with properties and methods',
      'Only exit codes',
    ],
    correct: 2,
    hint: 'This is why Sort-Object, Where-Object, and Select-Object are so powerful.',
  },
  {
    text: 'Which cmdlet lets you inspect the properties and methods of objects flowing through the pipeline?',
    options: ['Get-Help', 'Get-Command', 'Get-Member', 'Select-Object'],
    correct: 2,
    hint: 'Often abbreviated as gm.',
  },
  {
    text: 'Which cmdlet would you use to filter a list of processes to only those named "powershell"?',
    options: [
      'Get-Process | Sort-Object Name',
      'Get-Process powershell',
      'Get-Process | Where-Object { $_.Name -eq "powershell" }',
      'Get-Process | Select-Object Name',
    ],
    correct: 2,
    hint: 'Use a filtering cmdlet and test the Name property.',
  },
  {
    text: 'Which cmdlet selects only specific properties (columns) from objects, or limits how many objects are returned?',
    options: ['Sort-Object', 'Where-Object', 'Select-Object', 'Get-Content'],
    correct: 2,
    hint: 'Use it to pick Name, Length, etc. from the full object.',
  },

  // ==== Filesystem & admin cmdlets ====
  {
    text: 'Which cmdlet lists items (files and folders) in a directory?',
    options: ['Get-Content', 'Get-ChildItem', 'Set-Location', 'New-Item'],
    correct: 1,
    hint: 'It is often aliased as dir or ls.',
  },
  {
    text: 'Which cmdlet changes the current working directory?',
    options: ['Set-Location', 'New-Item', 'Move-Item', 'Get-Location'],
    correct: 0,
    hint: 'Its common alias is cd.',
  },
  {
    text: 'Which cmdlet would you use to compute the SHA256 hash of a file for integrity checking?',
    options: ['Get-FileHash', 'Get-Content', 'Get-Item', 'Get-ComputerInfo'],
    correct: 0,
    hint: 'It returns an object with Algorithm and Hash properties.',
  },
  {
    text: 'Which cmdlet displays active TCP connections, ports, and owning processes from PowerShell?',
    options: ['Get-NetIPAddress', 'Get-NetTCPConnection', 'netstat', 'Get-Process'],
    correct: 1,
    hint: 'It is part of the newer NetTCP* networking cmdlets.',
  },

  // ==== Syntax, variables & control flow ====
  {
    text: 'How are variables identified in PowerShell?',
    options: [
      'They must start with #',
      'They must start with $',
      'They must be in ALL CAPS',
      'They must end with ;',
    ],
    correct: 1,
    hint: 'Example: $user = "Alice".',
  },
  {
    text: 'Which syntax correctly defines an array (list) of ports in PowerShell?',
    options: [
      '$ports = [80, 443, 3389]',
      '$ports = {80, 443, 3389}',
      '$ports = @(80, 443, 3389)',
      'ports(80, 443, 3389)',
    ],
    correct: 2,
    hint: '@() creates an array.',
  },
  {
    text: 'Which keyword is used in a pipeline to iterate over each object and run a script block?',
    options: ['ForEach-Object', 'Loop-Object', 'Each-Object', 'Iterate-Object'],
    correct: 0,
    hint: 'Example: Get-Process | ForEach-Object { $_.Name }.',
  },

  // ==== Productivity: formatting, export, history ====
  {
    text: 'Which pair of cmdlets is best suited to export structured PowerShell objects to a CSV file for later analysis?',
    options: [
      'Get-Content and Out-Host',
      'Export-Csv and Import-Csv',
      'Format-Table and Out-Host',
      'Get-FileHash and Get-Content',
    ],
    correct: 1,
    hint: 'They preserve property names and values in a tabular format.',
  },
  {
    text: 'Which cmdlet would you use to save the output of Get-NetTCPConnection to a plain text file?',
    options: ['Export-Csv', 'Out-File', 'Get-Content', 'ConvertTo-Json'],
    correct: 1,
    hint: 'It writes whatever comes from the pipeline into a text file.',
  },
  {
    text: 'Which cmdlet lists the history of commands you have recently run in the current PowerShell session?',
    options: ['Get-Command', 'Get-History', 'Get-Process', 'Get-Log'],
    correct: 1,
    hint: 'You can replay entries with Invoke-History <Id>.',
  },

  // ==== Common parameters, safety & execution policy ====
  {
    text: 'What does the parameter -WhatIf typically do on destructive cmdlets like Remove-Item?',
    options: [
      'Executes the command twice',
      'Silently ignores all errors',
      'Shows what would happen without actually making changes',
      'Disables logging for the command',
    ],
    correct: 2,
    hint: 'Use it as a safety net before running a risky command for real.',
  },
  {
    text: 'Which command shows the current PowerShell execution policy?',
    options: ['Get-ExecutionPolicy', 'Get-Policy', 'Show-ExecutionPolicy', 'Get-SecurityPolicy'],
    correct: 0,
    hint: 'Use it before trying to run local .ps1 scripts.',
  },
  {
    text: 'What is the purpose of the PowerShell profile script referenced by $PROFILE?',
    options: [
      'It stores the Windows product key',
      'It defines default firewall rules',
      'It runs at PowerShell startup and can define aliases, functions, and environment customizations',
      'It contains BitLocker recovery keys',
    ],
    correct: 2,
    hint: 'It is a customizable startup script for your shell environment.',
  },
  {
    text: 'Which cmdlet can start recording all commands and output in a PowerShell session for later review?',
    options: ['Start-Transcript', 'Start-Logging', 'Enable-Audit', 'Write-Log'],
    correct: 0,
    hint: 'Useful for investigations and training.',
  },
  {
    text: 'Which cmdlet is commonly used to execute commands or scripts on remote Windows systems?',
    options: ['Invoke-Command', 'Invoke-Remote', 'Enter-Session', 'Start-Process'],
    correct: 0,
    hint: 'It can take a -FilePath or a -ScriptBlock and a -ComputerName.',
  },

  // ==== Windows CMD (Command Prompt) (add) ====
  {
    text: 'In Windows CMD, which suffix displays the help (syntax + options) for a given command?',
    options: ['`/help`', '`/?`', '`--help`', '`?help`'],
    correct: 1,
    hint: 'Appending `/?` to a command shows its usage.',
  },
  {
    text: 'In CMD, what does `more` do?',
    options: [
      'A pager for long output (shows one screen at a time)',
      'A network speed test tool',
      'A process manager',
      'A file hash calculator',
    ],
    correct: 0,
    hint: 'Use `type file.txt | more` to page output.',
  },
  {
    text: 'Which command lists files and subdirectories in the current directory?',
    type: 'input',
    cli: { prompt: 'C:\\>' },
    inputPlaceholder: 'Type your command...',
    accepted: ['dir'],
    hint: 'In CMD, `dir` is the directory listing command.',
  },
  {
    text: 'What does `dir /s` do?',
    options: ['Shows only hidden files', 'Lists recursively (subdirectories too)', 'Deletes directories', 'Shows file permissions'],
    correct: 1,
    hint: '`/s` = recursive listing.',
  },
  {
    text: 'Which CMD command displays the content of a text file?',
    type: 'input',
    cli: { prompt: 'C:\\>', before: '', after: '' },
    inputPlaceholder: 'Type your command...',
    accepted: ['type', 'type <file>'],
    hint: '`type` displays the content of a text file in CMD.',
  },
  {
    text: 'What does `cd ..` do in CMD?',
    options: ['Go to the root directory', 'Go up one directory level', 'Delete the parent directory', 'Display environment variables'],
    correct: 1,
    hint: '`..` means “parent directory”.',
  },
  {
    text: 'In CMD, what is the purpose of `ipconfig /all`?',
    options: ['It only shows IP addresses', 'It shows full configuration details (DNS, MAC, etc.)', 'It resets the network adapter', 'It lists Wi-Fi passwords'],
    correct: 1,
    hint: '`/all` includes additional details like DNS and MAC.',
  },
  {
    text: 'In CMD, what does `tracert <host>` do?',
    options: [
      'Recursively list subdirectories',
      'Show the hop-by-hop route to the destination',
      'Delete files on the filesystem',
      'Display local user accounts',
    ],
    correct: 1,
    hint: '`tracert` maps the path packets take.',
  },
  {
    text: 'Which netstat switch causes CMD to display the owning Process ID (PID) as well?',
    options: ['-an', '-a', '-ano', '/pid'],
    correct: 2,
    hint: '`netstat -ano` = includes PID.',
  },
  {
    text: 'Which CMD command lists running processes (with PID) on the system?',
    options: ['tasklist', 'tasks', 'taskkill', 'processes'],
    correct: 0,
    hint: '`tasklist` lists processes; `taskkill` kills them.',
  },
  {
    text: 'What does `taskkill /PID <id>` do?',
    options: ['Stops the service and restarts it', 'Terminates the process with the given PID', 'Creates a scheduled task', 'Outputs network connections'],
    correct: 1,
    hint: '`taskkill` terminates processes by PID.',
  },
  {
    text: 'Which command is used by Windows to scan and repair corrupted system files?',
    options: ['chkdsk', 'sfc /scannow', 'net user', 'driverquery'],
    correct: 1,
    hint: '`sfc /scannow` = System File Checker.',
  },

  // ==== Windows CMD - More realistic CLI questions (add) ====
  {
    text: 'What does `C:\\> tasklist | findstr "chrome"` do?',
    options: [
      'Filters the running process list to entries containing "chrome"',
      'Deletes processes containing "chrome"',
      'Starts Chrome and then lists all processes',
      'Hashes process outputs into a file',
    ],
    correct: 0,
    hint: 'The pipe (|) sends tasklist output into findstr for filtering.',
  },
  {
    text: 'What does `C:\\> systeminfo > sys_audit.txt` do?',
    options: [
      'Writes the output of systeminfo into sys_audit.txt (overwrites the file)',
      'Appends the output of systeminfo into sys_audit.txt',
      'Prints systeminfo only for installed patches',
      'Deletes sys_audit.txt and recreates it empty',
    ],
    correct: 0,
    hint: '`>` redirects and overwrites the destination file.',
  },
  {
    text: 'To paginate `type longfile.txt`, what operator should be placed between the commands to use `more`?',
    options: ['`|`', '`>`', '`>>`', '`&`'],
    correct: 0,
    hint: '`type ... | more` pipes output into the pager.',
  },

  // ==== Linux shell (add) ====
  {
    text: 'In Linux, which command opens the manual (primary help) for a given command?',
    options: ['`man <command>`', '`<command> --version`', '`help <command>`', '`whereami <command>`'],
    correct: 0,
    hint: 'Use `man` to read the manual page for a command.',
  },
  {
    text: 'Which command shows your current directory path?',
    type: 'input',
    cli: { prompt: '$', before: '', after: '' },
    inputPlaceholder: 'Type your command...',
    accepted: ['pwd'],
    hint: '`pwd` = Print Working Directory.',
  },
  {
    text: 'Which command lists directory contents?',
    type: 'input',
    cli: { prompt: '$', before: '', after: '' },
    inputPlaceholder: 'Type your command...',
    accepted: ['ls', 'ls -la', 'ls -al', 'ls -l -a'],
    hint: '`ls` lists files and folders. `ls -la` also shows hidden files in long format.',
  },
  {
    text: 'Which command copies files or directories?',
    type: 'input',
    cli: { prompt: '$', before: '', after: '' },
    inputPlaceholder: 'Type your command...',
    accepted: ['cp'],
    hint: '`cp` copies files/directories on Linux.',
  },
  {
    text: 'What does `grep -r "thm-flag" /var/log/` do?',
    options: [
      'Recursively search for the pattern in all subdirectories',
      'Only search in the current directory',
      'Display file permissions instead of searching',
      'Delete matching entries from the logs',
    ],
    correct: 0,
    hint: '`-r` enables recursive search.',
  },
  {
    text: 'In Unix permissions, what does `chmod 755 script.sh` generally set?',
    options: [
      'Owner rw-, group r--, others r--',
      'Owner rwx, group r-x, others r-x',
      'Owner rw-, group rw-, others rw-',
      'Owner rwx, group rwx, others rwx',
    ],
    correct: 1,
    hint: '755 = rwxr-xr-x.',
  },
  {
    text: 'What is the main purpose of `sudo`?',
    options: [
      'Run a command with elevated (typically root) privileges',
      'Change the current directory to /',
      'Show environment variables',
      'Disable command history',
    ],
    correct: 0,
    hint: '`sudo` temporarily elevates privileges for a command.',
  },
  {
    text: 'In Linux, to filter lines containing "ERROR", what operator should go between `cat app.log` and `grep "ERROR"`?',
    options: ['`|`', '`>`', '`>>`', '`&`'],
    correct: 0,
    hint: '`|` pipes stdout from cat into grep.',
  },
  {
    text: 'Which operator appends command output to a file without overwriting existing content?',
    options: ['`>`', '`>>`', '`|`', '`&`'],
    correct: 1,
    hint: '`>>` appends; `>` overwrites.',
  },
  {
    text: 'In `cat access.log | grep "404" | wc -l`, what does `wc -l` output?',
    options: [
      'The number of lines that contain "404"',
      'The size of the file in bytes',
      'The first 10 lines of the log file',
      'The last word of each matching line',
    ],
    correct: 0,
    hint: '`wc -l` counts lines.',
  },
  {
    text: 'In a shell script, what does a shebang like `#!/bin/bash` do?',
    options: [
      'Selects the interpreter used to execute the script',
      'Creates the script file',
      'Sets filesystem permissions automatically',
      'Starts a network listener',
    ],
    correct: 0,
    hint: 'The OS uses the shebang to know which interpreter to run.',
  },
  {
    text: 'To run a local script in the current directory, how do you usually execute it?',
    options: ['`./script.sh`', '`script.sh`', '`/script.sh`', '`run script.sh`'],
    correct: 0,
    hint: 'Use `./` so the shell knows it is in the current directory.',
  },
  {
    text: 'What command is commonly used to make a script executable?',
    options: [
      '`chmod +x script.sh`',
      '`chown +x script.sh`',
      '`rm +x script.sh`',
      '`cd +x script.sh`',
    ],
    correct: 0,
    hint: '`chmod +x` adds the execute bit.',
  },
  {
    text: 'What command should you use to remove a non-empty directory recursively?',
    options: ['`rm -r <dir>`', '`rmdir <dir>`', '`rm <dir>`', '`touch <dir>`'],
    correct: 0,
    hint: '`rmdir` usually only works on empty directories; `rm -r` for recursive deletion.',
  },
  {
    text: 'What does `ls -l` show?',
    options: [
      'A detailed listing including permissions, ownership, size, and timestamps',
      'Only the number of files',
      'Only hidden files',
      'Network connections',
    ],
    correct: 0,
    hint: '`-l` = long format (detailed info).',
  },

  // ==== Input questions (type the answer) ====
  {
    type: 'input',
    text: 'Complete the command to search for "ERROR" in app.log.',
    cli: { prompt: '$', before: 'cat app.log ', after: ' grep "ERROR"' },
    inputPlaceholder: 'Type the missing operator...',
    accepted: ['|'],
    hint: 'Use `|` to pipe stdout from cat into grep.',
  },
]

