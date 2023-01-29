<template>
  <div class="flex flex-col justify-center items-center grow pt-8">
    <div class="flex flex-col w-full md:w-96 gap-8 justify-center">
      <img :src="logoUrl" class="object-cover w-16 h-16 rounded-xl self-center" />
      <div class="flex justify-center">
        <Button @click="googleLogin">
          <div class="flex items-center gap-1">
            <Icon name="ion:logo-google" size="1.5rem" />
            <span class="text-sm font-bold uppercase whitespace-nowrap">Login with Google</span>
          </div>
        </Button>
      </div>
      <span class="self-center">OR</span>
      <div class="flex flex-col gap-4 rounded-lg">
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
  const { logoUrl } = $(useDefaultImages())
  const { setToken, setUser, login, getProviderAuthenticationUrl } = useStrapiAuth()
  const { getSafeAPIResponse } = useAPI()

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
</script>
