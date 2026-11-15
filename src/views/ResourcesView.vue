<template>
  <div class="resources-page" :class="{ 'dark-mode': isDarkMode }">

    <nav-links />

    <!-- Page header -->
    <header class="resources-header">
      <div class="header-rule"></div>
      <h1 class="page-title">RESOURCES</h1>
      <div class="header-rule"></div>
    </header>

    <!-- Resources list -->
    <main class="resources-list">
      <transition-group name="fade-slide" tag="div" class="resources-list-inner">
        <article
          v-for="(resource, index) in this.resources"
          :key="resource.id"
          class="resources-entry"
          :style="{ '--i': index }"
        >
          <div class="resources-meta-col">
          </div>

          <div class="resources-content-col">
            <h2 class="resources-title">{{ resource.title }}</h2>
            <p v-if="resource.description" class="resources-description">{{ resource.description }}</p>
            <a v-if="resource.link" :href="resource.link" target="_blank" class="resources-link">{{ resource.link }}</a>
          </div>
        </article>
      </transition-group>
    </main>

  </div>
</template>

<script>
import NavLinks from '@/components/NavLinks.vue';

export default {
  name: 'ResourcesView',
  components: { NavLinks },
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resources: [
        {
          id: 1,
          title: 'Suicide Hotline Phone Number',
          description: 'Dial 988'
        },
        {
          id: 2,
          title: 'SAMHSA (Substance Abuse and Mental Health Services Administration) National Helpline',
          description: '1-800-662-HELP (4357)'
        },
        {
          id: 3,
          title: 'Find a Treatment Facility',
          description: null,
          link: 'https://findtreatment.gov'
        }
      ]
    }
  },
  computed: {
  }
}
</script>

<style scoped>
/* ── Base ── */
.resources-page {
  --bg: #ffffff;
  --fg: #000000;
  --fg-muted: #555555;
  --fg-faint: #aaaaaa;
  --rule: #000000;
  --accent: #000000;
  --entry-border: rgba(0,0,0,0.1);
  --link-hover: rgba(0,0,0,0.06);

  min-height: 100vh;
  background: var(--bg);
  color: var(--fg);
  font-family: 'EB Garamond', Georgia, serif;
  transition: background 0.35s ease, color 0.35s ease;
  padding-bottom: 6rem;
}

/* Leave room for the fixed side nav */
@media (min-width: 1000px) {
  .resources-page {
    padding-left: 17rem;
  }
}

.resources-page.dark-mode {
  --bg: #0f0f0f;
  --fg: #e8e8e8;
  --fg-muted: #999999;
  --fg-faint: #555555;
  --rule: #e8e8e8;
  --accent: #e8e8e8;
  --entry-border: rgba(255,255,255,0.1);
  --link-hover: rgba(255,255,255,0.06);
}

/* ── Header ── */
.resources-header {
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

/* ── Resources list ── */
.resources-list {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2.5rem 0;
}

.resources-list-inner {
  display: flex;
  flex-direction: column;
}

.resources-entry {
  display: grid;
  gap: 2rem;
  padding: 1rem 0 2.5rem;
  border-bottom: 1.4px solid var(--entry-border);
  animation: entryIn 0.5s ease both;
  animation-delay: calc(var(--i) * 0.07s);
}

@keyframes entryIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Meta column ── */
.resources-meta-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
  padding-top: 0.25rem;
}

/* ── Content column ── */
.resources-content-col {
  position: relative;
  text-align: center;
}

.resources-title {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.6rem;
  font-weight: 350;
  line-height: 1.45;
  color: var(--fg);
  margin: 0 0 0.6rem 0;
}

.resources-description {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 300;
  line-height: 1.65;
  color: var(--fg-muted);
  margin: 0 auto 1rem;
  max-width: 680px;
}

/* ── Links ── */
.resources-link {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 300;
  line-height: 1.65;
  color: var(--fg-muted);
  margin: 0 0 1rem 0;
  max-width: 680px;
  text-decoration: none;
  transition: all 0.2s ease;
}
.resources-link:hover {
  background: var(--link-hover);
}

/* ── Transition group ── */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .resources-entry {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .resources-meta-col {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
  .resources-header {
    padding: 4rem 1.5rem 0;
  }
  .resources-list {
    padding: 2rem 1.5rem 0;
  }
}
</style>
