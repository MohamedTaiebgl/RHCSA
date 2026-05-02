// ============================================================
// PAGES-CORE.JS — Home, Plan, Definitions
// ============================================================

function renderHome() {
  return `
    <div class="hero">
      <div class="hero-label">🎓 RHCSA EX200 — Red Hat Enterprise Linux 9</div>
      <h1>Master <span>Linux</span>.<br>Pass in 2 Weeks.</h1>
      <p>Complete RHCSA preparation — all commands, all concepts, 14 hands-on labs, TP zone with VM exercises, interactive quizzes, timed mock exams, and a day-by-day study plan. Built to get you certified fast.</p>
      <div class="hero-stats">
        <div class="stat"><span class="stat-num">12</span><span class="stat-label">Core Domains</span></div>
        <div class="stat"><span class="stat-num">250+</span><span class="stat-label">Commands</span></div>
        <div class="stat"><span class="stat-num">14</span><span class="stat-label">Hands-on Labs</span></div>
        <div class="stat"><span class="stat-num">50+</span><span class="stat-label">Quiz Questions</span></div>
        <div class="stat"><span class="stat-num">10</span><span class="stat-label">TP Exercises</span></div>
        <div class="stat"><span class="stat-num">14</span><span class="stat-label">Day Study Plan</span></div>
      </div>
    </div>
    <div class="content">
      <div class="warn-box">⚠️ <strong>Exam format:</strong> The RHCSA (EX200) is a <strong>3-hour hands-on lab</strong> on a live RHEL 9 system — no multiple choice. You are given tasks to complete. This course focuses on practical skills, not memorization.</div>
      <div class="section-header"><h2>All Domains</h2><span class="badge">EX200</span></div>
      <div class="domains-grid">
        ${[
          {p:'essentials',n:'01',t:'Essential Tools',d:'Shell, vim, grep, find, I/O redirection, tar, SSH',c:'#e63946',pct:'15%'},
          {p:'users',n:'02',t:'Users & Groups',d:'useradd, usermod, groupadd, passwd, chage, sudo',c:'#4cc9f0',pct:'10%'},
          {p:'permissions',n:'03',t:'Permissions & ACL',d:'chmod, chown, umask, SUID/SGID/Sticky, setfacl',c:'#ffd60a',pct:'10%'},
          {p:'storage',n:'04',t:'Storage & LVM',d:'fdisk, parted, mkfs, LVM, mount, fstab, NFS, autofs',c:'#06d6a0',pct:'20%'},
          {p:'processes',n:'05',t:'Processes & Jobs',d:'ps, top, kill, nice, cron, at, jobs, bg, fg',c:'#f77f00',pct:'8%'},
          {p:'networking',n:'06',t:'Networking',d:'nmcli, ip, ss, hostnamectl, DNS, /etc/hosts',c:'#a855f7',pct:'10%'},
          {p:'services',n:'07',t:'Services & systemd',d:'systemctl, journalctl, custom units, timers, targets',c:'#4cc9f0',pct:'10%'},
          {p:'software',n:'08',t:'Software Management',d:'dnf, rpm, repos, modules, streams, AppStream',c:'#e63946',pct:'8%'},
          {p:'security',n:'09',t:'SELinux & Firewall',d:'semanage, restorecon, setsebool, firewall-cmd',c:'#06d6a0',pct:'12%'},
          {p:'scripting',n:'10',t:'Bash Scripting',d:'Variables, loops, conditionals, functions, scripts',c:'#ffd60a',pct:'5%'},
          {p:'containers',n:'11',t:'Containers (Podman)',d:'podman run/ps/stop/rm, volumes, rootless, systemd',c:'#4cc9f0',pct:'5%'},
          {p:'boot',n:'12',t:'Boot & Recovery',d:'GRUB2, rd.break, root reset, rescue mode, targets',c:'#f77f00',pct:'7%'},
        ].map(d => `
          <div class="domain-card" style="--acc:${d.c}" onclick="navigate('${d.p}')">
            <div class="domain-num">Domain ${d.n}</div>
            <div class="domain-title">${d.t}</div>
            <div class="domain-desc">${d.d}</div>
            <div class="domain-meta"><span>~${d.pct} of exam</span><span style="color:${d.c}">Study →</span></div>
          </div>
        `).join('')}
      </div>
      <div class="tip-box"><span>💡</span><div>Pro tip: <strong>Storage (LVM)</strong> and <strong>SELinux</strong> are the most common failure points. If short on time, prioritize them. Use the <strong>TP Zone</strong> to practice on your VM before the exam.</div></div>
      <div class="flex-row">
        <button class="btn btn-primary" onclick="navigate('plan')">📅 View 2-Week Plan</button>
        <button class="btn btn-ghost" onclick="navigate('labs')">🔬 Start Labs</button>
        <button class="btn btn-ghost" onclick="navigate('tp')">🖥️ TP Zone</button>
        <button class="btn btn-ghost" onclick="navigate('quiz')">🧠 Quiz</button>
        <button class="btn btn-ghost" onclick="navigate('exam')">⏱️ Mock Exam</button>
        <button class="btn btn-ghost" onclick="navigate('cheatsheet')">📋 Cheat Sheet</button>
      </div>
      ${renderFooter()}
    </div>`;
}

function renderPlan() {
  const done = JSON.parse(localStorage.getItem('rhcsa-plan-done') || '[]');
  const pct = Math.round((done.length / PLAN.length) * 100);
  const w1 = PLAN.filter(d => d.week === 1);
  const w2 = PLAN.filter(d => d.week === 2);
  return `
    <div class="hero">
      <div class="hero-label">Study Schedule</div>
      <h1>2-Week <span>Battle Plan</span></h1>
      <p>Follow this day-by-day schedule. Click a day to mark it complete. Every day builds on the previous one.</p>
    </div>
    <div class="content">
      <div style="background:var(--card);border:1px solid var(--border);border-radius:6px;padding:16px 18px;margin-bottom:24px;display:flex;align-items:center;gap:18px;flex-wrap:wrap">
        <div>
          <div style="font-size:.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:2px">Progress</div>
          <div style="font-family:var(--font-display);font-size:1.35rem;font-weight:800;color:var(--green)">${done.length}<span style="color:var(--muted);font-size:.9rem"> / ${PLAN.length} days</span></div>
        </div>
        <div style="flex:1;min-width:180px">
          <div style="height:5px;background:var(--border);border-radius:3px;overflow:hidden"><div style="height:100%;background:var(--green);width:${pct}%;border-radius:3px;transition:width .4s"></div></div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="resetPlan()">🔄 Reset</button>
      </div>
      <div class="section-header"><h2>Week 1 — Foundations</h2></div>
      <div class="plan-grid">${w1.map(d => renderDayCard(d, done)).join('')}</div>
      <div class="section-header" style="margin-top:28px"><h2>Week 2 — Advanced &amp; Practice</h2></div>
      <div class="plan-grid">${w2.map(d => renderDayCard(d, done)).join('')}</div>
      <div class="tip-box" style="margin-top:20px"><span>⏰</span><div><strong>Daily commitment:</strong> 3–5 hours/day minimum. Always practice on a VM (RHEL 9 or CentOS Stream 9). Reading is not enough — type every command yourself. Use the TP Zone for VM exercises.</div></div>
      ${renderFooter()}
    </div>`;
}

function renderDayCard(d, done) {
  const isDone = done.includes(d.day);
  return `<div class="day-card ${isDone ? 'done' : ''}" onclick="toggleDay(${d.day})">
    <div class="day-num">Day ${d.day}</div>
    <div class="day-title">${d.title}</div>
    <div class="day-topics">${d.topics}</div>
    <div class="day-hours">⏱ ${d.hours}h recommended</div>
  </div>`;
}

function toggleDay(n) {
  let done = JSON.parse(localStorage.getItem('rhcsa-plan-done') || '[]');
  done.includes(n) ? done = done.filter(x => x !== n) : done.push(n);
  localStorage.setItem('rhcsa-plan-done', JSON.stringify(done));
  navigate('plan');
}
function resetPlan() {
  if (confirm('Reset all plan progress?')) { localStorage.removeItem('rhcsa-plan-done'); navigate('plan'); }
}

function renderDefinitions() {
  return `
    <div class="hero">
      <div class="hero-label">Reference</div>
      <h1>Key <span>Definitions</span></h1>
      <p>Every concept and term you must understand for the RHCSA exam. Use the search to find quickly.</p>
    </div>
    <div class="content">
      <input class="search-bar" id="def-search" placeholder="🔍  Search definitions…" oninput="filterDefs(this.value)">
      <div class="def-grid" id="def-grid">
        ${DEFS.map((d,i) => `
          <div class="def-card" data-idx="${i}">
            <div class="def-term">${d.term}</div>
            <div class="def-text">${d.def}</div>
          </div>`).join('')}
      </div>
      ${renderFooter()}
    </div>`;
}

function filterDefs(q) {
  const ql = q.toLowerCase();
  document.querySelectorAll('#def-grid .def-card').forEach(c => {
    c.style.display = c.textContent.toLowerCase().includes(ql) ? '' : 'none';
  });
}

function renderCheatSheet() {
  const sections = [
    { title:'👤 Users & Groups', items:[
      'useradd -u UID -m -s /bin/bash -g GRP user','usermod -aG group user  ← always -aG!',
      'userdel -r user  ← removes home dir','passwd user  /  chage -d 0 user',
      'chage -M 90 -E 2026-12-31 user','groupadd -g GID group','id user  /  groups user',
    ]},
    { title:'🔐 Permissions & ACL', items:[
      'chmod 755 file  /  chmod -R 700 dir','chown user:group file  /  chgrp group file',
      'chmod u+s file  → SUID (4000)','chmod g+s dir   → SGID (2000)',
      'chmod +t dir    → Sticky (1000)','chmod 3770 dir  → SGID+Sticky+rwxrwx---',
      'setfacl -m u:alice:rwx file','setfacl -d -m g:devs:rw- dir  → default ACL',
      'getfacl file  /  setfacl -b file  ← remove all ACL',
    ]},
    { title:'💾 Storage & LVM', items:[
      'pvcreate /dev/sdb1','vgcreate myvg /dev/sdb1','lvcreate -L 5G -n mylv myvg',
      'mkfs.xfs /dev/myvg/mylv  /  mkfs.ext4 ...','blkid /dev/myvg/mylv  ← get UUID',
      'mount /dev/myvg/mylv /mnt  /  umount /mnt','echo "UUID=xxx /mnt xfs defaults 0 0" >> /etc/fstab',
      'mount -a  ← test fstab!','lvextend -L +5G /dev/myvg/mylv','xfs_growfs /mnt  ← online! (XFS only)',
      'resize2fs /dev/myvg/mylv  ← ext4 (offline)','dd if=/dev/zero of=/swapfile bs=1M count=1024',
      'chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile',
    ]},
    { title:'⚡ Processes & Cron', items:[
      'ps aux --sort=-%cpu | head -15','kill -15 PID  (SIGTERM)  /  kill -9 PID (SIGKILL)',
      'kill -HUP PID  (reload)','nice -n 15 cmd &  /  renice -n 10 -p PID',
      'sleep 60 &  /  jobs  /  fg %1  /  bg %1','nohup cmd &  ← survives logout',
      'crontab -e  ← edit  /  crontab -l  ← list','0 3 * * * /path/cmd  ← daily at 3AM',
      '30 7 * * 1 /path/cmd  ← Monday 7:30AM','echo "cmd" | at now + 2 hours  /  atq  /  atrm N',
    ]},
    { title:'🌐 Networking', items:[
      'nmcli device status  /  nmcli con show','CON="Wired connection 1"',
      'nmcli con mod "$CON" ipv4.addresses "IP/24"','nmcli con mod "$CON" ipv4.gateway "GW"',
      'nmcli con mod "$CON" ipv4.dns "8.8.8.8 1.1.1.1"','nmcli con mod "$CON" ipv4.method manual',
      'nmcli con up "$CON"  ← APPLY!','hostnamectl set-hostname name.fqdn',
      'ip addr show  /  ip route show','ss -tlnp  ← listening TCP ports+processes',
      'echo "192.168.1.10 host.lab host" >> /etc/hosts',
    ]},
    { title:'🔧 Services & systemd', items:[
      'systemctl enable --now svc  ← enable+start','systemctl start|stop|restart|reload svc',
      'systemctl status svc  /  systemctl is-active svc','systemctl disable|mask|unmask svc',
      'systemctl daemon-reload  ← after editing unit files!','systemctl set-default multi-user.target',
      'systemctl list-units --failed','journalctl -u svc -n 30  /  -f (follow)',
      'journalctl -p err -b  ← errors this boot','journalctl -u svc --since "1 hour ago"',
    ]},
    { title:'📦 Software (dnf/rpm)', items:[
      'dnf install -y pkg1 pkg2','dnf remove pkg  /  dnf update [pkg]',
      'dnf whatprovides /usr/bin/semanage  ← find provider','dnf search keyword  /  dnf info pkg',
      'dnf module list php  /  dnf module enable php:8.1','dnf repolist  /  dnf history | head -10',
      'rpm -q pkg  /  rpm -ql pkg  ← list files','rpm -qf /path  ← which pkg owns file',
      'rpm -V pkg  ← verify  /  rpm -ivh pkg.rpm','cat > /etc/yum.repos.d/local.repo  ← [name] baseurl= enabled=1 gpgcheck=0',
    ]},
    { title:'🛡️ SELinux', items:[
      'getenforce  /  sestatus  /  setenforce 0|1 (temp)','NEVER disable or set permissive in exam!',
      'ls -Zd /dir  /  ps -eZ | grep httpd','semanage fcontext -a -t httpd_sys_content_t "/dir(/.*)?"',
      'restorecon -Rv /dir  ← APPLY the rule!','setsebool -P boolean on  ← -P = permanent',
      'getsebool -a | grep httpd','semanage port -a -t http_port_t -p tcp 8080',
      'semanage port -l | grep http','ausearch -m avc -ts recent | audit2why',
    ]},
    { title:'🔥 Firewall', items:[
      'firewall-cmd --add-service=http --permanent','firewall-cmd --add-port=8080/tcp --permanent',
      'firewall-cmd --remove-service=ssh --permanent','firewall-cmd --reload  ← APPLY permanent rules!',
      'firewall-cmd --list-all  /  --zone=trusted --list-all','firewall-cmd --add-source=192.168.0.0/24 --zone=trusted',
      'firewall-cmd --get-default-zone  /  --get-active-zones',
    ]},
    { title:'🐳 Containers (Podman)', items:[
      'podman pull docker.io/library/nginx','podman run -d --name web -p 8080:80 nginx',
      'podman run -v /host:/container:Z nginx  ← :Z for SELinux!','podman ps  /  podman ps -a',
      'podman stop|start|restart|rm name','podman exec -it name bash  /  podman logs name',
      'podman generate systemd --name web --files --new','systemctl --user daemon-reload && systemctl --user enable --now container-web',
      'loginctl enable-linger $USER  ← run without login (as root)',
    ]},
    { title:'🚀 Boot & Recovery', items:[
      '# ROOT RESET — memorize this!','1. Reboot → GRUB → press e',
      '2. linux line: remove rhgb quiet, add rd.break','3. Ctrl+X to boot',
      '4. mount -o remount,rw /sysroot','5. chroot /sysroot',
      '6. passwd root','7. touch /.autorelabel',
      '8. exit && exit','# GRUB config:',
      'vim /etc/default/grub → GRUB_TIMEOUT=5, GRUB_CMDLINE_LINUX="..."','grub2-mkconfig -o /boot/grub2/grub.cfg  ← BIOS',
      'grub2-mkconfig -o /boot/efi/EFI/redhat/grub.cfg  ← UEFI','systemctl set-default multi-user.target',
      'systemctl isolate rescue.target  ← now',
    ]},
    { title:'📜 Bash Scripting', items:[
      '#!/bin/bash  ← always first line','$1 $2 $@  ← args  /  $# ← count  /  $? ← exit code',
      'if [ -f file ]; then ... fi  ← file test','if [ "$a" = "$b" ]; then ... fi',
      'if [ $n -gt 5 ]; then ... fi  ← numeric','for i in 1 2 3; do echo $i; done',
      'while IFS= read -r line; do ... done < file','myfunc() { echo "$1"; }  /  myfunc arg',
      'cmd 2>/dev/null  ← suppress errors','[ -z "$var" ] ← empty  /  [ -n "$var" ] ← non-empty',
    ]},
  ];
  return `
    <div class="hero">
      <div class="hero-label">Quick Reference</div>
      <h1>Master <span>Cheat Sheet</span></h1>
      <p>The most critical commands for every domain. Print this and keep it visible.</p>
    </div>
    <div class="content">
      <div class="cheat-grid">
        ${sections.map(s => `
          <div class="cheat-card">
            <div class="cheat-title">${s.title}</div>
            ${s.items.map(i => i.startsWith('#')
              ? `<div class="cheat-comment">${i}</div>`
              : `<div class="cheat-item">${i}</div>`
            ).join('')}
          </div>`).join('')}
      </div>
      <div class="tip-box" style="margin-top:22px"><span>🎯</span><div><strong>Exam Day:</strong> Read ALL tasks first. Start with quick wins. Use man pages freely. Always verify with systemctl status, df -h, curl, getfacl after each task. Never disable SELinux. Test fstab with mount -a before rebooting.</div></div>
      ${renderFooter()}
    </div>`;
}

function renderFooter() {
  return `<div class="page-footer">
    <div class="footer-text">
      Created by <strong>Mohamed TAIEB</strong> —
      <a href="mailto:mohamed.taieb.gl@gmail.com">mohamed.taieb.gl@gmail.com</a>
      &nbsp;|&nbsp; RHCSA EX200 Study Guide &nbsp;|&nbsp; Red Hat Enterprise Linux 9
    </div>
  </div>`;
}
