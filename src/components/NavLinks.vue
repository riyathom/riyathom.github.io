<template>
  <nav class="site-nav" aria-label="Main navigation">
    <q-btn
      v-for="item in navItems"
      :key="item.label"
      flat
      no-caps
      rounded
      class="site-nav__btn"
      :to="item.to"
    >
      {{ item.label }}
    </q-btn>
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
    return { navItems: NAV_ITEMS };
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

.site-nav {
  position: fixed;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
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
</style>
