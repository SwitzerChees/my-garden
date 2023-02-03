export default defineNuxtRouteMiddleware((to) => {
  const user = $(useStrapiUser())
  // Redirect to login if not logged in
  if (!user && to.name !== 'login' && to.name !== 'privacy-policy' && to.name !== 'index') {
    useCookie('redirect', { path: '/' }).value = to.fullPath
    return navigateTo('/login')
  }
  // Redirect to home or last page if logged in and trying to access login
  if (user && to.name === 'login') {
    const cookie = useCookie('redirect', { path: '/' })
    if (cookie.value) {
      const redirect = cookie.value
      cookie.value = ''
      return navigateTo(redirect)
    }
    return navigateTo('/')
  }
})
