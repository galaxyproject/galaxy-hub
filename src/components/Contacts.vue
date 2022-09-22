<template>
    <span>
        <template v-if="contact">
            {{ contact }}
        </template>
        <template v-else-if="contacts && contacts.length > 0" v-for="(thisContact, i) of contacts">
            <a v-if="thisContact.email" :href="`mailto:${thisContact.email}`" :key="thisContact.email">
                {{ thisContact.name }}</a
            ><a v-else-if="thisContact.url" :href="thisContact.url" :key="thisContact.url"> {{ thisContact.name }}</a
            ><template v-else> {{ thisContact.name }}</template
            ><template v-if="i < contacts.length - 1">, </template>
        </template>
    </span>
</template>

<script>
export default {
    props: {
        contact: { type: String, required: false, default: "" },
        contacts: { type: Array, required: false, default: () => [] },
    },
};
</script>
