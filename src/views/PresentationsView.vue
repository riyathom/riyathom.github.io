<template>
  <div class="presentation-page" :class="{ 'dark-mode': isDarkMode }">

    <nav-links />

    <!-- Page header -->
    <header class="presentation-header">
      <div class="header-rule"></div>
      <h1 class="page-title">PRESENTATIONS</h1>
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

    <!-- Presentations list -->
    <main class="presentation-list">
      <transition-group name="fade-slide" tag="div" class="presentation-list-inner">
        <article
          v-for="(pres, index) in filteredPresentations"
          :key="pres.id"
          class="presentation-entry"
          :style="{ '--i': index }"
        >
          <div class="presentation-meta-col">
            <span class="presentation-year">{{ pres.year }}</span>
            <span class="presentation-type">{{ pres.type }}</span>
            <!-- <span v-if="pres.level" class="presentation-type">{{ pres.level }}</span> -->
          </div>

          <div class="presentation-content-col">
            <div class="presentation-number">{{ String(index + 1).padStart(2, '0') }}</div>

            <h2 class="presentation-title">{{ pres.title }}</h2>

            <p class="presentation-authors">{{ pres.authors }}</p>

            <p class="presentation-venue">
              <em>{{ pres.event }}</em>
              <span v-if="pres.location"> · {{ pres.location }}</span>
              <span v-if="pres.dates"> · {{ pres.dates }}</span>
            </p>
          </div>
        </article>
      </transition-group>
    </main>

  </div>
</template>

<script>
import NavLinks from '@/components/NavLinks.vue';

export default {
  name: 'PresentationsView',
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
      presentations: [
        {
          id: 1,
          year: 2026,
          type: 'POSTER',
          level: 'INTERNATIONAL',
          title: 'Short-term reproducibility of quantitative sensory testing and its association with pain in knee osteoarthritis.',
          authors: 'Witte, G., Thomas, R., Akinlehin, A., Sartip, B., Simonian, N., Jabakhanji, R., De Brito Barroso Monteiro, J., Griffith, J., Apkarian, A., & Schnitzer, T.J.',
          event: 'Osteoarthritis Research Society International World Congress',
          location: 'West Palm Beach, Florida, United States',
          dates: 'April 23–26, 2026'
        },
        {
          id: 2,
          year: 2024,
          type: 'POSTER',
          level: null,
          title: 'Subjective responses to laboratory alcohol challenge in drinkers with varying levels of alcohol use disorder severity.',
          authors: 'Thomas, R., Vena, A., Didier, N., Nordgren, R., Robinson, L., & King, A.',
          event: 'Midwestern Psychological Association',
          location: 'Chicago, Illinois, United States',
          dates: 'April 18–20, 2024'
        },
        {
          id: 3,
          year: 2024,
          type: 'ORAL',
          level: null,
          title: 'The effect of varenicline and nicotine patch on smoking and drinking outcomes in heavy drinking smokers: Results from a 26-week follow-up.',
          authors: 'Robinson, L., Vena, A., Didier, N., Thomas, R., & King, A.',
          event: 'Midwestern Psychological Association',
          location: 'Chicago, Illinois, United States',
          dates: 'April 18–20, 2024'
        },
        {
          id: 4,
          year: 2024,
          type: 'POSTER',
          level: 'INTERNATIONAL',
          title: 'Tell your friends: Recruitment and reactivity of adolescents in virtual vaping cue research.',
          authors: 'Thomas, R., Brett, E., Fischer, A., Robinson, L., & King, A.',
          event: 'Society for Research on Nicotine & Tobacco, 30th Annual Meeting',
          location: 'Edinburgh, Scotland',
          dates: 'March 20–23, 2024'
        },
        {
          id: 5,
          year: 2024,
          type: 'ORAL',
          level: 'INTERNATIONAL',
          title: 'Combination treatment with varenicline and nicotine patch on smoking cessation outcomes in heavy drinkers at 26 week follow-up.',
          authors: 'Robinson, L., Didier, N., Brett, E., Vena, A., Thomas, R., & King, A.',
          event: 'Society for Research on Nicotine & Tobacco, 30th Annual Meeting',
          location: 'Edinburgh, Scotland',
          dates: 'March 20–23, 2024'
        },
        {
          id: 6,
          year: 2023,
          type: 'POSTER',
          level: 'NATIONAL',
          title: 'The pressure is on: Cardiovascular responses to alcohol across drinking phenotypes and age groups.',
          authors: 'Thomas, R., Didier, N., Robinson, L., & King, A.',
          event: 'Research Society on Alcohol, Annual Scientific Meeting',
          location: 'Bellevue, Washington, United States',
          dates: 'June 24–28, 2023'
        },
        {
          id: 7,
          year: 2023,
          type: 'POSTER',
          level: 'NATIONAL',
          title: 'Tolerance to the psychomotor effects of alcohol varies with age and drinking phenotype.',
          authors: 'Robinson, L., Didier, N., Thomas, R., & King, A.',
          event: 'Research Society on Alcohol, Annual Scientific Meeting',
          location: 'Bellevue, Washington, United States',
          dates: 'June 24–28, 2023'
        },
        {
          id: 8,
          year: 2022,
          type: 'POSTER',
          level: 'NATIONAL',
          title: 'Substance use to cope with posttraumatic stress disorder in the aftermath of sexual assault: Results from a multi-site prospective study of women sexual assault survivors.',
          authors: 'Thomas, R., Ma, J.J., Short, N.A., Lechner, M., Bell, K., Black, J., Buchanan, J.A., Ho, J.D., Riviello, R.J., Liberzon, I., Rauch, S.A.M., Kessler, R.C., & McLean, S.A.',
          event: 'Society of Biological Psychiatry, Annual Meeting',
          location: 'New Orleans, Louisiana, United States',
          dates: 'April 28–30, 2022'
        },
        {
          id: 9,
          year: 2021,
          type: 'POSTER',
          level: 'NATIONAL',
          title: 'Research among women sexual assault survivors presenting for emergency care is justified: Results from a multi-site, prospective observational cohort study.',
          authors: 'Burud, G.B., Short, N.A., Thomas, R., Lechner, M., Bell, K., Black, J., Buchanan, J., Reese, R., Ho, J., Reed, G., Platt, M., Riviello, R., Rossi, C., Nouhan, P., Phillips, C., Martin, S.L., Liberzon, I., Rauch, S.M., Bollen, K., Kessler, R.C., & McLean, S.A.',
          event: 'Society of Biological Psychiatry, Virtual Symposium',
          location: 'Virtual',
          dates: 'April 28 – May 1, 2021'
        },
        {
          id: 10,
          year: 2021,
          type: 'ORAL',
          level: 'NATIONAL',
          title: 'Latinas have worse mental and physical health outcomes following sexual assault, but are less likely to receive health care.',
          authors: 'Rodriguez, S., McLean, B.S., Thomas, R., Lechner, M., Bell, K., Buchanan, J., Black, J., Reese, R., Ho, J., Reed, G., Datner, E., Platt, M., Rossi, C., Martin, S.L., Liberzon, I., Rauch, S.M., Bollen, K., Kessler, R.C., Nouhan, P., & McLean, S.A.',
          event: 'Society of Biological Psychiatry, Virtual Symposium',
          location: 'Virtual',
          dates: 'April 28 – May 1, 2021'
        }
      ]
    }
  },
  computed: {
    allTags() {
      const types = [...new Set(this.presentations.map(p => p.type))].sort()
      return ['ALL', ...types]
    },
    filteredPresentations() {
      if (this.activeFilter === 'ALL') return this.presentations
      return this.presentations.filter(p => p.type === this.activeFilter)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Josefin+Sans:wght@200;300;400&display=swap');

/* ── Base ── */
.presentation-page {
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
  .presentation-page {
    padding-left: 17rem;
  }
}

.presentation-page.dark-mode {
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
.presentation-header {
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

/* ── Presentation list ── */
.presentation-list {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2.5rem 0;
}

.presentation-list-inner {
  display: flex;
  flex-direction: column;
}

.presentation-entry {
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
.presentation-meta-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
  padding-top: 0.25rem;
}

.presentation-year {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.05rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: var(--fg);
}

.presentation-type {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  color: var(--fg-muted);
  text-transform: uppercase;
  writing-mode: horizontal-tb;
}

/* ── Content column ── */
.presentation-content-col {
  position: relative;
}

.presentation-number {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 200;
  letter-spacing: 0.15em;
  color: var(--fg-muted);
  margin-bottom: 0.6rem;
}

.presentation-title {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.6rem;
  font-weight: 350;
  line-height: 1.45;
  color: var(--fg);
  margin: 0 0 0.6rem 0;
}

.presentation-authors {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--fg-muted);
  margin: 0 0 0.4rem 0;
}

.presentation-venue {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.3rem;
  color: var(--fg-muted);
  margin: 0 0 0.8rem 0;
  font-weight: 300;
  line-height: 1.65;
}

.presentation-abstract {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.3rem;
  line-height: 1.65;
  color: var(--fg-muted);
  margin: 0 0 1rem 0;
  max-width: 680px;
  font-weight: 300;
}

/* ── Links ── */
.presentation-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.presentation-link {
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
.presentation-link:hover {
  background: var(--link-hover);
  border-color: var(--fg);
}

/* ── Transition group ── */
.fade-slide-leave-active {
  display: none;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .presentation-entry {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .presentation-meta-col {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
  .presentation-header {
    padding: 4rem 1.5rem 0;
  }
  .presentation-list {
    padding: 2rem 1.5rem 0;
  }
  .filter-bar {
    padding: 1.5rem 1.5rem 0;
  }
}
</style>
