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
    <div class="filter-bar">
      <button
        v-for="tag in allTags"
        :key="tag"
        class="filter-btn"
        :class="{ active: activeFilter === tag }"
        @click="activeFilter = tag"
      >
        {{ tag }}
      </button>
    </div>

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

            <p class="pub-venue">
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
          year: 2024,                          // * Year of publication
          type: 'JOURNAL',                     // * JOURNAL | CONFERENCE | PREPRINT | BOOK CHAPTER
          title: 'Publication Title Goes Here. Replace with the full title of your paper.',  // *
          authors: 'Thomas, R., Co-Author, A., & Co-Author, B.',  // *
          venue: 'Journal of Neuroscience',    // * Journal / conference name
          volume: '44',                        // Volume number (optional)
          pages: '1234–1250',                  // Page range (optional)
          abstract: 'A brief abstract or summary of the paper can go here. This is optional — remove the field if you prefer a cleaner look without abstracts.',
          doi: 'https://doi.org/10.xxxx',      // DOI link (optional)
          pdf: null,                           // PDF link (optional)
          preprint: null,                      // Preprint link (optional)
          code: null                           // Code/GitHub link (optional)
        },
        {
          id: 2,
          year: 2024,
          type: 'CONFERENCE',
          title: 'Another Publication Title. Replace with your actual paper title.',
          authors: 'Thomas, R., & Co-Author, C.',
          venue: 'Conference on Neural Information Processing Systems (NeurIPS)',
          volume: null,
          pages: null,
          abstract: 'Replace this placeholder abstract with the actual abstract or a short summary of your work presented at this conference.',
          doi: null,
          pdf: 'https://example.com/paper.pdf',
          preprint: 'https://arxiv.org/abs/xxxx.xxxx',
          code: 'https://github.com/username/repo'
        },
        {
          id: 3,
          year: 2023,
          type: 'JOURNAL',
          title: 'Earlier Journal Publication. Replace with your actual paper title.',
          authors: 'Thomas, R., Co-Author, D., Co-Author, E., & Senior Author, F.',
          venue: 'NeuroImage',
          volume: '280',
          pages: '119–134',
          abstract: null,
          doi: 'https://doi.org/10.xxxx',
          pdf: null,
          preprint: null,
          code: null
        },
        {
          id: 4,
          year: 2023,
          type: 'PREPRINT',
          title: 'Preprint Title. Replace with your actual preprint title.',
          authors: 'Thomas, R., & Co-Author, G.',
          venue: 'bioRxiv',
          volume: null,
          pages: null,
          abstract: 'Replace this with a brief description of your preprint. You can also leave the abstract field as null to hide this section.',
          doi: null,
          pdf: null,
          preprint: 'https://biorxiv.org/content/xxxx',
          code: null
        },
        {
          id: 5,
          year: 2022,
          type: 'JOURNAL',
          title: 'Earlier Publication Title. Replace with your actual paper title.',
          authors: 'Thomas, R., Co-Author, H., & Senior Author, I.',
          venue: 'Cerebral Cortex',
          volume: '32',
          pages: '4567–4581',
          abstract: null,
          doi: 'https://doi.org/10.xxxx',
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
  font-size: 0.85rem;
  font-weight: 300;
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
  font-size: 0.65rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  color: var(--fg-muted);
  background: transparent;
  border: 1px solid var(--entry-border);
  border-radius: 2px;
  padding: 0.35rem 0.9rem;
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
  grid-template-columns: 80px 1fr;
  gap: 2rem;
  padding: 2.5rem 0;
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
  font-size: 0.75rem;
  font-weight: 200;
  letter-spacing: 0.1em;
  color: var(--fg);
}

.pub-type {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.55rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  color: var(--fg-faint);
  text-transform: uppercase;
  writing-mode: horizontal-tb;
}

/* ── Content column ── */
.pub-content-col {
  position: relative;
}

.pub-number {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.6rem;
  font-weight: 200;
  letter-spacing: 0.15em;
  color: var(--fg-faint);
  margin-bottom: 0.6rem;
}

.pub-title {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.45;
  color: var(--fg);
  margin: 0 0 0.6rem 0;
}

.pub-authors {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--fg-muted);
  margin: 0 0 0.4rem 0;
}

.pub-venue {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 0.95rem;
  color: var(--fg-muted);
  margin: 0 0 0.8rem 0;
}

.pub-abstract {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--fg-muted);
  margin: 0 0 1rem 0;
  max-width: 680px;
}

/* ── Links ── */
.pub-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pub-link {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.6rem;
  font-weight: 300;
  letter-spacing: 0.18em;
  color: var(--fg);
  text-decoration: none;
  border: 1px solid var(--entry-border);
  border-radius: 2px;
  padding: 0.3rem 0.75rem;
  transition: all 0.2s ease;
}
.pub-link:hover {
  background: var(--link-hover);
  border-color: var(--fg);
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