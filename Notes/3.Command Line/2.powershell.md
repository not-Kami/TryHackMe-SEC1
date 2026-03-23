⚡ PowerShell: Advanced Technical Reference
1. System Architecture & The Object-Oriented Shift

PowerShell was developed to overcome the text-parsing limitations of cmd.exe by interacting directly with Windows’ modern APIs and the .NET framework.

    Object-Oriented Core: Unlike Unix shells that treat everything as text, PowerShell handles Objects. An object is a fundamental unit that encapsulates both Properties (data like file size or status) and Methods (actions like stopping a process).

    Cmdlets: These are specialized .NET classes implemented as small, built-in commands. They return objects that retain their properties throughout the pipeline, eliminating the need for complex text parsing.

    Cross-Platform Capability: While initially Windows-exclusive, PowerShell Core is open-source and runs on Windows, macOS, and Linux.

2. Command Discovery & Documentation Logic

PowerShell uses a strict Verb-Noun syntax (e.g., Get-Service), where the Verb describes the action and the Noun specifies the target.

    Get-Command: The primary discovery tool used to list all available cmdlets, functions, and aliases in the session. It can be filtered by type using -CommandType (e.g., Function, Alias, or Cmdlet).

    Get-Help: Provides the "manual" for any cmdlet.

        -examples: Displays common usage scenarios.

        -detailed or -full: Provides technical specifications and parameter details.

    Get-Alias: Lists command shortcuts. Many traditional Windows and Unix commands are pre-mapped to PowerShell cmdlets (e.g., dir ➔ Get-ChildItem, type ➔ Get-Content, echo ➔ Write-Output).

    Module Management: Use Find-Module to search online repositories (like the PSGallery) and Install-Module to extend local functionality.

3. Filesystem & Item Management

PowerShell unifies the management of files and directories into a single set of cmdlets.

    Get-ChildItem: Lists items in a directory. It utilizes the -Path parameter to explore specific locations.

    Set-Location: Changes the current working directory.

    New-Item: Creates both files and folders. You must specify the -ItemType as either "File" or "Directory".

    Remove-Item: A single command to delete both files and directories, replacing del and rmdir.

    Get-Content: Reads file data and outputs it to the console.

4. The Power of the Pipeline (|)

Piping in PowerShell is uniquely powerful because it passes entire objects with their properties and methods to the next command.
Advanced Filtering & Manipulation

    Sort-Object: Organizes output based on properties like Length (size) or Name.

    Where-Object: Filters objects based on specific criteria.

        Operators: -eq (equal), -ne (not equal), -gt (greater than), -ge (greater or equal), -lt (less than), -le (less or equal).

        Pattern Matching: The -like operator supports wildcards (e.g., -like "ship*").

    Select-Object: Used to pick specific properties (e.g., Name, Length) or limit the number of returned objects.

    Select-String: Searches for text patterns within files, similar to grep. It fully supports Regular Expressions (Regex) for complex matching.

5. System Administration & Forensic Cmdlets

PowerShell is an essential toolkit for real-time monitoring and incident response.

    Get-ComputerInfo: Provides a massive snapshot of system configuration, hardware specs, and BIOS details.

    Get-LocalUser: Lists local accounts, showing their status (Enabled/Disabled) and descriptions.

    Network Auditing:

        Get-NetIPConfiguration: Details network interfaces, IPs, DNS, and Gateways.

        Get-NetIPAddress: Shows all assigned IP addresses, including inactive ones.

        Get-NetTCPConnection: Displays active TCP connections, local/remote ports, and owning processes—critical for finding backdoors.

    Dynamic Monitoring:

        Get-Process: Displays running processes, CPU usage, and Memory (PM/WS).

        Get-Service: Checks the status (Running/Stopped) of system services.

    Integrity & Hidden Data:

        Get-FileHash: Generates SHA256 hashes to verify file integrity.

        ADS Discovery: Use Get-Item -Path "C:\Path" -Stream * to find Alternate Data Streams (hidden metadata or malicious payloads) attached to a file.

6. Remote Management & Scripting

Scripting automates complex, tedious tasks to reduce human error and save time.

    Invoke-Command: Executes commands or scripts on remote systems.

        Remote Scripting: Invoke-Command -FilePath c:\local_script.ps1 -ComputerName RemoteServer.

        Direct Execution: Use -ScriptBlock { ... } to run specific commands on a remote target.

    Cyber Security Roles:

        Defensive: System admins and incident responders use scripts to enforce security policies and detect anomalies.

        Offensive: Penetration testers use PowerShell for system enumeration and executing obfuscated payloads.

7. Syntax & Productivity

PowerShell exposes tools to explore objects, format output, and export results efficiently.

    Get-Member (alias gm): Shows the Properties and Methods of an object. Example: Get-Process | Get-Member to see what you can filter or format.

    Format-Table / Format-List: Control how objects are displayed. Use Format-Table Name,Id,CPU or Format-List * to reveal all properties.

    Export-Csv: Exports objects to a CSV file for later analysis (e.g., in Excel). Example: Get-Process | Export-Csv -Path processes.csv -NoTypeInformation.

    Out-File: Sends output to a text file. Example: Get-NetTCPConnection | Out-File -FilePath connections.txt.

    History: Get-History lists past commands, Invoke-History 3 re-runs command #3. Tab completion greatly speeds up typing and reduces mistakes.

8. Variables, Collections & Control Flow

PowerShell is a full scripting language with variables, arrays, dictionaries (hashtables), and control structures.

    Variables: Always prefixed with $. Example: $user = 'Alice', $count = 5. Double-quoted strings "..." interpolate variables: "User: $user".

    Arrays: Use the @() syntax. Example: $ports = @(80, 443, 3389). Access elements by index: $ports[0].

    Hashtables: Key-value pairs with @{ }. Example: $config = @{ Server = 'DC1'; Port = 389 } then $config.Server.

    Control flow: if ($condition) { ... } elseif (...) { ... } else { ... }. foreach ($p in Get-Process) { ... } iterates over processes.

    ForEach-Object: Used in the pipeline. Example: Get-Process | ForEach-Object { $_.Name } outputs only each process name.

9. Common Parameters & Error Handling

Many cmdlets share “common parameters” that help you work safely and predictably.

    -WhatIf: Simulates the action without actually performing it. Example: Remove-Item C:\Temp\* -WhatIf to preview what would be deleted.

    -Confirm: Forces an interactive confirmation before performing the action, even if policy does not require it.

    -ErrorAction: Controls behavior when errors occur (Continue, Stop, SilentlyContinue, Inquire). Example: Get-Item C:\secret.txt -ErrorAction SilentlyContinue ignores the error if the file does not exist.

    Try/Catch: Handles errors explicitly in scripts. Example: try { ... } catch { Write-Error "Failure: $_" } for robust automation.

10. Scripts, Profiles & Execution Policy

To automate tasks, PowerShell relies on scripts (.ps1) whose execution is controlled by a security policy.

    Script files (.ps1): A script is a plain text file with PowerShell commands, executed with .\script.ps1 (ensure you are in the correct directory).

    Execution Policy: Get-ExecutionPolicy shows the current policy (Restricted, RemoteSigned, Unrestricted, etc.). Set-ExecutionPolicy RemoteSigned is common in labs but must be managed carefully in production.

    PowerShell profiles: $PROFILE points to a script that runs when a PowerShell session starts. You can define aliases, functions, and environment customizations tailored to administration or investigation tasks.

    Logging & transcription: For investigations, you can enable PowerShell transcription (Start-Transcript) and advanced logging via Group Policy to record executed commands.