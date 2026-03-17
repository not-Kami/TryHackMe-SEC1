## PowerShell — Command Cheat Sheet

Quick reference for core cmdlets and concepts used in the course.

---

## Basics & discovery

| Command | Purpose |
|--------|---------|
| `$PSVersionTable` | Show PowerShell version and edition |
| `Get-Help <cmdlet>` | Help for a cmdlet (`-Examples`, `-Detailed`, `-Full`) |
| `Get-Command` | List all cmdlets, functions, aliases |
| `Get-Command -Noun Service` | Find cmdlets by noun |
| `Get-Alias` | List aliases (`dir`, `ls`, `cat`, …) |

---

## Filesystem & items

| Command | Purpose |
|--------|---------|
| `Get-Location` | Show current directory (alias: `pwd`) |
| `Set-Location C:\Path` | Change directory (alias: `cd`, `sl`) |
| `Get-ChildItem` | List files/folders (alias: `ls`, `dir`) |
| `Get-ChildItem -Path C:\Logs -Recurse` | Recursive listing |
| `New-Item -Path file.txt -ItemType File` | Create a file |
| `New-Item -Path C:\Temp\Reports -ItemType Directory` | Create a directory |
| `Remove-Item file.txt` | Delete file/folder |
| `Remove-Item C:\Temp\* -Recurse -Force` | Delete folder tree |
| `Get-Content file.txt` | Read file |
| `Set-Content file.txt "Text"` | Overwrite content |
| `Add-Content file.txt "More"` | Append content |

---

## Pipeline, filtering & selection

| Command | Purpose |
|--------|---------|
| `Get-Member` (`gm`) | List properties/methods of objects |
| `Get-ChildItem \| Sort-Object Length` | Sort items (e.g. by size) |
| `Get-Process \| Sort-Object CPU -Descending` | Sort processes by CPU |
| `Get-Process \| Where-Object { $_.CPU -gt 10 }` | Filter objects by condition |
| `Get-ChildItem \| Where-Object { $_.Name -like '*.log' }` | Filter by name pattern |
| `Get-Process \| Select-Object Name, Id, CPU` | Select specific properties |
| `Get-ChildItem \| Select-Object Name, Length, LastWriteTime` | Select file properties |
| `Select-String -Path *.log -Pattern "ERROR"` | Search text in files (grep-like) |
| `Select-String -Path C:\Logs\*.log -Pattern "failed login"` | Search for patterns in logs |

---

## System & forensic cmdlets

| Command | Purpose |
|--------|---------|
| `Get-ComputerInfo` | System & hardware info |
| `Get-LocalUser` | Local accounts |
| `Get-NetIPConfiguration` | IP, gateway, DNS |
| `Get-NetIPAddress` | All IPs on the system |
| `Get-NetTCPConnection` | Active TCP connections (ports, owning process) |
| `Get-Process` | Running processes |
| `Get-Service` | Services and their status |
| `Get-FileHash file.exe` | SHA256 hash (default) |
| `Get-Item -Path C:\file.txt -Stream *` | List NTFS Alternate Data Streams (ADS) |

---

## Remote management & scripts

| Command | Purpose |
|--------|---------|
| `Invoke-Command -ComputerName SERVER1 -ScriptBlock { Get-Process }` | Run a command on a remote computer |
| `Invoke-Command -ComputerName SERVER1 -FilePath C:\scripts\audit.ps1` | Run local script on remote computer |
| `Get-ExecutionPolicy` | Show current execution policy |
| `Set-ExecutionPolicy RemoteSigned` | Allow local scripts / signed remote scripts (lab use) |

---

## Objects, formatting & export

| Command | Purpose |
|--------|---------|
| `Get-Process \| Get-Member` | Inspect properties/methods (gm) |
| `Get-Service \| Format-Table Name, Status` | Table output with chosen columns |
| `Get-Process \| Format-List *` | List view with all properties |
| `Get-Process \| Export-Csv processes.csv -NoTypeInformation` | Export objects to CSV |
| `Import-Csv processes.csv` | Import data from CSV as objects |
| `Get-NetTCPConnection \| Out-File connections.txt` | Save text output to file |

---

## Variables, arrays & hashtables

| Command | Purpose |
|--------|---------|
| `$user = "alice"` | Define a variable |
| `$count = 5` | Integer variable |
| `"User: $user, Count: $count"` | String interpolation |
| `$ports = @(80, 443, 3389)` | Define an array |
| `$ports[0]` | Access first array element |
| `$config = @{ Server = 'DC1'; Port = 389 }` | Define a hashtable (dictionary) |
| `$config.Server` | Access hashtable value |

---

## Control flow & ForEach-Object

| Command | Purpose |
|--------|---------|
| `if ($count -gt 10) { "High" }` | Basic if condition |
| `elseif ($count -gt 5) { "Medium" }` | Else-if branch |
| `else { "Low" }` | Else branch |
| `foreach ($p in Get-Process) { $p.Name }` | Loop over a collection |
| `Get-Process \| ForEach-Object { $_.Name }` | Loop in the pipeline |

---

## Safety, error handling & logging

| Command | Purpose |
|--------|---------|
| `Remove-Item C:\Temp\* -WhatIf` | Simulate deletions (no changes) |
| `Remove-Item C:\Logs\old.log -Confirm` | Force confirmation |
| `Get-Item C:\doesnotexist.txt -ErrorAction SilentlyContinue` | Ignore error if missing |
| `try { Get-Item C:\secret.txt } catch { Write-Error "Failed: $_" }` | Try/catch error handling |
| `Get-History` | Show command history |
| `Invoke-History 3` | Re-run command #3 from history |
| `Start-Transcript -Path C:\logs\ps-session.log` | Start logging commands/output |
| `Stop-Transcript` | Stop logging |

---

## One-liner recap

```powershell
Get-Help, Get-Command, Get-Alias       # Discover
Get-ChildItem, Get-Content, New-Item   # Files & folders
Sort-Object, Where-Object, Select-Object, Select-String  # Work with objects
Get-ComputerInfo, Get-LocalUser, Get-NetIPConfiguration, Get-NetTCPConnection
Get-Process, Get-Service, Get-FileHash, ADS via Get-Item -Stream *
Invoke-Command, Get-ExecutionPolicy, Set-ExecutionPolicy
Get-Member, Export-Csv, Out-File, Get-History, Start-Transcript
```

