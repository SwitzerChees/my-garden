<template>
  <div class="flex justify-center">
    <div class="flex flex-col gap-4 max-w-xs grow">
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
  const { login } = useStrapiAuth()
  const username = $ref('')
  const password = $ref('')
  let errorMessage = $ref('')

  const loginStrapi = async () => {
    try {
      await login({ identifier: username, password })
      location.reload()
    } catch (error: any) {
      if (!error?.error) return
      errorMessage = error.error.message
    }
  }
</script>
