<script setup lang="ts">
import { TWebinarCardData } from '@/pages/UserCabinet/WebinarCard/types';
import TableWrapper from '@/components/TableWrapper/TableWrapper.vue';
import WebinarCard from '@/pages/UserCabinet/WebinarCard/WebinarCard.vue';



const mocks: TWebinarCardData[] = [
  {
    imageUrl: "https://pm1.aminoapps.com/7593/75e7a6f06e1c74177c45394d882a9b6606bf339cr1-600-800v2_hq.jpg",
    title:
      "Развитие креативного и критического мышления как показателя функциональной грамотности у обучающихся основной школы",
    category: "Основная школа",
    lecturer: "Ястребова Гульнара Ахмедовна",
    cost: "Бесплатно",
    date: "19.11.21 c 14:00 до 15:00 (Мск)",
  },
  {
    imageUrl: "https://pm1.aminoapps.com/7593/75e7a6f06e1c74177c45394d882a9b6606bf339cr1-600-800v2_hq.jpg",
    title:
      "Развитие креативного и критического мышления как показателя функциональной грамотности у обучающихся основной школы",
    category: "Основная школа",
    lecturer: "Ястребова Гульнара Ахмедовна",
    cost: "Бесплатно",
    date: "19.11.21 c 14:00 до 15:00 (Мск)",
  },
  {
    imageUrl: "https://pm1.aminoapps.com/7593/75e7a6f06e1c74177c45394d882a9b6606bf339cr1-600-800v2_hq.jpg",
    title:
      "Развитие креативного и критического мышления как показателя функциональной грамотности у обучающихся основной школы",
    category: "Основная школа",
    lecturer: "Ястребова Гульнара Ахмедовна",
    cost: "Бесплатно",
    date: "19.11.21 c 14:00 до 15:00 (Мск)",
  },
  {
    imageUrl: "https://pm1.aminoapps.com/7593/75e7a6f06e1c74177c45394d882a9b6606bf339cr1-600-800v2_hq.jpg",
    title:
      "Развитие креативного и критического мышления как показателя функциональной грамотности у обучающихся основной школы",
    category: "Основная школа",
    lecturer: "Ястребова Гульнара Ахмедовна",
    cost: "Бесплатно",
    date: "19.11.21 c 14:00 до 15:00 (Мск)",
  },
  {
    imageUrl: "https://pm1.aminoapps.com/7593/75e7a6f06e1c74177c45394d882a9b6606bf339cr1-600-800v2_hq.jpg",
    title:
      "Развитие креативного и критического мышления как показателя функциональной грамотности у обучающихся основной школы",
    category: "Основная школа",
    lecturer: "Ястребова Гульнара Ахмедовна",
    cost: "Бесплатно",
    date: "19.11.21 c 14:00 до 15:00 (Мск)",
  },
];
const testMocks = [
  {
    imageUrl: "https://pm1.aminoapps.com/7593/75e7a6f06e1c74177c45394d882a9b6606bf339cr1-600-800v2_hq.jpg",
    title:
      "Развитие креативного и критического мышления как показателя функциональной грамотности у обучающихся основной школы",
    category: "Основная школа",
    lecturer: "Ястребова Гульнара Ахмедовна",
    cost: "Бесплатно",
    date: "19.11.21 c 14:00 до 15:00 (Мск)",
    anyThing: "123",
  },
];

</script>

<template>
  <div>
    <TableWrapper :items="mocks">
      <template #item="item">
        <WebinarCard :item="item" />
      </template>
    </TableWrapper>
  </div>
</template>

<style lang="scss" scoped></style>
