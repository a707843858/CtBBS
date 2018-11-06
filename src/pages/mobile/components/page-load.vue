<template>
    <div class="page_load" :class="{'page_load_show':$store.state.pageLoad}">
        <div class="page_load_bg">
                <div class="page_load_container">
                    <img src="/static/img/other/bottle.svg" alt="loading">
                </div>            
        </div>
    </div>
</template>

<script>
    export default {
        name:'m_page_load'
    }
</script>