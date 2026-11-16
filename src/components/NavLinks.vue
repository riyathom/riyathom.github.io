<template>
  <nav class="site-nav" aria-label="Main navigation">
    <!-- Phone/tablet only: opens the full-screen menu -->
    <button
      type="button"
      class="site-nav__toggle"
      :aria-expanded="open ? 'true' : 'false'"
      aria-controls="site-nav-list"
      :aria-label="open ? 'Close menu' : 'Open menu'"
      @click="open = !open"
    >
      <svg v-if="!open" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <line x1="4" y1="7" x2="20" y2="7"/>
        <line x1="4" y1="12" x2="20" y2="12"/>
        <line x1="4" y1="17" x2="20" y2="17"/>
      </svg>
      <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <line x1="5" y1="5" x2="19" y2="19"/>
        <line x1="19" y1="5" x2="5" y2="19"/>
      </svg>
    </button>

    <div id="site-nav-list" class="site-nav__list" :class="{ 'is-open': open }">
      <q-btn
        v-for="item in navItems"
        :key="item.label"
        flat
        no-caps
        rounded
        class="site-nav__btn"
        :to="item.to"
        @click="open = false"
      >
        {{ item.label }}
      </q-btn>
    </div>
  </nav>
</template>

<script>
const NAV_ITEMS = [
  { label: 'HOME', to: '/' },
  { label: 'PUBLICATIONS', to: '/publications' },
  { label: 'PRESENTATIONS', to: '/presentations' },
  { label: 'CV', to: '/cv' },
  { label: 'RESOURCES', to: '/resources' }
];

export default {
  name: 'NavLinks',
  data() {
    return { navItems: NAV_ITEMS, open: false };
  },
  watch: {
    // Close the menu on any navigation, and stop the page scrolling behind it.
    '$route.path'() {
      this.open = false;
    },
    open(isOpen) {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
    document.body.style.overflow = '';
  },
  methods: {
    onKeydown(e) {
      if (e.key === 'Escape') this.open = false;
    }
  }
};
</script>

<style>
.site-nav__btn {
  font-family: Avenir, "Avenir Next", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #000;
  opacity: 0.85;
  transition: opacity 0.2s ease, transform 0.2s ease;
  position: relative;
  background: white;
}

.site-nav__btn:hover {
  opacity: 1;
}

body.dark-mode .site-nav__btn {
  color: #e8e8e8 !important;
  background: #1a1a1a !important;
}

/* ── Desktop: fixed side stack ── */
.site-nav__list {
  position: fixed;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
}

.site-nav__toggle {
  display: none;
}

.site-nav .site-nav__btn {
  font-size: 1rem !important;
  letter-spacing: 0.12em;
  border: none;
  border-radius: 30px;
  padding: 0.9rem 2.5rem !important;
  min-width: 220px !important;
  min-height: 50px !important;
  justify-content: flex-start;
}

.site-nav .site-nav__btn .q-btn__content {
  font-size: 1.1rem !important;
}

.site-nav .site-nav__btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 30px;
  padding: 1.5px;
  background: linear-gradient(135deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 25%,
    rgba(0, 0, 0, 0.65) 50%,
    rgba(0, 0, 0, 0.8) 75%,
    rgba(0, 0, 0, 0.95) 100%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.site-nav .site-nav__btn:hover {
  transform: translateX(5px);
  background-color: rgba(0, 0, 0, 0.03);
}

body.dark-mode .site-nav .site-nav__btn::before {
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0.5) 100%
  );
}

/* ── Phones and tablets: menu button + full-screen overlay ──
   999px matches the point where the content pages stop reserving room
   for the side nav (min-width: 1000px). */
@media (max-width: 999px) {
  .site-nav__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 1.25rem;
    top: 1.25rem;
    z-index: 300;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.35);
    background: #fff;
    color: #000;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  body.dark-mode .site-nav__toggle {
    background: #1a1a1a;
    color: #e8e8e8;
    border-color: rgba(255, 255, 255, 0.35);
  }

  .site-nav__list {
    inset: 0;
    left: 0;
    top: 0;
    transform: none;
    z-index: 200;
    align-items: center;
    justify-content: center;
    gap: 1.1rem;
    padding: 2rem 1.5rem 6rem;
    background: #fff;
    overflow-y: auto;
    overscroll-behavior: contain;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.25s ease, visibility 0.25s ease;
  }

  .site-nav__list.is-open {
    opacity: 1;
    visibility: visible;
  }

  body.dark-mode .site-nav__list {
    background: #0f0f0f;
  }

  .site-nav .site-nav__btn {
    min-width: min(280px, 80vw) !important;
  }
}
</style>
