<template>
        <template v-if="surveyDataMap">
          <Dynamic :survey-data-map="surveyDataMap" @submit="handleFormSubmit" :default-values="mapDefaultValueData" 
          :model-change="model_change" />
        </template>
</template>
<script setup>
import * as dataApi from "./api/data.js";
const surveyDataMap = ref()
const model_change = ref([
])
const mapDefaultValueData = ref({})
const loadData = async () => {
  try {
    const res = await dataApi.getSurveyById()
    // แปลง array เป็น object
    // กำหนด key เป็น group_name หรือ id ก็ได้
    const arr = res.data.data.question_groups || []
    surveyDataMap.value = arr.reduce((acc, cur) => {
      // เลือก key ที่ต้องการ
      acc[cur.group_name] = cur
      return acc
    }, {})
    console.log('surveyDataMap',surveyDataMap.value)
  } catch (error) {
    console.error(error)
  }
}
onMounted(()=>{
    loadData();
})
// 

const handleFormSubmit =async (allFormsData) => {
  try {
    console.log('ส่งทั้งหมด:', allFormsData)
    const mergedData = Object.values(allFormsData).reduce((acc, curr) => {
    return { ...acc, ...curr }
  }, {})
  console.log('mergedData:', mergedData)


  } catch (error) {
    console.error('Error saving survey data:', error)
    
  }
}
</script>