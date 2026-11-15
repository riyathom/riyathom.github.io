<template>
  <div class="cv-page" :class="{ 'dark-mode': isDarkMode }">

    <nav-links />

    <!-- Page header -->
    <header class="cv-header">
      <div class="header-rule"></div>
      <h1 class="page-title">CURRICULUM VITAE</h1>
      <div class="header-rule"></div>
    </header>

    <!-- Embedded viewer -->
    <main class="cv-viewer">
      <iframe
        :src="pdfUrl + '#view=FitH'"
        title="Riya Thomas CV"
        class="cv-frame"
      ></iframe>
    </main>

  </div>
</template>

<script>
import NavLinks from '@/components/NavLinks.vue';

export default {
  name: 'CVView',
  components: { NavLinks },
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pdfUrl: process.env.BASE_URL + 'cv.pdf'
    };
  }
};
</script>

<style scoped>
/* ── Base ── */
.cv-page {
  --bg: #ffffff;
  --fg: #000000;
  --fg-muted: #555555;
  --rule: #000000;
  --btn-border: rgba(0, 0, 0, 0.35);
  --btn-hover: rgba(0, 0, 0, 0.06);

  min-height: 100vh;
  background: var(--bg);
  color: var(--fg);
  font-family: 'EB Garamond', Georgia, serif;
  transition: background 0.35s ease, color 0.35s ease;
  padding-bottom: 4rem;
}

/* Leave room for the fixed side nav */
@media (min-width: 1000px) {
  .cv-page {
    padding-left: 17rem;
  }
}

.cv-page.dark-mode {
  --bg: #0f0f0f;
  --fg: #e8e8e8;
  --fg-muted: #999999;
  --rule: #e8e8e8;
  --btn-border: rgba(255, 255, 255, 0.35);
  --btn-hover: rgba(255, 255, 255, 0.08);
}

/* ── Header ── */
.cv-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 5rem 2.5rem 0;
  max-width: 1100px;
  margin: 0 auto;
}

.header-rule {
  flex: 1;
  height: 1px;
  background: var(--rule);
  opacity: 0.25;
}

.page-title {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 2rem;
  font-weight: 390;
  letter-spacing: 0.35em;
  color: var(--fg);
  margin: 0;
  white-space: nowrap;
}

/* ── Viewer ── */
.cv-viewer {
  max-width: 1100px;
  margin: 2.5rem auto 0;
  padding: 0 2.5rem;
}

.cv-frame {
  display: block;
  width: 100%;
  height: 78vh;
  min-height: 600px;
  border: 1px solid var(--btn-border);
  border-radius: 6px;
  background: #fff;
}

/* ── Small screens: buttons only ── */
@media (max-width: 900px) {
  .cv-viewer {
    display: none;
  }
}

@media (max-width: 640px) {
  .cv-header {
    padding: 4rem 1.5rem 0;
  }
  .cv-actions {
    padding: 0 1.5rem;
  }
}
</style>
