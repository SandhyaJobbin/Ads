/* ================= RADAR — 8-axis spider chart (Results) =================
 * Owns #skill-radar: grid lives in index.html, this module draws the
 * 8 spokes + short labels + live percentages, and redraws #radar-poly
 * whenever script.js dispatches a `scores-updated` event.
 */
(function(){
  var ORDER = ['s1','s2','s3','s4','s5','s6','s7','s8'];
  var LABELS = {
    s1:'Policy', s2:'Multimodal', s3:'Adversarial', s4:'Regional',
    s5:'Evidence', s6:'Escalation', s7:'AI literacy', s8:'Resilience'
  };
  var CX = 180, CY = 180, R = 110, LBL = 126;
  var NS = 'http://www.w3.org/2000/svg';

  /* Styles for the chart */
  var style = document.createElement('style');
  style.textContent =
    '#skill-radar{display:block;width:100%;max-width:420px;height:auto;margin:0 auto}'
    + '.radar-path{fill:rgba(91,156,255,.14);stroke:var(--blue);stroke-width:2.5;stroke-linejoin:round;stroke-linecap:round;opacity:.9;'
    + 'stroke-dasharray:1000;stroke-dashoffset:1000;animation:drawPath 1.1s cubic-bezier(.22,1,.36,1) forwards}'
    + '@keyframes drawPath{to{stroke-dashoffset:0}}'
    + '#radar-axes line{stroke:var(--outline2);stroke-width:1}'
    + '#radar-axes .ax-name{fill:var(--text3);font-size:10px;font-family:Inter,sans-serif}'
    + '#radar-axes .ax-pct{fill:var(--blue-d);font-size:11.5px;font-weight:700;font-family:"JetBrains Mono",monospace}';
  document.head.appendChild(style);

  function angleFor(i){ return -Math.PI/2 + i*(Math.PI/4); } // i=0 at 12 o'clock, clockwise

  function buildAxes(svg){
    var old = svg.querySelector('#radar-axes');
    if(old) old.parentNode.removeChild(old);
    var g = document.createElementNS(NS,'g');
    g.setAttribute('id','radar-axes');
    ORDER.forEach(function(id,i){
      var a = angleFor(i);
      var line = document.createElementNS(NS,'line');
      line.setAttribute('x1', CX);
      line.setAttribute('y1', CY);
      line.setAttribute('x2', (CX+Math.cos(a)*R).toFixed(1));
      line.setAttribute('y2', (CY+Math.sin(a)*R).toFixed(1));
      g.appendChild(line);

      var lx = CX+Math.cos(a)*LBL;
      var ly = CY+Math.sin(a)*LBL;
      var anchor = (i===0 || i===4) ? 'middle' : (i<4 ? 'start' : 'end');

      var name = document.createElementNS(NS,'text');
      name.setAttribute('class','ax-name');
      name.setAttribute('x', lx.toFixed(1));
      name.setAttribute('y', (ly-4).toFixed(1));
      name.setAttribute('text-anchor', anchor);
      name.textContent = LABELS[id];
      g.appendChild(name);

      var pct = document.createElementNS(NS,'text');
      pct.setAttribute('class','ax-pct');
      pct.setAttribute('id', 'radar-pct-'+id);
      pct.setAttribute('x', lx.toFixed(1));
      pct.setAttribute('y', (ly+9).toFixed(1));
      pct.setAttribute('text-anchor', anchor);
      pct.textContent = '0%';
      g.appendChild(pct);
    });
    svg.appendChild(g);
  }

  function update(pts){
    var coords = [];
    var pctById = {};
    ORDER.forEach(function(id,i){
      var p = (pts && pts[id]) || {earned:0, avail:0};
      var pct = p.avail ? Math.round(p.earned/p.avail*100) : 0;
      pctById[id] = pct;
      var a = angleFor(i);
      var r = R*pct/100;
      coords.push((CX+Math.cos(a)*r).toFixed(1)+','+(CY+Math.sin(a)*r).toFixed(1));
    });

    var poly = document.getElementById('radar-poly');
    if(poly){
      poly.setAttribute('d', 'M'+coords.join(' L')+' Z');
      var len = 0;
      try { len = poly.getTotalLength(); } catch(e){}
      if(len){
        poly.style.strokeDasharray = len;
        poly.style.strokeDashoffset = len;
        poly.style.animation = 'none';
        void poly.getBoundingClientRect(); // restart the draw animation
        poly.style.animation = 'drawPath 1.1s cubic-bezier(.22,1,.36,1) forwards';
      }
    }

    ORDER.forEach(function(id){
      var el = document.getElementById('radar-pct-'+id);
      if(el) el.textContent = pctById[id]+'%';
    });
  }

  function init(){
    var svg = document.getElementById('skill-radar');
    if(!svg) return;
    buildAxes(svg);
    update(window.lastComputed ? window.lastComputed.pts : null);
  }

  window.addEventListener('scores-updated', function(e){
    update(e.detail && e.detail.pts ? e.detail.pts : null);
  });
  window.radarUpdate = update; // exposed for debugging

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
