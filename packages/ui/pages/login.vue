<template>
  <div class="flex justify-center items-center grow pt-8">
    <div class="flex flex-col gap-4 max-w-xs grow bg-slate-600 p-8 rounded-lg">
      <img :src="plantUrl" class="object-cover w-16 h-16 rounded-xl self-center" />
      <div class="flex flex-col gap-0.5">
        <label for="name">Username</label>
        <InputText id="name" v-model="username" type="text" @keyup.enter="loginStrapi" />
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
</template>

<script setup lang="ts">
  const { plantUrl } = $(useDefaultImages())
  const { setToken, setUser, login } = useStrapiAuth()
  const { getSafeAPIResponse } = useAPI()

  const username = $ref('')
  const password = $ref('')
  let errorMessage = $ref('')

  const loginStrapi = async () => {
    try {
      const { ok, result } = await getSafeAPIResponse<any>(login({ identifier: username, password }))
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
