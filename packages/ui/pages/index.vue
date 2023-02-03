<template>
  <div class="flex flex-col justify-center items-center gap-8 grow md:pt-8">
    <div class="flex flex-col md:flex-row gap-4 max-w-5xl">
      <div class="flex flex-col max-w-xl justify-center">
        <img src="/logo.png" class="w-28 self-center rounded-md m-4" />
        <h1 class="text-3xl font-bold">MyGarden</h1>
        <h3 class="text-lg">Transform Your Green Thumb with this amazing Personal Plant Manager!</h3>
        <p class="pt-4 text-justify">
          Say goodbye to forgotten waterings and unhealthy plants with MyGarden. Keep your home garden thriving and beautiful with
          personalized reminders for watering and fertilizing.
        </p>
        <p class="pt-4 text-justify">
          Elevate your gardening game and become a pro plant parent. Register now for free and bring new life to your home garden.
        </p>
        <div v-if="!user" class="self-center pt-8 pb-4">
          <Button @click="naviagteToLogin">
            <div class="flex items-center gap-1">
              <Icon name="material-symbols:login" size="1.5rem" />
              <span class="text-sm font-bold uppercase whitespace-nowrap">Login</span>
            </div>
          </Button>
        </div>
      </div>
      <img src="/mobile.png" class="w-64 ml-4 rounded-md shadow-2xl self-center" />
    </div>
    <div class="flex md:flex-row gap-4 max-w-5xl flex-col-reverse">
      <img src="/desktop.png" class="md:w-[32rem] rounded-md shadow-2xl self-center" />
      <div class="flex flex-col max-w-xl justify-center">
        <Icon name="carbon:reminder" size="5rem" class="self-center m-4 text-green-500" />
        <h1 class="text-3xl font-bold">Grouped Reminders</h1>
        <h3 class="text-lg">Streamline Your Plant Care Routine with Grouped Reminders!</h3>
        <p class="pt-4 text-justify">
          Take the hassle out of keeping track of different watering and fertilizing schedules with MyGarden. Group your plants by the day
          you need to take action, making it easy to see what needs to be done and when.
        </p>
        <p class="pt-4 text-justify">
          No more missed deadlines or under-cared-for plants. Stay on top of your plant care routine with personalized reminders that work
          for you and your schedule.
        </p>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-4 max-w-5xl">
      <div class="flex flex-col max-w-xl justify-center">
        <Icon name="ic:baseline-remove-red-eye" size="5rem" class="self-center m-4 text-green-500" />
        <h1 class="text-3xl font-bold">Details in a Nutshell</h1>
        <h3 class="text-lg">Track Your Plant's Journey from Seed to Bloom!</h3>
        <p class="pt-4 text-justify">
          Get a front-row seat to the growth and development of each of your plants with MyGarden. Our detailed view allows you to upload
          pictures, keep a history of all actions taken, and see the progress of each plant in your collection.
        </p>
        <p class="pt-4 text-justify">
          Never forget when you last watered, fertilized, pruned, or repotted your plants. Keep track of all of the important milestones in
          your plant's journey and watch as they grow and flourish.
        </p>
      </div>
      <img src="/mobile_details.png" class="w-64 ml-4 rounded-md shadow-2xl self-center" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const user = $(useStrapiUser())
  const naviagteToLogin = () => {
    navigateTo('/login')
  }
</script>
