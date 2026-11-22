export function useAppController() {
  const pages = ['home', 'videos', 'projects', 'contact']
  const pageTitles = {
    home: 'Professional Profile',
    videos: 'Video Portfolio',
    projects: 'Selected Projects',
    contact: 'Contact Me'
  }
  return { pages, pageTitles }
}
