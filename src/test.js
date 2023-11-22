<script lang="js">
import Echo from "laravel-echo"
window.io = require('socket.io-client');
// Have this in case you stop running your laravel echo server
if (typeof io !== 'undefined') {
  window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
  });
}

    export default {
        props: ['translation_id'],
        data() {
            return {
                messages: []
            }
        },

        created() {
            Echo.channel(`translation.${this.translation_id}`)
                .listen('TranslationEvent', (e) => {
                    this.messages.push(e)
                });
        }
    }
    
</script>



<template>
    <div class="alert alert-warning">
        <div v-if="messages.length < 1">
            Beginning translation...
        </div>
        <div v-else>
            <ul v-for="message in messages" class="list-group">
                <li class="list-group-item">
                    {{ message.message }}
                </li>
            </ul>
        </div>
    </div>
</template>



<style scoped></style>