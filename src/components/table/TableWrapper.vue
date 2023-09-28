<script setup lang="ts">
import CardTableWrapper from "./CardTableWrapper.vue";
import ListTableWrapper from "./ListTableWrapper.vue";
import CardTableWebinar from "./CardTableWebinar/CardTableWebinar.vue";
import type { Webinar } from "./CardTableWebinar/types";

const mocks: Webinar[] = [
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
</script>

<template>
  <div class="table-wrapper">
    <div class="table-wrapper__header">
      <h5>{title}</h5>
    </div>
    <div class="content">
      <CardTableWrapper :items="mocks">
        <template #item="item">
          <CardTableWebinar :item="item" />
        </template>
      </CardTableWrapper>

      <!-- <ListTableWrapper>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
    </ListTableWrapper> -->

      pagination
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  background-color: var(--background-table);
  margin-left: 110px;
  border-radius: 10px;
  box-shadow: 0px 4px 35px 0px rgba(46, 56, 144, 0.08);
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    padding: 15px 35px;
    height: 80px;
    background-color: $white;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.03));
  }
}
.content {
  padding: 20px 34px;
}
</style>
