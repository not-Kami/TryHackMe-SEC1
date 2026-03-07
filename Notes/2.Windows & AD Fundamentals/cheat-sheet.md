# Windows & AD Fundamentals — Command cheat sheet

Quick reference for tools and commands. Run `.msc` and executables via **Win + R** or a command prompt.

---

## Run / MMC snap-ins (.msc)

| Command | Purpose |
|---------|---------|
| `lusrmgr.msc` | Local Users and Groups |
| `msconfig` | System Configuration (startup, boot, services, tools) |
| `compmgmt.msc` | Computer Management (Task Scheduler, Event Viewer, Disk Management, Services, etc.) |
| `eventvwr.msc` | Event Viewer (direct) |
| `services.msc` | Services (direct) |
| `diskmgmt.msc` | Disk Management (direct) |
| `devmgmt.msc` | Device Manager |
| `msinfo32` | System Information |
| `resmon` | Resource Monitor |
| `regedit` | Registry Editor |
| `wf.msc` | Windows Firewall with Advanced Security |
| `dsa.msc` | Active Directory Users and Computers |
| `gpmc.msc` | Group Policy Management Console |

---

## CMD — System & identity

| Command | Purpose |
|---------|---------|
| `hostname` | Display computer name |
| `whoami` | Current user |
| `whoami /all` | Current user, groups, privileges |
| `systeminfo` | OS, hostname, patch level, etc. |

---

## CMD — Network

| Command | Purpose |
|---------|---------|
| `ipconfig` | Basic IP config |
| `ipconfig /all` | Full config (IP, gateway, DNS, MAC) |
| `ipconfig /release` | Release DHCP lease |
| `ipconfig /renew` | Renew DHCP lease |
| `netstat -an` | All connections and listening ports (numeric) |
| `netstat -ano` | Same + process ID (PID) |
| `ping <host>` | Test connectivity |
| `nslookup <name>` | DNS lookup |

---

## CMD — Users (local)

| Command | Purpose |
|---------|---------|
| `net user` | List local user accounts |
| `net user <name>` | Details for one user |
| `net user <name> <password>` | Set password (run as admin) |
| `net localgroup` | List local groups |
| `net localgroup Administrators` | Members of Administrators |

---

## CMD — General

| Command | Purpose |
|---------|---------|
| `cls` | Clear screen |
| `exit` | Close CMD |
| `<command> /?` | Help for that command (e.g. `ipconfig /?`) |

---

## Group Policy

| Command | Purpose |
|---------|---------|
| `gpupdate /force` | Apply GPO immediately (default refresh ~90 min on workstations) |
| `gpresult /r` | Resultant set of policies for current user |
| `gpresult /h report.html` | Export report to HTML |

---

## PowerShell — Active Directory (RSAT)

*Requires RSAT (Remote Server Administration Tools) or AD module on a DC.*

| Command | Purpose |
|---------|---------|
| `Set-ADAccountPassword -Identity <user> -Reset` | Reset user password (prompts for new password) |
| `Set-ADUser -Identity <user> -ChangePasswordAtLogon $true` | Force password change at next logon |
| `Get-ADUser -Identity <user>` | Get AD user object |
| `Get-ADComputer -Identity <name>` | Get AD computer object |
| `Get-ADGroupMember -Identity "Domain Admins"` | List members of a group |

---

## VSS (Volume Shadow Copy)

| Command | Purpose |
|---------|---------|
| `vssadmin list shadows` | List shadow copies |
| `vssadmin delete shadows /all` | Delete all shadow copies (*often used by ransomware*) |

---

## Useful paths & shell shortcuts

| Path / shortcut | Purpose |
|------------------|---------|
| `%windir%` | C:\Windows |
| `C:\Windows\System32` | Core system and many admin tools |
| `C:\Windows\SYSVOL\sysvol\` | SYSVOL (GPO storage) |
| `C:\Users\<user>` | User profile |
| `shell:startup` | Run dialog → opens Startup folder (e.g. for Server startup items) |

---

## One-liner recap

```
lusrmgr  → users/groups    |  msconfig  → startup/boot/services
compmgmt → scheduler, events, disk, services  |  msinfo32 → system info
resmon   → resources       |  wf.msc    → firewall
dsa.msc  → AD users/OUs    |  gpmc.msc  → GPO
gpupdate /force  → apply GPO now

hostname | whoami | ipconfig /all | netstat -an | net user
```
