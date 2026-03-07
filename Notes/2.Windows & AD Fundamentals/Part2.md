# Windows Fundamentals: Summary — System utilities & advanced tools

---

## 1. System Configuration (msconfig)
- **General:** Normal, Diagnostic, or Selective startup.
- **Boot:** Safe Mode and advanced boot options.
- **Services:** Background apps; hide Microsoft services to spot third-party or suspicious ones.
- **Startup:** In modern Windows, redirects to Task Manager. On Windows Server, check the Startup folder (`shell:startup`).
- **Tools:** Launcher for other admin tools (Registry Editor, Event Viewer, etc.).

## 2. Advanced system settings & performance
- **Virtual memory (page file):** When RAM is full, Windows uses disk space. Size managed under Performance options.
- **Startup & recovery:** Crash dumps (BSOD) — analysts use them to inspect memory at the moment of crash.
- **UAC:** Slider from “Always notify” to “Never notify” to adjust strictness.

## 3. Computer Management (compmgmt.msc)
| Area | Tools |
|------|--------|
| **System Tools** | Task Scheduler, Event Viewer, Shared Folders, Device Manager |
| **Storage & Services** | Disk Management, Services |

- **Task Scheduler:** Run scripts or programs on a schedule or on events.
- **Event Viewer:** Application (crashes), Security (logons — key for audits), System (hardware/drivers).
- **Shared Folders:** Folders shared on the network.
- **Device Manager:** Hardware drivers (printers, GPU, USB).
- **Disk Management:** Format drives, change drive letters, shrink/extend partitions.
- **Services:** Startup type — Automatic, Manual, or Disabled.

## 4. System Information (msinfo32) & Resource Monitor (resmon)
- **msinfo32:** Hardware (CPU, BIOS) and software (environment variables) summary.
- **resmon:** More detailed than Task Manager; real-time usage and which files or IPs a process uses.

## 5. Command line (CMD)
| Command | Purpose |
|---------|---------|
| `hostname` | Computer name |
| `whoami` | Current user |
| `ipconfig /all` | Full network config (IP, gateway, DNS) |
| `netstat -an` | Active connections |
| `net user` | User accounts (e.g. `net user administrator`) |
| `cls` | Clear screen |
| `command /?` | Help for a command (e.g. `ipconfig /?`) |

## 6. Windows Registry (regedit)
- Hierarchical database for hardware, software, and user configuration — the “brain” of Windows.
- Most GUI changes (Settings, Control Panel) are stored as Registry values.

---

## Key takeaways (security / VAE)
- **Auditing:** Event Viewer to track system and security events.
- **Automation:** Task Scheduler for scheduled maintenance.
- **Optimization:** Virtual memory and Services management.
- **CLI:** Using CMD for fast, scriptable administration.
