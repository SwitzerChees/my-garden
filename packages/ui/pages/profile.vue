<template>
  <div class="flex justify-center">
    <div class="flex justify-center fixed left-0 right-0 z-50 px-6 pl-4 py-4 -mt-4 md:-mt-24 bg-slate-900 md:bg-transparent">
      <div class="flex justify-center items-center w-112 md:pl-12">
        <Icon name="healthicons:ui-user-profile" size="2rem" />
        <h1 class="p-2 text-xl font-bold">Profile</h1>
      </div>
    </div>
    <div class="w-112 pt-24 md:pt-2">
      <div class="flex flex-col gap-2">
        <div class="flex justify-start">
          <Button class="p-button-text" @click="navigateBack">
            <div class="flex items-center gap-1">
              <Icon name="ic:outline-arrow-back-ios-new" size="1.2rem" />
              <span class="text-sm font-bold uppercase whitespace-nowrap">Back</span>
            </div>
          </Button>
        </div>
        <span class="font-bold text-center pt-8">Account</span>
        <div class="flex flex-col gap-0.5">
          <label for="username">Username</label>
          <InputText id="username" v-model="username" type="text" />
        </div>
        <div v-if="user?.provider === 'local'" class="flex flex-col gap-0.5">
          <label for="password">Password</label>
          <InputText id="password" v-model="password" type="password" />
        </div>
        <div class="flex justify-end pt-4">
          <Button @click="updateProfile">
            <div class="flex items-center gap-1">
              <Icon name="prime:save" size="1.5rem" />
              <span class="text-sm font-bold uppercase whitespace-nowrap">Ok</span>
            </div>
          </Button>
        </div>
        <!-- <span class="font-bold text-center pt-8">Calendar</span>
        <span class="text-center text-green-400"
          >Generate a ICS-Calendar subscription to automatically import your Reminders as Appointements into your Calendar of choice.</span
        > -->
        <span class="font-bold text-center pt-8">Logout</span>
        <div class="flex justify-center pt-4">
          <Button class="p-button-danger" @click="logoutUser">
            <div class="flex items-center gap-1">
              <Icon name="material-symbols:logout" size="1.5rem" />
              <span class="text-sm font-bold uppercase whitespace-nowrap">Logout</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const user = $(useStrapiUser())
  const { logout } = useStrapiAuth()
  const router = useRouter()

  const password = $ref('')
  let username = $ref('')

  const navigateBack = () => {
    router.back()
  }

  const updateProfile = () => {}

  const logoutUser = () => {
    logout()
    location.reload()
  }

  onMounted(() => {
    if (!user?.username) return
    username = user?.username
  })
</script>
