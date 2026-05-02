// ============================================================
// PAGES-DOMAINS.JS — All 12 Domain Content Pages
// ============================================================

// ── helpers ─────────────────────────────────────────────────
function domainHero(label, title, hl, desc) {
  return `<div class="hero">
    <div class="hero-label">${label}</div>
    <h1>${title} <span>${hl}</span></h1>
    <p>${desc}</p>
  </div>`;
}
function tbl(rows) {
  return `<table class="cmd-table"><thead><tr><th>Command / Syntax</th><th>Description</th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}
  </tbody></table>`;
}
function sec(title, content) {
  return `<div class="cmd-section"><h3>${title}</h3>${content}</div>`;
}
function tabs(id, labels, panels) {
  return `<div class="tabs">${labels.map((l,i)=>`<div class="tab ${i===0?'active':''}" onclick="switchTab('${id}','tab-${id}-${i}')">${l}</div>`).join('')}</div>
    ${panels.map((p,i)=>`<div class="tab-panel ${i===0?'active':''}" id="tab-${id}-${i}">${p}</div>`).join('')}`;
}

// ── ESSENTIAL TOOLS ─────────────────────────────────────────
function renderEssentials() {
  return domainHero('Domain 01','Essential','Tools','The foundation of every RHCSA task. These commands appear throughout the entire exam.') + `
  <div class="content">
  ${tabs('ess',['Navigation','Files & Text','grep & find','I/O Redirection','Vim Editor','Archive & SSH'],[
    // NAV
    sec('Shell Navigation', tbl([
      ['pwd','Print current working directory'],['cd /path','Change to absolute path'],['cd ~','Go to home directory'],
      ['cd -','Go to previous directory'],['ls -lah','List all files with human-readable sizes'],
      ['ls -lt','Sort by modification time'],['history','Show command history'],['!n','Re-run command n from history'],
      ['Ctrl+R','Reverse search history'],['man command','Manual pages — available in exam!'],
      ['command --help','Quick usage summary'],['type cmd','Show if cmd is alias/function/binary'],
    ])) + `<div class="info-box">💡 <strong>Exam tip:</strong> <code>man</code> pages are fully available during the exam. Learn to search with <code>/keyword</code> inside man, then <code>n</code> for next match.</div>`,
    // FILES
    sec('File Management', tbl([
      ['touch file.txt','Create empty file or update timestamp'],['mkdir -p /a/b/c','Create nested directories at once'],
      ['cp -a src dst','Archive copy — preserves permissions, timestamps, links'],['cp -r src/ dst/','Recursive copy'],
      ['mv file /path/','Move or rename'],['rm -rf /dir','Force-remove directory (careful!)'],
      ['ln -s target link','Create symbolic link'],['ln target hardlink','Create hard link'],
      ['cat file','Print file content'],['less file','Page through file (q=quit, /=search)'],
      ['head -n 20 file','First 20 lines'],['tail -n 20 file','Last 20 lines'],
      ['tail -f file','Follow live output (logs)'],['wc -l file','Count lines'],
      ['sort file','Sort alphabetically'],['uniq file','Remove adjacent duplicates'],
      ['cut -d: -f1 file','Extract field 1 (delimiter :)'],['tr a-z A-Z','Translate characters'],
      ['diff file1 file2','Show differences'],['stat file','Detailed file metadata'],
      ['file /path','Determine file type'],
    ])),
    // GREP & FIND
    sec('grep — Search Content', tbl([
      ['grep "pat" file','Search for pattern'],['grep -i "pat" file','Case-insensitive'],
      ['grep -r "pat" /dir','Recursive search'],['grep -v "pat" file','Invert: lines NOT matching'],
      ['grep -n "pat" file','Show line numbers'],['grep -c "pat" file','Count matching lines'],
      ['grep -l "pat" /dir/*','List only filenames that match'],['grep -E "p1|p2" file','Extended regex (OR)'],
      ['grep -A 3 "pat" file','3 lines After match'],['grep -B 2 "pat" file','2 lines Before match'],
    ])) + sec('find — Locate Files', tbl([
      ['find / -name "*.conf"','Find by name pattern'],['find / -type f -name x','Regular files only'],
      ['find / -type d -name x','Directories only'],['find / -user alice','Owned by alice'],
      ['find / -group grp','Owned by group'],['find / -perm /4000','Files with SUID bit'],
      ['find / -perm /2000','Files with SGID bit'],['find / -size +10M','Larger than 10MB'],
      ['find / -mtime -7','Modified in last 7 days'],['find / -mtime +30','Modified more than 30 days ago'],
      ['find / -exec ls -la {} \\;','Run command on each found file'],
      ['find / -exec cp {} /bk/ \\;','Copy all found files'],
    ])),
    // I/O
    sec('I/O Redirection', tbl([
      ['cmd > file','Redirect stdout → file (overwrite)'],['cmd >> file','Redirect stdout → file (append)'],
      ['cmd 2> file','Redirect stderr → file'],['cmd 2>&1','Redirect stderr to stdout'],
      ['cmd &> file','Redirect both stdout and stderr'],['cmd < file','Read stdin from file'],
      ['cmd1 | cmd2','Pipe stdout of cmd1 to stdin of cmd2'],['cmd | tee file','Print + write to file'],
      ['cmd1 && cmd2','Run cmd2 only if cmd1 succeeds'],['cmd1 || cmd2','Run cmd2 only if cmd1 fails'],
      ['/dev/null','Discard: cmd &> /dev/null'],
    ])) + `<pre><span style="color:var(--muted)"># Practical examples:</span>
grep "ERROR" /var/log/messages 2>/dev/null | sort | uniq -c | sort -rn | head -20
find /etc -name "*.conf" -mtime -7 2>/dev/null | xargs ls -la 2>/dev/null | tee /tmp/recent_conf.txt</pre>`,
    // VIM
    sec('Vim — The Exam Editor', '') + `
    <div class="warn-box">⚠️ Vim is the primary editor in the RHCSA exam. You MUST know it. Practice until it is muscle memory.</div>
    ${tbl([
      ['i / a / o / O','Insert before cursor / after / new line below / above'],
      ['Esc','Return to normal mode'],
      [':w','Save'],   [':q','Quit'],   [':wq or :x','Save and quit'],   [':q!','Quit WITHOUT saving'],
      ['dd','Delete (cut) current line'],['ndd','Delete n lines'],['yy','Yank (copy) line'],['nyy','Copy n lines'],
      ['p','Paste below'],['P','Paste above'],['u','Undo'],['Ctrl+R','Redo'],
      ['/pattern','Search forward'],['n / N','Next / previous match'],
      [':%s/old/new/g','Replace ALL occurrences in file'],
      [':N,Ms/old/new/g','Replace in lines N to M'],
      [':set number','Show line numbers'],['gg / G','First / last line'],
      [':N','Go to line N'],['dG','Delete from cursor to end'],
      ['v + motion','Visual select'],['Ctrl+V','Visual block select'],
      ['> / <','Indent / unindent selected'],
    ])}`,
    // ARCHIVE
    sec('Archive & Compression', tbl([
      ['tar -cvf archive.tar /dir','Create tar archive'],['tar -xvf archive.tar','Extract tar'],
      ['tar -czvf file.tar.gz /dir','Create gzip archive'],['tar -xzvf file.tar.gz','Extract gzip'],
      ['tar -cjvf file.tar.bz2 /dir','Create bzip2 archive'],['tar -xjvf file.tar.bz2','Extract bzip2'],
      ['tar -tf archive.tar','List contents without extracting'],
      ['gzip file / gunzip file.gz','Compress/decompress gzip'],
      ['zip -r arch.zip /dir / unzip arch.zip','Zip/unzip'],
    ])) + sec('SSH & Remote Access', tbl([
      ['ssh user@host','Connect to remote host'],['ssh -p 2222 user@host','Custom port'],
      ['ssh-keygen','Generate key pair (RSA by default)'],['ssh-copy-id user@host','Copy public key to host'],
      ['scp file user@host:/path','Copy file to remote'],['scp user@host:/file .','Copy from remote'],
      ['rsync -av src/ dst/','Efficient sync (shows changes)'],
    ])),
  ])}
  ${renderFooter()}</div>`;
}

// ── USERS & GROUPS ───────────────────────────────────────────
function renderUsers() {
  return domainHero('Domain 02','Users','& Groups','User management, group management, passwords, sudo privileges, and key config files.') + `
  <div class="content">
  <div class="info-box">📁 Key files: <code>/etc/passwd</code> · <code>/etc/shadow</code> · <code>/etc/group</code> · <code>/etc/sudoers</code> · <code>/etc/login.defs</code> · <code>/etc/skel/</code></div>
  ${tabs('usr',['User Management','Group Management','sudo & su','Config Files'],[
    // USERS
    sec('User Operations', tbl([
      ['useradd alice','Create user with defaults'],['useradd -m -s /bin/bash -c "Alice" alice','With home, shell, comment'],
      ['useradd -u 1500 alice','Specific UID'],['useradd -g devs alice','Primary group'],
      ['useradd -G wheel,docker alice','Supplementary groups'],['useradd -r sysacct','System account (UID<1000, no home)'],
      ['useradd -e 2026-12-31 alice','Account expiry date'],['useradd -d /opt/alice alice','Custom home dir'],
      ['usermod -aG wheel alice','ADD to group (keep existing) — -a is critical!'],
      ['usermod -G wheel alice','REPLACE all supplementary groups ← DANGER!'],
      ['usermod -s /sbin/nologin alice','Disable login shell'],['usermod -L alice','Lock account'],
      ['usermod -U alice','Unlock account'],['usermod -d /new/home alice','Change home'],
      ['userdel alice','Delete user (keep home)'],['userdel -r alice','Delete user AND home'],
      ['passwd alice','Set/change password'],['passwd -l alice','Lock (disable login)'],
      ['passwd -u alice','Unlock password'],['passwd -e alice','Expire password immediately'],
      ['chage -l alice','List password aging info'],['chage -M 90 alice','Max password age: 90 days'],
      ['chage -m 7 alice','Min password age: 7 days'],['chage -W 14 alice','Warning 14 days before expiry'],
      ['chage -E 2026-12-31 alice','Account expiry date'],['chage -d 0 alice','Force change at next login'],
      ['id alice','Show UID, GID, groups'],['whoami','Current user'],['who / w','Logged-in users'],['last','Login history'],
    ])),
    // GROUPS
    sec('Group Operations', tbl([
      ['groupadd devs','Create group'],['groupadd -g 2000 devs','Specific GID'],
      ['groupmod -n newname devs','Rename group'],['groupdel devs','Delete group'],
      ['gpasswd -a alice devs','Add alice to devs'],['gpasswd -d alice devs','Remove alice from devs'],
      ['gpasswd -A alice devs','Make alice group admin'],['newgrp devs','Switch active group'],
      ['groups alice','Show alice\'s groups'],['getent group devs','Query group database'],
    ])),
    // SUDO
    sec('su — Switch Users', tbl([
      ['su - alice','Full login shell (loads alice\'s env)'],['su alice','Non-login shell (keeps current env)'],
      ['su -','Switch to root (full login shell)'],['su - -c "cmd" alice','Run single command as alice'],
    ])) + sec('sudo — Run as Root', tbl([
      ['sudo command','Run as root'],['sudo -i','Interactive root shell'],
      ['sudo -u alice cmd','Run as alice'],['sudo -l','List your sudo privileges'],
      ['sudo -l -U alice','List alice\'s sudo privileges'],['visudo','Safely edit /etc/sudoers (validates syntax)'],
    ])) + `
    <div class="tip-box"><span>💡</span><div><strong>sudoers syntax:</strong><br>
    <code>alice ALL=(ALL) ALL</code> — alice can run any command as anyone<br>
    <code>alice ALL=(ALL) NOPASSWD: ALL</code> — no password needed<br>
    <code>%wheel ALL=(ALL) ALL</code> — all members of wheel group<br>
    <code>bob ALL=(root) NOPASSWD: /usr/bin/systemctl restart httpd</code> — specific command<br>
    Drop-in files in <code>/etc/sudoers.d/</code> must be mode <code>440</code>
    </div></div>`,
    // CONFIG FILES
    `<div class="cmd-section"><h3>/etc/passwd Format</h3>
    <pre>username:x:UID:GID:comment:home_dir:shell
alice:x:1001:1001:Alice Smith:/home/alice:/bin/bash
webrunner:x:998:996::/sbin/nologin</pre></div>
    <div class="cmd-section"><h3>/etc/shadow Format</h3>
    <pre>username:hashed_pwd:last_change:min_age:max_age:warn:inactive:expire
alice:$6$salt$hash...:19000:0:90:7:14:19723:
<span style="color:var(--muted)">         ↑ days since epoch=0 (Jan 1 1970)</span></pre></div>
    <div class="cmd-section"><h3>/etc/login.defs — Default Settings</h3>
    <pre>UID_MIN     1000
UID_MAX     60000
PASS_MAX_DAYS   99999
PASS_MIN_DAYS   0
PASS_WARN_AGE   7
CREATE_HOME     yes</pre></div>`,
  ])}
  ${renderFooter()}</div>`;
}

// ── PERMISSIONS ──────────────────────────────────────────────
function renderPermissions() {
  return domainHero('Domain 03','Permissions','& ACL','File permissions, special bits, access control lists — and how not to lock yourself out.') + `
  <div class="content">
  ${tabs('perm',['chmod & chown','Special Bits','ACL','umask'],[
    // CHMOD
    `<div class="cmd-section"><h3>Permission Notation</h3>
    <pre>-rwxr-xr--  1  alice  devs  4096  file.sh
 ││││││││││
 │││││││││└─ Other: r-- (4)
 ││││││└──── Group: r-x (5)
 │││└──────── Owner: rwx (7)
 ││└───────── File type: - regular, d=dir, l=link, b=block, c=char
 └─────────── Special bits position (s=SUID/SGID, t=Sticky)</pre></div>
    ${sec('chmod — Change Mode', tbl([
      ['chmod 755 file','rwxr-xr-x'],['chmod 644 file','rw-r--r-- (typical file)'],
      ['chmod 600 file','rw------- (private)'],['chmod 777 file','rwxrwxrwx (avoid!)'],
      ['chmod u+x file','Add execute for owner'],['chmod g-w file','Remove write for group'],
      ['chmod o=r file','Set other to read only'],['chmod a+r file','Add read for all'],
      ['chmod -R 755 /dir','Recursive'],['chmod u+s file','Set SUID'],
      ['chmod g+s /dir','Set SGID on directory'],['chmod +t /dir','Set sticky bit'],
      ['chmod 4755 file','SUID + rwxr-xr-x'],['chmod 2770 /dir','SGID + rwxrwx---'],
      ['chmod 1777 /dir','Sticky + rwxrwxrwx (like /tmp)'],['chmod 3770 /dir','SGID+Sticky+rwxrwx---'],
    ]))}
    ${sec('chown & chgrp', tbl([
      ['chown alice file','Change owner to alice'],['chown alice:devs file','Change owner + group'],
      ['chown :devs file','Change group only'],['chown -R alice:devs /dir','Recursive'],
      ['chgrp devs file','Change group'],
    ]))}`,
    // SPECIAL BITS
    `<div class="info-box"><strong>Special bits summary:</strong><br>
    SUID (4000, s) on files → runs as file owner | no effect on dirs<br>
    SGID (2000, s) on files → runs as file group | on dirs → new files inherit dir group<br>
    Sticky (1000, t) on dirs → users can only delete THEIR OWN files</div>
    ${tbl([
      ['chmod u+s file / chmod 4755 file','Set SUID on file'],
      ['chmod g+s /dir / chmod 2770 /dir','Set SGID on directory'],
      ['chmod +t /dir / chmod 1777 /dir','Set sticky bit'],
      ['chmod 3770 /dir','SGID + sticky + rwxrwx---'],
    ])}
    <pre><span style="color:var(--muted)"># Check results with ls -la:</span>
-rwsr-xr-x  ← SUID set (s in owner execute)
drwxrwsr-x  ← SGID set (s in group execute)
drwxrwxrwt  ← Sticky set (t in other execute)
drwxrwx--T  ← Sticky set but other has no execute (capital T)

<span style="color:var(--muted)"># Find SUID files (security audit):</span>
find / -type f -perm /4000 2>/dev/null</pre>`,
    // ACL
    `<div class="info-box">ACL allows per-user/group permissions BEYOND standard rwx. Needed when you want different access for individual users within the same group — or for users outside the group entirely.</div>
    ${tbl([
      ['getfacl file','Show ACL (+ in ls -l = ACL active)'],
      ['setfacl -m u:alice:rwx file','Give alice rwx'],['setfacl -m u:bob:r-- file','Give bob read only'],
      ['setfacl -m g:devs:rw- file','Give devs group rw-'],['setfacl -m o::--- file','Remove other access'],
      ['setfacl -x u:alice file','Remove alice ACL entry'],['setfacl -b file','Remove ALL ACL entries'],
      ['setfacl -R -m u:alice:rX /dir','Recursive (X = exec if already executable)'],
      ['setfacl -d -m u:alice:rwx /dir','DEFAULT ACL — new files inherit'],
      ['setfacl -d -m g:devs:rw- /dir','Default group ACL'],
      ['getfacl /dir > acl.bak','Backup ACL'],['setfacl --restore=acl.bak','Restore ACL'],
    ])}
    <div class="tip-box"><span>💡</span><div>The <strong>mask</strong> entry in ACL limits effective permissions of named users/groups (not owner/other). <code>setfacl -m m::r-x dir</code> sets the mask.</div></div>`,
    // UMASK
    `<div class="cmd-section"><h3>umask</h3>
    <pre><span style="color:var(--muted)"># umask subtracts from default permissions:</span>
Files default: 666    Directories default: 777

umask 022  → files: 666-022=644 (rw-r--r--)   dirs: 777-022=755 (rwxr-xr-x)
umask 027  → files: 666-027=640 (rw-r-----)   dirs: 777-027=750 (rwxr-x---)
umask 077  → files: 666-077=600 (rw-------)   dirs: 777-077=700 (rwx------)

umask           <span style="color:var(--muted)"># show current</span>
umask 027       <span style="color:var(--muted)"># set for current session</span>
echo "umask 027" >> ~/.bashrc   <span style="color:var(--muted)"># make permanent for user</span></pre></div>`,
  ])}
  ${renderFooter()}</div>`;
}

// ── STORAGE ──────────────────────────────────────────────────
function renderStorage() {
  return domainHero('Domain 04','Storage','& LVM','Disk partitioning, filesystems, mounting, LVM — the most tested domain. Master this.') + `
  <div class="content">
  ${tabs('str',['Disks & Partitions','Filesystems','LVM','Mount & fstab','NFS & autofs','Swap'],[
    // DISKS
    sec('Disk Info', tbl([
      ['lsblk','List block devices (tree view)'],['lsblk -f','Show filesystem info + UUID'],
      ['df -h','Disk space usage'],['du -sh /dir','Directory size'],
      ['fdisk -l','List all partition tables'],['fdisk /dev/sdb','Interactive MBR partition tool'],
      ['parted /dev/sdb','Interactive GPT partition tool'],['gdisk /dev/sdb','GPT-specific tool'],
      ['partprobe /dev/sdb','Notify kernel of partition changes'],
    ])) + `<div class="tip-box"><span>📝</span><div><strong>fdisk quick keys:</strong> p=print table, n=new partition, d=delete, t=change type (83=Linux, 8e=LVM, 82=swap), w=write & exit, q=quit without saving</div></div>`,
    // FS
    sec('Filesystem Operations', tbl([
      ['mkfs.xfs /dev/sdb1','Create XFS (default in RHEL 9)'],['mkfs.ext4 /dev/sdb1','Create ext4'],
      ['mkfs -t xfs /dev/sdb1','Alternative syntax'],
      ['blkid','Show all UUIDs and FS types'],['blkid /dev/sdb1','UUID of specific device'],
      ['xfs_repair /dev/sdb1','Repair XFS (must be unmounted)'],['fsck /dev/sdb1','Check filesystem'],
      ['e2fsck /dev/sdb1','Check ext2/3/4 filesystem'],
      ['xfs_info /mnt','XFS details (when mounted)'],['tune2fs -l /dev/sdb1','ext4 details'],
      ['xfs_growfs /mnt','Grow XFS (ONLINE, mounted)'],['resize2fs /dev/sdb1','Grow/shrink ext4 (offline)'],
    ])),
    // LVM
    `<div class="info-box"><strong>LVM flow:</strong> Physical Volume (PV) → Volume Group (VG) → Logical Volume (LV) → mkfs → mount</div>
    ${sec('Physical Volumes', tbl([
      ['pvcreate /dev/sdb1','Initialize partition as PV'],['pvs','List PVs (summary)'],
      ['pvdisplay','Detailed PV info'],['pvremove /dev/sdb1','Remove PV label'],
    ]))}
    ${sec('Volume Groups', tbl([
      ['vgcreate myvg /dev/sdb1','Create VG'],['vgcreate myvg /dev/sdb1 /dev/sdc1','From multiple PVs'],
      ['vgs','List VGs (summary)'],['vgdisplay myvg','Detailed VG info'],
      ['vgextend myvg /dev/sdc1','Add PV to VG'],['vgreduce myvg /dev/sdc1','Remove PV from VG'],
    ]))}
    ${sec('Logical Volumes', tbl([
      ['lvcreate -L 10G -n mylv myvg','Create 10GB LV'],['lvcreate -l 100%FREE -n mylv myvg','Use all free space'],
      ['lvcreate -l 50 -n mylv myvg','50 extents'],['lvs','List LVs'],['lvdisplay /dev/myvg/mylv','Detailed info'],
      ['lvextend -L +5G /dev/myvg/mylv','Extend by 5GB'],['lvextend -l +100%FREE /dev/myvg/mylv','Use remaining space'],
      ['xfs_growfs /mountpoint','Grow XFS after extend (ONLINE)'],['resize2fs /dev/myvg/mylv','Grow ext4 after extend (offline)'],
      ['lvremove /dev/myvg/mylv','Remove LV'],
    ]))}
    <div class="warn-box">⚠️ XFS CANNOT shrink. Only extend with xfs_growfs. ext4 can shrink but must be UNMOUNTED first (e2fsck then resize2fs then lvreduce).</div>`,
    // MOUNT
    sec('Mounting', tbl([
      ['mount /dev/sdb1 /mnt','Mount device'],['mount -t xfs /dev/sdb1 /mnt','Specify FS type'],
      ['mount -o ro /dev/sdb1 /mnt','Read-only'],['mount -a','Mount all fstab entries'],
      ['umount /mnt','Unmount'],['umount -l /mnt','Lazy unmount'],
      ['findmnt','Show all mounts'],['lsof /mnt','Processes using mountpoint'],
    ])) + `<div class="cmd-section"><h3>/etc/fstab Format</h3>
    <pre><span style="color:var(--muted)"># device          mountpoint   fstype   options       dump  pass</span>
UUID=abc123...   /var/data    xfs      defaults      0     0
/dev/myvg/mylv   /opt         ext4     defaults      0     0
server:/share    /mnt/nfs     nfs      defaults,_netdev  0  0
/swapfile        swap         swap     defaults      0     0

<span style="color:var(--muted)"># Options: defaults, ro, rw, noexec, nosuid, nodev, _netdev
# dump: 0=no backup    pass: 0=no fsck, 1=root, 2=others</span></pre>
    <div class="warn-box">⚠️ ALWAYS test fstab with <code>mount -a</code> before rebooting! A bad entry = emergency mode at next boot.</div></div>`,
    // NFS & AUTOFS
    sec('NFS Client Mount', tbl([
      ['showmount -e server','List NFS exports from server'],
      ['mount -t nfs server:/share /mnt','Mount NFS share'],
      ['mount -o rw,sync server:/share /mnt','With options'],
    ])) + `<pre><span style="color:var(--muted)"># Persistent NFS in /etc/fstab:</span>
server:/share   /mnt/nfs   nfs   defaults,_netdev   0 0</pre>
    ${sec('autofs — Auto-mount', '')}
    <pre><span style="color:var(--muted)"># 1. Install:</span>
dnf install -y autofs

<span style="color:var(--muted)"># 2. /etc/auto.master — add:</span>
/mnt/nfs   /etc/auto.nfs   --timeout=60

<span style="color:var(--muted)"># 3. /etc/auto.nfs — map file:</span>
data    -rw,sync   server:/exports/data
backup  -ro        server:/exports/backup

<span style="color:var(--muted)"># 4. Enable and start:</span>
systemctl enable --now autofs

<span style="color:var(--muted)"># 5. Access triggers mount:</span>
ls /mnt/nfs/data   <span style="color:var(--muted)"># auto-mounts on access</span>

<span style="color:var(--muted)"># User home dirs pattern:</span>
<span style="color:var(--muted)"># /etc/auto.master:</span>   /home  /etc/auto.home
<span style="color:var(--muted)"># /etc/auto.home:</span>    *  -rw  nfsserver:/home/&
<span style="color:var(--muted)"># & = replaced by wildcard match (*)</span></pre>`,
    // SWAP
    sec('Swap Management', tbl([
      ['swapon --show','Show active swap'],['free -h','Memory + swap usage'],
      ['mkswap /dev/sdb2','Format partition as swap'],['swapon /dev/sdb2','Enable swap partition'],
      ['swapoff /dev/sdb2','Disable swap'],
      ['dd if=/dev/zero of=/swapfile bs=1M count=1024','Create 1GB swap file'],
      ['chmod 600 /swapfile','Required permissions!'],['mkswap /swapfile','Format swap file'],
      ['swapon /swapfile','Activate swap file'],
    ])) + `<pre><span style="color:var(--muted)"># Persist in /etc/fstab:</span>
/swapfile   swap   swap   defaults   0 0
/dev/sdb2   swap   swap   defaults   0 0</pre>`,
  ])}
  ${renderFooter()}</div>`;
}

// ── PROCESSES ────────────────────────────────────────────────
function renderProcesses() {
  return domainHero('Domain 05','Processes','& Jobs','Process management, priority, job control, and scheduling with cron and at.') + `
  <div class="content">
  ${tabs('proc',['Monitoring','Signals & Kill','Priority','Job Control','cron','at'],[
    sec('Process Monitoring', tbl([
      ['ps aux','All processes (BSD format)'],['ps -ef','All processes (UNIX format)'],
      ['ps aux --sort=-%cpu','Sorted by CPU (descending)'],['ps aux --sort=-%mem','Sorted by memory'],
      ['ps aux | grep httpd','Filter by name'],['top','Interactive real-time monitor'],
      ['htop','Enhanced top (install with dnf)'],['pgrep httpd','Get PID of httpd'],
      ['pgrep -x sshd','Exact match for sshd'],['pidof sshd','PID of sshd'],
      ['pstree','Process hierarchy'],['ps -o pid,ppid,user,cmd -p PID','Custom columns'],
    ])),
    sec('Signals & Termination', tbl([
      ['kill PID','Send SIGTERM (15) — graceful'],['kill -9 PID','Send SIGKILL — force, uncatchable'],
      ['kill -HUP PID','SIGHUP (1) — reload config'],['kill -15 PID','SIGTERM explicitly'],
      ['killall httpd','Kill all processes named httpd'],['pkill httpd','Kill by name pattern'],
      ['pkill -u alice','Kill all alice\'s processes'],['pkill -HUP sshd','HUP by name'],
    ])) + `<div class="info-box">Signal reference: 1=HUP(reload) 2=INT(Ctrl+C) 9=KILL(force) 15=TERM(graceful) 18=CONT(resume) 19=STOP(pause)</div>`,
    sec('nice & renice — Priority', tbl([
      ['nice -n 10 cmd','Run with niceness 10 (lower priority)'],['nice -n -5 cmd','Higher priority (root only)'],
      ['renice -n 15 -p PID','Change running process priority'],['renice -n 5 -u alice','Change all alice\'s processes'],
      ['ps -o pid,nice,comm','Show nice values in ps'],
    ])) + `<div class="info-box">Nice range: <strong>-20</strong> (highest CPU priority) to <strong>19</strong> (lowest). Default is 0. Only root can use negative values.</div>`,
    sec('Job Control', tbl([
      ['cmd &','Run in background'],['Ctrl+Z','Suspend foreground job'],
      ['jobs','List background/stopped jobs'],['fg %1','Bring job 1 to foreground'],
      ['bg %1','Resume job 1 in background'],['kill %1','Kill job 1'],
      ['nohup cmd &','Immune to hangup, survives logout'],['disown %1','Detach job from shell'],
    ])),
    `${sec('crontab — Recurring Jobs', '')}
    <pre><span style="color:var(--muted)"># Edit user crontab:</span>
crontab -e      <span style="color:var(--muted)"># open in editor</span>
crontab -l      <span style="color:var(--muted)"># list crontab</span>
crontab -r      <span style="color:var(--muted)"># remove crontab</span>
crontab -l -u alice  <span style="color:var(--muted)"># view alice's crontab (as root)</span>

<span style="color:var(--muted)"># FORMAT: min hour dom month dow command</span>
<span style="color:var(--muted)"># ┌────── minute  (0-59)</span>
<span style="color:var(--muted)"># │ ┌──── hour    (0-23)</span>
<span style="color:var(--muted)"># │ │ ┌── day     (1-31)</span>
<span style="color:var(--muted)"># │ │ │ ┌ month   (1-12)</span>
<span style="color:var(--muted)"># │ │ │ │ ┌ weekday (0-7, 0=Sun)</span>
  * * * * *  /path/to/command

<span style="color:var(--muted)"># Examples:</span>
0 2 * * *    /backup.sh           <span style="color:var(--muted)"># Daily at 2:00 AM</span>
30 7 * * 1   /weekly.sh           <span style="color:var(--muted)"># Monday at 7:30 AM</span>
*/15 * * * * /check.sh            <span style="color:var(--muted)"># Every 15 minutes</span>
0 0 1 * *    /monthly.sh          <span style="color:var(--muted)"># First of each month</span>
0 9 * * 1-5  /workday.sh          <span style="color:var(--muted)"># Weekdays at 9 AM</span>

<span style="color:var(--muted)"># System cron files:</span>
/etc/crontab          <span style="color:var(--muted)"># has extra USERNAME field</span>
/etc/cron.d/          <span style="color:var(--muted)"># drop-in cron files</span>
/etc/cron.daily/      <span style="color:var(--muted)"># scripts run daily by anacron</span>
/etc/cron.hourly/     <span style="color:var(--muted)"># scripts run hourly</span></pre>`,
    sec('at — One-time Jobs', tbl([
      ['at 14:30','Schedule job at 14:30 (interactive input)'],['at now + 2 hours','2 hours from now'],
      ['at midnight','At midnight tonight'],['at noon tomorrow','Noon tomorrow'],
      ['echo "cmd" | at 10:00','Non-interactive'],['atq','List pending jobs'],
      ['atrm 3','Remove job number 3'],
    ])) + `<div class="info-box">Install at if missing: <code>dnf install -y at && systemctl enable --now atd</code></div>`,
  ])}
  ${renderFooter()}</div>`;
}

// ── NETWORKING ───────────────────────────────────────────────
function renderNetworking() {
  return domainHero('Domain 06','','Networking','Network configuration with nmcli, hostname management, DNS, and diagnostics.') + `
  <div class="content">
  <div class="info-box">🔑 Primary tool for RHEL 9 networking: <strong>nmcli</strong> (NetworkManager CLI). Always use nmcli — never edit NM config files directly.</div>
  ${tabs('net',['nmcli','ip Commands','Diagnostics','DNS & Hostname','Config Files'],[
    sec('nmcli — Connection Management', tbl([
      ['nmcli device status','List network devices and state'],['nmcli connection show','List all connections'],
      ['nmcli connection show "eth0"','Detailed info for connection'],['nmcli device show eth0','Device details'],
      ['nmcli connection up eth0','Activate connection'],['nmcli connection down eth0','Deactivate'],
      ['nmcli connection reload','Reload connection files from disk'],
      ['nmcli connection modify "CON" ipv4.addresses "192.168.1.10/24"','Set static IP'],
      ['nmcli connection modify "CON" ipv4.gateway "192.168.1.1"','Set gateway'],
      ['nmcli connection modify "CON" ipv4.dns "8.8.8.8 1.1.1.1"','Set DNS servers'],
      ['nmcli connection modify "CON" ipv4.method manual','Static (manual) mode'],
      ['nmcli connection modify "CON" ipv4.method auto','DHCP mode'],
      ['nmcli connection modify "CON" +ipv4.routes "10.0.0.0/8 192.168.1.1"','Add static route'],
      ['nmcli connection modify "CON" ipv4.dns-search "example.com"','DNS search domain'],
      ['nmcli general hostname server1','Set hostname'],
    ])) + `<div class="tip-box"><span>💡</span><div>Always run <code>nmcli con up "CONNECTION_NAME"</code> after modifying to apply changes. Get connection name from <code>nmcli con show</code>.</div></div>`,
    sec('ip — Modern Network Commands', tbl([
      ['ip addr show','Show all IP addresses (replaces ifconfig)'],['ip addr show eth0','Specific interface'],
      ['ip addr add 192.168.1.10/24 dev eth0','Add IP (temporary!)'],['ip addr del 192.168.1.10/24 dev eth0','Remove IP'],
      ['ip link show','Show link status'],['ip link set eth0 up','Bring interface up'],
      ['ip link set eth0 down','Bring interface down'],['ip route show','Show routing table'],
      ['ip route add default via 192.168.1.1','Add default gateway'],
      ['ip route add 10.0.0.0/8 via 192.168.1.1','Add static route'],
      ['ip -s link show','Show interface statistics'],
    ])),
    sec('Network Diagnostics', tbl([
      ['ss -tlnp','Listening TCP ports with process names'],['ss -ulnp','Listening UDP ports'],
      ['ss -anp','All sockets'],['ss -tnp','Established TCP connections'],
      ['ping -c 4 8.8.8.8','Test connectivity'],['traceroute 8.8.8.8','Trace network path'],
      ['dig google.com','DNS lookup (detailed)'],['dig google.com @8.8.8.8','Query specific DNS server'],
      ['nslookup google.com','Simple DNS lookup'],['host google.com','Quick DNS lookup'],
      ['curl -s http://host','Test HTTP connectivity'],['curl -I http://host','HTTP headers only'],
    ])),
    sec('Hostname Configuration', tbl([
      ['hostnamectl set-hostname server1.example.com','Set FQDN hostname'],['hostnamectl status','Show current hostname'],
      ['hostname','Show current hostname (transient)'],
    ])) + sec('DNS Configuration', tbl([
      ['cat /etc/resolv.conf','Current DNS (managed by NM)'],['nmcli con mod "CON" ipv4.dns "8.8.8.8"','Set DNS via NM'],
      ['cat /etc/nsswitch.conf','Name resolution order'],
    ])),
    `<div class="cmd-section"><h3>/etc/hosts</h3>
    <pre><span style="color:var(--muted)"># Format: IP  FQDN  aliases</span>
127.0.0.1   localhost
::1         localhost
192.168.1.100   server1.example.com   server1
192.168.1.200   db.example.com        db</pre></div>
    <div class="cmd-section"><h3>/etc/nsswitch.conf — Resolution Order</h3>
    <pre>hosts:      files dns myhostname
<span style="color:var(--muted)"># files = /etc/hosts checked FIRST, then DNS
# Change to: "hosts: dns files" to check DNS first</span></pre></div>
    <div class="cmd-section"><h3>/etc/resolv.conf — DNS Servers</h3>
    <pre><span style="color:var(--muted)"># Managed by NetworkManager — DO NOT edit directly</span>
nameserver 8.8.8.8
nameserver 8.8.4.4
search example.com</pre></div>`,
  ])}
  ${renderFooter()}</div>`;
}

// ── SERVICES ─────────────────────────────────────────────────
function renderServices() {
  return domainHero('Domain 07','Services','& systemd','Start/stop/enable services, read journals, create custom units and timers.') + `
  <div class="content">
  ${tabs('svc',['systemctl','journalctl','Unit Files','Targets','Timers'],[
    sec('systemctl — Service Control', tbl([
      ['systemctl start svc','Start service'],['systemctl stop svc','Stop service'],
      ['systemctl restart svc','Stop then start'],['systemctl reload svc','Reload config (no stop)'],
      ['systemctl status svc','Show status + recent logs'],['systemctl is-active svc','Returns 0 if active'],
      ['systemctl is-enabled svc','Returns 0 if enabled'],['systemctl enable svc','Enable at boot'],
      ['systemctl disable svc','Disable at boot'],['systemctl enable --now svc','Enable + start NOW'],
      ['systemctl disable --now svc','Disable + stop NOW'],['systemctl mask svc','Prevent ALL starts'],
      ['systemctl unmask svc','Remove mask'],['systemctl daemon-reload','Re-read unit files — ALWAYS after edits!'],
      ['systemctl list-units --type=service','List all service units'],
      ['systemctl list-units --failed','List failed units'],
      ['systemctl list-unit-files','List all unit files + enabled state'],
    ])),
    sec('journalctl — Log Queries', tbl([
      ['journalctl','Show all journal'],['journalctl -u httpd','Logs for httpd unit'],
      ['journalctl -u httpd -f','Follow live logs'],['journalctl -u httpd -n 30','Last 30 entries'],
      ['journalctl -p err','Error priority and above'],['journalctl -p warning','Warning and above'],
      ['journalctl -b','Current boot'],['journalctl -b -1','Previous boot'],
      ['journalctl --since "2024-01-01"','Since date'],['journalctl --since "1 hour ago"','Last hour'],
      ['journalctl --since "09:00" --until "10:00"','Time range'],
      ['journalctl -u httpd -p err -b','Combined filters: unit+priority+boot'],
      ['journalctl --disk-usage','Journal disk usage'],['journalctl --vacuum-size=500M','Clean old journals'],
      ['journalctl --vacuum-time=7d','Keep last 7 days'],
    ])),
    `<div class="cmd-section"><h3>Custom Service Unit File</h3>
    <pre><span style="color:var(--muted)"># /etc/systemd/system/myapp.service</span>
[Unit]
Description=My Application Service
Documentation=https://example.com
After=network.target network-online.target
Wants=network-online.target

[Service]
Type=simple          <span style="color:var(--muted)"># simple|forking|oneshot|notify|idle</span>
User=alice
Group=alice
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/myapp --config /etc/myapp.conf
ExecStop=/usr/bin/myapp stop
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure   <span style="color:var(--muted)"># always|on-failure|on-abnormal|never</span>
RestartSec=5
TimeoutStartSec=90
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target</pre></div>
    <div class="cmd-section"><h3>Service Override (drop-in)</h3>
    <pre><span style="color:var(--muted)"># Safer than editing the original unit file:</span>
mkdir -p /etc/systemd/system/httpd.service.d/
cat > /etc/systemd/system/httpd.service.d/custom.conf << EOF
[Service]
TimeoutStartSec=120
Restart=on-failure
RestartSec=5
EOF
systemctl daemon-reload</pre></div>`,
    sec('System Targets', tbl([
      ['systemctl get-default','Show default boot target'],
      ['systemctl set-default multi-user.target','Set text mode default'],
      ['systemctl set-default graphical.target','Set GUI default'],
      ['systemctl isolate rescue.target','Switch to rescue mode NOW'],
      ['systemctl isolate emergency.target','Switch to emergency mode NOW'],
      ['systemctl isolate multi-user.target','Switch to multi-user NOW'],
    ])) + `<table class="cmd-table"><thead><tr><th>Target</th><th>Old Runlevel</th><th>Description</th></tr></thead><tbody>
      <tr><td>poweroff.target</td><td>0</td><td>Power off the system</td></tr>
      <tr><td>rescue.target</td><td>1</td><td>Single user, most filesystems mounted</td></tr>
      <tr><td>multi-user.target</td><td>3</td><td>Multi-user, network, no GUI</td></tr>
      <tr><td>graphical.target</td><td>5</td><td>Multi-user, network, with GUI</td></tr>
      <tr><td>reboot.target</td><td>6</td><td>Reboot the system</td></tr>
    </tbody></table>`,
    `<div class="cmd-section"><h3>Systemd Timer Unit</h3>
    <pre><span style="color:var(--muted)"># /etc/systemd/system/myjob.timer</span>
[Unit]
Description=Run myjob every 5 minutes

[Timer]
OnBootSec=1min           <span style="color:var(--muted)"># first run after boot</span>
OnUnitActiveSec=5min     <span style="color:var(--muted)"># then every 5 minutes</span>
<span style="color:var(--muted)"># OR: OnCalendar=*-*-* 04:00:00  (daily at 4AM)</span>
Persistent=true           <span style="color:var(--muted)"># run missed jobs after boot</span>
Unit=myjob.service        <span style="color:var(--muted)"># optional if same name</span>

[Install]
WantedBy=timers.target

<span style="color:var(--muted)"># Enable and manage:</span>
systemctl daemon-reload
systemctl enable --now myjob.timer
systemctl list-timers       <span style="color:var(--muted)"># show all timers with next run time</span></pre></div>`,
  ])}
  ${renderFooter()}</div>`;
}

// ── SOFTWARE ─────────────────────────────────────────────────
function renderSoftware() {
  return domainHero('Domain 08','Software','Management','dnf, rpm, repositories, modules — manage software on RHEL 9.') + `
  <div class="content">
  ${tabs('sw',['dnf','rpm','Modules','Repositories'],[
    sec('dnf — Package Manager', tbl([
      ['dnf install -y pkg1 pkg2','Install packages'],['dnf remove pkg','Remove package'],
      ['dnf update','Update all packages'],['dnf update pkg','Update specific package'],
      ['dnf search keyword','Search for packages'],['dnf info pkg','Package details'],
      ['dnf list installed','All installed packages'],['dnf list available | grep x','Search available'],
      ['dnf whatprovides /usr/bin/semanage','Find package providing a file/command'],
      ['dnf provides "*/semanage"','Alternative syntax'],['dnf history','Transaction history'],
      ['dnf history undo last','Undo last transaction'],['dnf history undo N','Undo transaction N'],
      ['dnf autoremove','Remove unused dependencies'],['dnf clean all','Clean cache'],
      ['dnf group list','List package groups'],['dnf group install "Development Tools"','Install group'],
      ['dnf download pkg --destdir /tmp','Download RPM without installing'],
    ])),
    sec('rpm — Package Queries', tbl([
      ['rpm -ivh pkg.rpm','Install RPM verbosely'],['rpm -Uvh pkg.rpm','Upgrade RPM'],
      ['rpm -e pkg','Remove package'],['rpm -q pkg','Is package installed?'],
      ['rpm -qa','List all installed packages'],['rpm -qi pkg','Package info'],
      ['rpm -ql pkg','List files installed by pkg'],['rpm -qf /etc/httpd/conf/httpd.conf','Which pkg owns this file?'],
      ['rpm -V pkg','Verify package integrity (empty = OK)'],['rpm --import /path/key.gpg','Import GPG key'],
      ['rpm -qR pkg','List package dependencies'],
    ])),
    `<div class="cmd-section"><h3>dnf Modules & Streams (AppStream)</h3>
    <pre><span style="color:var(--muted)"># AppStream provides multiple versions via modules:</span>
dnf module list               <span style="color:var(--muted)"># list all modules</span>
dnf module list php           <span style="color:var(--muted)"># list PHP streams</span>
dnf module enable php:8.1     <span style="color:var(--muted)"># enable PHP 8.1 stream</span>
dnf module install php:8.1    <span style="color:var(--muted)"># install default profile</span>
dnf module install php:8.1/devel  <span style="color:var(--muted)"># specific profile</span>
dnf module disable php        <span style="color:var(--muted)"># disable module</span>
dnf module reset php          <span style="color:var(--muted)"># reset to default</span>
dnf module info php:8.1       <span style="color:var(--muted)"># show stream details</span></pre></div>`,
    `<div class="cmd-section"><h3>Repository Configuration</h3>
    <pre><span style="color:var(--muted)"># Location: /etc/yum.repos.d/</span>
cat > /etc/yum.repos.d/myrepo.repo << 'EOF'
[myrepo]
name=My Custom Repository
baseurl=http://server.example.com/repo/
<span style="color:var(--muted)"># OR for local:</span>
baseurl=file:///mnt/repo
enabled=1
gpgcheck=1
gpgkey=http://server/RPM-GPG-KEY
EOF</pre></div>
    ${sec('Repository Commands', tbl([
      ['dnf repolist','List enabled repos'],['dnf repolist all','All repos including disabled'],
      ['dnf config-manager --add-repo URL','Add repo from URL'],
      ['dnf config-manager --enable myrepo','Enable repo'],['dnf config-manager --disable myrepo','Disable repo'],
      ['dnf install --enablerepo=myrepo pkg','Install from specific repo'],
      ['dnf install --disablerepo=* --enablerepo=local pkg','Only use local repo'],
    ]))}`,
  ])}
  ${renderFooter()}</div>`;
}

// ── SECURITY ─────────────────────────────────────────────────
function renderSecurity() {
  return domainHero('Domain 09','SELinux','& Firewall','SELinux policies, contexts, booleans, ports, and firewalld zones. Critical exam topics.') + `
  <div class="content">
  ${tabs('sec',['SELinux Basics','Contexts','Booleans & Ports','Troubleshoot','firewalld'],[
    sec('SELinux Mode & Status', tbl([
      ['getenforce','Show current mode: Enforcing/Permissive/Disabled'],
      ['sestatus','Detailed SELinux status'],['setenforce 0','Permissive (temp, resets on reboot)'],
      ['setenforce 1','Enforcing (temp)'],['ls -Z file','File SELinux context'],
      ['ls -Zd /dir','Directory context'],['ps -eZ | grep httpd','Process context'],['id -Z','Current user context'],
    ])) + `<div class="warn-box">⚠️ <strong>NEVER disable SELinux in the exam.</strong> Set SELINUX=disabled in /etc/selinux/config = automatic exam failure. Learn to WORK with it.</div>
    <div class="info-box">Context format: <code>user:role:TYPE:level</code><br>Example: <code>system_u:object_r:httpd_sys_content_t:s0</code><br>The <strong>TYPE</strong> field is what controls access decisions.</div>`,
    sec('File Contexts — The Right Way', tbl([
      ['semanage fcontext -a -t httpd_sys_content_t "/webdata(/.*)?"','Add PERMANENT rule (survives relabel)'],
      ['semanage fcontext -l | grep webdata','List current rules'],
      ['semanage fcontext -d -t httpd_sys_content_t "/webdata(/.*)?"','Delete rule'],
      ['restorecon -Rv /webdata','Apply rules to files'],
      ['restorecon -Rv /','Restore ALL contexts to policy'],
      ['chcon -t httpd_sys_content_t /file','TEMPORARY context change (reverts on relabel!)'],
      ['chcon -Rt httpd_sys_content_t /dir','Recursive temp change'],
    ])) + `<div class="tip-box"><span>💡</span><div><strong>Always use semanage + restorecon</strong> for permanent fixes. chcon is only for testing. The pattern <code>/path(/.*)? </code> covers the directory AND all files inside it.</div></div>`,
    sec('SELinux Booleans', tbl([
      ['getsebool -a','List all booleans'],['getsebool httpd_can_network_connect','Check specific boolean'],
      ['setsebool httpd_can_network_connect on','Enable (TEMPORARY — resets on reboot!)'],
      ['setsebool -P httpd_can_network_connect on','Enable PERMANENTLY (-P flag!)'],
      ['semanage boolean -l','List with descriptions'],
    ])) + `<div class="info-box"><strong>Common booleans:</strong><br>
    httpd_can_network_connect · httpd_enable_homedirs · httpd_use_nfs · ftpd_anon_write<br>
    samba_enable_home_dirs · allow_httpd_anon_write · ftp_home_dir</div>
    ${sec('SELinux Ports', tbl([
      ['semanage port -l','List all labeled ports'],['semanage port -l | grep http','Filter for http'],
      ['semanage port -a -t http_port_t -p tcp 8080','Allow httpd on port 8080'],
      ['semanage port -d -t http_port_t -p tcp 8080','Remove port label'],
      ['semanage port -m -t http_port_t -p tcp 8080','Modify existing port label'],
    ]))}`,
    `<div class="cmd-section"><h3>Troubleshooting SELinux Denials</h3>
    <pre><span style="color:var(--muted)"># Check recent denials:</span>
ausearch -m avc -ts recent
ausearch -m avc -ts recent | audit2why    <span style="color:var(--muted)"># human explanation</span>
ausearch -m avc -ts recent | audit2allow  <span style="color:var(--muted)"># suggest fix (reference only)</span>

<span style="color:var(--muted;"># Also check:</span>
journalctl | grep -i selinux
cat /var/log/audit/audit.log | grep AVC | tail -20

<span style="color:var(--muted)"># Install tools if missing:</span>
dnf install -y policycoreutils-python-utils setroubleshoot-server

<span style="color:var(--muted)"># /etc/selinux/config — permanent mode (requires reboot):</span>
SELINUX=enforcing    <span style="color:var(--muted;"># enforcing | permissive | disabled</span>
SELINUXTYPE=targeted

<span style="color:var(--muted)"># Full filesystem relabel on next boot:</span>
touch /.autorelabel && reboot</pre></div>`,
    sec('firewalld — Zone-based Firewall', tbl([
      ['systemctl status firewalld','Check firewalld status'],['firewall-cmd --state','Running?'],
      ['firewall-cmd --get-zones','List all zones'],['firewall-cmd --get-default-zone','Default zone'],
      ['firewall-cmd --get-active-zones','Zones with assigned interfaces'],
      ['firewall-cmd --list-all','List all rules in default zone'],
      ['firewall-cmd --zone=public --list-all','List public zone rules'],
      ['firewall-cmd --add-service=http','Allow http (TEMPORARY!)'],
      ['firewall-cmd --add-service=http --permanent','Allow http PERMANENTLY'],
      ['firewall-cmd --remove-service=http --permanent','Remove http'],
      ['firewall-cmd --add-port=8080/tcp --permanent','Open port 8080'],
      ['firewall-cmd --remove-port=8080/tcp --permanent','Close port 8080'],
      ['firewall-cmd --add-source=192.168.1.0/24 --zone=trusted','Trust a subnet'],
      ['firewall-cmd --add-source=10.0.0.5 --zone=drop','Drop specific IP'],
      ['firewall-cmd --reload','Apply permanent rules to runtime'],
      ['firewall-cmd --runtime-to-permanent','Make current runtime permanent'],
      ['firewall-cmd --set-default-zone=trusted','Change default zone'],
      ['firewall-cmd --change-interface=eth0 --zone=dmz','Move interface to dmz'],
      ['firewall-cmd --get-services','All available service names'],
    ])) + `<div class="warn-box">⚠️ ALWAYS use <code>--permanent</code> for persistent rules. Without it, rules are lost on restart. After --permanent changes, run <code>--reload</code> to apply immediately.</div>`,
  ])}
  ${renderFooter()}</div>`;
}

// ── SCRIPTING ────────────────────────────────────────────────
function renderScripting() {
  return domainHero('Domain 10','Bash','Scripting','Write shell scripts for automation — variables, loops, conditionals, functions.') + `
  <div class="content">
  ${tabs('scr',['Basics','Variables','Conditionals','Loops','Functions','Practical'],[
    `<pre><span style="color:var(--muted)"># Always start with shebang:</span>
#!/bin/bash
set -euo pipefail  <span style="color:var(--muted)"># exit on error, unset var, pipe fail</span>

<span style="color:var(--muted)"># Make executable:</span>
chmod +x script.sh

<span style="color:var(--muted)"># Run:</span>
./script.sh          <span style="color:var(--muted)"># or:</span>
bash script.sh

<span style="color:var(--muted)"># Debug mode:</span>
bash -x script.sh    <span style="color:var(--muted)"># trace each command</span>
bash -n script.sh    <span style="color:var(--muted)"># syntax check only</span></pre>`,
    `<pre><span style="color:var(--muted)"># Variable assignment (no spaces around =):</span>
name="Alice"
count=42
readonly PI=3.14

<span style="color:var(--muted;"># Special variables:</span>
$0    <span style="color:var(--muted)"># script name</span>
$1 $2 <span style="color:var(--muted)"># positional args</span>
$@    <span style="color:var(--muted)"># all arguments</span>
$#    <span style="color:var(--muted)"># number of arguments</span>
$?    <span style="color:var(--muted)"># exit status of last cmd (0=success)</span>
$$    <span style="color:var(--muted)"># current PID</span>
$!    <span style="color:var(--muted)"># PID of last background process</span>

<span style="color:var(--muted)"># Command substitution:</span>
today=$(date '+%Y-%m-%d')
lines=$(wc -l < /etc/passwd)

<span style="color:var(--muted)"># Arithmetic:</span>
((count++))
((total = a + b))
result=$((5 * 3))

<span style="color:var(--muted)"># Read input:</span>
read -p "Enter name: " username
read -sp "Password: " pass   <span style="color:var(--muted)"># silent (for passwords)</span>

<span style="color:var(--muted)"># String tests:</span>
[ -z "$var" ]   <span style="color:var(--muted)"># empty string</span>
[ -n "$var" ]   <span style="color:var(--muted)"># non-empty</span>
[ "$a" = "$b" ] <span style="color:var(--muted)"># string equal</span>
[ "$a" != "$b" ]<span style="color:var(--muted)"># not equal</span>

<span style="color:var(--muted)"># Default values:</span>
name="${'${1:-default}'}"   <span style="color:var(--muted)"># use "default" if $1 not set</span></pre>`,
    `<pre><span style="color:var(--muted)"># if / elif / else:</span>
if [ "$user" = "root" ]; then
    echo "Is root"
elif [ "$user" = "alice" ]; then
    echo "Is alice"
else
    echo "Unknown"
fi

<span style="color:var(--muted)"># File tests:</span>
[ -f /etc/passwd ]   <span style="color:var(--muted)"># regular file exists</span>
[ -d /tmp ]          <span style="color:var(--muted)"># directory exists</span>
[ -e /path ]         <span style="color:var(--muted)"># any file type exists</span>
[ -r file ]          <span style="color:var(--muted)"># readable</span>
[ -w file ]          <span style="color:var(--muted)"># writable</span>
[ -x file ]          <span style="color:var(--muted)"># executable</span>
[ -s file ]          <span style="color:var(--muted)"># non-empty (size > 0)</span>

<span style="color:var(--muted)"># Numeric comparisons:</span>
[ $n -eq 5 ]  <span style="color:var(--muted)"># equal</span>
[ $n -ne 5 ]  <span style="color:var(--muted)"># not equal</span>
[ $n -gt 3 ]  <span style="color:var(--muted)"># greater than</span>
[ $n -lt 10 ] <span style="color:var(--muted)"># less than</span>
[ $n -ge 3 ]  <span style="color:var(--muted)"># >= 3</span>
[ $n -le 10 ] <span style="color:var(--muted)"># <= 10</span>

<span style="color:var(--muted)"># Logical:</span>
[ cond1 ] && [ cond2 ]   <span style="color:var(--muted)"># AND</span>
[ cond1 ] || [ cond2 ]   <span style="color:var(--muted)"># OR</span>
! [ cond ]               <span style="color:var(--muted)"># NOT</span>

<span style="color:var(--muted)"># case statement:</span>
case "$action" in
  start)   echo "Starting"  ;;
  stop)    echo "Stopping"  ;;
  restart) $0 stop; $0 start ;;
  *)       echo "Usage: $0 {start|stop|restart}"; exit 1 ;;
esac</pre>`,
    `<pre><span style="color:var(--muted)"># for loop:</span>
for i in 1 2 3 4 5; do
    echo "Item: $i"
done

for file in /etc/*.conf; do
    echo "Config: $file"
done

for i in $(seq 1 10); do echo $i; done
for ((i=0; i&lt;10; i++)); do echo $i; done

<span style="color:var(--muted)"># while loop:</span>
count=1
while [ $count -le 5 ]; do
    echo "Count: $count"
    ((count++))
done

<span style="color:var(--muted)"># Read file line by line (the correct way):</span>
while IFS= read -r line; do
    echo "Line: $line"
done < /etc/passwd

<span style="color:var(--muted)"># Read CSV (comma-separated):</span>
while IFS=, read -r user group shell; do
    echo "User: $user  Group: $group"
done < /tmp/users.csv

<span style="color:var(--muted)"># until loop:</span>
until [ $count -gt 5 ]; do
    echo $count; ((count++))
done

<span style="color:var(--muted)"># break and continue:</span>
for i in 1 2 3 4 5; do
    [ $i -eq 3 ] && continue   <span style="color:var(--muted)"># skip 3</span>
    [ $i -eq 5 ] && break      <span style="color:var(--muted)"># stop at 5</span>
    echo $i
done</pre>`,
    `<pre><span style="color:var(--muted)"># Function definition:</span>
greet() {
    local name="$1"    <span style="color:var(--muted)"># local = function-scoped</span>
    local greeting="${'${2:-Hello}'}"
    echo "$greeting, $name!"
    return 0           <span style="color:var(--muted)"># 0 = success</span>
}

<span style="color:var(--muted)"># Call function:</span>
greet "Alice"
greet "Bob" "Hi"

<span style="color:var(--muted)"># Check return value:</span>
if greet "Alice"; then
    echo "Succeeded"
fi

<span style="color:var(--muted)"># Error handling:</span>
die() { echo "ERROR: $*" >&2; exit 1; }

check_root() {
    [ "$(id -u)" -eq 0 ] || die "Must run as root"
}

<span style="color:var(--muted)"># trap for cleanup:</span>
cleanup() {
    rm -f /tmp/myapp.lock
    echo "Cleaned up"
}
trap cleanup EXIT   <span style="color:var(--muted)"># runs when script exits</span>
trap 'echo "ERROR at line $LINENO"' ERR</pre>`,
    `<pre><span style="color:var(--muted)"># Complete sysadmin script template:</span>
#!/bin/bash
set -euo pipefail

SCRIPT_NAME=$(basename "$0")
LOG=/var/log/myapp.log

log()  { echo "$(date '+%Y-%m-%d %H:%M:%S') [INFO]  $*" | tee -a "$LOG"; }
warn() { echo "$(date '+%Y-%m-%d %H:%M:%S') [WARN]  $*" | tee -a "$LOG"; }
die()  { echo "$(date '+%Y-%m-%d %H:%M:%S') [ERROR] $*" >&2; exit 1; }

usage() { echo "Usage: $SCRIPT_NAME username group"; exit 1; }
[ $# -lt 2 ] && usage

USER="$1"; GROUP="$2"

id "$USER" &>/dev/null && { log "[SKIP] $USER exists"; exit 0; }
groupadd "$GROUP" 2>/dev/null || true
useradd -m -G "$GROUP" "$USER" || die "Failed to create $USER"
echo "ChangeMe!" | passwd --stdin "$USER" &>/dev/null
chage -d 0 "$USER"
log "[OK] Created $USER in $GROUP"</pre>`,
  ])}
  ${renderFooter()}</div>`;
}

// ── CONTAINERS ───────────────────────────────────────────────
function renderContainers() {
  return domainHero('Domain 11','Containers','(Podman)','Rootless container management with Podman — RHEL 9\'s container engine.') + `
  <div class="content">
  <div class="info-box">RHEL 9 uses <strong>Podman</strong>, not Docker. Podman is daemon-less and rootless by default. Syntax is nearly identical to Docker but no root daemon required.</div>
  ${tabs('con',['Basic Commands','Images & Volumes','Rootless Service','Pods'],[
    sec('Container Operations', tbl([
      ['podman pull nginx','Pull image from registry'],['podman images','List local images'],
      ['podman rmi nginx','Remove image'],
      ['podman run nginx','Run (foreground)'],['podman run -d nginx','Run detached (background)'],
      ['podman run -d -p 8080:80 nginx','Map host→container port'],
      ['podman run -d --name webserver nginx','Named container'],
      ['podman run -v /host:/container:Z nginx','Volume mount (:Z = SELinux label)'],
      ['podman run -e ENV_VAR=value nginx','Set environment variable'],
      ['podman run --rm nginx ls /','Remove container when it exits'],
      ['podman ps','List running containers'],['podman ps -a','All containers (including stopped)'],
      ['podman stop webserver','Stop gracefully'],['podman start webserver','Start stopped container'],
      ['podman restart webserver','Restart'],['podman rm webserver','Remove stopped container'],
      ['podman rm -f webserver','Force remove running container'],
      ['podman exec -it webserver bash','Interactive shell in container'],
      ['podman exec webserver ls /etc','Run command in container'],
      ['podman logs webserver','Container logs'],['podman logs -f webserver','Follow logs'],
      ['podman inspect webserver','Detailed JSON info'],['podman stats','Live resource usage'],
      ['podman top webserver','Processes in container'],
    ])),
    sec('Images', tbl([
      ['podman pull docker.io/library/nginx','Pull from Docker Hub'],
      ['podman pull registry.access.redhat.com/ubi9/nginx-120','Pull from Red Hat registry'],
      ['podman images','List images'],['podman rmi image','Remove image'],
      ['podman tag nginx myrepo/nginx:v1','Tag image'],
      ['podman save -o /tmp/nginx.tar nginx','Export image to tar'],
      ['podman load -i /tmp/nginx.tar','Import image from tar'],
      ['podman build -t myapp:v1 .','Build from Dockerfile'],
    ])) + sec('Volumes', tbl([
      ['podman volume create myvol','Create named volume'],['podman volume ls','List volumes'],
      ['podman volume inspect myvol','Volume details'],['podman volume rm myvol','Remove volume'],
      ['podman run -v myvol:/data nginx','Use named volume'],
      ['podman run -v /host/path:/container/path:Z nginx','Bind mount with SELinux label'],
    ])),
    `<div class="cmd-section"><h3>Rootless Container as systemd User Service</h3>
    <pre><span style="color:var(--muted)"># 1. As the NON-ROOT USER:</span>
mkdir -p ~/.config/systemd/user/
cd ~/.config/systemd/user/

podman run -d --name myapp -p 9090:80 \\
  -v ~/webroot:/usr/share/nginx/html:Z nginx

<span style="color:var(--muted)"># 2. Generate systemd unit:</span>
podman generate systemd --name myapp --files --new
<span style="color:var(--muted"># Creates: container-myapp.service</span>

<span style="color:var(--muted)"># 3. Enable and start as USER service:</span>
systemctl --user daemon-reload
systemctl --user enable --now container-myapp.service
systemctl --user status container-myapp.service

<span style="color:var(--muted)"># 4. As ROOT: enable lingering so service runs without login:</span>
loginctl enable-linger username
loginctl show-user username | grep Linger

<span style="color:var(--muted)"># Key: --new flag means the unit manages container lifecycle</span>
<span style="color:var(--muted)"># (creates container on start, removes on stop)</span></pre></div>`,
    `<div class="cmd-section"><h3>Pods — Group Containers</h3>
    <pre>
podman pod create --name mypod -p 8080:80
podman run -d --pod mypod --name frontend nginx
podman run -d --pod mypod --name backend myapp

podman pod ps        <span style="color:var(--muted)"># list pods</span>
podman pod start mypod
podman pod stop mypod
podman pod rm mypod</pre></div>
    <div class="cmd-section"><h3>Networking</h3>
    <pre>
podman network create mynet
podman network ls
podman run --network mynet --name db mariadb
podman run --network mynet --name app -e DB_HOST=db myapp</pre></div>`,
  ])}
  ${renderFooter()}</div>`;
}

// ── BOOT & RECOVERY ──────────────────────────────────────────
function renderBoot() {
  return domainHero('Domain 12','Boot','& Recovery','GRUB2, boot targets, root password reset, rescue mode — survive when things go wrong.') + `
  <div class="content">
  ${tabs('boot',['GRUB2','Root Password Reset','Targets & Modes','Troubleshooting'],[
    `<div class="cmd-section"><h3>GRUB2 Configuration Files</h3>
    <pre>/etc/default/grub          <span style="color:var(--muted)"># main settings (EDIT THIS)</span>
/etc/grub.d/               <span style="color:var(--muted)"># script fragments</span>
/boot/grub2/grub.cfg       <span style="color:var(--muted)"># generated config BIOS (DO NOT EDIT)</span>
/boot/efi/EFI/redhat/grub.cfg  <span style="color:var(--muted)"># generated config UEFI</span></pre></div>
    <div class="cmd-section"><h3>Key Settings in /etc/default/grub</h3>
    <pre>GRUB_TIMEOUT=5
GRUB_DEFAULT=saved
GRUB_CMDLINE_LINUX="crashkernel=auto rhgb quiet"

<span style="color:var(--muted)"># After editing, ALWAYS regenerate:</span>
[ -d /sys/firmware/efi ] \\
  && grub2-mkconfig -o /boot/efi/EFI/redhat/grub.cfg \\
  || grub2-mkconfig -o /boot/grub2/grub.cfg

<span style="color:var(--muted)"># Detect BIOS vs UEFI:</span>
[ -d /sys/firmware/efi ] && echo UEFI || echo BIOS

<span style="color:var(--muted)"># Other GRUB commands:</span>
grubby --info=ALL          <span style="color:var(--muted)"># list all kernels</span>
grubby --default-kernel    <span style="color:var(--muted)"># current default kernel</span>
grubby --set-default /boot/vmlinuz-VERSION   <span style="color:var(--muted)"># set default kernel</span></pre></div>`,
    `<div class="warn-box">⚠️ <strong>This is ALWAYS on the exam.</strong> Memorize every step. One missed step = system won't boot after reset.</div>
    <div class="cmd-section"><h3>Root Password Reset — 8 Steps</h3>
    <pre><span style="color:var(--yellow)">STEP 1:</span> Reboot the system

<span style="color:var(--yellow)">STEP 2:</span> At GRUB menu, press <strong>e</strong> to edit the default entry

<span style="color:var(--yellow)">STEP 3:</span> Find the line starting with <strong>linux</strong> (kernel parameters line)
  - Remove: <code>rhgb quiet</code>
  - Append at END: <code>rd.break</code>

<span style="color:var(--yellow)">STEP 4:</span> Press <strong>Ctrl+X</strong> to boot with modified parameters

<span style="color:var(--yellow)">STEP 5:</span> At emergency shell, remount /sysroot as read-write:
  <strong>mount -o remount,rw /sysroot</strong>

<span style="color:var(--yellow)">STEP 6:</span> Chroot into the real system:
  <strong>chroot /sysroot</strong>

<span style="color:var(--yellow)">STEP 7:</span> Change root password:
  <strong>passwd root</strong>

<span style="color:var(--yellow)">STEP 8:</span> Force SELinux relabeling on next boot (CRITICAL!):
  <strong>touch /.autorelabel</strong>

<span style="color:var(--yellow)">STEP 9:</span> Exit and reboot:
  <strong>exit</strong>   <span style="color:var(--muted)"># exit chroot</span>
  <strong>exit</strong>   <span style="color:var(--muted)"># exit initramfs shell → system reboots</span>

<span style="color:var(--muted)"># System will relabel all files (takes 1-3 min) then boot normally</span></pre></div>
    <div class="tip-box"><span>🎯</span><div>Why <code>touch /.autorelabel</code>? After chroot, SELinux contexts may be wrong. Without relabeling, SELinux will block logins. The system automatically removes this file after relabeling.</div></div>`,
    sec('System Targets & Boot Modes', tbl([
      ['systemctl get-default','Current default target'],['systemctl set-default multi-user.target','Set default'],
      ['systemctl isolate rescue.target','Switch to rescue mode NOW'],
      ['systemctl isolate emergency.target','Switch to emergency mode NOW'],
      ['systemctl isolate multi-user.target','Return to multi-user'],
      ['systemctl reboot','Reboot'],['systemctl poweroff','Power off'],
      ['systemctl halt','Halt without power off'],
    ])) + `<table class="cmd-table" style="margin-top:12px"><thead><tr><th>Mode</th><th>Filesystems</th><th>Network</th><th>Use When</th></tr></thead><tbody>
      <tr><td>rescue.target</td><td>Most mounted rw</td><td>No</td><td>Fix config files, bad fstab</td></tr>
      <tr><td>emergency.target</td><td>root only, read-only</td><td>No</td><td>Severe issues, corrupted FS</td></tr>
      <tr><td>multi-user.target</td><td>All mounted</td><td>Yes</td><td>Normal operation</td></tr>
    </tbody></table>
    <pre><span style="color:var(--muted)"># Boot to rescue from GRUB (add to kernel line):</span>
systemd.unit=rescue.target
<span style="color:var(--muted)"># Boot to emergency:</span>
systemd.unit=emergency.target</pre>`,
    `<div class="cmd-section"><h3>Common Boot Issues & Fixes</h3>
    <table class="cmd-table"><thead><tr><th>Problem</th><th>Fix</th></tr></thead><tbody>
      <tr><td>Bad /etc/fstab entry</td><td>Boot to rescue/emergency → mount -o remount,rw / → vim /etc/fstab → mount -a → reboot</td></tr>
      <tr><td>Forgotten root password</td><td>Use rd.break procedure above</td></tr>
      <tr><td>Corrupted filesystem</td><td>Boot to rescue → umount /dev/sdb1 → fsck /dev/sdb1 or xfs_repair</td></tr>
      <tr><td>Service prevents boot</td><td>Boot with systemd.unit=emergency.target → systemctl disable problem-service</td></tr>
      <tr><td>Wrong default target</td><td>Boot to rescue → systemctl set-default multi-user.target</td></tr>
      <tr><td>Missing kernel</td><td>Boot alternate kernel from GRUB → reinstall kernel with dnf</td></tr>
    </tbody></table></div>
    <div class="cmd-section"><h3>Useful Recovery Commands</h3>
    <pre><span style="color:var(--muted)"># From rescue/emergency shell:</span>
mount -o remount,rw /      <span style="color:var(--muted)"># if root is read-only</span>
mount -a                   <span style="color:var(--muted)"># mount everything in fstab</span>
journalctl -b -1           <span style="color:var(--muted)"># previous boot logs</span>
journalctl -b 0 -p err     <span style="color:var(--muted)"># current boot errors</span>
systemctl list-units --failed   <span style="color:var(--muted)"># what failed</span>
cat /proc/cmdline          <span style="color:var(--muted)"># current kernel params</span>
dmesg | tail -50           <span style="color:var(--muted)"># kernel messages</span></pre></div>`,
  ])}
  ${renderFooter()}</div>`;
}
