# Windows Fundamentals: Summary

---

## 1. Brief history of Windows
- **XP → Vista → 7:** XP was widely used, Vista poorly adopted, 7 took over.
- **Today:** Windows 10 end of support (Oct 14, 2025), Windows 11 for workstations, Windows Server 2025 for servers. A primary target for attackers.

## 2. The desktop (GUI)
- **Desktop:** Main workspace; right-click → Personalize / Display settings.
- **Start menu:** User/power, app list, pinned tiles.
- **Taskbar:** Running and pinned apps.
- **Notification area (system tray):** Date/time, volume, network, background app icons.

## 3. NTFS
- Replaces FAT16/FAT32.
- **Benefits:** Journaling (recovery after crash), files > 4 GB, granular permissions, encryption (EFS), built-in compression.

## 4. NTFS permissions
- **Full control** — do everything (including change permissions).
- **Modify** — read, write, delete (cannot manage permissions).
- **Read & execute** — view and run.
- **List folder contents** — list contents.
- **Read** — open a file.
- **Write** — change a file.
- *Check:* Right-click → Properties → Security tab.

## 5. Alternate Data Streams (ADS)
- One NTFS file can have multiple data streams.
- Default stream: `$DATA` (visible content). Additional streams: not shown in Explorer.
- **Security:** Used legitimately (e.g. “Downloaded from the Internet” marker) and by malware to hide code in harmless-looking files.

## 6. Windows folder & System32
- **C:\Windows:** Core of the OS. Environment variable `%windir%`.
- **C:\Windows\System32:** Essential system files. Do not delete or modify carelessly (risk of Blue Screen). Many admin tools live here.

## 7. User accounts & profiles
| Type | Role |
|------|------|
| **Administrator** | Full control, manage users and system, install software. |
| **Standard user** | Limited to own files and settings, no system-wide installation. |

- **Profiles:** C:\Users\<user> — Desktop, Documents, Downloads, Music, Pictures, etc.
- **Management:** `lusrmgr.msc` (Local Users and Groups). Groups assign permissions in bulk.

## 8. User Account Control (UAC)
- Even as admin, apps run with limited rights by default.
- Any sensitive action (install, system change) triggers an on-screen confirmation prompt.
- Shield icon on shortcuts that require elevation.

## 9. Settings vs Control Panel
- **Settings (Windows):** Modern UI (theme, Wi‑Fi, Windows Update).
- **Control Panel:** Advanced tools (accounts, network adapters, uninstall legacy programs). Use when an option is not in Settings.

## 10. Task Manager
- **Processes:** List of running apps and services; “End task” for frozen programs.
- **Performance:** Real-time CPU, memory, disk, network graphs.

---

## Key takeaways (security)
- **Principle of least privilege:** Prefer standard accounts to reduce attack surface.
- **UAC:** Gatekeeper against unauthorized system changes.
- **Visibility:** Task Manager and `lusrmgr.msc` to monitor and manage activity and access.
