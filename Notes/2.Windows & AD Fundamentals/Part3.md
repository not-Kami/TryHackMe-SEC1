# Windows Fundamentals: Summary — Security & data protection

---

## 1. Windows Update & patch management
- Delivers security patches, bug fixes, and feature updates.
- **Patch Tuesday:** Non-urgent security updates usually on the 2nd Tuesday of each month.
- **Out-of-band:** Critical fixes pushed as soon as a vulnerability is actively exploited.
- **Reboots:** Windows 10/11 can postpone restarts but will eventually force one so patches apply.

## 2. Windows Security (built-in suite)
- Central dashboard with status: green (protected), yellow (action recommended), red (attention required).

### Virus & threat protection (Microsoft Defender)
- **Scans:** Quick (common locations), Full (entire disk), Custom (chosen folders/USB).
- **Real-time protection:** Blocks malware before execution.
- **Controlled Folder Access:** Anti-ransomware; blocks unauthorized apps from changing protected folders (e.g. Documents).
- **Exclusions:** Skip scanning specific paths (risk: attackers may hide in excluded folders).

### Firewall & network protection
- **Domain:** Corporate/Active Directory networks.
- **Private:** Trusted home/office.
- **Public:** Strict; untrusted networks (e.g. café, airport).
- *Advanced interface:* `wf.msc`

### App & browser control (SmartScreen)
- Reputation-based: checks sites and downloads against a known-bad database; blocks unrecognized apps until the user allows them.

## 3. Hardware-based security (TPM & BitLocker)
- **TPM (Trusted Platform Module):** Secure chip on the motherboard; stores keys and checks system integrity at boot.
- **BitLocker:** Full-disk encryption; without the recovery key, data is unreadable (e.g. if the device is stolen). Works best with TPM.

## 4. Volume Shadow Copy Service (VSS)
- Creates point-in-time **shadow copies** of data.
- **System Restore:** Uses these snapshots to roll back after a bad update or driver.
- **Security note:** Ransomware often runs `vssadmin delete shadows` to remove snapshots and prevent recovery without paying.

## 5. Living off the land (LotL)
- Attackers use built-in Windows tools (PowerShell, cmd, msconfig, etc.) because they are trusted and trigger fewer alerts. This tactic is called *Living Off the Land*.

---

## Key takeaways (security / VAE)
- **Proactive defense:** Windows Update and Defender (scans, exclusions, Controlled Folder Access).
- **Network awareness:** Firewall profiles (Domain, Private, Public) and when to use each.
- **Incident recovery:** VSS and BitLocker for data integrity and recovery.
- **Hardware trust:** TPM as a root of trust for the OS.
