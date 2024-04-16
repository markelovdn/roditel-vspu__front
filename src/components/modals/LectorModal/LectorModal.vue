<script setup lang="ts">
import { onMounted, ref } from "vue";

import { TWebinarsLector } from "@/api/Webinars/types";
import { useModal } from "@/hooks/useModal";
import { useWebinarsStore } from "@/stores/webinarsStore";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
const emit = defineEmits(["close"]);
const props = defineProps<{
  lectorId: number | null;
}>();

const webinarsStore = useWebinarsStore();

const data = ref<TWebinarsLector>({
  id: null,
  lectorName: "",
  lectorDescription: "",
  lectorDepartment: "",
  lectorPhoto: null,
  lectorPhotoURL: "",
});

const previewImage = ref("");
const input = ref<HTMLInputElement>();

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  data.value.lectorPhoto = file;

  if (file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", () => {
      previewImage.value = fileReader.result as string;
    });
  }
};

const editPhoto = () => {
  input.value?.click();
};

const deletePhoto = () => {
  previewImage.value = "";
  data.value.lectorPhoto = null;
};

const { closeModal } = useModal(emit, data);

const handleForm = (lectorId: number | null) => {
  if (!lectorId) {
    webinarsStore.addLector(data.value).then(() => {
      emit("close");
    });
  } else {
    webinarsStore.updateLector(lectorId, data.value).then(() => {
      emit("close");
    });
  }
};

onMounted(async () => {
  if (props.lectorId) {
    data.value = await webinarsStore.requestLectorInfo(props.lectorId);
  }
});
</script>

<template>
  <ModalWrapper header="Данные ведущего">
    <div class="photo-container">
      <input
        ref="input"
        style="display: none"
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        @change="handleFileChange" />

      <div v-if="previewImage || data.lectorPhotoURL" class="photo">
        <img :src="previewImage || data.lectorPhotoURL" class="photo" />
        <div class="caption">
          <div class="caption-icon">
            <div>
              <q-icon name="edit" size="xs" @click="editPhoto"></q-icon>
            </div>
            <div>
              <q-icon v-if="previewImage" name="delete" size="xs" @click="deletePhoto"></q-icon>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!previewImage && !data.lectorPhotoURL" class="empty-photo">
        <q-icon name="camera" size="lg" color="primary" @click="editPhoto"></q-icon>
      </div>
    </div>

    <q-input v-model="data.lectorName" class="q-mb-sm" label="ФИО ведущего" />
    <q-input v-model="data.lectorDepartment" class="q-mb-sm" label="Место работы" />
    <q-input v-model="data.lectorDescription" autogrow class="q-mb-sm" label="Регалии ведущего" />

    <div class="row no-wrap q-mt-lg">
      <q-btn label="Сохранить" class="q-btn--form" color="primary" @click="handleForm(props.lectorId)" />
      <q-btn label="Отменить" class="q-ml-sm q-btn--form" flat :ripple="false" color="grey-1" @click="closeModal()" />
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
.create-checkbox {
  align-items: flex-start;
}

.photo-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}

.photo {
  display: flex;
  border-radius: 6px;
  width: 134px;
  height: 172px;
  position: relative;
}

.empty-photo {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  width: 134px;
  height: 172px;
  position: relative;
  border: solid 1px #ccc;
}

.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0 0 6px 6px;
  opacity: 0;
  transition: opacity 0.2s;
  text-align: center;
}

.photo:hover .caption {
  opacity: 1;
}

.caption-icon {
  opacity: 1;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
