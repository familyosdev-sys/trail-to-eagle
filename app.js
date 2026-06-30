// ═══════════════════════════════════════════════════════════════
// Trail to Eagle — App Logic
// "The trail is long, but every step counts."
// ═══════════════════════════════════════════════════════════════

const app = {
  // ─── STATE ───
  state: {
    scoutName: '',
    currentRank: 'scout',
    completedReqs: {},     // { "scout-1": true, "scout-1a": true, ... }
    completedBadges: {},   // { "first-aid": true, "cooking": true, ... }
    badgeNotes: {},        // { "scout-1": "Completed at summer camp", ... }
    serviceHours: 0,
    leadershipMonths: 0,
    currentPage: 'home',
    mbFilter: 'all',       // 'all', 'eagle', 'category-id'
    mbSearch: '',
  },

  // ─── INIT ───
  init() {
    this.loadState();
    this.renderHome();
    this.setupNav();
    this.registerSW();
  },

  // ─── PERSISTENCE ───
  loadState() {
    try {
      const saved = localStorage.getItem('road-to-eagle-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch(e) {
      console.warn('Could not load state:', e);
    }
  },

  saveState() {
    try {
      localStorage.setItem('road-to-eagle-state', JSON.stringify(this.state));
    } catch(e) {
      console.warn('Could not save state:', e);
    }
  },

  // ─── NAVIGATION ───
  setupNav() {
    // Handled by onclick in HTML
  },

  showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show target
    const target = document.getElementById(`page-${page}`);
    if (target) target.classList.add('active');
    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === page);
    });
    this.state.currentPage = page;
    this.saveState();

    // Render page content
    switch(page) {
      case 'home': this.renderHome(); break;
      case 'trail': this.renderTrail(); break;
      case 'badges': this.renderBadges(); break;
      case 'settings': this.renderSettings(); break;
    }
  },

  // ─── PROGRESS CALCULATION ───
  getRankProgress(rankId) {
    const rank = RANKS.find(r => r.id === rankId);
    if (!rank) return { completed: 0, total: 0, pct: 0 };

    let total = 0;
    let completed = 0;

    const countReqs = (reqs) => {
      for (const req of reqs) {
        if (req.subReqs && req.subReqs.length > 0) {
          countReqs(req.subReqs);
        } else {
          total++;
          if (this.state.completedReqs[req.id]) completed++;
        }
      }
    };

    countReqs(rank.requirements);
    return { completed, total, pct: total > 0 ? Math.round((completed / total) * 100) : 0 };
  },

  getCurrentRankIndex() {
    // Find the highest rank that's been started or completed
    let currentIndex = 0;
    for (let i = 0; i < RANKS.length; i++) {
      const progress = this.getRankProgress(RANKS[i].id);
      if (progress.completed > 0) currentIndex = i;
      if (progress.pct === 100) currentIndex = i + 1; // completed, move to next
    }
    return Math.min(currentIndex, RANKS.length - 1);
  },

  getOverallProgress() {
    let totalReqs = 0;
    let completedReqs = 0;

    for (const rank of RANKS) {
      const countReqs = (reqs) => {
        for (const req of reqs) {
          if (req.subReqs && req.subReqs.length > 0) {
            countReqs(req.subReqs);
          } else {
            totalReqs++;
            if (this.state.completedReqs[req.id]) completedReqs++;
          }
        }
      };
      countReqs(rank.requirements);
    }

    return { total: totalReqs, completed: completedReqs, pct: totalReqs > 0 ? Math.round((completedReqs / totalReqs) * 100) : 0 };
  },

  getBadgeCount() {
    return Object.keys(this.state.completedBadges).filter(k => this.state.completedBadges[k]).length;
  },

  getEagleBadgesEarned() {
    const earned = new Set();
    for (const group of EAGLE_REQUIRED_GROUPS) {
      if (group.type === 'required' && this.state.completedBadges[group.badge]) {
        earned.add(group.id);
      } else if (group.type === 'alt' && group.badges) {
        for (const bid of group.badges) {
          if (this.state.completedBadges[bid]) {
            earned.add(group.id);
            break;
          }
        }
      }
    }
    return earned.size;
  },

  // ─── STREAK CALCULATION ───
  getStreak() {
    // Count consecutive days with at least one requirement completed
    const dates = Object.keys(this.state.completedReqs)
      .filter(k => this.state.completedReqs[k] && this.state.completedReqs[k] !== true)
      .map(k => {
        const note = this.state.badgeNotes[k];
        if (note && note.startsWith('date:')) {
          return new Date(note.slice(5));
        }
        return null;
      })
      .filter(d => d !== null)
      .sort((a, b) => b - a);

    if (dates.length === 0) return 0;

    let streak = 1;
    const today = new Date();
    today.setHours(0,0,0,0);

    // Check if there was activity today or yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const mostRecent = new Date(dates[0]);
    mostRecent.setHours(0,0,0,0);

    if (mostRecent < yesterday) return 0;

    for (let i = 1; i < dates.length; i++) {
      const curr = new Date(dates[i]);
      curr.setHours(0,0,0,0);
      const prev = new Date(dates[i-1]);
      prev.setHours(0,0,0,0);

      const diff = (prev - curr) / (1000 * 60 * 60 * 24);
      if (diff <= 1.5) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  },

  // ─── RENDER HOME ───
  renderHome() {
    const el = document.getElementById('homeContent');
    const currentIdx = this.getCurrentRankIndex();
    const currentRank = RANKS[currentIdx];
    const progress = this.getRankProgress(currentRank.id);
    const overall = this.getOverallProgress();
    const badgeCount = this.getBadgeCount();
    const eagleBadges = this.getEagleBadgesEarned();
    const streak = this.getStreak();

    let html = `
      <div class="scout-badge">
        <div class="rank-emblem" style="background: ${currentRank.color}; box-shadow: 0 4px 20px ${currentRank.color}44;">
          ${currentRank.emblem}
        </div>
        <div class="rank-name">${this.state.scoutName || 'Scout'}</div>
        <div class="rank-subtitle">${currentRank.name} Rank${progress.pct === 100 ? ' — COMPLETE! 🎉' : ''}</div>
      </div>

      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-num">${overall.pct}%</div>
          <div class="stat-label">Overall</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${badgeCount}</div>
          <div class="stat-label">Badges</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${eagleBadges}/13</div>
          <div class="stat-label">Eagle Req</div>
        </div>
      </div>
    `;

    if (streak > 0) {
      html += `
        <div class="streak-banner">
          <div>
            <div class="streak-num">${streak} ${streak === 1 ? 'day' : 'days'} 🔥</div>
            <div class="streak-label">Keep going, ${this.state.scoutName || 'Scout'}!</div>
          </div>
          <div style="font-size:2.5rem;">${streak >= 7 ? '⚡' : streak >= 3 ? '🔥' : '✨'}</div>
        </div>
      `;
    }

    // Current rank progress card
    html += `
      <div class="section-header">
        <h2>${currentRank.name} Rank Progress</h2>
        <span class="see-all" onclick="app.showPage('trail')">See All Ranks →</span>
      </div>
      <div class="progress-card" onclick="app.openRank('${currentRank.id}')">
        <div class="card-header">
          <div>
            <div class="card-title">${currentRank.emblem} ${currentRank.name}</div>
            <div class="card-subtitle">${progress.completed} of ${progress.total} requirements</div>
          </div>
          <div class="card-pct">${progress.pct}%</div>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill${progress.pct === 100 ? ' complete' : ''}" style="width: ${progress.pct}%"></div>
        </div>
      </div>
    `;

    // Quick links
    html += `
      <div class="section-header" style="margin-top:20px;">
        <h2>Quick Links</h2>
      </div>
      <div class="progress-card" onclick="app.showPage('trail')">
        <div class="card-header">
          <div>
            <div class="card-title">🗺️ The Trail to Eagle</div>
            <div class="card-subtitle">View all 7 ranks</div>
          </div>
        </div>
      </div>
      <div class="progress-card" onclick="app.showPage('badges')">
        <div class="card-header">
          <div>
            <div class="card-title">🎖️ Merit Badges</div>
            <div class="card-subtitle">${badgeCount} earned · ${eagleBadges}/13 Eagle-required</div>
          </div>
        </div>
      </div>
      <div class="progress-card" onclick="app.openRank('eagle')">
        <div class="card-header">
          <div>
            <div class="card-title">🦅 Eagle Scout Requirements</div>
            <div class="card-subtitle">See what it takes</div>
          </div>
        </div>
      </div>
    `;

    el.innerHTML = html;
  },

  // ─── RENDER TRAIL ───
  renderTrail() {
    const el = document.getElementById('trailContent');
    const currentIdx = this.getCurrentRankIndex();

    let html = '';
    for (let i = 0; i < RANKS.length; i++) {
      const rank = RANKS[i];
      const progress = this.getRankProgress(rank.id);
      let status, markerClass;

      if (i < currentIdx) {
        status = '✓ Complete';
        markerClass = 'completed';
      } else if (i === currentIdx) {
        status = `${progress.pct}% — ${progress.completed}/${progress.total} done`;
        markerClass = 'current';
      } else {
        status = 'Locked — complete previous rank first';
        markerClass = 'locked';
      }

      html += `
        <div class="trail-node" onclick="app.openRank('${rank.id}')">
          <div class="node-marker ${markerClass}">${rank.emblem}</div>
          <div class="node-info">
            <div class="node-name">${rank.name}</div>
            <div class="node-status ${markerClass === 'completed' ? 'completed' : ''}">${status}</div>
          </div>
        </div>
      `;
    }

    el.innerHTML = html;
  },

  // ─── OPEN RANK DETAIL ───
  openRank(rankId) {
    const rank = RANKS.find(r => r.id === rankId);
    if (!rank) return;

    const progress = this.getRankProgress(rankId);
    const el = document.getElementById('rankContent');

    let html = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
        <button onclick="app.showPage('${this.state.currentPage === 'home' ? 'home' : 'trail'}')" 
          style="background:var(--bsa-card);border:1px solid var(--bsa-border);color:var(--bsa-text);padding:8px 12px;border-radius:8px;cursor:pointer;font-size:1rem;">← Back</button>
      </div>
      <div class="scout-badge">
        <div class="rank-emblem" style="background:${rank.color};box-shadow:0 4px 20px ${rank.color}44;">
          ${rank.emblem}
        </div>
        <div class="rank-name">${rank.name}</div>
        <div class="rank-subtitle">${rank.motto || ''}</div>
        ${rank.id === 'eagle' ? '<div class="rank-subtitle" style="color:var(--bsa-gold);margin-top:4px;">The highest rank in Scouting</div>' : ''}
      </div>
      <div class="progress-card" style="cursor:default;">
        <div class="card-header">
          <div>
            <div class="card-title">Progress</div>
            <div class="card-subtitle">${progress.completed} of ${progress.total} requirements</div>
          </div>
          <div class="card-pct">${progress.pct}%</div>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill${progress.pct === 100 ? ' complete' : ''}" style="width:${progress.pct}%"></div>
        </div>
      </div>
    `;

    // Render requirements grouped by sections
    const renderReqs = (reqs, prefix = '') => {
      let reqHtml = '';
      for (const req of reqs) {
        if (req.subReqs && req.subReqs.length > 0) {
          // Parent requirement with sub-requirements
          const parentId = req.id;
          const parentChecked = this.state.completedReqs[parentId] ? 'checked' : '';
          reqHtml += `
            <div class="req-item ${parentChecked}" onclick="app.toggleReq('${parentId}', event)">
              <div class="req-checkbox">${parentChecked ? '✓' : ''}</div>
              <div class="req-text">
                <span class="req-number">${req.num}.</span> ${req.text}
              </div>
            </div>
          `;
          // Sub-requirements
          reqHtml += `<div style="margin-left:24px;">`;
          reqHtml += renderReqs(req.subReqs, req.num);
          reqHtml += `</div>`;
        } else {
          // Leaf requirement
          const checked = this.state.completedReqs[req.id] ? 'checked' : '';
          const hasNote = this.state.badgeNotes[req.id];
          reqHtml += `
            <div class="req-item ${checked}" onclick="app.toggleReq('${req.id}', event)">
              <div class="req-checkbox">${checked ? '✓' : ''}</div>
              <div class="req-text">
                <span class="req-number">${req.num}.</span> ${req.text}
                ${req.isBadge ? `<span style="color:var(--bsa-gold);font-size:0.75rem;display:block;margin-top:2px;">🎖️ Merit Badge — tap to track in Badges</span>` : ''}
              </div>
            </div>
            <button class="req-note-btn" onclick="app.toggleNote('${req.id}', event)">${hasNote ? '📝 Edit Note' : '📝 Add Note'}</button>
            <div class="req-note-area ${hasNote ? 'open' : ''}" id="note-${req.id}">
              <textarea onclick="event.stopPropagation()" oninput="app.saveNote('${req.id}', this.value)" placeholder="Add a note about this requirement...">${hasNote || ''}</textarea>
            </div>
          `;
        }
      }
      return reqHtml;
    };

    html += `<div class="req-section"><div class="req-section-title">Requirements</div>`;
    html += renderReqs(rank.requirements);
    html += `</div>`;

    el.innerHTML = html;

    // Show the rank page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-rank').classList.add('active');
    // Don't update nav for rank detail page
  },

  // ─── TOGGLE REQUIREMENT ───
  toggleReq(reqId, event) {
    event.stopPropagation();
    const isCompleted = this.state.completedReqs[reqId];
    this.state.completedReqs[reqId] = !isCompleted;

    // If unchecking, also uncheck all children
    // If checking, mark date in notes
    if (!isCompleted) {
      // Just checked it — celebrate if it's a big one
      this.state.badgeNotes[reqId] = this.state.badgeNotes[reqId] || '';
    } else {
      // Unchecked — remove date note if auto-added
    }

    this.saveState();

    // Check for completion celebrations
    const overall = this.getOverallProgress();
    if (overall.pct === 100) {
      this.celebrate('🏆 ALL REQUIREMENTS COMPLETE!');
    }

    // Check rank completion
    for (const rank of RANKS) {
      const progress = this.getRankProgress(rank.id);
      if (progress.pct === 100 && !isCompleted) {
        this.celebrate(`${rank.emblem} ${rank.name} Rank COMPLETE!`);
        break;
      }
    }

    // Re-render current view
    this.openRank(this.state.currentPage === 'home' ? RANKS[this.getCurrentRankIndex()].id : this.state.lastRankViewed || RANKS[this.getCurrentRankIndex()].id);
  },

  // ─── NOTES ───
  toggleNote(reqId, event) {
    event.stopPropagation();
    const noteEl = document.getElementById(`note-${reqId}`);
    if (noteEl) {
      noteEl.classList.toggle('open');
    }
  },

  saveNote(reqId, value) {
    if (value.trim()) {
      this.state.badgeNotes[reqId] = value;
    } else {
      delete this.state.badgeNotes[reqId];
    }
    this.saveState();
  },

  // ─── RENDER BADGES ───
  renderBadges() {
    const el = document.getElementById('badgesContent');

    let html = `
      <h2 style="text-align:center;margin-bottom:16px;">🎖️ Merit Badges</h2>
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Search merit badges..." oninput="app.filterBadges(this.value)" id="mbSearch">
      </div>
      <div class="filter-row" id="mbFilters">
        <div class="filter-pill active" onclick="app.setBadgeFilter('all')">All</div>
        <div class="filter-pill" onclick="app.setBadgeFilter('eagle')">🦅 Eagle</div>
    `;

    for (const cat of MERIT_BADGE_CATEGORIES) {
      html += `<div class="filter-pill" onclick="app.setBadgeFilter('${cat.id}')">${cat.icon} ${cat.name}</div>`;
    }
    html += `</div>`;

    // Stats bar
    const totalBadges = MERIT_BADGES.filter(b => !b.discontinued).length;
    const earnedBadges = this.getBadgeCount();
    const eagleEarned = this.getEagleBadgesEarned();

    html += `
      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-num">${earnedBadges}/${totalBadges}</div>
          <div class="stat-label">Earned</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${eagleEarned}/13</div>
          <div class="stat-label">Eagle Req</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${21 - earnedBadges}</div>
          <div class="stat-label">To Eagle</div>
        </div>
      </div>
    `;

    html += `<div class="mb-grid" id="mbGrid">`;
    html += this.renderBadgeGrid();
    html += `</div>`;

    el.innerHTML = html;
  },

  renderBadgeGrid() {
    let badges = MERIT_BADGES;

    // Apply filter
    if (this.state.mbFilter === 'eagle') {
      badges = badges.filter(b => b.eagle);
    } else if (this.state.mbFilter !== 'all') {
      badges = badges.filter(b => b.category === this.state.mbFilter);
    }

    // Apply search
    if (this.state.mbSearch) {
      const q = this.state.mbSearch.toLowerCase();
      badges = badges.filter(b => b.name.toLowerCase().includes(q));
    }

    if (badges.length === 0) {
      return `<div class="empty-state"><div class="empty-icon">🔍</div><p>No merit badges found</p></div>`;
    }

    let html = '';
    for (const badge of badges) {
      const earned = this.state.completedBadges[badge.id];
      html += `
        <div class="mb-card ${earned ? 'earned' : ''} ${badge.discontinued ? 'locked' : ''}" 
             onclick="app.openBadge('${badge.id}')">
          <div class="mb-icon">${badge.icon}</div>
          <div class="mb-name">${badge.name}</div>
          ${badge.eagle ? '<div class="mb-eagle">🦅 Eagle Required</div>' : ''}
          ${badge.isNew ? '<div class="mb-eagle" style="color:var(--bsa-green-light);">✨ New Badge</div>' : ''}
          ${badge.discontinued ? '<div style="font-size:0.65rem;color:var(--bsa-red);margin-top:2px;">Discontinued</div>' : ''}
          <div class="mb-progress">${earned ? '✓ Earned' : 'Not started'}</div>
        </div>
      `;
    }
    return html;
  },

  filterBadges(query) {
    this.state.mbSearch = query;
    const grid = document.getElementById('mbGrid');
    if (grid) grid.innerHTML = this.renderBadgeGrid();
  },

  setBadgeFilter(filter) {
    this.state.mbFilter = filter;
    // Update pill active state
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    event.target.classList.add('active');
    const grid = document.getElementById('mbGrid');
    if (grid) grid.innerHTML = this.renderBadgeGrid();
  },

  // ─── OPEN BADGE DETAIL ───
  openBadge(badgeId) {
    const badge = MERIT_BADGES.find(b => b.id === badgeId);
    if (!badge) return;

    const earned = this.state.completedBadges[badgeId];
    const el = document.getElementById('badgeContent');

    // Find which Eagle group this badge belongs to
    let eagleGroup = null;
    if (badge.eagle) {
      eagleGroup = EAGLE_REQUIRED_GROUPS.find(g => {
        if (g.badge === badgeId) return true;
        if (g.badges && g.badges.includes(badgeId)) return true;
        return false;
      });
    }

    let html = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
        <button onclick="app.showPage('badges')" 
          style="background:var(--bsa-card);border:1px solid var(--bsa-border);color:var(--bsa-text);padding:8px 12px;border-radius:8px;cursor:pointer;font-size:1rem;">← Back</button>
      </div>
      <div style="text-align:center;padding:20px 0;">
        <div style="font-size:4rem;">${badge.icon}</div>
        <h2 style="margin-top:8px;color:var(--bsa-gold);">${badge.name}</h2>
        <div style="color:var(--bsa-text-muted);font-size:0.85rem;margin-top:4px;">${badge.category}</div>
        ${badge.eagle ? '<div style="color:var(--bsa-gold);font-weight:700;margin-top:4px;">🦅 Eagle Required</div>' : ''}
        ${badge.isNew ? '<div style="color:var(--bsa-green-light);font-weight:600;margin-top:2px;">✨ New Merit Badge</div>' : ''}
        ${badge.discontinued ? `<div style="color:var(--bsa-red);font-weight:600;margin-top:4px;">⚠️ ${badge.discontinuedNote || 'Discontinued'}</div>` : ''}
        ${eagleGroup && eagleGroup.type === 'alt' ? `<div style="color:var(--bsa-text-muted);font-size:0.8rem;margin-top:4px;">Alternative for: ${eagleGroup.label}</div>` : ''}
      </div>
      <div class="progress-card" onclick="app.toggleBadge('${badgeId}')" style="cursor:pointer;text-align:center;">
        <div style="font-size:1.2rem;font-weight:700;color:${earned ? 'var(--bsa-gold)' : 'var(--bsa-text)'}">
          ${earned ? '✓ EARNED — Tap to unmark' : 'Tap to mark as earned'}
        </div>
      </div>
    `;

    // If this is an Eagle alt, show which other badges satisfy the same requirement
    if (eagleGroup && eagleGroup.type === 'alt') {
      html += `<div style="margin-top:16px;padding:12px;background:var(--bsa-card);border:1px solid var(--bsa-border);border-radius:10px;">`;
      html += `<div style="font-size:0.85rem;color:var(--bsa-text-muted);margin-bottom:8px;">You only need ONE from this group for Eagle:</div>`;
      for (const altId of eagleGroup.badges) {
        const altBadge = MERIT_BADGES.find(b => b.id === altId);
        if (altBadge) {
          const altEarned = this.state.completedBadges[altId];
          html += `<div style="padding:6px 0;color:${altEarned ? 'var(--bsa-gold)' : 'var(--bsa-text)'}">${altEarned ? '✓' : '○'} ${altBadge.icon} ${altBadge.name}</div>`;
        }
      }
      html += `</div>`;
    }

    // Note area
    html += `
      <div style="margin-top:16px;">
        <div style="font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--bsa-text-muted);margin-bottom:8px;">Notes</div>
        <textarea style="width:100%;background:var(--bsa-card);border:1px solid var(--bsa-border);border-radius:10px;color:var(--bsa-text);padding:12px;font-size:0.9rem;min-height:100px;resize:vertical;"
          oninput="app.saveBadgeNote('${badgeId}', this.value)"
          placeholder="Add notes about this merit badge...">${this.state.badgeNotes[badgeId] || ''}</textarea>
      </div>
    `;

    el.innerHTML = html;

    // Show the badge page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-badge').classList.add('active');
  },

  toggleBadge(badgeId) {
    const current = this.state.completedBadges[badgeId];
    this.state.completedBadges[badgeId] = !current;

    if (!current) {
      // Just earned a badge — check if it's Eagle-required
      const badge = MERIT_BADGES.find(b => b.id === badgeId);
      if (badge && badge.eagle) {
        this.celebrate(`🦅 Eagle Badge Earned: ${badge.name}!`);
      } else {
        this.celebrate(`🎖️ ${badge.name} earned!`);
      }
    }

    this.saveState();
    this.openBadge(badgeId); // Re-render
  },

  saveBadgeNote(badgeId, value) {
    if (value.trim()) {
      this.state.badgeNotes[badgeId] = value;
    } else {
      delete this.state.badgeNotes[badgeId];
    }
    this.saveState();
  },

  // ─── CELEBRATION ───
  celebrate(text) {
    const overlay = document.getElementById('celebration');
    const textEl = document.getElementById('celebText');
    textEl.textContent = text;
    overlay.classList.add('active');
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 2000);
  },

  // ─── SETTINGS ───
  renderSettings() {
    const el = document.getElementById('settingsContent');

    let html = `
      <div class="settings-item" onclick="app.editName()">
        <div>
          <div class="label">Scout Name</div>
          <div class="value">${this.state.scoutName || 'Not set — tap to set'}</div>
        </div>
        <span>✏️</span>
      </div>
      <div class="settings-item">
        <div>
          <div class="label">Total Badges Earned</div>
          <div class="value">${this.getBadgeCount()}</div>
        </div>
      </div>
      <div class="settings-item">
        <div>
          <div class="label">Eagle-Required Earned</div>
          <div class="value">${this.getEagleBadgesEarned()} of 13</div>
        </div>
      </div>
      <div class="settings-item">
        <div>
          <div class="label">Overall Progress</div>
          <div class="value">${this.getOverallProgress().pct}%</div>
        </div>
      </div>
      <div style="margin-top:24px;padding:16px;background:var(--bsa-card);border:1px solid var(--bsa-border);border-radius:10px;">
        <div style="font-size:0.85rem;color:var(--bsa-text-muted);margin-bottom:8px;">About Trail to Eagle</div>
        <div style="font-size:0.9rem;line-height:1.5;">
          Trail to Eagle helps you track your progress on the trail to Eagle. 
          All data is stored locally on your device — no accounts, no servers, no tracking.
        </div>
        <div style="font-size:0.75rem;color:var(--bsa-text-muted);margin-top:8px;">
          BSA Requirements sourced from official Scouting America publications (2025-2026 program year).
          Citizenship in Society MB discontinued Feb 27, 2026 — Eagle-required count reduced from 14 to 13.
        </div>
      </div>
      <button class="btn-danger" onclick="app.resetConfirm()">🗑️ Reset All Progress</button>
    `;

    el.innerHTML = html;
  },

  editName() {
    const name = prompt("What's your name, Scout?", this.state.scoutName || '');
    if (name && name.trim()) {
      this.state.scoutName = name.trim();
      this.saveState();
      this.renderSettings();
      this.renderHome();
    }
  },

  resetConfirm() {
    if (confirm('Are you sure? This will erase ALL your progress. This cannot be undone!')) {
      if (confirm('Really? All your checkmarks, notes, badges — gone forever. Last chance.')) {
        localStorage.removeItem('road-to-eagle-state');
        this.state = {
          scoutName: '',
          currentRank: 'scout',
          completedReqs: {},
          completedBadges: {},
          badgeNotes: {},
          serviceHours: 0,
          leadershipMonths: 0,
          currentPage: 'home',
          mbFilter: 'all',
          mbSearch: '',
        };
        this.saveState();
        this.showPage('home');
      }
    }
  },

  // ─── SERVICE WORKER ───
  registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').then(() => {
        console.log('Trail to Eagle Service Worker registered — works offline!');
      }).catch(err => {
        console.warn('SW registration failed:', err);
      });
    }
  }
};

// ═══ BOOT ═══
document.addEventListener('DOMContentLoaded', () => app.init());