<template>
  <div class="pub-page" :class="{ 'dark-mode': isDarkMode }">

    <nav-links />

    <!-- Page header -->
    <header class="pub-header">
      <div class="header-rule"></div>
      <h1 class="page-title">PUBLICATIONS</h1>
      <div class="header-rule"></div>
    </header>

    <!-- Filter bar -->
    <!-- <div class="filter-bar">
      <button
        v-for="tag in allTags"
        :key="tag"
        class="filter-btn"
        :class="{ active: activeFilter === tag }"
        @click="activeFilter = tag"
      >
        {{ tag }}
      </button>
    </div> -->

    <!-- Publications list -->
    <main class="pub-list">
      <transition-group name="fade-slide" tag="div" class="pub-list-inner">
        <article
          v-for="(pub, index) in filteredPublications"
          :key="pub.id"
          class="pub-entry"
          :style="{ '--i': index }"
        >
          <div class="pub-meta-col">
            <span class="pub-year">{{ pub.year }}</span>
            <span class="pub-type">{{ pub.type }}</span>
          </div>

          <div class="pub-content-col">
            <div class="pub-number">{{ String(index + 1).padStart(2, '0') }}</div>

            <h2 class="pub-title">{{ pub.title }}</h2>

            <p class="pub-authors">{{ pub.authors }}</p>

            <p v-if="pub.venue" class="pub-venue">
              <em>{{ pub.venue }}</em>
              <span v-if="pub.volume"> · Vol. {{ pub.volume }}</span>
              <span v-if="pub.pages"> · pp. {{ pub.pages }}</span>
            </p>

            <p v-if="pub.abstract" class="pub-abstract">{{ pub.abstract }}</p>

            <div class="pub-links">
              <a v-if="pub.doi" :href="pub.doi" target="_blank" class="pub-link">DOI</a>
              <a v-if="pub.pdf" :href="pub.pdf" target="_blank" class="pub-link">PDF</a>
              <a v-if="pub.preprint" :href="pub.preprint" target="_blank" class="pub-link">PREPRINT</a>
              <a v-if="pub.code" :href="pub.code" target="_blank" class="pub-link">CODE</a>
            </div>
          </div>
        </article>
      </transition-group>
    </main>

  </div>
</template>

<script>
import NavLinks from '@/components/NavLinks.vue';

export default {
  name: 'PublicationsView',
  components: { NavLinks },
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeFilter: 'ALL',
      publications: [
        {
          id: 1,
          year: 2025,
          type: 'JOURNAL',
          title: 'Across the spectrum: Acute alcohol responses in young adults with mild, moderate, and severe alcohol use disorder.',
          authors: 'Thomas, R., Didier, N., Nordgren, R., Robinson, L., Vena, A., & King, A.C.',
          venue: 'Drug and Alcohol Dependence',
          volume: '271',
          pages: null,
          abstract: null,
          doi: 'https://doi.org/10.1016/j.drugalcdep.2025.112629',
          pdf: null,
          preprint: null,
          code: null
        },
        {
          id: 2,
          year: 2024,
          type: 'JOURNAL',
          title: 'Combination treatment with varenicline and nicotine patch on smoking cessation outcomes in heavy drinkers at 26-week follow-up.',
          authors: 'Robinson, L.E., Didier, N., Thomas, R., Vena, A., & King, A.',
          venue: 'Journal of Clinical Psychopharmacology',
          volume: '44(4)',
          pages: null,
          abstract: null,
          doi: 'https://doi.org/10.1097/JCP.0000000000001864',
          pdf: null,
          preprint: null,
          code: null
        },
        {
          id: 3,
          year: 2023,
          type: 'JOURNAL',
          title: 'User experiences of an American-adapted moderated online social media platform for first-episode psychosis: Qualitative analysis.',
          authors: 'Pokowitz, E., Stiles, B., Thomas, R., Bullard, K., Ludwig, K., Gleeson, J., Perkins, D., & Penn, D.',
          venue: 'Digital Health',
          volume: '9',
          pages: null,
          abstract: null,
          doi: 'https://doi.org/10.1177/20552076231176700',
          pdf: null,
          preprint: null,
          code: null
        }
      ]
    }
  },
  computed: {
    allTags() {
      const types = [...new Set(this.publications.map(p => p.type))].sort()
      return ['ALL', ...types]
    },
    filteredPublications() {
      if (this.activeFilter === 'ALL') return this.publications
      return this.publications.filter(p => p.type === this.activeFilter)
    }
  }
}
</script>

<style scoped>
/* ── Base ── */
.pub-page {
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
  .pub-page {
    padding-left: 17rem;
  }
}

.pub-page.dark-mode {
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
.pub-header {
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

/* ── Filter bar ── */
.filter-bar {
  display: flex;
  gap: 0.5rem;
  padding: 2rem 2.5rem 0;
  max-width: 1100px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.filter-btn {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: var(--fg);
  background: transparent;
  border: 1px solid var(--entry-border);
  border-radius: 2px;
  padding: 0.45rem 1.15rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.filter-btn:hover {
  color: var(--fg);
  border-color: var(--fg);
}
.filter-btn.active {
  color: var(--bg);
  background: var(--fg);
  border-color: var(--fg);
}

/* ── Publications list ── */
.pub-list {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2.5rem 0;
}

.pub-list-inner {
  display: flex;
  flex-direction: column;
}

.pub-entry {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 2rem;
  padding: 1rem 0 2.5rem;
  border-bottom: 1px solid var(--entry-border);
  animation: entryIn 0.5s ease both;
  animation-delay: calc(var(--i) * 0.07s);
}

@keyframes entryIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Meta column ── */
.pub-meta-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
  padding-top: 0.25rem;
}

.pub-year {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.05rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: var(--fg);
}

.pub-type {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  color: var(--fg-muted);
  text-transform: uppercase;
  writing-mode: horizontal-tb;
}

/* ── Content column ── */
.pub-content-col {
  position: relative;
}

.pub-number {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 200;
  letter-spacing: 0.15em;
  color: var(--fg-muted);
  margin-bottom: 0.6rem;
}

.pub-title {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.6rem;
  font-weight: 350;
  line-height: 1.45;
  color: var(--fg);
  margin: 0 0 0.6rem 0;
}

.pub-authors {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--fg-muted);
  margin: 0 0 0.4rem 0;
}

.pub-venue {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.3rem;
  color: var(--fg-muted);
  margin: 0 0 0.8rem 0;
  font-weight: 300;
  line-height: 1.65;
}

.pub-abstract {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.3rem;
  line-height: 1.65;
  color: var(--fg-muted);
  margin: 0 0 1rem 0;
  max-width: 680px;
  font-weight: 300;
}

/* ── Links ── */
.pub-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pub-link {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  color: var(--fg);
  text-decoration: none;
  border: 1px solid var(--fg-muted);
  border-radius: 2px;
  padding: 0.3rem 0.75rem;
  transition: all 0.2s ease;
}
.pub-link:hover {
  background: var(--link-hover);
  border-color: var(--fg);
}

/* ── Transition group ── */
.fade-slide-leave-active {
  display: none;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .pub-entry {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .pub-meta-col {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
  .pub-header {
    padding: 4rem 1.5rem 0;
  }
  .pub-list {
    padding: 2rem 1.5rem 0;
  }
  .filter-bar {
    padding: 1.5rem 1.5rem 0;
  }
}
</style>
