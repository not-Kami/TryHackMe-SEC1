# Windows Fundamentals: Summary — Active Directory (technical architecture)

---

## 1. Core infrastructure
- **AD DS (Active Directory Domain Services):** Central directory database.
- **Domain Controller (DC):** Server that hosts AD DS.
- **Objects:**
  - **Users:** Security principals (people or service accounts).
  - **Machines (computers):** Identified by `Name$`; password is a long random value, rotated automatically by the system.
  - **Security groups:** Used to assign permissions (e.g. Domain Admins = full control over domain/forest; Backup Operators = bypass file permissions for backup).

## 2. OUs vs security groups
| Purpose | OUs | Security groups |
|--------|-----|------------------|
| **Role** | Apply GPOs (Group Policy) | Grant access to resources (files, printers) |
| **Membership** | User in one OU only | User can be in many groups |

- **Delegation:** Grant limited admin rights (e.g. “Reset password”) to a user over a specific OU (e.g. Sales) without making them Domain Admin.

## 3. Group Policy Objects (GPO)
- Define security baseline and environment (settings, software, restrictions).
- **Storage:** SYSVOL share (`C:\Windows\SYSVOL\sysvol\`).
- **Order of application:** Domain → Site → OU (later GPO can override earlier).
- **Computer configuration:** Applied at machine startup.
- **User configuration:** Applied at user logon.
- **Refresh:** `gpupdate /force` applies immediately (normal refresh is periodic, e.g. ~90 minutes for workstations).

## 4. Authentication protocols
### Kerberos (default, preferred)
- Ticket-based; password not sent over the network.
- **AS-REQ / AS-REP:** Client gets a **TGT** (Ticket Granting Ticket) from the KDC (Key Distribution Center).
- **TGS-REQ / TGS-REP:** Client uses TGT to get a **TGS** (Ticket Granting Service ticket) for a specific service; TGS is encrypted with the service account’s key.

### NTLM / NetNTLM (legacy)
- Challenge–response: server sends a challenge, client responds using its NTLM hash; DC verifies the response. Weaker than Kerberos; used for compatibility.

## 5. Global structures
- **Tree:** One or more domains sharing a contiguous DNS namespace (e.g. `uk.thm.local` under `thm.local`).
- **Forest:** One or more trees; the main security boundary. All domains in a forest trust each other by default.
- **Trust:** Allows users in one domain to access resources in another.
  - **One-way:** Domain A trusts B → users in B can access resources in A (as configured).
  - **Two-way:** Mutual trust.

---

## Key takeaways & useful commands
- **Admin tools:** `dsa.msc` (users/computers/OUs), `gpmc.msc` (Group Policy Management).
- **PowerShell (RSAT):**
  - `Set-ADAccountPassword -Identity <user> -Reset` — reset password.
  - `Set-ADUser -Identity <user> -ChangePasswordAtLogon $true` — force password change at next logon.
