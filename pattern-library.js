/* PRIME Admin 3 — Pattern Library
   Tabs, toggle, modals, toast, grid table, paginated list table, picker drawer. */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  /* ---------- Tabs ---------- */
  $$("#tabs .pa-tabs__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      $$("#tabs .pa-tabs__btn").forEach(function (b) { b.classList.toggle("pa-tabs__btn--active", b === btn); });
      $$("[data-panel]").forEach(function (p) { p.hidden = p.dataset.panel !== btn.dataset.tab; });
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  });

  /* ---------- Toggle ---------- */
  var toggle = $("#toggle"), track = $("#toggle-track"), thumb = $("#toggle-thumb");
  function paintToggle() {
    var on = toggle.checked;
    track.style.background = on ? "rgba(46,125,50,.5)" : "rgba(0,0,0,.38)";
    thumb.style.background = on ? "var(--pa-success)" : "#fff";
    thumb.style.transform = on ? "translateX(18px)" : "translateX(0)";
  }
  toggle.addEventListener("change", paintToggle);
  paintToggle();

  /* ---------- Modals ---------- */
  function open(el) { el.hidden = false; }
  function close(el) { el.hidden = true; }
  var modal = $("#modal"), confirmDlg = $("#confirm");
  $("#btn-modal").addEventListener("click", function () { open(modal); });
  $("#btn-confirm").addEventListener("click", function () { open(confirmDlg); });
  [modal, confirmDlg].forEach(function (scrim) {
    scrim.addEventListener("click", function (e) {
      if (e.target === scrim || e.target.closest("[data-close]")) close(scrim);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { close(modal); close(confirmDlg); }
  });

  /* ---------- Toast ---------- */
  var toast = $("#toast"), toastTimer;
  function showToast() {
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 4000);
  }
  $("#btn-toast").addEventListener("click", showToast);
  $("#btn-save-modal").addEventListener("click", function () { close(modal); showToast(); });

  /* ---------- Grid table (bounded, never paginated) ---------- */
  var fileRows = [
    { icon: "mdi-file-pdf-box", name: "Advancing_Equity_in_HIV_Services_Slides.pdf", meta: "974.4 KB • 05/01/2026, 02:02 PM", category: "For Credit Page - Slides", status: "Final" },
    { icon: "mdi-file-word-outline", name: "23WC255_Program_Flow.docx", meta: "26.6 KB • 05/01/2026, 02:02 PM", category: "Program Materials", status: "Final" },
    { icon: "mdi-file-video-outline", name: "23WC255_taping_segment_2.mp4", meta: "23.2 MB • 05/02/2026, 09:14 AM", category: "Taping", status: "In review" }
  ];
  $("#grid-rows").innerHTML = fileRows.map(function (r) {
    return '<div class="pa-table__row">' +
      '<div class="pa-table__file"><i class="mdi ' + r.icon + '"></i><span>' + esc(r.name) +
        '<span class="pa-table__filemeta">' + esc(r.meta) + '</span></span></div>' +
      '<div>' + esc(r.category) + '</div>' +
      '<div>' + esc(r.status) + '</div>' +
      '<div>' +
        '<button class="pa-ib pa-ib--sm pa-ib--primary" title="Open"><i class="mdi mdi-open-in-new"></i></button>' +
        '<button class="pa-ib pa-ib--sm pa-ib--primary" title="Duplicate"><i class="mdi mdi-content-copy"></i></button>' +
        '<button class="pa-ib pa-ib--sm pa-ib--danger" title="Delete"><i class="mdi mdi-delete-outline"></i></button>' +
      '</div></div>';
  }).join("");

  /* ---------- Paginated list table ---------- */
  var listData = [
    { id: 8, title: "Oncology Update", medpage: false, published: true, modified: "Aug 20, 2026", ts: 20260820, description: "The latest Oncology CME/CE, curated on the topics that matter most." },
    { id: 13, title: "Ophthalmology Update", medpage: false, published: true, modified: "Aug 20, 2026", ts: 20260819, description: "Retina, glaucoma, and anterior segment education for practicing ophthalmologists." },
    { id: 26, title: "MedPage Emergency Medicine", medpage: true, published: true, modified: "Aug 19, 2026", ts: 20260818, description: "For use in MedPage Emergency Medicine, hospital based, and critical care updates." },
    { id: 32, title: "MedPage Radiology", medpage: true, published: true, modified: "Aug 19, 2026", ts: 20260817, description: "For MedPage Radiology Update." },
    { id: 34, title: "Dermatology Update", medpage: false, published: true, modified: "Aug 17, 2026", ts: 20260816, description: "Weekly education on atopic dermatitis, psoriasis, and cutaneous oncology." },
    { id: 39, title: "Neurology Now", medpage: false, published: true, modified: "Aug 11, 2026", ts: 20260811, description: "MS, epilepsy, migraine, and neurodegenerative disease management." },
    { id: 44, title: "Pulmonary & Critical Care Brief", medpage: false, published: true, modified: "Aug 4, 2026", ts: 20260804, description: "ARDS, COPD, and interstitial lung disease sessions." },
    { id: 47, title: "Infectious Disease Report", medpage: false, published: true, modified: "Jul 22, 2026", ts: 20260722, description: "Antimicrobial stewardship, vaccine updates, and emerging pathogen surveillance." },
    { id: 51, title: "Nephrology Forward", medpage: false, published: false, modified: "Jun 30, 2026", ts: 20260630, description: "CKD and dialysis education, paused pending accreditation review." },
    { id: 55, title: "Gastroenterology Monthly", medpage: false, published: true, modified: "Jul 14, 2026", ts: 20260714, description: "IBD, hepatology, and GI oncology education with quarterly guideline summaries." },
    { id: 58, title: "Allergy & Immunology Brief", medpage: false, published: true, modified: "Jul 2, 2026", ts: 20260702, description: "Biologics in asthma, chronic urticaria, and food allergy management." },
    { id: 61, title: "MedPage Psychiatry", medpage: true, published: true, modified: "Jun 18, 2026", ts: 20260618, description: "Treatment-resistant depression, schizophrenia, and substance use disorder." }
  ];
  var state = { page: 0, perPage: 5, sortDir: "desc" };

  function pageNumbers(page, pages) {
    if (pages <= 7) {
      return Array.apply(null, { length: pages }).map(function (_, i) { return i; });
    }
    var nums = [0, 1, 2, 3];
    if (page > 3 && page < pages - 1) nums.push(page);
    nums.push(-1, pages - 1);
    return nums.filter(function (n, i, a) { return a.indexOf(n) === i; })
      .sort(function (a, b) { return a === -1 ? 1 : b === -1 ? -1 : a - b; });
  }

  function renderList() {
    var sorted = listData.slice().sort(function (a, b) {
      return (a.ts - b.ts) * (state.sortDir === "asc" ? 1 : -1);
    });
    var total = sorted.length;
    var pages = Math.max(1, Math.ceil(total / state.perPage));
    state.page = Math.min(state.page, pages - 1);
    var start = state.page * state.perPage;
    var rows = sorted.slice(start, start + state.perPage);

    $("#list-rows").innerHTML = rows.map(function (r) {
      var color = r.published ? "var(--pa-success)" : "var(--pa-ink-4)";
      return '<tr>' +
        '<td><span class="pa-status" style="color:' + color + '"><span class="pa-status__dot"></span>' +
          (r.published ? "Published" : "Not published") + '</span></td>' +
        '<td class="cell-muted">' + r.id + '</td>' +
        '<td><a href="#" style="font-size:13.5px">' + esc(r.title) + '</a></td>' +
        '<td><span class="pa-feedtag ' + (r.medpage ? "pa-feedtag--medpage" : "pa-feedtag--prime") + '">' +
          (r.medpage ? "MedPage" : "PRIME") + '</span></td>' +
        '<td class="cell-desc">' + esc(r.description) + '</td>' +
        '<td class="cell-muted">' + esc(r.modified) + '</td>' +
        '<td class="cell-actions">' +
          '<button class="pa-ib pa-ib--sm pa-ib--muted" title="Edit"><i class="mdi mdi-pencil" style="font-size:17px"></i></button>' +
          '<button class="pa-ib pa-ib--sm pa-ib--danger" title="Delete"><i class="mdi mdi-delete" style="font-size:17px"></i></button>' +
        '</td></tr>';
    }).join("");

    var range = (start + 1) + "–" + Math.min(start + state.perPage, total) + " of " + total;
    $$(".js-range").forEach(function (el) { el.textContent = range; });
    $$(".js-perpage").forEach(function (sel) { sel.value = String(state.perPage); });

    var pagerHTML =
      '<button class="pa-pager__btn" data-nav="prev" title="Previous page"' + (state.page === 0 ? " disabled" : "") +
        '><i class="mdi mdi-chevron-left"></i></button>' +
      pageNumbers(state.page, pages).map(function (n) {
        if (n === -1) return '<button class="pa-pager__btn is-gap" disabled>…</button>';
        return '<button class="pa-pager__btn' + (n === state.page ? " is-current" : "") + '" data-page="' + n + '">' + (n + 1) + '</button>';
      }).join("") +
      '<button class="pa-pager__btn" data-nav="next" title="Next page"' + (state.page >= pages - 1 ? " disabled" : "") +
        '><i class="mdi mdi-chevron-right"></i></button>';
    $$(".js-pager").forEach(function (el) { el.innerHTML = pagerHTML; });

    var arrow = $("#sort-modified").querySelector("i");
    arrow.className = "mdi " + (state.sortDir === "asc" ? "mdi-arrow-up" : "mdi-arrow-down");
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".js-pager .pa-pager__btn");
    if (!btn || btn.disabled) return;
    if (btn.dataset.nav === "prev") state.page -= 1;
    else if (btn.dataset.nav === "next") state.page += 1;
    else if (btn.dataset.page) state.page = parseInt(btn.dataset.page, 10);
    renderList();
  });
  $$(".js-perpage").forEach(function (sel) {
    sel.addEventListener("change", function () {
      state.perPage = parseInt(sel.value, 10);
      state.page = 0;
      renderList();
    });
  });
  $("#sort-modified").addEventListener("click", function () {
    state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    state.page = 0;
    renderList();
  });
  renderList();

  /* ---------- Picker drawer rows ---------- */
  var faculty = [
    { name: "A. Silvia Ross, MD, FACR", email: "silvia.ross@awirgroup.org", tags: ["Research", "Teaching", "Mentoring"], aff: "Managing Partner\nTriangle Arthritis & Rheumatology Associates\nRaleigh, NC", notes: "Leadership, Association of Women in Rheumatology", on: true },
    { name: "Aaron B Waxman, MD, PhD, FACP, FCCP", email: "a.waxman@bwh.harvard.edu", tags: ["Research", "Teaching"], aff: "Director, Pulmonary Vascular Disease Program\nBrigham and Women’s Hospital\nBoston, MA", notes: "Pulmonary and Critical Care Medicine", on: true },
    { name: "Aaron L Boster, MD", email: "aaron.boster@bosterms.com", tags: ["Research", "Teaching", "Mentoring"], aff: "Neurologist\nFounder, The Boster Center for Multiple Sclerosis\nColumbus, OH", notes: "—", on: false },
    { name: "Priya Nair, PharmD, BCPS", email: "p.nair@primeadmin.org", tags: ["Teaching"], aff: "Clinical Pharmacy Specialist\nCleveland Clinic\nCleveland, OH", notes: "—", on: false }
  ];
  function renderDrawer() {
    $("#drawer-rows").innerHTML = faculty.map(function (f, i) {
      return '<div class="pa-drow">' +
        '<div><button class="pa-btn pa-btn--pill ' + (f.on ? "pa-btn--danger-outline" : "pa-btn--secondary") +
          '" data-faculty="' + i + '"><span>' + (f.on ? "REMOVE" : "ADD") + '</span></button></div>' +
        '<div style="min-width:0"><div class="pa-drow__name">' + esc(f.name) + '</div>' +
          '<div class="pa-drow__email">' + esc(f.email) + '</div></div>' +
        '<div class="pa-drow__tags">' + f.tags.map(function (t) {
          return '<span class="pa-badge pa-badge--tint">' + esc(t) + '</span>';
        }).join("") + '</div>' +
        '<div class="pa-drow__aff">' + esc(f.aff) + '</div>' +
        '<div class="pa-drow__notes">' + esc(f.notes) + '</div>' +
      '</div>';
    }).join("");
  }
  $("#drawer-rows").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-faculty]");
    if (!btn) return;
    var f = faculty[parseInt(btn.dataset.faculty, 10)];
    f.on = !f.on;
    renderDrawer();
  });
  renderDrawer();
})();
