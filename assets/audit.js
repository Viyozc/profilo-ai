/* Profilo — Freelancer Profile Readiness Audit engine (client-side, zero cost)
 * Scores an Upwork / Fiverr / Freelancer.com profile on the six signals that
 * decide invites and wins: title & keyword, positioning / overview, portfolio
 * proof, skills framing, niche focus, and profile completeness / responsiveness.
 * Weights sum to 100. All logic runs in-browser; no network calls for scoring.
 */
(function () {
  "use strict";

  var form = document.getElementById("auditForm");
  var result = document.getElementById("auditResult");
  var heroScore = document.getElementById("heroScore");
  var heroGrade = document.getElementById("heroGrade");

  function gradeFor(score) {
    if (score >= 85) return { g: "A", color: "var(--good)" };
    if (score >= 70) return { g: "B", color: "var(--brand)" };
    if (score >= 55) return { g: "C", color: "var(--warn)" };
    return { g: "D", color: "var(--bad)" };
  }

  // ---- scoring ----
  function scoreProfile(input) {
    var tips = [];
    var dims = {};

    // 1) Title & keyword (18)
    var tlen = (input.title || "").trim().split(/\s+/).filter(Boolean).length;
    var sTitle;
    if (input.keyword === "yes") {
      sTitle = 18;
      if (tlen < 4) tips.push("Your title has the right keywords but is thin — add the outcome and a timeframe (e.g. 'in 2 weeks') to make it concrete.");
    } else if (input.keyword === "partial") {
      sTitle = 12;
      tips.push("Your title mixes tools and outcomes. Lead with the buyer's outcome and the result they get, then the tools.");
    } else {
      sTitle = 5;
      tips.push("Your title lists tools ('React Developer') instead of the outcome buyers search ('I build SaaS MVPs that ship in 2 weeks'). Rename around the result — that single change lifts invites most.");
    }
    if (tlen > 12) tips.push("Titles over ~12 words get cut in search. Tighten to one punchy outcome promise.");
    dims["Title & keywords"] = { score: sTitle, max: 18 };

    // 2) Positioning / Overview (18)
    var sPos;
    if (input.positioning === "yes") { sPos = 18; }
    else if (input.positioning === "partial") { sPos = 12; tips.push("Your Overview is part bio, part pitch. Open with the client's problem, then the outcome you deliver, then proof."); }
    else { sPos = 5; tips.push("Your Overview reads like a bio. Lead with the client's problem and the outcome you deliver — clients hire for results, not resumes."); }
    dims["Positioning / overview"] = { score: sPos, max: 18 };

    // 3) Portfolio / Proof (17)
    var sProof;
    if (input.proof === "strong") { sProof = 17; }
    else if (input.proof === "some") { sProof = 11; tips.push("A little proof helps, but add real numbers (results, before/after) — specificity is what kills doubt and wins the invite."); }
    else { sProof = 5; tips.push("No proof yet. Even one specific result or case study above the fold dramatically lifts trust. Show the win, not just the work."); }
    dims["Portfolio / proof"] = { score: sProof, max: 17 };

    // 4) Skills framing (15)
    var sSkills;
    if (input.skills === "yes") { sSkills = 15; }
    else if (input.skills === "partial") { sSkills = 9; tips.push("Some skills read as bare tools. Reframe each as capability + evidence ('SEO — grew client traffic 3x')."); }
    else { sSkills = 5; tips.push("Your skills are a bare tool list. Frame each as capability + evidence so clients see the outcome, not just the software."); }
    dims["Skills framing"] = { score: sSkills, max: 15 };

    // 5) Niche focus (17)
    var sNiche;
    if (input.niche === "yes") { sNiche = 17; }
    else if (input.niche === "partial") { sNiche = 11; tips.push("You lean toward a niche but not hard enough. Name one outcome you own — clients pay more for a specialist with a named result."); }
    else { sNiche = 5; tips.push("'I do everything' signals desperation. Pick one outcome (e.g. 'Shopify migration') and own it — specialists out-earn generalists and rank higher in search."); }
    dims["Niche focus"] = { score: sNiche, max: 17 };

    // 6) Completeness / responsiveness (15)
    var sComp;
    if (input.complete === "high") { sComp = 15; }
    else if (input.complete === "mid") { sComp = 10; tips.push("Fill every profile section and keep response time under a few hours — incomplete profiles rank lower in search and scare off invites."); }
    else { sComp = 5; tips.push("Incomplete or slow profiles get buried. Complete every section, keep your availability on, and reply fast — responsiveness is a ranking signal clients notice."); }
    dims["Completeness / responsiveness"] = { score: sComp, max: 15 };

    var total = sTitle + sPos + sProof + sSkills + sNiche + sComp;
    if (tips.length === 0) tips.push("Strong profile across the board — now A/B test your title and overview as invites grow.");
    return { total: total, dims: dims, tips: tips };
  }

  // ---- render ----
  function ring(el, score) {
    var deg = (score / 100) * 360;
    el.style.background = "conic-gradient(var(--brand) " + deg + "deg, #f0e6d6 " + deg + "deg)";
  }

  function render(res) {
    var gr = gradeFor(res.total);
    document.getElementById("resScore").textContent = res.total;
    var gEl = document.getElementById("resGrade");
    gEl.textContent = "Grade " + gr.g;
    gEl.style.background = gr.color;
    gEl.style.color = "#fff";
    document.getElementById("resSummary").textContent =
      res.total >= 85 ? "Top-decile profile — minor tweaks only."
      : res.total >= 70 ? "Good foundation, a few quick wins left."
      : res.total >= 55 ? "Workable, but leaving invites on the table."
      : "Needs real work before clients invite you.";

    ring(document.querySelector("#auditResult .score-ring"), res.total);

    var bars = document.getElementById("resBars");
    bars.innerHTML = "";
    Object.keys(res.dims).forEach(function (k) {
      var d = res.dims[k];
      var pct = Math.round((d.score / d.max) * 100);
      var row = document.createElement("div");
      row.className = "bar-row";
      row.innerHTML =
        '<span>' + k + '</span>' +
        '<span class="bar-track"><span class="bar-fill" style="width:' + pct + '%"></span></span>' +
        '<span class="bar-val">' + d.score + '/' + d.max + '</span>';
      bars.appendChild(row);
    });

    var tipsEl = document.getElementById("resTips");
    tipsEl.innerHTML = "";
    res.tips.forEach(function (t) {
      var li = document.createElement("li");
      li.textContent = t;
      tipsEl.appendChild(li);
    });

    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var res = scoreProfile({
      title: document.getElementById("fTitle").value,
      keyword: document.getElementById("fKeyword").value,
      positioning: document.getElementById("fPositioning").value,
      proof: document.getElementById("fProof").value,
      skills: document.getElementById("fSkills").value,
      niche: document.getElementById("fNiche").value,
      complete: document.getElementById("fComplete").value
    });
    render(res);
  });

  // hero demo score (static illustrative until user runs audit)
  heroScore.textContent = 63;
  heroGrade.textContent = "C";

  // ---- email capture (Formspree free tier, graceful demo fallback) ----
  var emailForm = document.getElementById("emailForm");
  var FORMSPREE_ID = "meeyzkdp"; // free form ID from formspree.io (no payment)
  emailForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = document.getElementById("fEmail").value;
    var note = document.getElementById("emailNote");
    if (FORMSPREE_ID.indexOf("YOUR_") === 0) {
      try {
        var store = JSON.parse(localStorage.getItem("profilo_leads") || "[]");
        store.push({ email: email, ts: new Date().toISOString() });
        localStorage.setItem("profilo_leads", JSON.stringify(store));
      } catch (err) {}
      note.textContent = "✓ Demo mode: lead saved locally (" + email + "). Add a free Formspree ID to receive real emails.";
      note.style.color = "var(--good)";
    } else {
      fetch("https://formspree.io/f/" + FORMSPREE_ID, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, subject: "Profilo audit lead", source: "Profilo landing" })
      })
        .then(function (r) {
          if (r.ok) { note.textContent = "✓ Subscribed! We'll email you profile-growth tips."; note.style.color = "var(--good)"; }
          else { note.textContent = "Couldn't send — try again or email us."; note.style.color = "var(--bad)"; }
        })
        .catch(function () { note.textContent = "Couldn't send — try again or email us."; note.style.color = "var(--bad)"; });
    }
    emailForm.reset();
  });
})();
