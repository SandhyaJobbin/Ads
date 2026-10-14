/* ================= AdSentinel — core demo logic =================
 * Classic script (loaded with defer). Defines globals used by inline
 * onclick handlers in index.html: go, nav, submit.
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
  {id:'s7', name:'AI literacy', d:'Reads engine outputs, spots repeat false positives, writes labeled examples that help retraining.'}
];

var SAMPLES = [
  {
    id:'q1', type:'image', tlabel:'Image sample', title:'NOIR & CO. — spirit-free elixir',
    skills:['s1','s2'],
    policy:'Alcohol: ads for alcoholic drinks are restricted. The policy looks at how an ad presents a product, not only at what the product is, and it does not allow ads that link drinking to social or sexual success.',
    question:'The drink is legal and contains no alcohol. What is the strongest reason this ad still needs an alcohol-policy review?',
    options:[
      {t:'The word "forbidden" is a false claim, because nothing about a legal, alcohol-free drink is forbidden.',c:false},
      {t:'Together, the spirits-style bottle, the whisky glass, the toasting party and the "forbidden" tagline make it look like an alcohol ad that links the drink to social success.',c:true},
      {t:'The flavour notes "oak, smoke & midnight" describe whisky, so the ad is making a false claim about what is in the bottle.',c:false},
      {t:'It does not need an alcohol review: "0% alcohol" is stated clearly in the headline, so viewers know it is not alcohol.',c:false}
    ],
    rationale:'Alcohol policy looks at how a product is presented, not just what is in the bottle. No single element settles this case: the drink is legal and the headline says 0%. But the bottle styling, whisky glass, toasting crowd and "forbidden" tagline together read as a spirits ad that ties the drink to social success. The flavour notes on their own are just description, and a clear "0% alcohol" label does not cancel how the whole ad looks.',
    pins:[{x:37,y:51,t:'Brand cue — bottle + mark'},{x:50,y:83,t:'"Taste the forbidden" claim'}],
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
    id:'q2', type:'image', tlabel:'Image sample', title:'NIKKE — running shoes',
    skills:['s3'],
    policy:'Misrepresentation: ads must not mislead users about who the advertiser is or what they are clicking on, and must not use design tricks to get past automated review.',
    question:'Which option lists everything in this ad that should be flagged?',
    options:[
      {t:'Only the brand: the NIKKE name and the reworded "Just do it" slogan pass the ad off as a famous brand.',c:false},
      {t:'Three things: the name and slogan pass the brand off as a famous one, the "Storage almost full" box imitates a phone system alert, and the small angled sale text sits at the edge where text checks may miss it.',c:true},
      {t:'The brand and the "Storage almost full" alert. The small sale text in the corner is a design choice, not something to flag.',c:false},
      {t:'The "Storage almost full" alert only. NIKKE is spelled differently and has its own logo, so it is a separate company and not impersonation.',c:false}
    ],
    rationale:'There are three separate problems. The NIKKE name and the reworded "Just do it" slogan pass the ad off as a famous sportswear brand (impersonation), even though the logo is different. The "Storage almost full — Tap to clean now" box copies a phone system alert to trick people into tapping. The sale text is small, angled and pushed to the edge of the image, a common way to slip claims past automated text checks. A different spelling or logo does not stop it being impersonation, and calling the sale text "just design" misses why it was placed there.',
    pins:[{x:20,y:11,t:'Fake system alert'},{x:86,y:88,t:'Small text at image edge'}],
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
    skills:['s2','s1'],
    policy:'Healthcare & medicines: ads may not promote prescription drugs unless the advertiser is certified to do so in that market. Review everything the ad shows and says.',
    question:'Which part of this ad breaks the healthcare policy?',
    options:[
      {t:'The on-screen caption: "most insurance accepted" is a healthcare claim that needs proof before it can run.',c:false},
      {t:'The voiceover: it names a prescription drug, even though nothing on screen mentions it.',c:true},
      {t:'The doctor on screen: showing a medical professional counts as an unverified medical endorsement.',c:false},
      {t:'None of it. A telehealth service advertising online doctor visits is allowed, and the ad only offers a consultation.',c:false}
    ],
    rationale:'The visuals and caption are ordinary for a telehealth ad. The problem is spoken: the voiceover names semaglutide, a prescription drug, and offers to ship it to the viewer. With no certification shown, the ad is promoting a prescription drug. A reviewer who only reads the screen misses it.',
    secondary:{label:'Self-check — what next?', model:'Disapprove for promoting a prescription drug without certification. In the note to the advertiser, point to exactly where the problem is (the voiceover, around 0:03) so they do not just re-check the on-screen text. If they hold a valid certification for the target country, they can submit it and ask for a re-review.'},
    pins:[{x:50,y:48,t:'Violation lives in audio only'}],
    render:'<div class="player">'
      +'<div class="screen"><svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg"><rect width="640" height="360" fill="#1c2a3a"/><circle cx="320" cy="150" r="78" fill="#2c3e52"/><circle cx="320" cy="150" r="78" fill="none" stroke="#3f5872"/><circle cx="320" cy="135" r="46" fill="#e7c9a9"/><path d="M296 135 q24 -30 48 0 l-48 30 0 -30 z" fill="#5b3a29"/><rect x="280" y="150" width="80" height="58" rx="10" fill="#f6f9fc"/><path d="M320 156 v14 M320 170 v12" stroke="#1a73e8" stroke-width="3"/></svg>'
      +'<div class="caption">Book an online doctor visit — most insurance accepted.</div></div>'
      +'<div class="play-ctrl"><div class="pbtn">▶</div><div class="bar"><i></i></div><span class="mono" style="font-size:11px">0:14</span></div>'
      +'</div>'
      +'<div class="audio"><div class="ah">🔊 Audio transcript</div>"…and if it\'s right for you, we prescribe semaglutide — shipped to your door, no pharmacy trip needed."</div>'
  },
  {
    id:'q4', type:'video', tlabel:'Video sample', title:'LuckySpin — free-to-play casino',
    skills:['s3','s6','s4'],
    policy:'Gambling: real-money gambling ads need a certificate that covers both the country and the website the ad sends people to.',
    question:'Look at the ad, the landing page and the certificate on file. What is the core problem?',
    options:[
      {t:'The slot-machine visuals and "JACKPOT" animation make a free game look like real gambling, and that is the main issue.',c:false},
      {t:'The certificate covers only luckyspin-play.net, but its "Play for real money" link sends users to luckyspin-casino.com, which is not covered.',c:true},
      {t:'The "FREE TO PLAY • NO DEPOSIT" caption has no age-restriction notice, and that is the main issue.',c:false},
      {t:'There is no core problem: the advertiser holds a gambling certificate, so the ad and its links are covered.',c:false}
    ],
    rationale:'The certified page looks fine on its own, and the ad sends people there. The issue is the next click: "Play for real money" leads to luckyspin-casino.com, which the certificate does not cover. The "win real cash" voiceover is also misleading for a "free" game, and it is the clue that should send you looking for the real-money path. The visuals and a missing age notice are secondary; the uncovered real-money site decides the case, and it suggests the free page is being used to get round certification.',
    secondary:{label:'Self-check — what next?', model:'Disapprove the ad for sending users to an uncertified real-money site, AND escalate the account for review. A missing certificate on its own would be fixed with guidance to the advertiser; a free page that hands users on to an uncertified real-money site looks deliberate, so it goes up.'},
    pins:[{x:50,y:48,t:'"Real money" link leaves the certified site'}],
    render:'<div class="player">'
      +'<div class="screen"><svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg"><rect width="640" height="360" fill="#140f2e"/><g font-family="Arial" font-weight="700"><rect x="150" y="60" width="100" height="150" rx="12" fill="#241b52" stroke="#4a3ba0"/><circle cx="200" cy="120" r="18" fill="#ffd23f"/><circle cx="200" cy="160" r="18" fill="#ff6b6b"/><circle cx="200" cy="80" r="18" fill="#4dd0e1"/><rect x="270" y="60" width="100" height="150" rx="12" fill="#241b52" stroke="#4a3ba0"/><circle cx="320" cy="120" r="18" fill="#4dd0e1"/><circle cx="320" cy="160" r="18" fill="#ffd23f"/><circle cx="320" cy="80" r="18" fill="#ff6b6b"/><rect x="390" y="60" width="100" height="150" rx="12" fill="#241b52" stroke="#4a3ba0"/><circle cx="440" cy="120" r="18" fill="#ff6b6b"/><circle cx="440" cy="160" r="18" fill="#ffd23f"/><circle cx="440" cy="80" r="18" fill="#4dd0e1"/></g><text x="320" y="270" fill="#ffd23f" font-size="40" text-anchor="middle" font-weight="800" font-family="Arial">JACKPOT</text>'
      +'</svg><div class="caption">FREE TO PLAY • NO DEPOSIT</div></div>'
      +'<div class="play-ctrl"><div class="pbtn">▶</div><div class="bar"><i></i></div><span class="mono" style="font-size:11px">0:08</span></div>'
      +'</div>'
      +'<div class="audio"><div class="ah">🔊 Audio (spoken)</div>"Spin free, <b>win real cash</b> — cash out to your bank in minutes."</div>'
      +'<div class="strip"><span class="p">Landing page <b>luckyspin-play.net</b> → "Play for real money" links to <b>luckyspin-casino.com</b></span><span class="p cert">Certificate on file: <b>luckyspin-play.net</b> only</span></div>'
  },
  {
    id:'q5', type:'text', tlabel:'Text sample', title:'Rejuvacell — supplement ad',
    skills:['s7','s3','s5'],
    policy:'Misrepresentation & healthcare: ads must not make unapproved medical claims, and must not use fake or misleading endorsements, including AI-generated people.',
    question:'Which policy issues are present?',
    options:[
      {t:'Only the price: "Claim 80% off" is an unverified discount claim that needs proof.',c:false},
      {t:'It claims a supplement works like a prescription drug, and it uses an AI-generated "doctor" as an endorser. A fine-print label does not make a fake endorsement acceptable.',c:true},
      {t:'Only the drug comparison. The AI presenter is labelled in the fine print, so the endorsement is acceptable.',c:false},
      {t:'Only the endorsement. Saying it "works like" a prescription drug is a comparison, not a medical claim, so it is allowed.',c:false}
    ],
    rationale:'There are two issues. Saying a supplement "works like Rx weight-loss medication" is an unapproved medical claim: a comparison to a drug is still a drug claim. And "Dr. Marcus Reed" is an AI-generated person presented as a real doctor recommending the product. The fine-print label does not fix that, because the headline still has him talking about "my patients". Catching only one of the two leaves a violating ad live.',
    secondary:{label:'Self-check — draft the advertiser reply', model:'"Your ad was disapproved because it (1) claims Rejuvacell works like a prescription medication without authorization, and (2) presents an AI-generated \'doctor\' as a real endorser, which is impersonation. To run, remove the drug-equivalence claim and the fake-doctor endorsement." — name what is missing, cite the policy, give the fix.'},
    pins:[{x:50,y:40,t:'Drug-equivalence claim'},{x:50,y:84,t:'AI presenter as endorser'}],
    evidence:['Ad copy + screenshot archived','Endorser marked as AI-generated in file','No certification attached for the prescription-drug claim','Account history / prior violations checked'],
    render:'<div class="adcard">'
      +'<img src="assets/q5-doctor.png" alt="AI-generated doctor endorser" style="width:100%;max-width:280px;aspect-ratio:16/9;border-radius:14px;object-fit:cover;display:block;margin-bottom:12px;border:1px solid #e8eaed">'
      +'<div style="font-size:18px;font-weight:700">My patients are shocked — it works like a prescription drug.</div>'
      +'<div style="color:#444746;margin-top:6px">Dr. Marcus Reed recommends <b>Rejuvacell</b>. Clinically shown to work like Rx weight-loss medication — no prescription needed.</div>'
      +'<div class="cta">Claim 80% off</div>'
      +'<div class="fine">*AI-generated presenter. Results not typical.</div>'
      +'<div class="url">www.rejuvacell.example</div>'
      +'</div>'
  },
  {
    id:'q6', type:'text', tlabel:'Text sample', title:'ProFree — subscription trial',
    skills:['s5','s6','s1'],
    policy:'Misrepresentation: ads must be honest about pricing and must clearly show the key terms of any "free" offer.',
    question:'The headline promises 30 days free. Based on the ad alone, what is the main violation?',
    options:[
      {t:'"No risk" is the main violation: the advertiser cannot promise that a subscription carries zero risk.',c:false},
      {t:'A key cost is missing: the fine print says the trial turns into a paid monthly plan, but the ad never says how much it costs.',c:true},
      {t:'"Cancel anytime" is the main violation, because the ad does not show how to cancel.',c:false},
      {t:'There is no violation: the fine print clearly says the plan renews automatically, which is enough disclosure.',c:false}
    ],
    rationale:'The fine print says the plan renews, but not what it costs, and the price is the term users most need to know. "No risk" and "cancel anytime" are soft claims worth noting, but the missing monthly price is what makes the "free" offer misleading. Saying a plan renews is not the same as saying what it costs.',
    secondary:{label:'Self-check — what do you do next?', model:'The problem in the ad is clear: no monthly price appears anywhere. Disapprove with guidance to add the price, and request the landing-page screenshot that is missing from the file. If the landing page also hides the charge, treat it as a pattern and escalate. If the page shows the price clearly, the fix is only the ad copy, so say that in your reply.'},
    pins:[{x:50,y:76,t:'Recurring price never disclosed'}],
    evidence:['Ad copy archived in file','Landing-page screenshot — MISSING: request it','Check whether the landing page shows the monthly price','Advertiser response logged'],
    render:'<div class="adcard">'
      +'<div style="font-size:18px;font-weight:700">Try ProFree — 30 days FREE. No risk, cancel anytime.</div>'
      +'<div class="cta">Start free trial</div>'
      +'<div class="fine">After the free trial, your subscription renews automatically at the regular monthly rate — cancel anytime to avoid being charged.</div>'
      +'<div class="url">www.profree.example</div>'
      +'</div>'
  }
];

/* Shuffle answer options once per page load, so the correct answer
 * is not always in the same position. Scoring reads the c flag, not
 * the position, so nothing else needs to change. */
SAMPLES.forEach(function(s){
  var o = s.options;
  for(var i = o.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var t = o[i]; o[i] = o[j]; o[j] = t;
  }
});

/* ================= STATE ================= */
var idx = 0;
var answers = {};   // sample id -> selected option index
var revealed = {};  // sample id -> bool
window.particleNet = {ready:false};   // test hook: set true when the bg particle network inits
var countUpRaf = null;                // in-flight score count-up animation handle
var caseTicks = {};                   // case-file drawer checkbox state per sample id

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
/* Results (and the answer key) stay locked until every sample is submitted. */
function allSubmitted(){ return Object.keys(revealed).length >= SAMPLES.length; }
function updateResultsLock(){
  var tab = document.querySelector('.tab[data-t="results"]');
  if(!tab) return;
  var locked = !allSubmitted();
  tab.classList.toggle('locked', locked);
  tab.setAttribute('aria-disabled', locked ? 'true' : 'false');
  tab.title = locked ? 'Results unlock after you submit all ' + SAMPLES.length + ' samples' : '';
  tab.textContent = locked ? '🔒 Results' : 'Results';
}
function showLockNotice(){
  var n = document.getElementById('lock-notice');
  if(!n) return;
  var done = Object.keys(revealed).length;
  n.textContent = 'Results unlock after you submit all ' + SAMPLES.length + ' samples. You have submitted ' + done + ' of ' + SAMPLES.length + '.';
  n.classList.add('show');
  clearTimeout(showLockNotice.t);
  showLockNotice.t = setTimeout(function(){ n.classList.remove('show'); }, 4000);
}

function go(t){
  if(t === 'results' && !allSubmitted()){
    if(!document.getElementById('p-assessment').classList.contains('active')) go('assessment');
    showLockNotice();
    return;
  }
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
function fmtTime(t){
  if(!isFinite(t) || t < 0) t = 0;
  var m = Math.floor(t/60), s = Math.floor(t%60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}
function injectAssets(s, root){
  var a = ASSETS[s.id]; if(!a) return;
  if(a.kind === 'img'){
    var m = root.querySelector('.mock-img');
    if(m) m.innerHTML = '<img src="'+a.src+'" alt="'+s.title+'" style="width:100%;height:100%;object-fit:cover;display:block">';
    return;
  }
  /* ---- video: custom player (no native controls) ---- */
  var player = root.querySelector('.player');
  var scr = root.querySelector('.player .screen');
  if(!player || !scr) return;
  scr.innerHTML = '<video src="'+a.src+'" poster="'+(a.poster||'')+'" playsinline preload="auto"'
    + ' style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>';

  var v = scr.querySelector('video');
  var pbtn = player.querySelector('.play-ctrl .pbtn');
  var track = player.querySelector('.play-ctrl .bar');
  var thumb = player.querySelector('.play-ctrl .bar i');
  var timeEl = player.querySelector('.play-ctrl .mono');

  /* waveform: bars flow between screen and control bar (never over the video) */
  var waveform = player.querySelector('.waveform');
  if(!waveform){
    waveform = document.createElement('div');
    waveform.className = 'waveform';
    for(var b = 0; b < 22; b++){
      var bar = document.createElement('i');
      bar.className = 'bar';
      bar.style.height = (18 + Math.round(Math.abs(Math.sin(b * 1.7)) * 62)) + '%';
      waveform.appendChild(bar);
    }
    player.insertBefore(waveform, player.querySelector('.play-ctrl'));
  }

  /* (No on-screen drug-name chip for q3: the point of that sample is that
   * the drug is only spoken, so showing it on the video would give it away.) */
  function updateProgress(){
    var d = (isFinite(v.duration) && v.duration) ? v.duration : 0;
    if(thumb) thumb.style.left = (d ? (v.currentTime / d * 100) : 0) + '%';
    if(timeEl) timeEl.textContent = fmtTime(v.currentTime) + ' / ' + fmtTime(d || v.currentTime);
  }
  function setPlaying(on){
    waveform.classList.toggle('playing', on);
    if(pbtn) pbtn.textContent = on ? '❚❚' : '▶';
  }

  if(pbtn) pbtn.onclick = function(){
    if(v.paused){ var p = v.play(); if(p && p.catch) p.catch(function(){}); }
    else v.pause();
  };
  if(track) track.onclick = function(e){
    var r = track.getBoundingClientRect();
    if(isFinite(v.duration) && v.duration) v.currentTime = ((e.clientX - r.left) / r.width) * v.duration;
  };
  v.onplay = function(){ setPlaying(true); };
  v.onpause = function(){ setPlaying(false); };
  v.ontimeupdate = updateProgress;
  v.onseeking = updateProgress;   // chip/progress track the seek target immediately
  v.onseeked = updateProgress;
  v.onloadedmetadata = updateProgress;
  setPlaying(false);
  updateProgress();
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
    +'<div id="drawer-slot"></div>'
    +'<div class="reveal" id="reveal"><div id="rationale"></div>'
    +'<div class="row" style="margin-top:10px">'+skillChips+'</div>'
    + (s.secondary ? '<div class="model"><div class="mh">'+s.secondary.label+' <span class="ns">Model answer · not scored</span></div>'+s.secondary.model+'</div>' : '')
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

  buildDrawer(s);
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
  renderFooter();
}

function renderFooter(){
  var f = document.getElementById('wiz-footer');
  if(idx !== SAMPLES.length-1){ f.innerHTML = ''; return; }
  if(allSubmitted()){
    f.innerHTML = '<div class="row"><button class="btn primary" onclick="go(\'results\')">See results →</button></div>';
  } else {
    var left = SAMPLES.filter(function(x){ return !revealed[x.id]; })
      .map(function(x){ return SAMPLES.indexOf(x) + 1; });
    f.innerHTML = '<p class="sub" style="margin:0">Submit every sample to see your results. Still to submit: sample '
      + left.join(', ') + '.</p>';
  }
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
  updateResultsLock();
  renderFooter();
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
  renderPins(s);
}

/* ================= #5 ANOMALY INSPECTOR PINS ================= */
function renderPins(s){
  var body = document.querySelector('#sample-root .creative .body'); if(!body) return;
  body.querySelectorAll('.pin-layer').forEach(function(el){ el.remove(); });
  if(!s.pins || !s.pins.length) return;
  var host = body.querySelector('.mock-img') || body.querySelector('.player .screen') || body.querySelector('.adcard') || body;
  var layer = document.createElement('div');
  layer.className = 'pin-layer';
  s.pins.forEach(function(p){
    var el = document.createElement('button');
    el.type = 'button';
    el.className = 'pin' + (p.x > 55 ? ' side-left' : '');
    el.style.left = p.x + '%';
    el.style.top = p.y + '%';
    el.title = 'Show the linked policy text';
    el.innerHTML = '<span class="dot"></span><span class="plbl">' + p.t + '</span>';
    el.onclick = function(){
      var illu = document.querySelector('#sample-root .illustrative');
      if(!illu) return;
      illu.classList.remove('flash'); void illu.offsetWidth;
      illu.classList.add('flash');
      setTimeout(function(){ illu.classList.remove('flash'); }, 1600);
    };
    layer.appendChild(el);
  });
  host.appendChild(layer);
}

/* ================= #7 CASE FILE DRAWER (Tier 2 evidence) ================= */
function buildDrawer(s){
  var slot = document.getElementById('drawer-slot'); if(!slot) return;
  slot.innerHTML = '';
  if(!s.evidence || !s.evidence.length) return;
  var ticks = caseTicks[s.id] || (caseTicks[s.id] = s.evidence.map(function(){ return false; }));
  var d = document.createElement('details');
  d.className = 'cf-drawer';
  d.innerHTML = '<summary>🗂 Case file — evidence checklist (not scored) <span class="cf-count">'
    + ticks.filter(Boolean).length + '/' + s.evidence.length + '</span></summary>'
    + '<p class="cf-note">What a reviewer would gather before closing this case. Tick items as you think them through; this does not affect your score.</p>'
    + '<div class="cf-items"></div>';
  var box = d.querySelector('.cf-items');
  s.evidence.forEach(function(ev, i){
    var isMiss = /MISSING/i.test(ev);
    var lab = document.createElement('label');
    lab.innerHTML = '<input type="checkbox"' + (ticks[i] ? ' checked' : '') + '><span'
      + (isMiss ? ' class="miss"' : '') + '>' + ev + '</span>';
    lab.querySelector('input').onchange = function(e){
      caseTicks[s.id][i] = e.target.checked;
      if(!isMiss) lab.querySelector('span').classList.toggle('done', e.target.checked);
      d.querySelector('.cf-count').textContent = caseTicks[s.id].filter(Boolean).length + '/' + s.evidence.length;
    };
    box.appendChild(lab);
  });
  slot.appendChild(d);
}

function nav(d){
  idx = Math.max(0, Math.min(SAMPLES.length-1, idx+d));
  renderSample();
  window.scrollTo({top:0, behavior:'smooth'});   // auto-return to top for the next sample
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
  return {pts:pts, total:total, earned:earned, done:Object.keys(revealed).length};
}

function renderResults(){
  var c = compute();
  window.lastComputed = c;
  // Let the radar module redraw the 7-axis chart from the same scores (always FINAL values).
  window.dispatchEvent(new CustomEvent('scores-updated', {detail:c}));

  var hero = document.getElementById('score-hero');
  var pct = c.total ? Math.round(c.earned/c.total*100) : 0;
  var tier = pct >= 90 ? 'interview' : (pct >= 70 ? 'needs' : 'not-ready');
  var tierText = pct >= 90 ? 'Interview-ready' : (pct >= 70 ? 'Needs review' : 'Not ready');
  hero.innerHTML =
    '<div style="text-align:center;flex:0 0 auto">'
    +'<div class="score-value">'+pct+'%</div>'
    +'<div style="font-size:11.5px;color:var(--text3);margin-top:5px">samples correct</div></div>'
    +'<span class="tier-badge '+tier+'">'+tierText+'</span>'
    +'<div><h2 style="margin:0 0 6px">Assessment summary</h2>'
    +'<p class="sub" style="margin:0">'+c.done+' of '+SAMPLES.length+' samples answered · '+c.earned+'/'+c.total+' correct</p></div>';
  animateScore(hero.querySelector('.score-value'), pct);

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

/* Score count-up: animates 0 -> target %, honours reduced-motion. */
function animateScore(el, target){
  if(!el) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce || !target){ el.textContent = target + '%'; return; }
  if(countUpRaf) cancelAnimationFrame(countUpRaf);
  var t0 = performance.now(), DUR = 1000;
  (function step(now){
    var p = Math.min(1, (now - t0) / DUR);
    var eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + '%';
    if(p < 1) countUpRaf = requestAnimationFrame(step);
    else { el.textContent = target + '%'; countUpRaf = null; }
  })(t0);
}

/* ================= #6 REPORT: COPY SUMMARY + PRINT ================= */
function buildSummary(){
  var c = compute();
  var pct = c.total ? Math.round(c.earned / c.total * 100) : 0;
  var tier = pct >= 90 ? 'Interview-ready' : (pct >= 70 ? 'Needs review' : 'Not ready');
  var L = [];
  L.push('ADSENTINEL — ADS CREATIVE EDGE-CASE ASSESSMENT');
  L.push('Executive summary — ' + new Date().toISOString().slice(0, 10));
  L.push('');
  L.push('Overall: ' + pct + '% (' + c.earned + '/' + c.total + ' samples correct, '
    + c.done + '/' + SAMPLES.length + ' answered) — Tier: ' + tier);
  L.push('');
  L.push('Skill proficiency:');
  SKILLS.forEach(function(sk){
    var p = c.pts[sk.id];
    var v = p.avail ? Math.round(p.earned / p.avail * 100) : 0;
    L.push('  - ' + sk.name + ': ' + v + '%');
  });
  L.push('');
  L.push('Samples:');
  SAMPLES.forEach(function(s, i){
    var st = !revealed[s.id] ? 'Not answered'
      : (s.options[answers[s.id]].c ? 'Correct' : 'Incorrect');
    L.push('  ' + (i + 1) + '. ' + s.title + ' — ' + st);
    if(revealed[s.id]) L.push('     Key: ' + s.options.filter(function(o){ return o.c; })[0].t);
  });
  L.push('');
  L.push('Policy rules are illustrative and condensed, not verbatim policy text.');
  return L.join('\n');
}
function fallbackCopy(txt){
  var ta = document.createElement('textarea');
  ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  var ok = false;
  try { ok = document.execCommand('copy'); } catch(e){}
  ta.remove();
  return ok;
}
function copySummary(){
  var btn = document.getElementById('btn-copy');
  var txt = buildSummary();
  function done(ok){
    if(!btn) return;
    var old = 'Copy summary';
    btn.textContent = ok ? 'Copied ✓' : 'Copy failed';
    setTimeout(function(){ btn.textContent = old; }, 1600);
  }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(
      function(){ done(true); },
      function(){ done(fallbackCopy(txt)); }
    );
  } else done(fallbackCopy(txt));
}
function printReport(){
  go('results');
  setTimeout(function(){ window.print(); }, 150);
}

/* ================= THREE.JS BACKGROUND + PARTICLE NETWORK ================= */
(function(){
  if(typeof THREE === 'undefined'){ document.getElementById('bg3d').style.display='none'; return; }
  var canvas = document.getElementById('bg3d');
  var renderer = new THREE.WebGLRenderer({canvas:canvas, alpha:true, antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 120);
  camera.position.z = 32;

  /* base starfield */
  var palette = [0x4285f4, 0xea4335, 0xfbbc04, 0x34a853, 0x8ab4ff, 0xc9a8ff, 0xffffff];
  var N = 72;                       // network nodes (cap: perf of O(N^2) link pass / frame)
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

  /* network links: each node connects to its nearest neighbour */
  var linkPos = new Float32Array(N*2*3);
  var linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPos,3));
  var linkMat = new THREE.LineBasicMaterial({color:0x8ab4ff, transparent:true, opacity:0.14, depthWrite:false, blending:THREE.AdditiveBlending});
  var links = new THREE.LineSegments(linkGeo, linkMat);
  scene.add(links);

  var mx=0, my=0;
  addEventListener('mousemove', function(e){ mx=(e.clientX/innerWidth-0.5)*2; my=(e.clientY/innerHeight-0.5)*2; });
  function resize(){ renderer.setSize(innerWidth, innerHeight); camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); }
  addEventListener('resize', resize); resize();

  function updateLinks(){
    for(var i=0;i<N;i++){
      var xi=pos[i*3], yi=pos[i*3+1], zi=pos[i*3+2], best=-1, bd=Infinity;
      for(var j=0;j<N;j++){
        if(i===j) continue;
        var dx=xi-pos[j*3], dy=yi-pos[j*3+1], dz=zi-pos[j*3+2];
        var d=dx*dx+dy*dy+dz*dz;
        if(d<bd){ bd=d; best=j; }
      }
      if(best>=0){
        linkPos[i*6]=xi;   linkPos[i*6+1]=yi;   linkPos[i*6+2]=zi;
        linkPos[i*6+3]=pos[best*3]; linkPos[i*6+4]=pos[best*3+1]; linkPos[i*6+5]=pos[best*3+2];
      }
    }
    linkGeo.attributes.position.needsUpdate = true;
  }

  (function tick(){
    points.rotation.y += 0.0006;
    points.rotation.x += 0.00028;
    camera.position.x += (mx*3.2 - camera.position.x)*0.03;
    camera.position.y += (-my*2.2 - camera.position.y)*0.03;
    camera.lookAt(scene.position);

    updateLinks();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  })();

  window.particleNet.ready = true;
})();

/* ================= INIT ================= */
renderSample();
updateResultsLock();
window.addEventListener('beforeprint', function(){
  document.querySelectorAll('#p-results details').forEach(function(d){ d.open = true; });
});
console.log('AdSentinel demo ready — go:', typeof go);
