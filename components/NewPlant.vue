<template>
  <Dialog v-model:visible="dialogOpen" :dismissable-mask="true" :modal="true">
    <template #header>
      <div class="flex gap-2">
        <Icon name="material-symbols:potted-plant-sharp" size="1.5rem" />
        <h2>New Plant</h2>
      </div>
    </template>
    <div class="flex flex-col gap-2 px-2">
      <div class="flex flex-col gap-0.5">
        <label for="name">Name</label>
        <InputText id="name" type="text" v-model="name" autofocus @keyup.enter="addPlant" />
      </div>
      <div class="flex flex-col gap-0.5">
        <label for="botanical">Botanical Name</label>
        <InputText id="botanical" type="text" v-model="botanicalName" @keyup.enter="addPlant" />
      </div>
    </div>
    <template #footer>
      <Button @click="addPlant">
        <div class="flex items-center gap-1">
          <Icon name="prime:save" size="1.5rem" />
          <span class="font-bold text-sm whitespace-nowrap uppercase">Ok</span>
        </div>
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useNewPlantStore } from '~~/stores/newplant'

let { dialogOpen, name, botanicalName } = $(useNewPlantStore())

const addPlant = async () => {
  try {
    const { data } = await axios.post('/api/plant', {
      name,
      botanicalName,
    })
    name = ''
    botanicalName = ''
    dialogOpen = false
  } catch (error) {}
}
</script>
