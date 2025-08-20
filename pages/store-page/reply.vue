<template>
  <div class="min-h-screen bg-zinc-100 flex flex-col">
    <LayoutsBaseHeader :title="t('ใบเตือน')" :showBack="true" />

     <section class="flex-1 max-w-lg p-4 mx-auto overflow-y-auto">
      <Form>
        <div class="px-4">
          <h1 class="text-lg font-semibold text-primary-main">
            {{ t('หัวข้อที่ไม่ผ่านเกณฑ์มาตรฐานความปลอดภัย') }}
          </h1>
          <p class="text-gray-500">{{ t('สามารถอัพโหลดรูปภาพได้เพียง 1 รูปต่อข้อ') }}</p>
        </div>

        <!-- Dynamic fields -->
        <div
          v-if="fields.length > 0"
          class="mb-2 card max-w-md px-4"
          v-for="(item, index) in fields"
          :key="index"
        >
          <div class="flex items-start space-x-3 mb-2">
            <i class="fa-solid fa-circle-xmark text-red-600 mt-1"></i>
            <div>
              <span>{{ getI18n(item.value.questions_field_name_display, locale) }}</span>
              <p>
                <span class="font-bold">{{ t('หมายเหตุ') }}:</span>
                <span>{{ getI18n(item?.value?.survey_audit_detail_note, locale) }}</span>
              </p>
            </div>
          </div>

          <div>
            <div class="flex items-start gap-2">
              <InputText
                v-model="item.value.respond_warning_note_detail"
                class="w-full mb-2 flex-1"
                :placeholder="`${t('ข้อความโน๊ต')}...`"
              />

              <FileUpload
                mode="basic"
                accept="image/*"
                @select="event => onFileSelect(event, index)"
                customUpload
                rounded
                auto
                severity="secondary"
                class="rounded-full p-button-outlined border-indigo-900"
                style="color: rgb(49 46 129);"
                outlined
                chooseLabel=""
                chooseIcon="fa-regular fa-images"
              />
            </div>

            <div
              v-if="item.value.respond_warning_detail_img?.src"
              class="flex flex-wrap gap-2 mb-3 relative"
            >
              <div class="relative">
                <Image
                  :src="item.value.respond_warning_detail_img?.src"
                  alt="Image"
                  width="50"
                  class="object-cover w-20 h-20 rounded-md shadow-md"
                  preview
                />
                <i
                  class="fa-solid fa-xmark absolute top-0 right-0 p-0.5 bg-white rounded-full shadow-md cursor-pointer hover:scale-110 hover:bg-red-300"
                  @click="removeImage(index)"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <SharedNoData v-else />


      </Form>
    </section>
     <!-- ปุ่มอยู่ด้านล่าง -->
 <div class="p-4 shadow-md">
      <Button :label="t('บันทึกการตอบกลับ')" class="w-full" rounded />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ["auth"] });
import { useFieldArray, useForm, Form } from "vee-validate";
import { useI18n } from "vue-i18n";
import { SharedNoData } from "#components";

const { t, locale } = useI18n();

// vee-validate setup
const { } = useForm();
const { push, fields } = useFieldArray("list_survey");

// --------- MOCK DATA ---------
onMounted(() => {
  const mockData = [
    {
      questions_field_name_display: { th: "ทางหนีไฟ", en: "Emergency Exit" },
      survey_audit_detail_note: { th: "ประตูถูกล็อค", en: "Door was locked" },
      respond_warning_note_detail: "",
      respond_warning_detail_img: null,
    },
    {
      questions_field_name_display: { th: "ถังดับเพลิง", en: "Fire Extinguisher" },
      survey_audit_detail_note: { th: "ไม่มีการตรวจสอบประจำเดือน", en: "No monthly check" },
      respond_warning_note_detail: "",
      respond_warning_detail_img: null,
    },
    {
      questions_field_name_display: { th: "พื้นครัว", en: "Kitchen Floor" },
      survey_audit_detail_note: { th: "พื้นไม่สะอาด", en: "Floor not clean" },
      respond_warning_note_detail: "",
      respond_warning_detail_img: null,
    },
  ];

  mockData.forEach((e) => push(e));
});

// --------- FILE SELECT ---------
const onFileSelect = (event, index) => {
  const file = event.files?.[0];
  if (!file || !fields.value[index]) return;

  fields.value[index].value.respond_warning_detail_img = {
    src: URL.createObjectURL(file),
    file,
  };
};

const removeImage = (index) => {
  if (!fields.value[index]) return;
  fields.value[index].value.respond_warning_detail_img = null;
};
</script>
