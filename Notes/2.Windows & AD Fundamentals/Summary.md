# Windows & AD Fundamentals — Summary

Consolidated overview of the four parts. Use this as a quick reference and revision base.

---

## Part 1 — Basics & filesystem

- **Windows today:** 10 (EOL Oct 2025), 11 for workstations, Server 2025 for servers.
- **GUI:** Desktop, Start menu, Taskbar, System tray (right-click → Personalize / Display settings).
- **NTFS:** Journaling, files > 4 GB, permissions, EFS, compression. Permissions: Full control, Modify, Read & execute, List folder contents, Read, Write (Properties → Security).
- **ADS (Alternate Data Streams):** Hidden extra data in files; used by malware to hide payloads.
- **C:\Windows, System32:** Core OS; `%windir%`. Do not modify blindly.
- **Accounts:** Administrator vs Standard user. Profiles in `C:\Users\<user>`. `lusrmgr.msc` for Local Users and Groups.
- **UAC:** Apps run with limited rights by default; elevation prompt for system changes; shield icon on elevated shortcuts.
- **Settings** (modern) vs **Control Panel** (advanced). **Task Manager:** Processes, Performance.

---

## Part 2 — System utilities & advanced tools

- **msconfig:** General (startup type), Boot (Safe Mode), Services (hide Microsoft to find third-party), Startup (→ Task Manager), Tools (launcher for other tools).
- **Advanced system settings:** Virtual memory (page file), Startup & recovery (crash dumps), UAC slider.
- **compmgmt.msc:** Task Scheduler, Event Viewer (Application / Security / System), Shared Folders, Device Manager, Disk Management, Services (Automatic / Manual / Disabled).
- **msinfo32:** System summary. **resmon:** Detailed resource and network use per process.
- **CMD:** `hostname`, `whoami`, `ipconfig /all`, `netstat -an`, `net user`, `cls`, `command /?`.
- **Registry (regedit):** Central configuration database; GUI settings are stored here.

---

## Part 3 — Security & data protection

- **Windows Update:** Patch Tuesday (2nd Tuesday), out-of-band for critical issues, forced reboots on 10/11.
- **Windows Security:** Defender (Quick/Full/Custom scan, Real-time, Controlled Folder Access, Exclusions), Firewall (Domain / Private / Public), SmartScreen. Advanced firewall: `wf.msc`.
- **TPM:** Hardware root of trust; stores keys, integrity check at boot. **BitLocker:** Full-disk encryption; use with TPM.
- **VSS:** Shadow copies for System Restore. Ransomware often runs `vssadmin delete shadows`.
- **Living off the land (LotL):** Abuse of built-in tools (PowerShell, cmd, etc.) to evade detection.

---

## Part 4 — Active Directory

- **AD DS:** Central directory. **DC:** Server hosting AD DS. **Objects:** Users, Computers (`Name$`), Security groups (e.g. Domain Admins, Backup Operators).
- **OUs:** Apply GPOs; one OU per user. **Security groups:** Access to resources; user can be in many. **Delegation:** Limited admin over an OU (e.g. Reset password for Sales).
- **GPO:** Stored in SYSVOL. Applied: Domain → Site → OU. Computer config (at boot) vs User config (at logon). `gpupdate /force`.
- **Kerberos:** TGT (AS-REQ/AS-REP) then TGS (TGS-REQ/TGS-REP) for services; no password on wire. **NTLM:** Challenge–response; legacy.
- **Tree:** Contiguous namespace. **Forest:** One or more trees; security boundary. **Trust:** One-way or two-way.
- **Tools:** `dsa.msc`, `gpmc.msc`. **PowerShell:** `Set-ADAccountPassword`, `Set-ADUser -ChangePasswordAtLogon $true`.

---

## Quick reference — Key tools & commands

| Tool / command | Purpose |
|----------------|---------|
| `lusrmgr.msc` | Local Users and Groups |
| `msconfig` | Startup, Boot, Services, Tools |
| `compmgmt.msc` | Task Scheduler, Event Viewer, Disk Management, Services |
| `msinfo32` | System information |
| `resmon` | Resource Monitor |
| `wf.msc` | Windows Firewall (advanced) |
| `dsa.msc` | AD users, computers, OUs |
| `gpmc.msc` | Group Policy Management |
| `gpupdate /force` | Apply GPO immediately |
| `hostname`, `whoami`, `ipconfig /all`, `netstat -an` | CMD basics |

---

## Security takeaways

- Least privilege (standard accounts), UAC, Task Manager and Event Viewer for visibility.
- Patching (Windows Update), Defender (scans, exclusions, Controlled Folder Access), firewall profiles.
- TPM + BitLocker, VSS for recovery; awareness of LotL and ransomware (e.g. VSS deletion).
- AD: GPOs for baseline, Kerberos over NTLM, delegation instead of global admin.
