/**
 * Shreeya's Lovability & Prettiness Accreditation Exam
 * Interactive Client Engine
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentIndex: 0,
    totalQuestions: window.EXAM_QUESTIONS.length,
    answers: {},
    timeStarted: Date.now(),
    timerInterval: null,
    isMusicPlaying: false,
    musicInterval: null,
    musicStep: 0,
    growScale: 1,
    shrinkScale: 1,
    capacitorClicks: 0
  };

  // DOM Elements
  const dom = {
    timeElapsed: document.getElementById('timeElapsed'),
    progressFill: document.getElementById('progressFill'),
    progressLabel: document.getElementById('progressLabel'),
    examStage: document.getElementById('examStage'),
    graduationView: document.getElementById('graduationView'),
    sectionPill: document.getElementById('sectionPill'),
    questionTitle: document.getElementById('questionTitle'),
    questionSubtitle: document.getElementById('questionSubtitle'),
    questionBody: document.getElementById('questionBody'),
    feedbackBanner: document.getElementById('feedbackBanner'),
    feedbackText: document.getElementById('feedbackText'),
    btnPrev: document.getElementById('btnPrev'),
    btnNext: document.getElementById('btnNext'),
    btnSoundToggle: document.getElementById('btnSoundToggle'),
    btnMusicToggle: document.getElementById('btnMusicToggle'),
    loveLetterModal: document.getElementById('loveLetterModal'),
    ambientCanvas: document.getElementById('ambientCanvas'),
    confettiCanvas: document.getElementById('confettiCanvas')
  };

  /* -------------------------------------------------------------------------
   * Ambient Floating Hearts & Sparkles Canvas Background
   * ---------------------------------------------------------------------- */
  const ambient = {
    ctx: dom.ambientCanvas.getContext('2d'),
    particles: [],
    width: 0,
    height: 0,

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize());
      for (let i = 0; i < 35; i++) {
        this.particles.push(this.createParticle(true));
      }
      this.loop();
    },

    resize() {
      this.width = dom.ambientCanvas.width = window.innerWidth;
      this.height = dom.ambientCanvas.height = window.innerHeight;
    },

    createParticle(randomY = false) {
      const types = ['heart', 'sparkle', 'petal'];
      return {
        x: Math.random() * this.width,
        y: randomY ? Math.random() * this.height : this.height + 20,
        size: Math.random() * 14 + 10,
        speedY: Math.random() * 0.7 + 0.4,
        speedX: (Math.random() - 0.5) * 0.6,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.55 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02
      };
    },

    loop() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.y -= p.speedY;
        p.x += Math.sin(p.y * 0.015) * 0.5 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -30 || p.x < -30 || p.x > this.width + 30) {
          this.particles[i] = this.createParticle(false);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.globalAlpha = p.opacity;

        if (p.type === 'heart') {
          this.ctx.fillStyle = '#FF85A2';
          this.drawHeart(0, 0, p.size * 0.6);
        } else if (p.type === 'petal') {
          this.ctx.fillStyle = '#FFB7CE';
          this.drawPetal(0, 0, p.size * 0.8);
        } else {
          this.ctx.fillStyle = '#FFD166';
          this.drawSparkle(0, 0, p.size * 0.5);
        }

        this.ctx.restore();
      }

      requestAnimationFrame(() => this.loop());
    },

    drawHeart(x, y, s) {
      this.ctx.beginPath();
      const topCurveHeight = s * 0.3;
      this.ctx.moveTo(x, y + topCurveHeight);
      this.ctx.bezierCurveTo(x, y, x - s / 2, y, x - s / 2, y + topCurveHeight);
      this.ctx.bezierCurveTo(x - s / 2, y + (s + topCurveHeight) / 2, x, y + (s + topCurveHeight) / 1.4, x, y + s);
      this.ctx.bezierCurveTo(x, y + (s + topCurveHeight) / 1.4, x + s / 2, y + (s + topCurveHeight) / 2, x + s / 2, y + topCurveHeight);
      this.ctx.bezierCurveTo(x + s / 2, y, x, y, x, y + topCurveHeight);
      this.ctx.closePath();
      this.ctx.fill();
    },

    drawPetal(x, y, s) {
      this.ctx.beginPath();
      this.ctx.ellipse(x, y, s * 0.5, s * 0.25, Math.PI / 4, 0, 2 * Math.PI);
      this.ctx.fill();
    },

    drawSparkle(x, y, s) {
      this.ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        this.ctx.lineTo(Math.cos((i * Math.PI) / 2) * s, Math.sin((i * Math.PI) / 2) * s);
        this.ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (s * 0.3), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (s * 0.3));
      }
      this.ctx.closePath();
      this.ctx.fill();
    }
  };

  /* -------------------------------------------------------------------------
   * Custom High-Performance Canvas Confetti Cannon
   * ---------------------------------------------------------------------- */
  const confettiEngine = {
    ctx: dom.confettiCanvas.getContext('2d'),
    pieces: [],
    animating: false,

    resize() {
      dom.confettiCanvas.width = window.innerWidth;
      dom.confettiCanvas.height = window.innerHeight;
    },

    burst(x = window.innerWidth / 2, y = window.innerHeight / 2, count = 75) {
      this.resize();
      const colors = ['#FF5376', '#FF85A2', '#FFB7CE', '#FFE4EC', '#FFD166', '#FFF', '#E03572'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        this.pieces.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 9 + 5,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 14,
          gravity: 0.32,
          opacity: 1,
          decay: Math.random() * 0.015 + 0.012,
          isHeart: Math.random() > 0.6
        });
      }
      if (!this.animating) {
        this.animating = true;
        this.update();
      }
    },

    update() {
      if (this.pieces.length === 0) {
        this.animating = false;
        this.ctx.clearRect(0, 0, dom.confettiCanvas.width, dom.confettiCanvas.height);
        return;
      }

      this.ctx.clearRect(0, 0, dom.confettiCanvas.width, dom.confettiCanvas.height);

      for (let i = this.pieces.length - 1; i >= 0; i--) {
        const p = this.pieces[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotSpeed;
        p.opacity -= p.decay;

        if (p.opacity <= 0 || p.y > dom.confettiCanvas.height + 50) {
          this.pieces.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.fillStyle = p.color;

        if (p.isHeart) {
          ambient.drawHeart.call({ ctx: this.ctx }, 0, 0, p.size);
        } else {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        }

        this.ctx.restore();
      }

      requestAnimationFrame(() => this.update());
    }
  };

  /* -------------------------------------------------------------------------
   * Procedural Romantic Background Melody (Web Audio Lofi Arpeggio)
   * ---------------------------------------------------------------------- */
  const musicEngine = {
    chords: [
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [392.00, 493.88, 587.33, 659.25], // G6
      [329.63, 392.00, 493.88, 587.33], // Em7
      [440.00, 523.25, 659.25, 783.99]  // Am7
    ],

    playStep() {
      if (!state.isMusicPlaying || !window.sfx.enabled) return;
      window.sfx.init();
      if (!window.sfx.ctx) return;

      const chordIndex = Math.floor(state.musicStep / 4) % this.chords.length;
      const noteIndex = state.musicStep % 4;
      const freq = this.chords[chordIndex][noteIndex];
      const now = window.sfx.ctx.currentTime;

      try {
        const osc = window.sfx.ctx.createOscillator();
        const gain = window.sfx.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);

        osc.connect(gain);
        gain.connect(window.sfx.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.5);
      } catch (e) {
        console.warn(e);
      }

      state.musicStep++;
    },

    toggle() {
      state.isMusicPlaying = !state.isMusicPlaying;
      if (state.isMusicPlaying) {
        window.sfx.init();
        dom.btnMusicToggle.innerHTML = '🎵';
        dom.btnMusicToggle.title = 'Mute romantic background tune';
        state.musicInterval = setInterval(() => this.playStep(), 360);
        window.sfx.sparkle();
      } else {
        dom.btnMusicToggle.innerHTML = '🎶';
        dom.btnMusicToggle.title = 'Play romantic background tune';
        clearInterval(state.musicInterval);
      }
    }
  };

  /* -------------------------------------------------------------------------
   * Timer & Header Controls
   * ---------------------------------------------------------------------- */
  function startExamTimer() {
    state.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - state.timeStarted) / 1000);
      const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      dom.timeElapsed.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function updateProgressBar() {
    const pct = Math.round(((state.currentIndex + 1) / state.totalQuestions) * 100);
    dom.progressFill.style.width = `${pct}%`;
    dom.progressLabel.textContent = `${state.currentIndex + 1} / ${state.totalQuestions}`;
  }

  /* -------------------------------------------------------------------------
   * Feedback Helper
   * ---------------------------------------------------------------------- */
  function showFeedback(text, isAutocorrect = false) {
    if (!text) return;
    dom.feedbackText.textContent = text;
    dom.feedbackBanner.classList.add('show');
    if (isAutocorrect) {
      dom.feedbackBanner.style.borderColor = '#FF3366';
      dom.feedbackBanner.style.background = 'linear-gradient(135deg, #FFF0F2 0%, #FFFFFF 100%)';
    } else {
      dom.feedbackBanner.style.borderColor = 'var(--rose-primary)';
      dom.feedbackBanner.style.background = 'linear-gradient(135deg, rgba(255, 235, 242, 0.95), rgba(255, 255, 255, 0.95))';
    }
  }

  function markAnswered(q, feedbackText, isAutocorrect = false) {
    state.answers[q.id] = true;
    dom.btnNext.disabled = false;
    showFeedback(feedbackText || q.feedback, isAutocorrect);
    if (!isAutocorrect) {
      window.sfx.chime();
      confettiEngine.burst(window.innerWidth / 2, window.innerHeight * 0.4, 45);
    }
  }

  /* -------------------------------------------------------------------------
   * Master Question Renderer
   * ---------------------------------------------------------------------- */
  function renderCurrentQuestion() {
    const q = window.EXAM_QUESTIONS[state.currentIndex];
    if (!q) return;

    // Reset feedback & Next button
    dom.feedbackBanner.classList.remove('show');
    dom.btnNext.disabled = !state.answers[q.id];

    // Navigation buttons
    dom.btnPrev.style.visibility = state.currentIndex === 0 ? 'hidden' : 'visible';
    dom.btnNext.innerHTML = state.currentIndex === state.totalQuestions - 1 ? 'Complete Exam & Graduate 🎓' : 'Next Question ➜';

    // Header info
    dom.sectionPill.textContent = `${q.section} • ${q.code}`;
    dom.questionTitle.textContent = q.question;
    dom.questionSubtitle.textContent = q.subtitle || '';

    // Render body
    dom.questionBody.innerHTML = '';

    switch (q.type) {
      case 'binary-choice':
        renderBinaryChoice(q);
        break;
      case 'multi-choice':
        renderMultiChoice(q);
        break;
      case 'magnetic-slider':
        renderMagneticSlider(q);
        break;
      case 'bamboozle-tf':
        renderBamboozleTF(q);
        break;
      case 'dilemma-cards':
        renderDilemmaCards(q);
        break;
      case 'captcha-grid':
        renderCaptchaGrid(q);
        break;
      case 'autocorrect-input':
        renderAutocorrectInput(q);
        break;
      case 'shrink-grow':
        renderShrinkGrow(q);
        break;
      case 'scratch-card':
        renderScratchCard(q);
        break;
      case 'energy-capacitor':
        renderCapacitor(q);
        break;
      case 'drag-rank':
        renderDragRank(q);
        break;
      case 'speed-verdict':
        renderSpeedVerdict(q);
        break;
      case 'final-vow':
        renderFinalVow(q);
        break;
      default:
        renderMultiChoice(q);
        break;
    }

    updateProgressBar();
    if (state.answers[q.id]) {
      showFeedback(q.feedback);
    }
  }

  /* -------------------------------------------------------------------------
   * Q1: Binary Choice ("No" Autocorrects to YES upon clicking)
   * ---------------------------------------------------------------------- */
  function renderBinaryChoice(q) {
    const area = document.createElement('div');
    area.className = 'binary-actions-area';

    const btnYes = document.createElement('button');
    btnYes.className = 'btn-yes-huge';
    btnYes.innerHTML = q.yesText;

    const btnNo = document.createElement('button');
    btnNo.className = 'btn-no-runaway';
    btnNo.innerHTML = q.noText;

    btnNo.addEventListener('click', (e) => {
      e.preventDefault();
      window.sfx.boing();
      btnNo.classList.add('wrong-shake');

      setTimeout(() => {
        btnNo.classList.remove('wrong-shake');
        btnNo.innerHTML = "YES 🥰 (Autocorrected)";
        btnNo.style.borderColor = "var(--rose-primary)";
        btnNo.style.color = "var(--rose-dark)";
        btnYes.classList.add('autocorrect-glow');
        window.sfx.sparkle();
        markAnswered(q, q.autocorrectMsg, true);
      }, 350);
    });

    btnYes.addEventListener('click', () => {
      btnYes.classList.add('autocorrect-glow');
      markAnswered(q, q.feedback);
    });

    area.appendChild(btnYes);
    area.appendChild(btnNo);
    dom.questionBody.appendChild(area);
  }

  /* -------------------------------------------------------------------------
   * Q2, Q9, Q12: Multiple Choice with Automatic Autocorrect
   * ---------------------------------------------------------------------- */
  function renderMultiChoice(q) {
    const grid = document.createElement('div');
    grid.className = 'mc-options-grid';

    const cards = [];

    q.options.forEach((opt, idx) => {
      const card = document.createElement('div');
      card.className = 'mc-option-card';
      cards.push(card);

      if (state.answers[q.id] && state.answers[q.id] === idx) {
        card.classList.add('selected');
      }

      card.innerHTML = `
        <div class="option-badge-icon">${opt.icon || '🌸'}</div>
        <div class="option-text-wrap">
          <div class="option-main-text">${opt.text}</div>
          <div class="option-remark">${opt.remark || opt.reason || ''}</div>
        </div>
        <div class="option-check-circle">✓</div>
      `;

      card.addEventListener('click', () => {
        if (opt.correct) {
          // Correct choice
          cards.forEach(c => c.classList.remove('selected', 'wrong-shake'));
          card.classList.add('selected');
          state.answers[q.id] = idx;
          markAnswered(q, opt.remark || q.feedback);
        } else {
          // WRONG choice selected by Shreeya: Shake it, then autocorrect to right option!
          window.sfx.boing();
          cards.forEach(c => c.classList.remove('selected'));
          card.classList.add('wrong-shake');

          setTimeout(() => {
            card.classList.remove('wrong-shake');
            // Autoselect the recommended right option
            const targetIndex = q.recommendedIndex !== undefined ? q.recommendedIndex : 3;
            const targetCard = cards[targetIndex] || cards[1];
            targetCard.classList.add('selected', 'autocorrect-glow');
            state.answers[q.id] = targetIndex;
            window.sfx.sparkle();
            markAnswered(q, q.autocorrectMsg, true);
          }, 450);
        }
      });

      grid.appendChild(card);
    });

    dom.questionBody.appendChild(grid);
  }

  /* -------------------------------------------------------------------------
   * Q3: Magnetic Slider (Releasing below 100% slides smoothly to 100%)
   * ---------------------------------------------------------------------- */
  function renderMagneticSlider(q) {
    const wrap = document.createElement('div');
    wrap.className = 'slider-container';

    wrap.innerHTML = `
      <div class="slider-val-display" id="sliderVal">${q.initial}%</div>
      <div class="slider-val-sub" id="sliderSub">Adjust to your self-assessment:</div>
      <input type="range" class="custom-range-slider" id="beautySlider" min="0" max="100" value="${q.initial}" />
      <div class="slider-markers">
        <span>0% (Impossible)</span>
        <span>50% (Modest)</span>
        <span>100% (Absolute Goddess)</span>
      </div>
    `;

    dom.questionBody.appendChild(wrap);

    const slider = wrap.querySelector('#beautySlider');
    const display = wrap.querySelector('#sliderVal');
    const sub = wrap.querySelector('#sliderSub');

    slider.addEventListener('input', () => {
      display.textContent = `${slider.value}%`;
    });

    slider.addEventListener('change', () => {
      const val = parseInt(slider.value, 10);
      if (val < 100) {
        window.sfx.boing();
        display.classList.add('wrong-shake');
        sub.textContent = "⚠️ REJECTED: Self-doubt detected! Autocorrecting...";

        setTimeout(() => {
          display.classList.remove('wrong-shake');
          // Smoothly animate slider value up to 100
          let current = val;
          const anim = setInterval(() => {
            current = Math.min(100, current + 5);
            slider.value = current;
            display.textContent = `${current}%`;
            if (current >= 100) {
              clearInterval(anim);
              display.classList.add('autocorrect-glow');
              sub.textContent = "ANGELIC GODDESS ✨ (100% Locked)";
              window.sfx.sparkle();
              markAnswered(q, q.autocorrectMsg, true);
            }
          }, 25);
        }, 300);
      } else {
        display.classList.add('autocorrect-glow');
        sub.textContent = "ANGELIC GODDESS ✨ (100% Locked)";
        markAnswered(q, q.feedback);
      }
    });
  }

  /* -------------------------------------------------------------------------
   * Q4: Bamboozle True/False (Clicking FALSE autocorrects to TRUE)
   * ---------------------------------------------------------------------- */
  function renderBamboozleTF(q) {
    const box = document.createElement('div');
    box.className = 'bamboozle-box';

    box.innerHTML = `
      <div class="statement-quote">${q.statement}</div>
      <div class="tf-actions-row" id="tfRow">
        <button class="btn-tf btn-tf-false" id="btnTrue" style="background: linear-gradient(135deg, var(--rose-primary), var(--rose-dark)); color: #FFF; border: none;">TRUE (100% Fact) 🥰</button>
        <button class="btn-tf btn-tf-true" id="btnFalse">FALSE 🙅‍♀️</button>
      </div>
    `;

    dom.questionBody.appendChild(box);

    const btnTrue = box.querySelector('#btnTrue');
    const btnFalse = box.querySelector('#btnFalse');

    btnFalse.addEventListener('click', () => {
      window.sfx.boing();
      btnFalse.classList.add('wrong-shake');

      setTimeout(() => {
        btnFalse.classList.remove('wrong-shake');
        btnFalse.textContent = "WRONG ❌";
        btnTrue.classList.add('autocorrect-glow');
        btnTrue.style.transform = "scale(1.05)";
        window.sfx.sparkle();
        markAnswered(q, q.autocorrectMsg, true);
      }, 350);
    });

    btnTrue.addEventListener('click', () => {
      btnTrue.classList.add('autocorrect-glow');
      markAnswered(q, q.feedback);
    });
  }

  /* -------------------------------------------------------------------------
   * Q5: Dilemma Cards (Clicking Boyfriend card autocorrects to Shreeya)
   * ---------------------------------------------------------------------- */
  function renderDilemmaCards(q) {
    const grid = document.createElement('div');
    grid.className = 'dilemma-cards-grid';

    const cardElements = [];

    q.cards.forEach((cardData, idx) => {
      const card = document.createElement('div');
      card.className = 'dilemma-card';
      cardElements.push(card);

      card.innerHTML = `
        <span class="dilemma-tag">${cardData.tag}</span>
        <h3 class="dilemma-title">${cardData.title}</h3>
        <p class="dilemma-desc">${cardData.desc}</p>
      `;

      card.addEventListener('click', () => {
        if (cardData.isRight) {
          cardElements.forEach(c => c.style.borderColor = 'rgba(255, 183, 206, 0.5)');
          card.style.borderColor = 'var(--rose-primary)';
          card.style.background = '#FFF0F5';
          markAnswered(q, q.feedback);
        } else {
          // Wrong card (Boyfriend): Shake and autocorrect to Shreeya!
          window.sfx.boing();
          card.classList.add('wrong-shake');

          setTimeout(() => {
            card.classList.remove('wrong-shake');
            const targetCard = cardElements[0]; // Shreeya
            targetCard.classList.add('autocorrect-glow');
            targetCard.style.borderColor = 'var(--rose-primary)';
            targetCard.style.background = '#FFF0F5';
            window.sfx.sparkle();
            markAnswered(q, q.autocorrectMsg, true);
          }, 450);
        }
      });

      grid.appendChild(card);
    });

    dom.questionBody.appendChild(grid);
  }

  /* -------------------------------------------------------------------------
   * Q6: Captcha Grid (Verify checks missing, autocorrects to all selected)
   * ---------------------------------------------------------------------- */
  function renderCaptchaGrid(q) {
    const container = document.createElement('div');
    container.className = 'captcha-container';

    container.innerHTML = `
      <div class="captcha-header">
        <span class="captcha-title-txt">🛡️ Security Verification: Select all that belong to Shree</span>
        <span style="font-size: 0.75rem; color: var(--rose-dark); font-weight: 700;">Shreeya-Cloudflare v3.0</span>
      </div>
      <div class="captcha-grid" id="captchaGrid"></div>
      <div class="captcha-footer">
        <button class="btn-captcha-verify" id="btnVerifyCaptcha">Verify Cuteness ➜</button>
      </div>
    `;

    dom.questionBody.appendChild(container);

    const grid = container.querySelector('#captchaGrid');
    const checkedItems = new Set();
    const tileElements = [];

    q.items.forEach((item) => {
      const tile = document.createElement('div');
      tile.className = 'captcha-tile';
      tileElements.push(tile);

      tile.innerHTML = `
        <div class="tile-checkbox">✓</div>
        <div class="tile-label">${item.emoji} ${item.label}</div>
      `;

      tile.addEventListener('click', () => {
        window.sfx.pop();
        if (checkedItems.has(item.id)) {
          checkedItems.delete(item.id);
          tile.classList.remove('checked');
        } else {
          checkedItems.add(item.id);
          tile.classList.add('checked');
        }
      });

      grid.appendChild(tile);
    });

    const verifyBtn = container.querySelector('#btnVerifyCaptcha');
    verifyBtn.addEventListener('click', () => {
      if (checkedItems.size === q.items.length) {
        markAnswered(q, q.feedback);
      } else {
        // Missing items: Autocorrect by checking all!
        window.sfx.boing();
        tileElements.forEach((t, i) => {
          if (!checkedItems.has(q.items[i].id)) {
            t.classList.add('wrong-shake');
          }
        });

        setTimeout(() => {
          tileElements.forEach((t, i) => {
            t.classList.remove('wrong-shake');
            t.classList.add('checked', 'autocorrect-glow');
            checkedItems.add(q.items[i].id);
          });
          window.sfx.sparkle();
          markAnswered(q, q.autocorrectMsg, true);
        }, 450);
      }
    });
  }

  /* -------------------------------------------------------------------------
   * Q7: Autocorrect Text Input (Submit autocorrects to the compliment)
   * ---------------------------------------------------------------------- */
  function renderAutocorrectInput(q) {
    const box = document.createElement('div');
    box.className = 'autocorrect-box';

    box.innerHTML = `
      <div class="magic-input-wrap">
        <input type="text" class="magic-input" id="magicInput" placeholder="${q.placeholder}" autocomplete="off" />
      </div>
      <button class="btn-action-submit" id="btnSubmitInput">Submit Evaluation ➜</button>
      <p class="magic-helper-tip" style="margin-top: 12px;">Type whatever you like, the boyfriend filter is on standby.</p>
    `;

    dom.questionBody.appendChild(box);

    const input = box.querySelector('#magicInput');
    const submitBtn = box.querySelector('#btnSubmitInput');
    const target = q.targetText;

    submitBtn.addEventListener('click', () => {
      if (input.value.trim() === target) {
        markAnswered(q, q.feedback);
        return;
      }

      // Autocorrect to target
      window.sfx.boing();
      input.classList.add('wrong-shake');

      setTimeout(() => {
        input.classList.remove('wrong-shake');
        input.value = target;
        input.classList.add('autocorrect-glow');
        window.sfx.sparkle();
        markAnswered(q, q.autocorrectMsg, true);
      }, 400);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        submitBtn.click();
      }
    });
  }

  /* -------------------------------------------------------------------------
   * Q8: Shrink / Grow (Clicking No autocorrects to YES)
   * ---------------------------------------------------------------------- */
  function renderShrinkGrow(q) {
    const area = document.createElement('div');
    area.className = 'shrink-grow-area';

    const btnYes = document.createElement('button');
    btnYes.className = 'btn-grow-yes';
    btnYes.innerHTML = q.yesText;

    const btnNo = document.createElement('button');
    btnNo.className = 'btn-shrink-no';
    btnNo.innerHTML = q.noText;

    btnNo.addEventListener('click', (e) => {
      e.preventDefault();
      window.sfx.boing();
      btnNo.classList.add('wrong-shake');

      setTimeout(() => {
        btnNo.classList.remove('wrong-shake');
        btnNo.innerHTML = "Wait, YES! 🥰";
        btnYes.classList.add('autocorrect-glow');
        btnYes.style.transform = "scale(1.2)";
        window.sfx.sparkle();
        markAnswered(q, q.autocorrectMsg, true);
      }, 350);
    });

    btnYes.addEventListener('click', () => {
      btnYes.classList.add('autocorrect-glow');
      markAnswered(q, q.feedback);
    });

    area.appendChild(btnYes);
    area.appendChild(btnNo);
    dom.questionBody.appendChild(area);
  }

  /* -------------------------------------------------------------------------
   * Q10: Scratch Card (She scratches herself, reveals secret)
   * ---------------------------------------------------------------------- */
  function renderScratchCard(q) {
    const wrap = document.createElement('div');
    wrap.className = 'scratch-card-wrapper';

    const cardWidth = Math.min(360, Math.max(270, window.innerWidth - 64));
    const cardHeight = 160;

    wrap.innerHTML = `
      <div class="scratch-canvas-container" id="scratchContainer" style="width: ${cardWidth}px; height: ${cardHeight}px;">
        <div class="scratch-secret-content">
          <span class="secret-grade-pill">${q.secretGrade}</span>
          <p class="secret-message-txt">${q.secretMessage}</p>
        </div>
        <canvas id="scratchCanvas" width="${cardWidth}" height="${cardHeight}"></canvas>
      </div>
      <div class="scratch-progress-meter" id="scratchMeter">Scratch to reveal secret message (0% cleared)</div>
    `;

    dom.questionBody.appendChild(wrap);

    const canvas = wrap.querySelector('#scratchCanvas');
    const ctx = canvas.getContext('2d');
    const meter = wrap.querySelector('#scratchMeter');

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#FFB7CE');
    grad.addColorStop(0.5, '#FFE4EC');
    grad.addColorStop(1, '#FF85A2');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#C2185B';
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('💖 SCRATCH HERE TO DECRYPT 💖', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;
    let clearedCount = 0;

    function scratch(e) {
      if (!isDrawing) return;
      if (e.cancelable) e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      clearedCount++;
      if (clearedCount % 8 === 0) {
        window.sfx.pop();
        checkClearedRatio();
      }
    }

    function checkClearedRatio() {
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        let transparent = 0;
        for (let i = 3; i < data.length; i += 16) {
          if (data[i] === 0) transparent++;
        }
        const pct = Math.round((transparent / (data.length / 16)) * 100);
        meter.textContent = `Scratch progress: ${pct}% cleared`;

        if (pct >= 30 && !state.answers[q.id]) {
          canvas.style.transition = 'opacity 0.6s ease';
          canvas.style.opacity = '0';
          meter.textContent = '🎉 SECRET REVEALED 100%! EXCELLENT JOB SHREE!';
          markAnswered(q, q.feedback);
        }
      } catch (err) {
        markAnswered(q, q.feedback);
      }
    }

    canvas.addEventListener('mousedown', () => { isDrawing = true; });
    window.addEventListener('mouseup', () => { isDrawing = false; });
    canvas.addEventListener('mousemove', scratch);

    canvas.addEventListener('touchstart', (e) => {
      isDrawing = true;
      scratch(e);
    }, { passive: false });
    window.addEventListener('touchend', () => { isDrawing = false; });
    canvas.addEventListener('touchmove', scratch, { passive: false });
  }

  /* -------------------------------------------------------------------------
   * Q11: Energy Capacitor (She clicks to charge)
   * ---------------------------------------------------------------------- */
  function renderCapacitor(q) {
    const wrap = document.createElement('div');
    wrap.className = 'capacitor-wrap';

    wrap.innerHTML = `
      <div class="capacitor-meter-bar">
        <div class="capacitor-fill" id="capFill"></div>
      </div>
      <div style="margin-bottom: 16px; font-weight: 800; font-size: 1.1rem; color: var(--rose-dark);" id="capPct">0% Charged</div>
      <button class="reactor-clicker-btn" id="capBtn">
        <span class="reactor-icon">💖</span>
        <span class="reactor-label">BOOST</span>
      </button>
    `;

    dom.questionBody.appendChild(wrap);

    const fill = wrap.querySelector('#capFill');
    const pct = wrap.querySelector('#capPct');
    const btn = wrap.querySelector('#capBtn');

    state.capacitorClicks = 0;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      state.capacitorClicks++;
      window.sfx.pop();

      const progress = Math.min(100, Math.round((state.capacitorClicks / q.targetClicks) * 100));
      fill.style.width = `${progress}%`;
      pct.textContent = `${progress}% Charged`;

      const rect = btn.getBoundingClientRect();
      confettiEngine.burst(rect.left + rect.width / 2, rect.top, 6);

      if (state.capacitorClicks >= q.targetClicks) {
        pct.textContent = '⚡ OVERLOAD: 9999% CUTENESS DETECTED! ⚡';
        pct.style.color = '#E03572';
        fill.style.width = '100%';
        btn.disabled = true;
        btn.style.opacity = '0.6';
        markAnswered(q, q.feedback);
      }
    });
  }

  /* -------------------------------------------------------------------------
   * Q13: Drag Rank / Tap to Rank
   * ---------------------------------------------------------------------- */
  function renderDragRank(q) {
    const wrap = document.createElement('div');
    wrap.className = 'drag-list-wrap';

    const cardElements = [];

    q.items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'rank-item-card';
      cardElements.push(card);

      card.innerHTML = `
        <div class="rank-left">
          <span>${item.icon}</span>
          <span>${item.text}</span>
        </div>
        <span class="rank-badge-tag" style="background: #E8E8E8; color: #555;">Tap to Rank</span>
      `;

      card.addEventListener('click', () => {
        window.sfx.sparkle();
        cardElements.forEach(c => {
          const tag = c.querySelector('.rank-badge-tag');
          tag.style.background = 'var(--accent-gold)';
          tag.style.color = '#5D3B00';
          tag.textContent = '👑 #1 TIED';
          c.classList.add('autocorrect-glow');
        });
        markAnswered(q, q.feedback);
      });

      wrap.appendChild(card);
    });

    const lockBtn = document.createElement('button');
    lockBtn.className = 'btn-action-submit';
    lockBtn.textContent = 'Lock In All Rankings ➜';
    lockBtn.style.alignSelf = 'center';
    lockBtn.addEventListener('click', () => {
      cardElements[0].click();
    });

    wrap.appendChild(lockBtn);
    dom.questionBody.appendChild(wrap);
  }

  /* -------------------------------------------------------------------------
   * Q14: Speed Verdict Reflex Check (Clicking Wrong Autocorrects to Right)
   * ---------------------------------------------------------------------- */
  function renderSpeedVerdict(q) {
    const area = document.createElement('div');
    area.className = 'binary-actions-area';

    const btnRight = document.createElement('button');
    btnRight.className = 'btn-yes-huge';
    btnRight.innerHTML = q.optRight;

    const btnWrong = document.createElement('button');
    btnWrong.className = 'btn-no-runaway';
    btnWrong.innerHTML = q.optWrong;

    btnWrong.addEventListener('click', (e) => {
      e.preventDefault();
      window.sfx.boing();
      btnWrong.classList.add('wrong-shake');

      setTimeout(() => {
        btnWrong.classList.remove('wrong-shake');
        btnWrong.innerHTML = "NEVER! 🙅‍♀️";
        btnRight.classList.add('autocorrect-glow');
        window.sfx.sparkle();
        markAnswered(q, q.autocorrectMsg, true);
      }, 350);
    });

    btnRight.addEventListener('click', () => {
      btnRight.classList.add('autocorrect-glow');
      markAnswered(q, q.feedback);
    });

    area.appendChild(btnRight);
    area.appendChild(btnWrong);
    dom.questionBody.appendChild(area);
  }

  /* -------------------------------------------------------------------------
   * Q15: The Final Vow (Clicking No Autocorrects to YES)
   * ---------------------------------------------------------------------- */
  function renderFinalVow(q) {
    const area = document.createElement('div');
    area.className = 'binary-actions-area';
    area.style.minHeight = '200px';

    const btnYes = document.createElement('button');
    btnYes.className = 'btn-yes-huge';
    btnYes.innerHTML = q.yesText;

    const btnNo = document.createElement('button');
    btnNo.className = 'btn-no-runaway';
    btnNo.innerHTML = q.noText;

    btnNo.addEventListener('click', (e) => {
      e.preventDefault();
      window.sfx.boing();
      btnNo.classList.add('wrong-shake');

      setTimeout(() => {
        btnNo.classList.remove('wrong-shake');
        btnNo.innerHTML = "YES! 💖 (Vetoed by Naio)";
        btnYes.classList.add('autocorrect-glow');
        btnYes.style.transform = "scale(1.05)";
        window.sfx.sparkle();
        markAnswered(q, q.autocorrectMsg, true);
      }, 400);
    });

    btnYes.addEventListener('click', () => {
      btnYes.classList.add('autocorrect-glow');
      markAnswered(q, q.feedback);
      confettiEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 120);
    });

    area.appendChild(btnYes);
    area.appendChild(btnNo);
    dom.questionBody.appendChild(area);
  }

  /* -------------------------------------------------------------------------
   * Graduation Ceremony & Certificate
   * ---------------------------------------------------------------------- */
  function graduateCandidate() {
    clearInterval(state.timerInterval);
    dom.examStage.style.display = 'none';
    dom.graduationView.classList.add('active');

    window.sfx.fanfare();
    confettiEngine.burst(window.innerWidth * 0.3, window.innerHeight * 0.4, 90);
    setTimeout(() => {
      confettiEngine.burst(window.innerWidth * 0.7, window.innerHeight * 0.4, 90);
    }, 450);
    setTimeout(() => {
      confettiEngine.burst(window.innerWidth * 0.5, window.innerHeight * 0.3, 120);
    }, 900);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* -------------------------------------------------------------------------
   * Navigation Handlers
   * ---------------------------------------------------------------------- */
  function nextQuestion() {
    if (state.currentIndex === state.totalQuestions - 1) {
      graduateCandidate();
      return;
    }

    state.currentIndex++;
    renderCurrentQuestion();
    window.scrollTo({ top: dom.examStage.offsetTop - 80, behavior: 'smooth' });
  }

  function prevQuestion() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderCurrentQuestion();
      window.scrollTo({ top: dom.examStage.offsetTop - 80, behavior: 'smooth' });
    }
  }

  /* -------------------------------------------------------------------------
   * Event Listeners Setup
   * ---------------------------------------------------------------------- */
  function setupEventListeners() {
    dom.btnNext.addEventListener('click', nextQuestion);
    dom.btnPrev.addEventListener('click', prevQuestion);

    // Sound toggle
    dom.btnSoundToggle.addEventListener('click', () => {
      const enabled = window.sfx.toggle();
      dom.btnSoundToggle.innerHTML = enabled ? '🔊' : '🔇';
      dom.btnSoundToggle.title = enabled ? 'Sound Effects Enabled' : 'Sound Effects Muted';
      if (enabled) window.sfx.pop();
    });

    // Music toggle
    dom.btnMusicToggle.addEventListener('click', () => {
      musicEngine.toggle();
    });

    // Love letter modal
    const btnOpenLetter = document.getElementById('btnOpenLetter');
    const btnCloseLetter = document.getElementById('btnCloseLetter');
    if (btnOpenLetter) {
      btnOpenLetter.addEventListener('click', () => {
        dom.loveLetterModal.classList.add('open');
        window.sfx.sparkle();
      });
    }
    if (btnCloseLetter) {
      btnCloseLetter.addEventListener('click', () => {
        dom.loveLetterModal.classList.remove('open');
        window.sfx.pop();
      });
    }
    dom.loveLetterModal.addEventListener('click', (e) => {
      if (e.target === dom.loveLetterModal) {
        dom.loveLetterModal.classList.remove('open');
      }
    });


    // Retake exam
    const btnRetake = document.getElementById('btnRetake');
    if (btnRetake) {
      btnRetake.addEventListener('click', () => {
        state.currentIndex = 0;
        state.answers = {};
        state.timeStarted = Date.now();
        dom.graduationView.classList.remove('active');
        dom.examStage.style.display = 'flex';
        renderCurrentQuestion();
        startExamTimer();
      });
    }

    // Copy link / share
    const btnCopyLink = document.getElementById('btnCopyLink');
    if (btnCopyLink) {
      btnCopyLink.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          btnCopyLink.textContent = 'Link Copied! Send to Naio 💕';
          window.sfx.pop();
          setTimeout(() => {
            btnCopyLink.textContent = 'Share Result / Copy Link 💌';
          }, 2500);
        } else {
          alert("Link copied! Send it right over to Naio 💕");
        }
      });
    }
  }

  /* -------------------------------------------------------------------------
   * Initialization
   * ---------------------------------------------------------------------- */
  function init() {
    ambient.init();
    confettiEngine.resize();
    window.addEventListener('resize', () => confettiEngine.resize());

    setupEventListeners();
    startExamTimer();
    renderCurrentQuestion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
