## Linux Command Cheat Sheet

Below is a handy reference for basic Linux commands and common shell operators. Each command includes a description and usage example.

---

### Basic Commands

#### `echo`
- **Description:** Prints text or variables to the terminal.
- **Example:**  
  ```bash
  echo "Hello, World!"
  ```

#### `whoami`
- **Description:** Displays the current logged-in user's username.
- **Example:**  
  ```bash
  whoami
  ```

#### `ls`
- **Description:** Lists files and directories in the current directory.
- **Example:**  
  ```bash
  ls -l
  ```

#### `cd`
- **Description:** Changes the current directory.
- **Example:**  
  ```bash
  cd /home/user/Documents
  ```

#### `cat`
- **Description:** Concatenates and displays the content of files.
- **Example:**  
  ```bash
  cat file.txt
  ```

#### `pwd`
- **Description:** Prints the working (current) directory.
- **Example:**  
  ```bash
  pwd
  ```

#### `find -name`
- **Description:** Searches for files and directories by name.
- **Example:**  
  ```bash
  find . -name "*.txt"
  ```

#### `grep`
- **Description:** Searches for patterns within files.
- **Example:**  
  ```bash
  grep "pattern" file.txt
  ```

#### `ssh`
- **Description:** Securely connects to a remote machine.
- **Example:**  
  ```bash
  ssh user@host
  ```

#### `man`
- **Description:** Displays the manual page for a command.
- **Example:**  
  ```bash
  man ls
  ```

#### `touch`
- **Description:** Creates an empty file or updates the timestamp of an existing file.
- **Example:**  
  ```bash
  touch newfile.txt
  ```

#### `mkdir`
- **Description:** Creates a new directory.
- **Example:**  
  ```bash
  mkdir new_folder
  ```

#### `cp`
- **Description:** Copies files or directories.
- **Example:**  
  ```bash
  cp source.txt destination.txt
  ```

#### `mv`
- **Description:** Moves or renames files and directories.
- **Example:**  
  ```bash
  mv oldname.txt newname.txt
  ```

#### `rm`
- **Description:** Removes (deletes) files or directories.
- **Example:**  
  ```bash
  rm file.txt
  rm -r folder/
  ```

#### `file`
- **Description:** Determines the type of a file.
- **Example:**  
  ```bash
  file filename
  ```

#### `nano`
- **Description:** Simple command-line text editor.
- **Example:**
  ```bash
  nano file.txt
  ```

#### `wget`
- **Description:** Downloads files from the web via HTTP, HTTPS, or FTP.
- **Example:**
  ```bash
  wget https://example.com/file.zip
  ```

#### `scp`
- **Description:** Securely copies files between hosts on a network (SSH-based).
- **Example:**
  ```bash
  scp file.txt user@remote:/path/
  ```

#### `python3 -m http.server`
- **Description:** Quickly starts an HTTP server in the current directory (serves files).
- **Example:**
  ```bash
  python3 -m http.server 8000
  ```

#### `ps`
- **Description:** Lists current running processes.
- **Example:**
  ```bash
  ps aux
  ```

#### `top`
- **Description:** Displays real-time system and process information (like Task Manager).
- **Example:**
  ```bash
  top
  ```

#### `kill`
- **Description:** Sends signals to processes (commonly to terminate them).
- **Examples:**
  ```bash
  kill <PID>           # Sends SIGTERM (default)
  kill -9 <PID>        # Sends SIGKILL (force kill)
  kill -19 <PID>       # Sends SIGSTOP (pause process)
  ```

#### Signals Overview
- `SIGTERM` (15): Gracefully asks process to terminate (`kill <PID>`).
- `SIGKILL` (9): Forcefully kills process (`kill -9 <PID>`).
- `SIGSTOP` (19): Stops (pauses) process execution (`kill -19 <PID>`).

#### `systemctl`
- **Description:** Manages systemd services (start/stop/status/etc).
- **Example:**
  ```bash
  systemctl status ssh
  systemctl start nginx
  systemctl stop apache2
  systemctl enable mysql
  systemctl disable <service>
  ```

#### `fg`
- **Description:** Brings a backgrounded process to the foreground.
- **Example:**
  ```bash
  fg
  ```





---

### Shell Operators

| Operator | Description                          | Example                        |
|----------|--------------------------------------|--------------------------------|
| `&`      | Runs command in background           | `sleep 60 &`                   |
| `&&`     | Runs next command if previous succeeds| `mkdir test && cd test`        |
| `>`      | Redirects output (overwrite)         | `echo hi > file.txt`           |
| `>>`     | Redirects output (append)            | `echo hi >> file.txt`          |

---
