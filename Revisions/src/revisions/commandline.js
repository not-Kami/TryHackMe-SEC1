// Correct answer: 0 = A, 1 = B, 2 = C, 3 = D
// Command Line (TryHackMe) — PowerShell now; CMD & Linux shells later
export const id = 'commandline'
export const title = 'Command Line Fundamentals'
export const description =
  'TryHackMe Command Line — PowerShell objects, cmdlets, pipeline, admin & security (CMD and Linux shells later).'
export const image = 'command-line.png'

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

  // (Later) add Windows CMD & Linux shells questions below
]

