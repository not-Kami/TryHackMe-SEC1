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

---

### Shell Operators

| Operator | Description                          | Example                        |
|----------|--------------------------------------|--------------------------------|
| `&`      | Runs command in background           | `sleep 60 &`                   |
| `&&`     | Runs next command if previous succeeds| `mkdir test && cd test`        |
| `>`      | Redirects output (overwrite)         | `echo hi > file.txt`           |
| `>>`     | Redirects output (append)            | `echo hi >> file.txt`          |

---
