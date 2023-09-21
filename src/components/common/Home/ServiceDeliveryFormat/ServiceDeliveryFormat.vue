<script setup lang="ts">
import ImageBackground from './ImageBackground.vue'
import BlockContainer from './BlockContainer.vue'

</script>

<template>
    <div class="container">
        <BlockContainer>
            <div class="card-1">
                <span class="card-1__number">1.</span>
                <ImageBackground />
                <img class="card-1__image" :src="'./public/img/ServiceDeliveryFormat/1.png'" alt="">
                <div class="card-1__text">
                    <h5 class="card-1__text_title">Диспетчерское консультирование по телефону</h5>
                    <div class="card-1__text_discription">Навигация к специалистам</div>
                </div>
            </div>
            <div class="card-1">
                <span class="card-1__number">2.</span>
                <ImageBackground />
                <img class="card-1__image" :src="'./public/img/ServiceDeliveryFormat/2.png'" alt="">
                <div class="card-1__text">
                    <h5 class="card-1__text_title">Диспетчерское консультирование по телефону</h5>
                    <div class="card-1__text_discription">Навигация к специалистам</div>
                </div>
            </div>
            <div class="card-1">
                <span class="card-1__number">3.</span>
                <ImageBackground />
                <img class="card-1__image" :src="'./public/img/ServiceDeliveryFormat/3.png'" alt="">
                <div class="card-1__text">
                    <h5 class="card-1__text_title">Диспетчерское консультирование по телефону</h5>
                    <div class="card-1__text_discription">Навигация к специалистам</div>
                </div>
            </div>
            <div class="card-1">
                <span class="card-1__number">4.</span>
                <ImageBackground />
                <img class="card-1__image" :src="'./public/img/ServiceDeliveryFormat/4.png'" alt="">
                <div class="card-1__text">
                    <h5 class="card-1__text_title">Диспетчерское консультирование по телефону</h5>
                    <div class="card-1__text_discription">Навигация к специалистам</div>
                </div>
            </div>
        </BlockContainer>

        <BlockContainer>
            <div class="card-2">
                <div class="card-2__title">
                    <div class="card-2__title_point"></div>
                    <h5>Очное консультирование</h5>
                </div>
                <div class="card-2__content">По адресу: г.Волгоград, проспект Ленина, 27. Ауд.01-19, 03-14а, 03-14б
                    (Волгоградский государственный социально-педагогический университет)</div>
                <div class="card-2__link">Подробнее</div>
            </div>
            <div class="card-2">
                <div class="card-2__title">
                    <div class="card-2__title_point"></div>
                    <h5>Онлайн консультирование</h5>
                </div>
                <div class="card-2__content">по телефону, видеосвязи через интернет, письменный ответ на запрос через сайт,
                    мессенджеры, электронную почту, по итогам опроса / анкетирования</div>
                <div class="card-2__link">Подробнее</div>
            </div>

        </BlockContainer>
        <div class="buttons">
            <div class="button__container"><q-btn class="button" outline style="color: #f7b70b">
                    <span class="button__label  text-primary">Записаться по
                        телефону</span>

                </q-btn></div>
            <div class="button__container"><q-btn class="button" outline style="color: #f7b70b">
                    <span class="button__label  text-primary">Задать вопрос
                        специалисту</span>
                </q-btn></div>

        </div>



    </div>
</template>

<style lang="scss" scoped>
.container {}


.card-1 {
    overflow: hidden;
    width: 100%;
    height: 362px;

    background: #F5F5F5;
    border-radius: 20px;
    border: 1px solid $light-grey;
    position: relative;

    &__number {
        position: absolute;
        top: 33px;
        left: 33px;

        color: $yellow;
        font-size: 24px;
        font-weight: 700;
    }

    &__image-background {
        position: absolute;
        right: 0px;
    }

    &__image {
        position: absolute;
        top: 0px;
        right: 0px;
    }

    &__text {
        position: absolute;
        left: 34px;
        bottom: 36px;
        text-align: bottom;
        margin-right: 34px;



        &_title {}

        &_discription {
            margin-top: 10px;
            color: $grey-1;
            font-size: 16px;
        }

    }
}

.card-2 {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 20px;
    background: #F5F5F5;
    padding: 28px 62px 28px 75px;



    &__title {
        position: relative;

        &_point {
            position: absolute;
            top: 10px;
            left: -25px;
            width: 8px;
            height: 8px;
            background-color: $grey-2;
            border-radius: 50%;
        }
    }

    &__content {
        margin-top: 16px;
        color: $grey-2;

    }

    &__link {
        width: max-content;
        margin-top: 16px;
        color: $Blue-lighter;
        cursor: pointer;
    }
}

.buttons {
    margin-top: 20px;
    display: flex;
    gap: 30px;

}

.button {
    display: flex;
    align-items: center;

    // width: 200px;
    border-radius: 10px;
    border: solid 1px #f7b70b;
    padding: 16px 30px;

    &__container {
        width: 100%;
    }

    &__label {
        font-size: 16px;
        display: flex;
        align-items: center;
        line-height: 120%;
    }
}
</style>
