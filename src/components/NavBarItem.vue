<template>
    <b-nav-item v-if="item.type === 'link' && item.to" :to="item.to">{{ item.label }}</b-nav-item>
    <b-nav-item v-else-if="item.type === 'link' && item.href" :href="item.href">{{ item.label }}</b-nav-item>
    <b-nav-item-dropdown v-else-if="item.type === 'dropdown'" :text="item.label">
        <template v-for="subitem of item.contents">
            <b-dropdown-item v-if="subitem.to" :to="subitem.to" :key="subitem.key">
                {{ subitem.label }}
            </b-dropdown-item>
            <b-dropdown-item v-else-if="subitem.href" :href="subitem.href" :key="subitem.key">
                {{ subitem.label }}
            </b-dropdown-item>
        </template>
    </b-nav-item-dropdown>
</template>

<script>
export default {
    props: {
        item: { type: Object, required: true },
    },
};
</script>
