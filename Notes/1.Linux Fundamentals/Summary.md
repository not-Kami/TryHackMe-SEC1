# Linux Fundamentals: Study Guide

---

## Part 1

### 1. Introduction: The Linux Ecosystem

Linux isn't just a single Operating System (OS); it's an "umbrella" term for systems based on **UNIX**. Because it is **open-source**, it comes in many "flavours" called **Distributions** (or Distros).

* **Where is it used?** Everywhere! From the websites you visit and car entertainment panels to Point of Sale (PoS) systems and critical infrastructure like traffic light controllers.
* **Key Advantage:** It is incredibly lightweight. **Ubuntu Server**, for instance, can run on as little as **512MB of RAM**.
* **The Terminal:** Unlike Windows or macOS, Linux is often managed via a text-based "Terminal." While intimidating at first, it allows for extreme efficiency and automation.

---

### 2. First Steps & Identity

Before interacting with files, you need to know your context within the system.

* **`whoami`**: Displays the username of the current logged-in user.
* **`echo`**: Outputs the text you provide to the terminal. *Pro Tip:* If your text contains spaces, wrap it in double quotes: `echo "Hello World"`.
* **`pwd` (Print Working Directory)**: Shows the full path of your current location (e.g., `/home/ubuntu/Documents`). Think of it as your "GPS."

---

### 3. Navigating the Filesystem

Moving around without a mouse requires mastering three core commands:

* **`ls` (Listing)**: Lists the contents of your current directory.
  * `ls -a`: Shows **hidden files** (those starting with a dot, like `.bashrc`).
  * `ls -l`: Displays a "long" list with details like permissions, size, and owners.
* **`cd` (Change Directory)**: Used to move between folders.
  * `cd Pictures`: Moves into the Pictures folder.
  * `cd ..`: Moves "up" one level to the parent directory.
* **`cat` (Concatenate)**: Displays the entire content of a file directly in the terminal. *Example:* `cat todo.txt` will let you read your notes without opening an editor.

---

### 4. File & Directory Management

| Command     | Purpose                                           | Example                    |
| ----------- | ------------------------------------------------- | -------------------------- |
| **`touch`** | Creates a blank file.                             | `touch notes.txt`          |
| **`mkdir`** | Creates a new directory (folder).                 | `mkdir my_project`         |
| **`cp`**    | Copies a file or folder.                          | `cp file.txt backup.txt`   |
| **`mv`**    | Moves **OR** renames a file/folder.               | `mv old_name.txt new_name.txt` |
| **`rm`**    | Removes a file. **Warning: This is permanent.**   | `rm file.txt`              |
| **`rm -R`** | Removes a directory and everything inside it.     | `rm -R my_folder`          |
| **`file`**  | Identifies the file type (text, data, executable).| `file note`                |

---

### 5. Advanced Searching & Filtering

#### The `find` Command

Used to search for files based on their names or extensions.

* By name: `find -name "passwords.txt"`
* Using wildcards (`*`): `find -name "*.txt"` (finds every text file in the current directory).

#### The `grep` Command

Allows you to search **inside** files for specific text or values.

* `grep "81.143.211.90" access.log`: Finds every line in a massive log file associated with that specific IP address.
* `grep -R "API_KEY" /etc/`: Recursively searches for "API_KEY" in every file within the `/etc/` directory.

---

### 6. Shell Operators (The Power-Ups)

Operators allow you to chain commands together to create small "scripts" on the fly.

1. **`&` (Background)**: Runs a command in the background. Use this for long tasks (like copying a 10GB file) so you can keep using your terminal.
2. **`&&` (AND)**: `command1 && command2`. The second command runs **only if** the first one succeeds.
3. **`>` (Redirect)**: Takes the output of a command and saves it to a file, **overwriting** anything already there (e.g., `echo "hi" > file.txt`).
4. **`>>` (Append)**: Same as `>`, but it **adds** the text to the end of the file instead of deleting the old content.

---

### 7. Remote Access: SSH (Secure Shell)

SSH is the industry standard for managing remote Linux servers securely.

* **Connection:** `ssh username@IP_ADDRESS`
* **Encryption:** Everything sent over SSH is encrypted.
* **Note:** When typing your password, **no characters or stars will appear**. This is a security feature; just type it and press Enter.

---

### 8. Getting Help (The Manuals)

Linux is self-documenting. If you get stuck:

* `command --help`: A quick summary of options and switches.
* **`man` (Manual Pages)**: The full, detailed documentation for any command. *Example:* `man ls` opens the complete manual for the listing command.

---

## Part 2

### 1. Advanced Command Usage: Flags & Arguments

Most Linux commands have a **default behavior**, but you can modify or extend what they do using **flags** (also called switches or options). These are usually identified by a hyphen (`-`).

* **Example with `ls`:**
  * `ls`: Shows visible files only.
  * `ls -a`: Shows **all** files, including hidden ones (those starting with a `.`).
  * `ls -lh`: Shows a **long** listing with **human-readable** file sizes (e.g., 1KB instead of 1024).

You don't need to memorize every flag. Linux provides two built-in ways to learn:

1. **`--help` flag**: A quick summary of available options (e.g., `ls --help`).
2. **`man` pages**: The "Manual." Typing `man ls` opens a full, interactive textbook on that command. Use `q` to quit.

---

### 2. Permissions & Ownership

Linux is a multi-user system. Access is controlled via **Permissions** assigned to three different entities: **Owner**, **Group**, and **Others**.

#### Symbolic vs. Numeric Format

Permissions are often shown as `rwxrwxrwx` (Read, Write, Execute). Each letter has a numeric value:

* **Read (r)** = 4
* **Write (w)** = 2
* **Execute (x)** = 1

**How to calculate:** Add the numbers for each group.

* `rwx` = 4+2+1 = **7**
* `r-x` = 4+0+1 = **5**
* `rw-` = 4+2+0 = **6**

**Common Examples:**

* `777`: Everyone can do everything (dangerous!).
* `755`: Owner can do everything; others can only read and execute.
* `644`: Owner can read/write; others can only read.

> **Command Tip:** Use `chmod 600 private.txt` to make a file readable/writable only by you.

---

### 3. Switching Users (`su`)

If you need to perform tasks as another user (like "user2"), use the `su` (substitute user) command.

* `su user2`: Switches to user2 but keeps your current environment/folder.
* **`su -l user2`**: (Recommended) Performs a "clean" login. You inherit user2's environment variables and start in their home directory.

---

### 4. Critical System Directories

The Linux directory structure is standardized. Knowing where things are stored is vital for troubleshooting.

| Directory   | Purpose |
| ----------- | ------- |
| **`/etc`**  | **System Configuration.** Stores settings, passwords (`/etc/passwd`), and the `sudoers` list. |
| **`/var`**  | **Variable Data.** Stores logs (`/var/log`) and databases that change constantly. |
| **`/root`** | The home directory for the **root user** (administrator). Normal users cannot enter this. |
| **`/tmp`**  | **Volatile Data.** Used for temporary files. It is wiped every time the system reboots. |

---

## Part 3

### 1. Terminal Text Editors

While `echo` is fine for single lines, real configuration requires a text editor.

#### Nano (Beginner Friendly)

Nano is the most straightforward editor.

* **Command:** `nano filename`
* **Navigation:** Use arrow keys.
* **Shortcuts:** (The `^` symbol represents the **Ctrl** key)
  * `Ctrl + O`: Save (Write Out).
  * `Ctrl + X`: Exit.
  * `Ctrl + W`: Search (Where Is).

#### VIM (Advanced)

VIM is powerful and pre-installed on almost every UNIX system. It has a steeper learning curve because it uses "modes" (Insert mode to type, Command mode to navigate). Highly customizable and supports syntax highlighting for coding.

---

### 2. Transferring & Serving Files

#### Downloading (wget)

Use `wget` to download files via HTTP/HTTPS.

* **Syntax:** `wget http://remote-url.com/file.txt`

#### Secure Copy (SCP)

SCP uses the SSH protocol to copy files securely between two computers.

* **Upload:** `scp local_file.txt user@remote_ip:/home/user/dest_name.txt`
* **Download:** `scp user@remote_ip:/home/user/remote_file.txt local_name.txt`

#### Quick Web Server (Python)

You can turn any directory into a temporary download station using Python:

* **Command:** `python3 -m http.server 8000`
* This allows others to download your files by visiting `http://YOUR_IP:8000`.

---

### 3. Process Management

A **process** is a running program. Every process has a unique **PID** (Process ID).

* **`ps aux`**: View every running process on the system (including those of other users).
* **`top`**: A real-time, interactive task manager.
* **`kill [PID]`**: Stops a process.
  * `SIGTERM` (Default): Asks the program to close nicely.
  * `SIGKILL` (`-9`): Forces the program to stop immediately.

#### Background vs. Foreground

* **Foreground:** The command occupies your terminal (you can't type anything else).
* **Background (`&`)**: Adding `&` to the end of a command lets it run while you keep working.
* **`Ctrl + Z`**: Suspends a foreground process.
* **`fg`**: Brings a background/suspended process back to the foreground.

---

### 4. Automation with Cron

**Cron** is the Linux service for scheduling tasks.

* **Command:** `crontab -e` (to edit your schedule).
* **Format:** `MIN HOUR DOM MON DOW COMMAND`
* Example: `0 0 * * * /backup.sh` (Runs a backup every day at midnight).
* The asterisk `*` acts as a wildcard (meaning "every").

---

### 5. Package Management (APT)

Ubuntu uses the **APT** (Advanced Package Tool) to manage software.

* **Repositories:** These are "app stores" for Linux. You can add third-party ones in `/etc/apt/sources.list.d/`.
* **`sudo apt update`**: Refreshes the list of available software.
* **`sudo apt install [package]`**: Downloads and installs software.
* **`sudo apt remove [package]`**: Uninstalls software.

---

### 6. System Logs

Logs are vital for troubleshooting and security (Pentesting/Forensics). They are stored in **`/var/log`**.

* **`/var/log/apache2/access.log`**: Every request made to the web server.
* **`/var/log/auth.log`**: Records of logins and `sudo` attempts.
* **Log Rotation:** Linux automatically compresses old logs to save space (e.g., `syslog.1.gz`).
