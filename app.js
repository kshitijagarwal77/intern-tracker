// ═══════════════════════════════════════════════════════
// APP LOGIC
// ═══════════════════════════════════════════════════════

let dsaDiffFilter   = 'All';
let dsaChartInst    = null;
let topicChartInst  = null;
let ratingChartInst = null;

// ── TAB SWITCHING ────────────────────────────────────────
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${tab}`).classList.add('active');
    if (tab === 'contests') renderRatingChart();
  });
});

// ── MODALS ───────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
});

// ════════════════════════════════════════════════════════
// DSA TRACKER
// ════════════════════════════════════════════════════════
function filterDSA(btn, type) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  dsaDiffFilter = btn.dataset.diff;
  renderDSATable();
}

function renderDSAStats() {
  const solved   = dsaProblems.filter(p => p.status === 'Solved');
  const easy     = solved.filter(p => p.difficulty === 'Easy').length;
  const medium   = solved.filter(p => p.difficulty === 'Medium').length;
  const hard     = solved.filter(p => p.difficulty === 'Hard').length;
  const revisit  = dsaProblems.filter(p => p.status === 'Revisit').length;

  document.getElementById('dsa-sub').textContent =
    `${solved.length} solved · ${dsaProblems.length} total · ${revisit} to revisit`;

  document.getElementById('dsa-stats').innerHTML = [
    { label:'Total', val: dsaProblems.length, color:'#0f172a' },
    { label:'Easy',  val: easy,   color:'#16a34a' },
    { label:'Medium',val: medium, color:'#d97706' },
    { label:'Hard',  val: hard,   color:'#dc2626' },
    { label:'Revisit',val: revisit,color:'#7c3aed' },
  ].map(s => `
    <div class="stat-card">
      <div class="stat-label">${s.label}</div>
      <div class="stat-val" style="color:${s.color}">${s.val}</div>
    </div>`).join('');
}

function renderDSACharts() {
  const solved = dsaProblems.filter(p => p.status === 'Solved');
  const easy   = solved.filter(p => p.difficulty === 'Easy').length;
  const medium = solved.filter(p => p.difficulty === 'Medium').length;
  const hard   = solved.filter(p => p.difficulty === 'Hard').length;

  // Donut chart
  if (dsaChartInst) dsaChartInst.destroy();
  dsaChartInst = new Chart(document.getElementById('dsa-chart'), {
    type: 'doughnut',
    data: {
      labels: ['Easy','Medium','Hard'],
      datasets: [{ data:[easy,medium,hard], backgroundColor:['#16a34a','#d97706','#dc2626'], borderWidth:0, hoverOffset:6 }]
    },
    options: { cutout:'65%', plugins:{ legend:{ position:'bottom', labels:{ boxWidth:10, font:{ size:11 } } } }, responsive:true, maintainAspectRatio:true }
  });

  // Topic bar chart
  const topicCounts = {};
  dsaProblems.forEach(p => { topicCounts[p.topic] = (topicCounts[p.topic]||0) + 1; });
  const topics  = Object.keys(topicCounts).sort((a,b) => topicCounts[b]-topicCounts[a]).slice(0,8);
  const counts  = topics.map(t => topicCounts[t]);

  if (topicChartInst) topicChartInst.destroy();
  topicChartInst = new Chart(document.getElementById('topic-chart'), {
    type: 'bar',
    data: {
      labels: topics,
      datasets: [{ data:counts, backgroundColor:'#dbeafe', borderColor:'#2563eb', borderWidth:1.5, borderRadius:4 }]
    },
    options: {
      plugins:{ legend:{ display:false } },
      scales:{ y:{ beginAtZero:true, ticks:{ stepSize:1, font:{size:10} }, grid:{color:'#f1f5f9'} }, x:{ ticks:{ font:{size:10} }, grid:{display:false} } },
      responsive:true, maintainAspectRatio:true
    }
  });
}

function renderDSATable() {
  const topicFilter = document.getElementById('topic-filter').value;
  const filtered = dsaProblems.filter(p =>
    (dsaDiffFilter === 'All' || p.difficulty === dsaDiffFilter) &&
    (topicFilter   === 'All' || p.topic === topicFilter)
  );
  const tbody = document.getElementById('dsa-tbody');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="6">No problems found. Add one!</td></tr>`;
    return;
  }
  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td style="font-weight:600;color:#1e293b">${p.link ? `<a href="${p.link}" target="_blank">${p.title}</a>` : p.title}</td>
      <td style="color:#64748b">${p.platform}</td>
      <td><span class="badge badge-${p.difficulty.toLowerCase()}">${p.difficulty}</span></td>
      <td style="color:#64748b">${p.topic}</td>
      <td><span class="badge badge-${p.status.toLowerCase()}" onclick="toggleDSAStatus(${p.id})" title="Click to toggle">${p.status}</span></td>
      <td><button class="del-btn" onclick="deleteDSA(${p.id})">✕</button></td>
    </tr>`).join('');
}

function toggleDSAStatus(id) {
  const p = dsaProblems.find(x => x.id === id);
  if (p) { p.status = p.status === 'Solved' ? 'Revisit' : 'Solved'; renderDSA(); }
}
function deleteDSA(id) {
  dsaProblems = dsaProblems.filter(x => x.id !== id);
  renderDSA();
}
function addDSA() {
  const title = document.getElementById('f-dsa-title').value.trim();
  if (!title) { alert('Please enter a problem title.'); return; }
  dsaProblems.unshift({
    id: ++nextId,
    title,
    platform: document.getElementById('f-dsa-platform').value,
    difficulty: document.getElementById('f-dsa-diff').value,
    topic: document.getElementById('f-dsa-topic').value,
    status: document.getElementById('f-dsa-status').value,
    link: document.getElementById('f-dsa-link').value.trim(),
  });
  document.getElementById('f-dsa-title').value = '';
  document.getElementById('f-dsa-link').value  = '';
  closeModal('dsa-modal');
  renderDSA();
}
function renderDSA() {
  renderDSAStats();
  renderDSACharts();
  renderDSATable();
}

// ════════════════════════════════════════════════════════
// CONTESTS
// ════════════════════════════════════════════════════════
function renderContestStats() {
  const total      = contests.length;
  const bestRank   = total ? Math.min(...contests.map(c => c.rank)) : '—';
  const avgSolved  = total ? (contests.reduce((s,c)=>s+c.problemsSolved,0)/total).toFixed(1) : '—';
  const totalDelta = contests.reduce((s,c)=>s+(c.ratingChange||0),0);
  const latestRating = total ? contests.slice().sort((a,b)=>a.date.localeCompare(b.date)).at(-1).newRating : '—';

  document.getElementById('contest-sub').textContent =
    `${total} contests · ${totalDelta>=0?'+':''}${totalDelta} total rating change`;

  document.getElementById('contest-stats').innerHTML = [
    { label:'Contests',      val: total },
    { label:'Latest Rating', val: latestRating },
    { label:'Best Rank',     val: total ? '#'+bestRank : '—' },
    { label:'Avg Solved',    val: avgSolved },
    { label:'Total Δ Rating',val: (totalDelta>=0?'+':'')+totalDelta, color: totalDelta>=0?'#16a34a':'#dc2626' },
  ].map(s => `
    <div class="stat-card">
      <div class="stat-label">${s.label}</div>
      <div class="stat-val" style="color:${s.color||'#0f172a'}">${s.val}</div>
    </div>`).join('');
}

function renderRatingChart() {
  const sorted = [...contests].sort((a,b) => a.date.localeCompare(b.date));
  if (ratingChartInst) ratingChartInst.destroy();
  ratingChartInst = new Chart(document.getElementById('rating-chart'), {
    type: 'line',
    data: {
      labels: sorted.map(c => c.date),
      datasets: [{
        label: 'Rating',
        data: sorted.map(c => c.newRating),
        borderColor: '#2563eb', backgroundColor: 'rgba(37,99,235,0.08)',
        borderWidth: 2.5, pointRadius: 4, pointBackgroundColor:'#2563eb',
        tension: 0.3, fill: true,
      }]
    },
    options: {
      plugins:{ legend:{ display:false } },
      scales:{
        y:{ beginAtZero:false, ticks:{ font:{size:11} }, grid:{ color:'#f1f5f9' } },
        x:{ ticks:{ font:{size:10} }, grid:{ display:false } }
      },
      responsive:true, maintainAspectRatio:true
    }
  });
}

function renderContestTable() {
  const tbody = document.getElementById('contest-tbody');
  if (!contests.length) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="7">No contests yet.</td></tr>`; return;
  }
  const sorted = [...contests].sort((a,b) => b.date.localeCompare(a.date));
  tbody.innerHTML = sorted.map(c => `
    <tr>
      <td style="font-weight:600;color:#1e293b">${c.name}</td>
      <td style="color:#64748b">${c.platform}</td>
      <td style="color:#64748b">${c.date}</td>
      <td style="font-weight:700">#${c.rank}</td>
      <td>${c.problemsSolved}</td>
      <td style="font-weight:700;color:${c.ratingChange>=0?'#16a34a':'#dc2626'}">${c.ratingChange>=0?'+':''}${c.ratingChange}</td>
      <td><button class="del-btn" onclick="deleteContest(${c.id})">✕</button></td>
    </tr>`).join('');
}

function deleteContest(id) {
  contests = contests.filter(x => x.id !== id);
  renderContests();
}
function addContest() {
  const name = document.getElementById('f-c-name').value.trim();
  if (!name) { alert('Please enter a contest name.'); return; }
  contests.unshift({
    id: ++nextId,
    name,
    platform:          document.getElementById('f-c-platform').value,
    date:              document.getElementById('f-c-date').value,
    rank:              +document.getElementById('f-c-rank').value || 0,
    totalParticipants: +document.getElementById('f-c-total').value || 0,
    problemsSolved:    +document.getElementById('f-c-solved').value || 0,
    ratingChange:      +document.getElementById('f-c-delta').value || 0,
    newRating:         +document.getElementById('f-c-rating').value || 0,
  });
  ['f-c-name','f-c-date','f-c-rank','f-c-total','f-c-solved','f-c-delta','f-c-rating'].forEach(id => {
    document.getElementById(id).value = '';
  });
  closeModal('contest-modal');
  renderContests();
}
function renderContests() {
  renderContestStats();
  renderContestTable();
  renderRatingChart();
}

// ════════════════════════════════════════════════════════
// PIPELINE
// ════════════════════════════════════════════════════════
const STATUSES   = ['Applied','OA','Interview','Offer','Rejected'];
const STATUS_BADGE = {
  Applied:'badge-applied', OA:'badge-oa', Interview:'badge-interview',
  Offer:'badge-offer', Rejected:'badge-rejected'
};
const KANBAN_BG = {
  Applied:'#eff6ff', OA:'#fffbeb', Interview:'#f5f3ff', Offer:'#f0fdf4', Rejected:'#fef2f2'
};
const KANBAN_BORDER = {
  Applied:'#bfdbfe', OA:'#fde68a', Interview:'#ddd6fe', Offer:'#bbf7d0', Rejected:'#fecaca'
};

function renderPipelineStats() {
  const offers    = applications.filter(a=>a.status==='Offer').length;
  const interviews= applications.filter(a=>a.status==='Interview').length;
  const rejected  = applications.filter(a=>a.status==='Rejected').length;

  document.getElementById('pipeline-sub').textContent =
    `${applications.length} applications · ${offers} offers · ${interviews} active interviews`;

  document.getElementById('pipeline-stats').innerHTML = STATUSES.map(s => `
    <div class="stat-card">
      <div class="stat-label">${s}</div>
      <div class="stat-val">${applications.filter(a=>a.status===s).length}</div>
    </div>`).join('');
}

function renderKanban() {
  const board = document.getElementById('kanban-board');
  board.innerHTML = STATUSES.map(s => {
    const cards = applications.filter(a => a.status === s);
    return `
      <div class="kanban-col" style="background:${KANBAN_BG[s]};border-color:${KANBAN_BORDER[s]}">
        <div class="kanban-col-header">
          <span class="badge ${STATUS_BADGE[s]}">${s}</span>
          <span class="kanban-col-count">${cards.length}</span>
        </div>
        <div class="kanban-cards">
          ${cards.length === 0 ? '<div class="kanban-empty">Empty</div>' : ''}
          ${cards.map(a => `
            <div class="kanban-card">
              <div class="kanban-company">${a.company}</div>
              <div class="kanban-role">${a.role}</div>
              ${a.dateApplied ? `<div class="kanban-date">${a.dateApplied}</div>` : ''}
              ${a.link ? `<div><a href="${a.link}" target="_blank" style="font-size:11px;color:#2563eb">View JD ↗</a></div>` : ''}
              <div class="kanban-actions">
                ${STATUSES.filter(st=>st!==s).map(st =>
                  `<button class="move-btn" onclick="moveApp(${a.id},'${st}')">→ ${st}</button>`
                ).join('')}
                <button class="move-btn" style="color:#dc2626;border-color:#fecaca" onclick="deleteApp(${a.id})">✕</button>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }).join('');
}

function moveApp(id, status) {
  const a = applications.find(x => x.id === id);
  if (a) { a.status = status; renderPipeline(); }
}
function deleteApp(id) {
  applications = applications.filter(x => x.id !== id);
  renderPipeline();
}
function addApplication() {
  const company = document.getElementById('f-p-company').value.trim();
  if (!company) { alert('Please enter a company name.'); return; }
  applications.unshift({
    id: ++nextId,
    company,
    role:        document.getElementById('f-p-role').value.trim(),
    dateApplied: document.getElementById('f-p-date').value,
    status:      document.getElementById('f-p-status').value,
    link:        document.getElementById('f-p-link').value.trim(),
  });
  ['f-p-company','f-p-role','f-p-date','f-p-link'].forEach(id => {
    document.getElementById(id).value = '';
  });
  closeModal('pipeline-modal');
  renderPipeline();
}
function renderPipeline() {
  renderPipelineStats();
  renderKanban();
}

// ════════════════════════════════════════════════════════
// INTERVIEW NOTES
// ════════════════════════════════════════════════════════
const OUTCOME_BADGE = { Cleared:'badge-cleared', Pending:'badge-pending', Rejected:'badge-rejected' };

function renderNotesStats() {
  const cleared  = interviewNotes.filter(n=>n.outcome==='Cleared').length;
  const pending  = interviewNotes.filter(n=>n.outcome==='Pending').length;
  const rejected = interviewNotes.filter(n=>n.outcome==='Rejected').length;

  document.getElementById('notes-sub').textContent =
    `${interviewNotes.length} entries · ${cleared} cleared · ${pending} pending`;

  document.getElementById('notes-stats').innerHTML = [
    { label:'Total',    val: interviewNotes.length },
    { label:'Cleared',  val: cleared,  color:'#16a34a' },
    { label:'Pending',  val: pending,  color:'#d97706' },
    { label:'Rejected', val: rejected, color:'#dc2626' },
  ].map(s => `
    <div class="stat-card">
      <div class="stat-label">${s.label}</div>
      <div class="stat-val" style="color:${s.color||'#0f172a'}">${s.val}</div>
    </div>`).join('');
}

function renderNotes() {
  const search = (document.getElementById('notes-search').value || '').toLowerCase();
  const filtered = interviewNotes.filter(n => n.company.toLowerCase().includes(search));
  const list = document.getElementById('notes-list');

  if (!filtered.length) {
    list.innerHTML = `<div class="note-card" style="padding:32px;text-align:center;color:#94a3b8">No notes found.</div>`;
    return;
  }

  list.innerHTML = filtered.map(n => `
    <div class="note-card" id="note-${n.id}">
      <div class="note-header" onclick="toggleNote(${n.id})">
        <div style="display:flex;align-items:center">
          <div class="note-avatar">${n.company[0].toUpperCase()}</div>
          <div class="note-meta">
            <div class="note-company">${n.company}</div>
            <div class="note-detail">${n.round} Round · ${n.date || 'No date'}</div>
          </div>
        </div>
        <div class="note-right">
          <span class="badge ${OUTCOME_BADGE[n.outcome]}">${n.outcome}</span>
          <span class="note-expand" id="arrow-${n.id}">▼</span>
          <button class="del-btn" onclick="event.stopPropagation();deleteNote(${n.id})">✕</button>
        </div>
      </div>
      <div class="note-body" id="body-${n.id}">${n.notes || '<em style="color:#94a3b8">No notes added.</em>'}</div>
    </div>`).join('');
}

function toggleNote(id) {
  const body  = document.getElementById(`body-${id}`);
  const arrow = document.getElementById(`arrow-${id}`);
  const open  = body.classList.toggle('open');
  arrow.textContent = open ? '▲' : '▼';
}
function deleteNote(id) {
  interviewNotes = interviewNotes.filter(x => x.id !== id);
  renderNotes();
  renderNotesStats();
}
function addNote() {
  const company = document.getElementById('f-n-company').value.trim();
  if (!company) { alert('Please enter a company name.'); return; }
  interviewNotes.unshift({
    id:      ++nextId,
    company,
    round:   document.getElementById('f-n-round').value,
    date:    document.getElementById('f-n-date').value,
    outcome: document.getElementById('f-n-outcome').value,
    notes:   document.getElementById('f-n-notes').value.trim(),
  });
  ['f-n-company','f-n-date','f-n-notes'].forEach(id => {
    document.getElementById(id).value = '';
  });
  closeModal('notes-modal');
  renderNotes();
  renderNotesStats();
}

// ════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  renderDSA();
  renderContests();
  renderPipeline();
  renderNotesStats();
  renderNotes();
});
