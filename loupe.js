/* ================= FORENSIC LOUPE — 2.5× zoom + detection overlays =================
 * Trigger: "Inspect 2.5×" button rendered into the creative label for image
 * samples (Q1/Q2). The lens follows the cursor and shows the sample image
 * magnified 2.5×; region markers (detection overlays) are drawn inside the
 * .mock-img frame. Click the backdrop or press Escape to close.
 */
(function(){
  var ZOOM = 2.5;

  function ForensicLoupe(){
    this.isActive = false;
    this.currentSample = null;
    this.btn = null;
    this.img = null;
    this.overlay = document.getElementById('loupe-overlay');
    this.circle = this.overlay ? this.overlay.querySelector('.loupe-circle') : null;
    this.inner = this.circle ? this.circle.querySelector('.loupe-inner') : null;
    this.bind();
  }

  ForensicLoupe.prototype.bind = function(){
    var self = this;

    document.addEventListener('click', function(e){
      var btn = e.target.closest ? e.target.closest('.btn-loupe') : null;
      if(btn){
        e.preventDefault();
        e.stopPropagation();
        self.toggle(btn);
      }
    });

    if(this.overlay){
      this.overlay.addEventListener('click', function(e){
        if(!e.target.closest('.loupe-circle')) self.close();
      });
    }

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && self.isActive) self.close();
    });

    document.addEventListener('mousemove', function(e){
      if(self.isActive) self.track(e.clientX, e.clientY);
    });
  };

  ForensicLoupe.prototype.toggle = function(btn){
    if(this.isActive && this.btn === btn){ this.close(); return; }
    this.open(btn.closest('.creative'), btn);
  };

  ForensicLoupe.prototype.open = function(sampleEl, btn){
    if(!sampleEl) return;
    var img = sampleEl.querySelector('.mock-img img');
    if(!img) return; // only image samples (Q1/Q2) are inspectable

    if(this.isActive) this.close();
    this.isActive = true;
    this.currentSample = sampleEl;
    this.btn = btn;
    this.img = img;
    btn.classList.add('active');

    this.showDetection(sampleEl);

    var src = img.currentSrc || img.src;
    if(this.inner){
      this.inner.style.backgroundImage = 'url("' + src + '")';
      this.inner.style.backgroundRepeat = 'no-repeat';
    }
    this.overlay.classList.add('active');

    var r = img.getBoundingClientRect();
    this.track(r.left + r.width/2, r.top + r.height/2);
  };

  ForensicLoupe.prototype.close = function(){
    if(!this.isActive) return;
    this.isActive = false;
    if(this.overlay) this.overlay.classList.remove('active');
    if(this.btn) this.btn.classList.remove('active');
    this.hideDetection();
    this.currentSample = null;
    this.btn = null;
    this.img = null;
  };

  /* Position the lens under the cursor and aim the magnified background. */
  ForensicLoupe.prototype.track = function(cx, cy){
    if(!this.isActive || !this.img || !this.circle || !this.inner) return;
    var rect = this.img.getBoundingClientRect();
    var lw = this.circle.offsetWidth || 180;

    this.circle.style.left = cx + 'px';
    this.circle.style.top = cy + 'px';

    // Clamp to the image so the lens always shows image content.
    var x = Math.min(Math.max(cx - rect.left, 0), rect.width);
    var y = Math.min(Math.max(cy - rect.top, 0), rect.height);

    this.inner.style.backgroundSize = (rect.width*ZOOM)+'px '+(rect.height*ZOOM)+'px';
    this.inner.style.backgroundPosition = (lw/2 - x*ZOOM)+'px '+(lw/2 - y*ZOOM)+'px';
  };

  /* Region markers for Q1/Q2, absolutely aligned inside .mock-img. */
  ForensicLoupe.prototype.showDetection = function(sampleEl){
    this.hideDetection();
    var id = sampleEl.dataset.sampleId;
    var detectionClass = '';
    if(id === 'q1') detectionClass = 'q1-detection';
    else if(id === 'q2') detectionClass = 'q2-detection';
    if(!detectionClass) return;

    var frame = sampleEl.querySelector('.mock-img');
    if(!frame) return;

    var overlay = document.createElement('div');
    overlay.className = 'inspection-overlay ' + detectionClass;
    frame.appendChild(overlay);
    this.currentDetection = overlay;
  };

  ForensicLoupe.prototype.hideDetection = function(){
    if(this.currentDetection && this.currentDetection.parentNode){
      this.currentDetection.parentNode.removeChild(this.currentDetection);
    }
    this.currentDetection = null;
  };

  function boot(){
    window.loupeInstance = new ForensicLoupe();
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
