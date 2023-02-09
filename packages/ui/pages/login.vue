<template>
  <div class="flex flex-col justify-center items-center grow pt-8">
    <div class="flex flex-col w-full px-6 md:w-96 gap-8 justify-center">
      <img src="/logo.png" class="object-cover w-16 h-16 rounded-xl self-center" />
      <div class="flex justify-center">
        <img src="/google-signin-button.png" class="h-12 rounded-xl cursor-pointer" @click="googleLogin" />
      </div>
      <span v-if="isDev" class="self-center">OR</span>
      <div v-if="isDev" class="flex flex-col gap-4 rounded-lg">
        <div class="flex flex-col gap-0.5">
          <label for="name">E-Mail</label>
          <InputText id="name" v-model="email" type="text" @keyup.enter="loginStrapi" />
        </div>
        <div class="flex flex-col gap-0.5">
          <label for="botanical">Password</label>
          <InputText id="botanical" v-model="password" type="password" @keyup.enter="loginStrapi" />
        </div>
        <h3>{{ errorMessage }}</h3>
        <Button class="self-end" @click="loginStrapi">
          <div class="flex items-center gap-1">
            <Icon name="material-symbols:login" size="1.5rem" />
            <span class="text-sm font-bold uppercase whitespace-nowrap">Login</span>
          </div>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { setToken, setUser, login, getProviderAuthenticationUrl, authenticateProvider } = useStrapiAuth()
  const { getSafeAPIResponse } = useAPI()
  const route = useRoute()
  const config = useRuntimeConfig()
  const isDev = config.isDev

  const email = $ref('')
  const password = $ref('')
  let errorMessage = $ref('')

  // Google Login
  const googleLogin = () => {
    window.location = getProviderAuthenticationUrl('google') as any
  }

  const loginStrapi = async () => {
    try {
      const { ok, result } = await getSafeAPIResponse<any>(login({ identifier: email, password }))
      if (!ok) return
      setToken(result.jwt)
      setUser(result.user)
      location.reload()
    } catch (error: any) {
      if (!error?.error) return
      errorMessage = error.error.message
    }
  }

  onMounted(async () => {
    // Check for auth token from google
    if (route.query.access_token) {
      await authenticateProvider('google', route.query.access_token as string)
      location.reload()
    }
  })
</script>
