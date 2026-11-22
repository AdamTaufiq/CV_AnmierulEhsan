<template>
  <v-app>
    <v-app-bar elevation="0" color="white" class="px-3">
      <v-app-bar-title class="font-weight-bold text-secondary">Adam<span class="text-primary">Portal</span></v-app-bar-title>
      <template v-if="$vuetify.display.smAndUp">
        <v-btn v-for="page in pages" :key="page" variant="text" :color="activePage === page ? 'primary' : 'secondary'" class="text-capitalize" @click="goTo(page)">{{ pageTitles[page] }}</v-btn>
      </template>
      <v-menu v-else>
        <template #activator="{ props }"><v-btn icon="mdi-menu" v-bind="props" /></template>
        <v-list><v-list-item v-for="page in pages" :key="page" :title="pageTitles[page]" @click="goTo(page)" /></v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container v-if="activePage === 'home'" class="py-10">
        <v-row align="center" class="hero-section">
          <v-col cols="12" md="7" order="2" order-md="1">
            <v-chip color="accent" variant="tonal" class="mb-4">OPEN TO CLOUD & SOFTWARE ENGINEERING OPPORTUNITIES</v-chip>
            <h1 class="text-h2 text-md-h1 font-weight-bold text-secondary mb-4">Building reliable<br><span class="text-primary">cloud solutions.</span></h1>
            <p class="text-h6 text-medium-emphasis mb-6">{{ portfolio.summary }}</p>
            <div class="d-flex flex-wrap ga-3">
              <v-btn color="primary" size="large" prepend-icon="mdi-briefcase-outline" @click="goTo('projects')">View Projects</v-btn>
              <v-btn variant="outlined" color="secondary" size="large" prepend-icon="mdi-email-outline" @click="goTo('contact')">Contact Me</v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="5" order="1" order-md="2" class="text-center">
            <v-avatar size="280" class="profile-avatar elevation-8"><v-img :src="portfolio.profileImage" alt="Adam Ehsan profile picture" cover /></v-avatar>
          </v-col>
        </v-row>
        <v-divider class="my-12" />
        <v-row>
          <v-col v-for="strength in portfolio.strengths" :key="strength" cols="12" sm="6" md="4"><v-card class="pa-4 h-100" variant="flat" border><div class="d-flex align-center ga-3"><v-icon color="primary" icon="mdi-check-decagram-outline" /><span class="font-weight-medium">{{ strength }}</span></div></v-card></v-col>
        </v-row>
        <v-card class="mt-12 pa-6 pa-md-10 bg-secondary text-white" rounded="xl"><v-row align="center"><v-col><div class="text-overline text-accent">CAREER SNAPSHOT</div><div class="text-h4 font-weight-bold mb-2">Senior System Engineer</div><div class="text-body-1 opacity-80">Azure · APIs · Integration · Databases · DevOps · Production Support</div></v-col><v-col cols="auto"><v-btn color="accent" variant="flat" @click="goTo('contact')">Let's connect</v-btn></v-col></v-row></v-card>
      </v-container>

      <v-container v-else-if="activePage === 'videos'" class="py-10">
        <PageHeading eyebrow="WATCH & LEARN" title="Video Portfolio" subtitle="Add your YouTube video IDs in src/models/portfolio.js." />
        <v-row><v-col v-for="video in portfolio.videos" :key="video.title" cols="12" md="6"><v-card class="h-100" rounded="xl" border elevation="0"><div class="video-frame"><iframe :src="`https://www.youtube.com/embed/${video.youtubeId}`" :title="video.title" allowfullscreen /></div><v-card-item><v-card-title>{{ video.title }}</v-card-title><v-card-text>{{ video.description }}</v-card-text></v-card-item></v-card></v-col></v-row>
      </v-container>

      <v-container v-else-if="activePage === 'projects'" class="py-10">
        <PageHeading eyebrow="MY WORK" title="Selected Projects" subtitle="A selection of applications, integrations and cloud solutions." />
        <v-row><v-col v-for="project in portfolio.projects" :key="project.name" cols="12" md="6"><v-card class="project-card h-100 pa-2" rounded="xl" border elevation="0"><v-card-item><template #prepend><v-avatar color="primary" variant="tonal"><v-icon :icon="project.icon" /></v-avatar></template><v-card-title>{{ project.name }}</v-card-title><v-card-subtitle>{{ project.category }}</v-card-subtitle></v-card-item><v-card-text class="text-body-1">{{ project.description }}<div class="d-flex flex-wrap ga-2 mt-5"><v-chip v-for="tech in project.technologies" :key="tech" size="small" color="primary" variant="tonal">{{ tech }}</v-chip></div></v-card-text></v-card></v-col></v-row>
      </v-container>

      <v-container v-else class="py-10">
        <PageHeading eyebrow="GET IN TOUCH" title="Contact Me" subtitle="For opportunities, collaborations or technical discussions, please reach out." />
        <v-row><v-col cols="12" md="5"><v-card class="pa-6 bg-secondary text-white" rounded="xl"><v-icon color="accent" size="42" icon="mdi-account-circle-outline" /><div class="text-h5 font-weight-bold mt-5">{{ portfolio.name }}</div><div class="text-body-1 opacity-80 mt-1">{{ portfolio.title }}</div><v-divider class="my-6" color="grey-darken-1" /><div class="d-flex align-center ga-3 mb-4"><v-icon color="accent" icon="mdi-map-marker-outline" /><span>{{ portfolio.location }}</span></div><div class="d-flex align-center ga-3 mb-4"><v-icon color="accent" icon="mdi-email-outline" /><a class="contact-link" :href="`mailto:${portfolio.email}`">{{ portfolio.email }}</a></div><div class="d-flex align-center ga-3"><v-icon color="accent" icon="mdi-phone-outline" /><span>{{ portfolio.phone }}</span></div></v-card></v-col><v-col cols="12" md="7"><v-card class="pa-6" rounded="xl" border elevation="0"><v-form @submit.prevent="submitContact"><v-text-field v-model="contact.name" label="Your name" variant="outlined" required class="mb-2" /><v-text-field v-model="contact.email" label="Your email" type="email" variant="outlined" required class="mb-2" /><v-textarea v-model="contact.message" label="Message" variant="outlined" rows="5" required /><v-btn type="submit" color="primary" size="large" block prepend-icon="mdi-send-outline">Send Message</v-btn></v-form><v-alert v-if="sent" class="mt-4" type="success" variant="tonal">Thank you. Your email client will open with the message prepared.</v-alert></v-card></v-col></v-row>
      </v-container>
    </v-main>
    <v-footer class="bg-secondary text-center text-white py-5"><div class="w-100 text-body-2">© {{ year }} {{ portfolio.name }} · Built with VueJS + Vuetify</div></v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { portfolioModel } from './models/portfolio'
import { useAppController } from './controllers/appController'

const portfolio = portfolioModel
const { pages, pageTitles } = useAppController()
const activePage = ref('home')
const sent = ref(false)
const contact = ref({ name: '', email: '', message: '' })
const year = new Date().getFullYear()
function goTo(page) { activePage.value = page; window.scrollTo({ top: 0, behavior: 'smooth' }) }
function submitContact() {
  const subject = encodeURIComponent(`Portfolio enquiry from ${contact.value.name}`)
  const body = encodeURIComponent(`${contact.value.message}\n\nReply to: ${contact.value.email}`)
  window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`
  sent.value = true
}
</script>

<script>
export default {
  components: {
    PageHeading: { props: ['eyebrow', 'title', 'subtitle'], template: `<div class="mb-10"><div class="text-overline text-primary font-weight-bold">{{ eyebrow }}</div><h1 class="text-h3 text-md-h2 font-weight-bold text-secondary mb-3">{{ title }}</h1><p class="text-h6 text-medium-emphasis">{{ subtitle }}</p></div>` }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
:root { font-family: 'DM Sans', sans-serif; background: #f8fafc; }
body { margin: 0; background: #f8fafc; }
.hero-section { min-height: 580px; }
.profile-avatar { border: 8px solid white; background: #dbeafe; }
.video-frame { position: relative; aspect-ratio: 16/9; background: #0f172a; overflow: hidden; border-radius: 16px 16px 0 0; }
.video-frame iframe { width: 100%; height: 100%; border: 0; }
.project-card { transition: transform .2s ease, box-shadow .2s ease; }
.project-card:hover { transform: translateY(-5px); box-shadow: 0 14px 30px rgba(15,23,42,.10) !important; }
.contact-link { color: white; text-decoration: none; }
.contact-link:hover { color: #5eead4; }
</style>
