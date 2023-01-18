<template>
  <Dialog v-model:visible="displayBasic" :dismissable-mask="true" :modal="true">
    <template #header>
      <div class="flex gap-2">
        <Icon name="material-symbols:potted-plant-sharp" size="1.5rem" />
        <h2>New Plant</h2>
      </div>
    </template>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <label for="name">Name</label>
        <InputText id="name" type="text" />
      </div>
      <div class="flex flex-col">
        <label for="botanical">Botanical Name</label>
        <InputText id="botanical" type="text" />
      </div>
    </div>
    <template #footer>
      <Button>
        <div class="flex items-center gap-1">
          <Icon name="material-symbols:add" size="1.5rem" />
          <span class="font-bold text-sm whitespace-nowrap">Add</span>
        </div>
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
const displayBasic = $ref(true)
</script>
