<script setup lang="ts">
import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import IconNotificationsBell from "@/components/icons/IconNotificationsBell.vue";
import { TWebinarCardData } from "./WebinarCard/types";
import WebinarCard from "./WebinarCard/WebinarCard.vue";

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
</script>

<template>
  <div class="container">
    <div class="title flex no-wrap justify-between">
      <div class="flex items-end">
        <h2>UserName UserName UserName</h2>
        <span class="title_type">userType</span>
      </div>

      <div class="notifications flex items-center justify-center">
        <IconNotificationsBell :count="12" />
      </div>
    </div>
    <div class="content flex no-wrap">
      <div class="menu">
        <div class="menu__point menu__point_active">Журналы</div>
        <div class="menu__point">Заявки</div>
        <div class="menu__point">Анкеты</div>
        <div class="menu__point">Персональные данные</div>
      </div>
      <div class="table">
        <TableWrapper :items="mocks">
          <template #item="item">
            <WebinarCard :item="item" />
          </template>
        </TableWrapper>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 70px;
}

.title {
  align-items: end;

  &_type {
    color: $grey-1;
    margin: 0 0 0 24px;

    font-size: 28px;
    font-weight: 700;
    line-height: 120%;
    /* 33.6px */
  }
}

.content {
  margin-top: 52px;
}

.menu {
  width: 300px;

  &__point {
    margin-bottom: 8px;
    padding: 12px 18px;
    border-radius: 7px;
    cursor: pointer;
    color: var(--q-blue-lighter, #315194);
    font-size: 18px;
    line-height: 120%;

    &_active {
      background: var(--q-background-primary, #fff);
      color: var(--black, #313131);
      font-weight: 700;
    }
  }
}

.notifications {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: var(--q-background-primary);
  box-shadow: 0px 4px 35px 0px rgba(46, 56, 144, 0.08);
  cursor: pointer;
}

.table {
  width: 880px;
}
</style>
