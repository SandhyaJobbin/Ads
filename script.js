/* ================= AdSentinel — core demo logic =================
 * Classic script (loaded with defer). Defines globals used by inline
 * onclick handlers in index.html: go, nav, submit, pickRes.
 * Recovered from commit 265b4b8f (the last working inline script) and
 * extended with the loupe trigger + radar score event.
 * ================= DATA ================= */
var SKILLS = [
  {id:'s1', name:'Policy reasoning', d:'Applies a written rule to a case it does not literally cover, and states where the line sits and why.'},
  {id:'s2', name:'Multimodal reading', d:'Catches meaning that appears only in the combination of image, audio, on-screen text and landing page.'},
  {id:'s3', name:'Adversarial thinking', d:'Spots evasion: redirects, text hidden in images, lookalike brands, AI-generated endorsements.'},
  {id:'s4', name:'Regional & regulatory fluency', d:'Knows one ad can be fine in one country and not another, and how licenses change the answer.'},
  {id:'s5', name:'Evidence-based writing', d:'Writes a reply that says what is missing and what is not, in plain words.'},
  {id:'s6', name:'Calibrated escalation', d:'Knows when to decide, when to ask, and when a case exposes a policy gap.'},
  {id:'s7', name:'AI literacy', d:'Reads engine outputs, spots repeat false positives, writes labeled examples that help retraining.'},
  {id:'s8', name:'Resilience', d:'Stays steady with graphic or adult material and uses rotation and breaks.'}
];

var SAMPLES = [
  {
    id:'q1', type:'image', tlabel:'Image sample', title:'NOIR & CO. — spirit-free elixir',
    skills:['s1','s2'],
    policy:'Alcohol policy can also cover non-alcoholic drinks that resemble alcohol in branding, packaging or serving cues — and scenes that imply social or sexual success.',
    question:'This creative makes no on-screen claim about alcohol. What is the strongest reason it still triggers an alcohol-policy review?',
    options:[
      {t:'The tagline "Taste the forbidden" is misleading because the drink is alcohol-free.',c:false},
      {t:'It mirrors a spirits brand and pairs the drink with a party scene, so it may resemble alcohol and imply social success even though each element alone passes.',c:true},
      {t:'Non-alcoholic drinks are always restricted under alcohol policy in every market.',c:false},
      {t:'The bottle violates the ad format size requirements.',c:false}
    ],
    rationale:'Alcohol policy also covers drinks that resemble alcohol and scenes implying social/sexual success. Each layer passes alone — a legal non-alcoholic drink, a brand, a party scene — and the edge case lives in the combination. That is multimodal reading plus policy reasoning: the call comes from the whole, not any single signal.',
    render:'<div class="mock-img"><svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg">'
      +'<defs><radialGradient id="bg1" cx="50%" cy="40%" r="80%"><stop offset="0%" stop-color="#2a1f2e"/><stop offset="100%" stop-color="#0d0d13"/></radialGradient>'
      +'<linearGradient id="glass1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f7c873"/><stop offset="100%" stop-color="#b76e1f"/></linearGradient>'
      +'<linearGradient id="bottle" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#3a2a20"/><stop offset="45%" stop-color="#6b4a2f"/><stop offset="55%" stop-color="#5b3d27"/><stop offset="100%" stop-color="#241710"/></linearGradient></defs>'
      +'<rect width="640" height="360" fill="url(#bg1)"/>'
      +'<g fill="#f4c766" opacity=".55"><circle cx="80" cy="60" r="26"/><circle cx="180" cy="120" r="18"/><circle cx="520" cy="70" r="30"/><circle cx="580" cy="200" r="16"/><circle cx="120" cy="280" r="20"/></g>'
      +'<g fill="#0a0a10" opacity=".8"><circle cx="470" cy="90" r="14"/><rect x="455" y="100" width="30" height="50" rx="14"/><circle cx="520" cy="80" r="12"/><rect x="506" y="88" width="26" height="44" rx="13"/><circle cx="500" cy="250" r="13"/><rect x="487" y="259" width="28" height="46" rx="13"/></g>'
      +'<g transform="translate(210,60)">'
      +'<rect x="0" y="40" width="52" height="210" rx="14" fill="url(#bottle)"/>'
      +'<rect x="-14" y="24" width="80" height="30" rx="8" fill="#1a1110"/>'
      +'<rect x="52" y="80" width="10" height="120" fill="#241710"/>'
      +'<rect x="8" y="60" width="36" height="86" rx="4" fill="#111"/><text x="26" y="92" fill="#d9b98a" font-size="10" text-anchor="middle" font-family="Georgia,serif">NOIR</text><text x="26" y="108" fill="#8a6a4a" font-size="8" text-anchor="middle" font-family="Georgia,serif">&amp; CO.</text>'
      +'<text x="26" y="128" fill="#d9b98a" font-size="6.5" text-anchor="middle" font-family="Georgia,serif">SPIRIT-FREE</text>'
      +'<text x="26" y="138" fill="#8a6a4a" font-size="6.5" text-anchor="middle" font-family="Georgia,serif">ELIXIR</text></g>'
      +'<g transform="translate(330,120)"><path d="M0 0 L120 0 L96 110 L24 110 Z" fill="url(#glass1)" opacity=".9"/><path d="M0 0 L120 0 L96 110 L24 110 Z" fill="none" stroke="#f7c873" stroke-width="2"/><rect x="48" y="-34" width="24" height="40" fill="none" stroke="#f7c873" stroke-width="2"/><circle cx="60" cy="130" r="6" fill="#7cc95f"/><path d="M20 150 L100 150" stroke="#f7c873" stroke-width="3"/></g>'
      +'<text x="320" y="300" fill="#e9d7b8" font-size="22" text-anchor="middle" font-family="Georgia,serif" font-style="italic">Taste the forbidden. 0% alcohol.</text>'
      +'<text x="320" y="326" fill="#9a8468" font-size="12" text-anchor="middle" font-family="Georgia,serif">Notes of oak, smoke &amp; midnight</text>'
      +'</svg></div>'
  },
  {
    id:'q2', type:'image', tlabel:'Image sample', title:'NIKKE — sneakers, lookalike mark',
    skills:['s3'],
    policy:'Misrepresentation covers impersonation and lookalike brands; text hidden inside an image is a manipulated-media / misrepresentation cue.',
    question:'Which evasion tactic is most clearly present in this creative?',
    options:[
      {t:'A hidden redirect to a different domain.',c:false},
      {t:'A lookalike brand mark, plus text hidden in the image and a fake system alert.',c:true},
      {t:'A prescription drug claim in the fine print.',c:false},
      {t:'Missing responsible-gambling information.',c:false}
    ],
    rationale:'Adversarial thinking means spotting lookalike brands, text hidden in images, and fake system alerts. All three are evasion cues the engine may miss and a reviewer must flag.',
    render:'<div class="mock-img" style="background:#eef1f5"><svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg">'
      +'<rect width="640" height="360" fill="#eef1f5"/>'
      +'<g transform="translate(300,40) rotate(-18)"><ellipse cx="0" cy="150" rx="120" ry="30" fill="#d7dde5"/><path d="M-90 150 Q-40 40 60 30 L150 70 Q80 100 60 140 L10 150 Q-40 160 -90 150 Z" fill="#1a73e8"/><path d="M-90 150 Q-20 120 60 90 L120 110 Q40 150 -90 150 Z" fill="#f4f7fb"/><path d="M20 60 L110 68" stroke="#fff" stroke-width="8" stroke-linecap="round"/><rect x="60" y="118" width="90" height="16" rx="4" fill="#ea4335" transform="rotate(-4 60 118)"/></g>'
      +'<text x="330" y="330" fill="#202124" font-size="34" text-anchor="middle" font-weight="700" font-family="Arial">NIKKE</text>'
      +'<text x="330" y="348" fill="#5f6368" font-size="11" text-anchor="middle" font-family="Arial">Just do it — our way.</text>'
      +'<text x="520" y="300" fill="#8b95a3" font-size="12" text-anchor="end" transform="rotate(-6 520 300)" opacity=".75">SALE ENDS MIDNIGHT — 90% OFF</text>'
      +'<g transform="translate(38,42)"><rect width="180" height="86" rx="10" fill="#fff" stroke="#d3d8de"/><rect width="180" height="30" rx="10" fill="#fce8e6"/><circle cx="20" cy="15" r="8" fill="#d93025"/><text x="34" y="19" fill="#d93025" font-size="12" font-family="Arial">Storage almost full</text><text x="14" y="58" fill="#3c4043" font-size="12" font-family="Arial">Tap to clean now →</text></g>'
      +'</svg></div>'
  },
  {
    id:'q3', type:'video', tlabel:'Video sample', title:'vidaMed — telehealth visit',
    skills:['s2','s4','s1'],
    policy:'Healthcare & medicines: prescription drug terms and unapproved substances are restricted; certification and country rules sit outside the creative. A violation can live in the audio even when the on-screen text is clean.',
    question:'Where does the primary violation live?',
    options:[
      {t:'In the on-screen caption.',c:false},
      {t:'In the audio only — a prescription drug is named in the voiceover, not on screen.',c:true},
      {t:'On the landing page.',c:false},
      {t:'There is no violation.',c:false}
    ],
    rationale:'The key claim is spoken, not shown — the canonical multimodal-reading test. Because it runs in three countries, regional/regulatory fluency decides each verdict separately.',
    secondary:{label:'Self-check — verdict per country', model:'United States — Disapproved (semaglutide is a prescription drug, no certification shown). Brazil — Disapproved (regulatory rules differ; no local certification shown). India — Disapproved (Rx-only drug; no license shown). In each case a reviewer would request the certificate before finalizing. (Countries are illustrative.)'},
    render:'<div class="player">'
      +'<div class="screen"><svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg"><rect width="640" height="360" fill="#1c2a3a"/><circle cx="320" cy="150" r="78" fill="#2c3e52"/><circle cx="320" cy="150" r="78" fill="none" stroke="#3f5872"/><circle cx="320" cy="135" r="46" fill="#e7c9a9"/><path d="M296 135 q24 -30 48 0 l-48 30 0 -30 z" fill="#5b3a29"/><rect x="280" y="150" width="80" height="58" rx="10" fill="#f6f9fc"/><path d="M320 156 v14 M320 170 v12" stroke="#1a73e8" stroke-width="3"/></svg>'
      +'<div class="caption">Book an online doctor visit — most insurance accepted.</div></div>'
      +'<div class="play-ctrl"><div class="pbtn">▶</div><div class="bar"><i></i></div><span class="mono" style="font-size:11px">0:14</span></div>'
      +'</div>'
      +'<div class="audio"><div class="ah">🔊 Audio (spoken, not shown)</div>"…and if it\'s right for you, we prescribe <b>semaglutide</b> — shipped to your door, no pharmacy trip needed."</div>'
      +'<div class="strip"><span class="p">🇺🇸 <b>United States</b></span><span class="p">🇧🇷 <b>Brazil</b></span><span class="p">🇮🇳 <b>India</b></span></div>'
  },
  {
    id:'q4', type:'video', tlabel:'Video sample', title:'LuckySpin — free-to-play casino',
    skills:['s3','s6','s4'],
    policy:'Gambling: the advertiser must be certified for the country AND the exact URL. A certificate that covers only one URL is a gap; each page may look compliant alone while the click path is the risk.',
    question:'What is the core problem?',
    options:[
      {t:'The game uses slot reels, which are always prohibited.',c:false},
      {t:'The certificate covers only the free-play URL, while the click path leads to a real-money domain that is not covered.',c:true},
      {t:'The audio says "win real cash", which alone makes it prohibited.',c:false},
      {t:'Nothing — a free-to-play game is never a gambling-policy issue.',c:false}
    ],
    rationale:'Adversarial thinking (spotting the redirect), regulatory fluency (certificate/URL match), and calibrated escalation — this is not a simple fixable gap; it exposes circumvention, so it escalates.',
    secondary:{label:'Self-check — what next?', model:'Uphold/disapprove the real-money path AND escalate to account-level review (repeated or circumventing behavior). A missing certificate alone would be "uphold with guidance"; a redirect to an uncertified real-money domain is a deliberate evasion pattern, so escalate.'},
    render:'<div class="player">'
      +'<div class="screen"><svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg"><rect width="640" height="360" fill="#140f2e"/><g font-family="Arial" font-weight="700"><rect x="150" y="60" width="100" height="150" rx="12" fill="#241b52" stroke="#4a3ba0"/><circle cx="200" cy="120" r="18" fill="#ffd23f"/><circle cx="200" cy="160" r="18" fill="#ff6b6b"/><circle cx="200" cy="80" r="18" fill="#4dd0e1"/><rect x="270" y="60" width="100" height="150" rx="12" fill="#241b52" stroke="#4a3ba0"/><circle cx="320" cy="120" r="18" fill="#4dd0e1"/><circle cx="320" cy="160" r="18" fill="#ffd23f"/><circle cx="320" cy="80" r="18" fill="#ff6b6b"/><rect x="390" y="60" width="100" height="150" rx="12" fill="#241b52" stroke="#4a3ba0"/><circle cx="440" cy="120" r="18" fill="#ff6b6b"/><circle cx="440" cy="160" r="18" fill="#ffd23f"/><circle cx="440" cy="80" r="18" fill="#4dd0e1"/></g><text x="320" y="270" fill="#ffd23f" font-size="40" text-anchor="middle" font-weight="800" font-family="Arial">JACKPOT</text>'
      +'</svg><div class="caption">FREE TO PLAY • NO DEPOSIT</div></div>'
      +'<div class="play-ctrl"><div class="pbtn">▶</div><div class="bar"><i></i></div><span class="mono" style="font-size:11px">0:08</span></div>'
      +'</div>'
      +'<div class="audio"><div class="ah">🔊 Audio (spoken)</div>"Spin free, <b>win real cash</b> — cash out to your bank in minutes."</div>'
      +'<div class="strip"><span class="p">Landing page <b>luckyspin-play.net</b> → "Play for real money" links to <b>luckyspin-casino.com</b></span><span class="p cert">Certificate on file: <b>luckyspin-play.net</b> only</span></div>'
  },
  {
    id:'q5', type:'text', tlabel:'Text sample', title:'Rejuvacell — supplement endorsement',
    skills:['s7','s3','s5'],
    policy:'Misrepresentation: impersonation, manipulated media (including AI-generated presenters), and unapproved-substance claims ("works like" a prescription drug).',
    question:'Which policy issues are present?',
    options:[
      {t:'Only a trademark issue with the brand name.',c:false},
      {t:'An unapproved-substance claim ("works like" a prescription drug) combined with an AI-generated "doctor" — impersonation and manipulated media.',c:true},
      {t:'Only an editorial/grammar issue.',c:false},
      {t:'Nothing — a disclaimer makes the AI presenter acceptable.',c:false}
    ],
    rationale:'AI literacy (recognizing an AI-generated presenter as manipulated media), adversarial thinking (impersonation plus the drug-equivalence claim), and evidence-based writing (the reply separates what is wrong from what is fine).',
    secondary:{label:'Self-check — draft the advertiser reply', model:'"Your ad was disapproved because it (1) claims Rejuvacell works like a prescription medication without authorization, and (2) presents an AI-generated \'doctor\' as a real endorser, which is impersonation. To run, remove the drug-equivalence claim and the fake-doctor endorsement." — name what is missing, cite the policy, give the fix.'},
    render:'<div class="adcard">'
      +'<img src="assets/q5-doctor.png" alt="AI-generated doctor endorser" style="width:64px;height:64px;border-radius:14px;object-fit:cover;display:block;margin-bottom:12px;border:1px solid #e8eaed">'
      +'<div style="font-size:18px;font-weight:700">My patients are shocked — it works like a prescription drug.</div>'
      +'<div style="color:#444746;margin-top:6px">Dr. Marcus Reed recommends <b>Rejuvacell</b>. Clinically shown to work like Rx weight-loss medication — no prescription needed.</div>'
      +'<div class="cta">Claim 80% off</div>'
      +'<div class="fine">*AI-generated presenter. Results not typical.</div>'
      +'<div class="url">www.rejuvacell.example</div>'
      +'</div>'
  },
  {
    id:'q6', type:'text', tlabel:'Text sample', title:'ProFree — hidden recurring charge',
    skills:['s5','s6','s1'],
    policy:'Misrepresentation: hidden costs and dishonest pricing. Cases: separate "fixable gap" from "true violation" and "policy ambiguity".',
    question:'What is the primary violation?',
    options:[
      {t:'The price is too high.',c:false},
      {t:'The recurring ₹2,999/month charge is disclosed only in tiny print — a hidden cost / dishonest pricing issue.',c:true},
      {t:'The 30-day trial itself is prohibited.',c:false},
      {t:'No violation — "cancel anytime" is sufficient.',c:false}
    ],
    rationale:'Evidence-based writing (name what is missing), calibrated escalation (ask for missing facts rather than guess), and policy reasoning (the hidden-cost rule applied to a borderline disclosure).',
    secondary:{label:'Self-check — what do you do next?', model:'The case file is missing the landing-page screenshot. Do NOT decide yet — request the missing evidence (the four repeat tests require the destination layer). If the landing page confirms the hidden charge, uphold with guidance; if the page makes the price clear, this may be an engine false positive → overturn and log.'},
    render:'<div class="adcard">'
      +'<div style="font-size:18px;font-weight:700">Try ProFree — 30 days FREE. No risk, cancel anytime.</div>'
      +'<div class="cta">Start free trial</div>'
      +'<div class="fine">After 30 days, auto-renews at ₹2,999/month. Cancel before renewal to avoid charges.</div>'
      +'<div class="url">www.profree.example</div>'
      +'</div>'
      +'<div class="casefile"><b>📋 Case file (Tier 2)</b>Ticket: advertiser disputes disapproval. In file: ad copy + decision. <span style="color:#ff6b61;font-weight:700">MISSING: landing-page screenshot.</span></div>'
  }
];

/* ================= STATE ================= */
var idx = 0;
var answers = {};   // sample id -> selected option index
var revealed = {};  // sample id -> bool
var resilience = null;

/* ================= SKILL GRID ================= */
(function(){
  var g = document.getElementById('skill-grid');
  SKILLS.forEach(function(s,i){
    var d = document.createElement('div');
    d.className = 'skill';
    d.innerHTML = '<span class="n">'+(i+1)+'</span><b>'+s.name+'</b><p>'+s.d+'</p>';
    g.appendChild(d);
  });
})();

/* ================= NAVIGATION ================= */
function go(t){
  if(window.loupeInstance && window.loupeInstance.isActive) window.loupeInstance.close();
  document.querySelectorAll('.tab').forEach(function(b){ b.classList.toggle('active', b.dataset.t===t); });
  document.querySelectorAll('.panel').forEach(function(p){ p.classList.remove('active'); });
  document.getElementById('p-'+t).classList.add('active');
  if(t==='results') renderResults();
  window.scrollTo({top:0, behavior:'smooth'});
}
document.getElementById('tabs').addEventListener('click', function(e){
  var b = e.target.closest('.tab'); if(b) go(b.dataset.t);
});

/* ================= ASSETS ================= */
var ASSETS = {
  q1:{src:'assets/q1-elixir.png', kind:'img'},
  q2:{src:'assets/q2-sneakers.png', kind:'img'},
  q3:{src:'assets/q3-telehealth.mp4', poster:'assets/q3-poster.jpg', kind:'video'},
  q4:{src:'assets/q4-casino.mp4', poster:'assets/q4-poster.jpg', kind:'video'}
};
function injectAssets(s, root){
  var a = ASSETS[s.id]; if(!a) return;
  if(a.kind === 'img'){
    var m = root.querySelector('.mock-img');
    if(m) m.innerHTML = '<img src="'+a.src+'" alt="'+s.title+'" style="width:100%;height:100%;object-fit:cover;display:block">';
  } else {
    var scr = root.querySelector('.player .screen');
    if(scr){
      scr.innerHTML = '<video src="'+a.src+'" poster="'+(a.poster||'')+'" controls playsinline preload="auto" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>';
      var pc = root.querySelector('.player .play-ctrl');
      if(pc) pc.parentNode.removeChild(pc);
    }
  }
}

/* ================= WIZARD ================= */
function renderSample(){
  var s = SAMPLES[idx];
  var root = document.getElementById('sample-root');
  var skillChips = s.skills.map(function(id){
    var sk = SKILLS.filter(function(x){return x.id===id})[0];
    return '<span class="chip skill">'+sk.name+'</span>';
  }).join(' ');
  var loupeBtn = s.type==='image'
    ? '<button type="button" class="btn-loupe" title="Toggle 2.5× forensic inspection">Inspect 2.5×</button>'
    : '';

  var html = '<div class="card">'
    +'<div class="row" style="justify-content:space-between">'
    +'<h2 style="margin:0">'+s.title+'</h2>'
    +'<span class="chip type">'+s.tlabel+'</span></div>'
    +'<div class="illustrative"><b class="tag">Illustrative</b>'+s.policy+'</div>'
    +'<div class="creative" data-sample-id="'+s.id+'">'
    +'<div class="label"><span>Creative under review</span>'+loupeBtn+'</div>'
    +'<div class="body">'+s.render+'</div></div>'
    +'<div class="qbox"><h3>'+s.question+'</h3><div id="opts"></div></div>'
    +'<div class="reveal" id="reveal"><div id="rationale"></div>'
    +'<div class="row" style="margin-top:10px">'+skillChips+'</div>'
    + (s.secondary ? '<div class="model"><div class="mh">'+s.secondary.label+'</div>'+s.secondary.model+'</div>' : '')
    +'</div>'
    +'</div>';

  root.innerHTML = html;
  injectAssets(s, root);

  var opts = document.getElementById('opts');
  s.options.forEach(function(o,i){
    var d = document.createElement('div');
    d.className = 'opt';
    d.innerHTML = '<span class="k">'+String.fromCharCode(65+i)+'</span><span>'+o.t+'</span>';
    d.onclick = function(){ select(i); };
    opts.appendChild(d);
  });

  if(revealed[s.id]){
    applyReveal();
  } else if(answers[s.id] !== undefined){
    select(answers[s.id]);
  }

  document.getElementById('wiz-count').textContent = 'Sample '+(idx+1)+' of '+SAMPLES.length;
  document.getElementById('wiz-bar').style.width = ((idx+1)/SAMPLES.length*100)+'%';
  document.getElementById('btn-prev').disabled = idx===0;
  document.getElementById('btn-next').disabled = idx===SAMPLES.length-1;
  document.getElementById('btn-submit').disabled = answers[s.id]===undefined;
  document.getElementById('btn-submit').textContent = revealed[s.id] ? 'Revealed' : 'Submit & reveal';
  document.getElementById('wiz-footer').innerHTML = idx===SAMPLES.length-1
    ? '<div class="row"><button class="btn primary" onclick="go(\'results\')">See results →</button></div>'
    : '';
}

function select(i){
  var s = SAMPLES[idx];
  if(revealed[s.id]) return;
  answers[s.id] = i;
  document.querySelectorAll('.opt').forEach(function(o,k){ o.classList.toggle('sel', k===i); });
  document.getElementById('btn-submit').disabled = false;
}

function submit(){
  var s = SAMPLES[idx];
  if(answers[s.id]===undefined) return;
  revealed[s.id] = true;
  applyReveal();
  document.getElementById('btn-submit').textContent = 'Revealed';
  document.getElementById('btn-submit').disabled = true;
}

function applyReveal(){
  var s = SAMPLES[idx];
  var opts = document.querySelectorAll('.opt');
  s.options.forEach(function(o,i){
    opts[i].classList.remove('sel');
    if(o.c) opts[i].classList.add('correct');
    else if(answers[s.id]===i) opts[i].classList.add('wrong');
  });
  var r = document.getElementById('reveal');
  r.classList.add('show');
  var correct = s.options[answers[s.id]].c;
  document.getElementById('rationale').innerHTML =
    '<div class="verdict '+(correct?'ok':'bad')+'">'+(correct?'✓ Correct call':'✗ Incorrect call')+'</div>'
    +'<div style="color:var(--text2)">'+s.rationale+'</div>';
}

function nav(d){
  idx = Math.max(0, Math.min(SAMPLES.length-1, idx+d));
  renderSample();
}

/* ================= RESILIENCE ================= */
function pickRes(el){
  document.querySelectorAll('.resilience .opt').forEach(function(o){ o.classList.remove('sel'); });
  el.classList.add('sel');
  resilience = parseInt(el.dataset.r, 10);
  renderResults();
}

/* ================= SCORING ================= */
function compute(){
  var pts = {}; SKILLS.forEach(function(s){ pts[s.id]={earned:0, avail:0}; });
  var total=0, earned=0;
  SAMPLES.forEach(function(s){
    var ok = revealed[s.id] && s.options[answers[s.id]].c;
    s.skills.forEach(function(sk){ pts[sk].avail++; if(ok) pts[sk].earned++; });
    if(revealed[s.id]){ total++; if(ok) earned++; }
  });
  if(resilience !== null){ pts['s8'].avail=1; pts['s8'].earned=resilience; }
  return {pts:pts, total:total, earned:earned, done:Object.keys(revealed).length, resilientSet: resilience!==null};
}

function renderResults(){
  var c = compute();
  window.lastComputed = c;
  // Let the radar module redraw the 8-axis chart from the same scores.
  window.dispatchEvent(new CustomEvent('scores-updated', {detail:c}));

  var hero = document.getElementById('score-hero');
  var pct = c.total ? Math.round(c.earned/c.total*100) : 0;
  hero.innerHTML =
    '<div style="text-align:center;flex:0 0 auto">'
    +'<div style="font-size:46px;font-weight:800;font-family:Sora,sans-serif;line-height:1;color:var(--blue-d)">'+pct+'%</div>'
    +'<div style="font-size:11.5px;color:var(--text3);margin-top:5px">samples correct</div></div>'
    +'<div><h2 style="margin:0 0 6px">Assessment summary</h2>'
    +'<p class="sub" style="margin:0">'+c.done+' of '+SAMPLES.length+' samples answered · '+c.earned+'/'+c.total+' correct'
    +(c.resilientSet ? ' · resilience recorded' : ' · <b>resilience not yet recorded</b>')+'</p></div>';

  var ak = document.getElementById('ak');
  ak.innerHTML = '';
  SAMPLES.forEach(function(s){
    var ok = revealed[s.id] ? (s.options[answers[s.id]].c ? 'Correct' : 'Incorrect') : 'Not answered';
    var d = document.createElement('details');
    d.innerHTML = '<summary>'+s.title+' — <span style="color:'+(ok==='Correct'?'var(--green-d)':ok==='Incorrect'?'var(--red-d)':'var(--text3)')+'">'+ok+'</span></summary>'
      +'<div class="akbody"><b>Key:</b> '+s.options.filter(function(o){return o.c})[0].t+'<br><br>'+s.rationale+'</div>';
    ak.appendChild(d);
  });
}

/* ================= THREE.JS BACKGROUND ================= */
(function(){
  if(typeof THREE === 'undefined'){ document.getElementById('bg3d').style.display='none'; return; }
  var canvas = document.getElementById('bg3d');
  var renderer = new THREE.WebGLRenderer({canvas:canvas, alpha:true, antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 120);
  camera.position.z = 32;

  var palette = [0x4285f4, 0xea4335, 0xfbbc04, 0x34a853, 0x8ab4ff, 0xc9a8ff, 0xffffff];
  var N = 340;
  var pos = new Float32Array(N*3), col = new Float32Array(N*3);
  for(var i=0;i<N;i++){
    pos[i*3]   = (Math.random()-0.5)*72;
    pos[i*3+1] = (Math.random()-0.5)*48;
    pos[i*3+2] = (Math.random()-0.5)*42;
    var c = new THREE.Color(palette[i%palette.length]);
    col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color', new THREE.BufferAttribute(col,3));
  var mat = new THREE.PointsMaterial({size:0.38, vertexColors:true, transparent:true, opacity:0.8, depthWrite:false, blending:THREE.AdditiveBlending});
  var points = new THREE.Points(geo, mat);
  scene.add(points);

  var mx=0, my=0;
  addEventListener('mousemove', function(e){ mx=(e.clientX/innerWidth-0.5)*2; my=(e.clientY/innerHeight-0.5)*2; });
  function resize(){ renderer.setSize(innerWidth, innerHeight); camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); }
  addEventListener('resize', resize); resize();

  (function tick(){
    points.rotation.y += 0.0006;
    points.rotation.x += 0.00028;
    camera.position.x += (mx*3.2 - camera.position.x)*0.03;
    camera.position.y += (-my*2.2 - camera.position.y)*0.03;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  })();
})();

/* ================= INIT ================= */
renderSample();
console.log('AdSentinel demo ready — go:', typeof go);
