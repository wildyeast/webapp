<template>
    <div v-if="item[0]">
    <div class="header 0">
        <div class="header-image" :style="{ 'background-image': 'url(' + item[0].content.image + ')' }"></div>
        <div class="header-title">
            <h4>{{item[0].content.title}}</h4>
        </div>
    </div>
    <div class="blogFeed-detail">
        <div class="left-content">
            <span class="info-block">{{item[0].content.datetime | date }}</span>
            <a v-if="item[0].content.link.url != ''" :href="item[0].content.link.url" class="info-block"><img v-if="item[0].content.source.length != 0" class="source-img" :src="`/icons/${item[0].content.source}.png`"></a>
            <a v-if="item[0].content.voting" v-on:click="vote"><img class="medal-icon" src="~/assets/img/medal-variant-with-star.svg"></a>
        </div>
        <div class="right-content">
            <div class="teaser">
                {{item[0].content.teaser}}
            </div>
            <div>
                {{item[0].content.text}}
            </div>

        </div>
    </div>
    <div class="blogFeed-detail">
        <div v-if="item[0].content.contentBloks" v-for="i in item[0].content.contentBloks" class="right-content">
            <span v-if="i.text" class="content-text">{{i.text}}</span>
            <span v-if="i.image" class="img"><img :src="$resizeImage(i.image, '600x0')" alt=""/></span>
        </div>
    </div>
        <div class="images" v-if="item[0].content.images && item[0].content.images.length != 0">
            <image-slideshow :blok="images"></image-slideshow>
        </div>
    <div v-if="item[0].content.links && item[0].content.links.length != 0">
        <links-slideshow :blok="links"></links-slideshow>
    </div>
</div>
    <div v-else>
        <div class="header">
            <div class="header-image" :style="{ 'background-image': 'url(' + item.image + ')' }"></div>
            <div class="header-title">
                <h4>{{item.title}}</h4>
            </div>
        </div>
        <div class="blogFeed-detail">
            <div class="left-content">
                <span class="info-block">{{item.datetime | date }}</span>
                {{item}}
                <!--<a v-if="item.link.url && item.link.url != ''" :href="item.link.url" class="info-block"><img v-if="item.source.length != 0" class="source-img" :src="`/icons/${item.source}.png`"></a>-->
            </div>
            <div class="right-content">
                <div class="teaser">
                    {{item.teaser}}
                </div>
                <div>
                    {{item.text}}
                </div>

            </div>
        </div>
        <div class="blogFeed-detail">
            <div v-if="item.contentBloks" v-for="i in item.contentBloks" class="right-content">
                <span v-if="i.text" class="content-text">{{i.text}}</span>
                <span v-if="i.image" class="img"><img :src="$resizeImage(i.image, '600x0')" alt=""/></span>
            </div>
        </div>
        <div class="images" v-if="item.images && item.images.length != 0">
            <image-slideshow :blok="images"></image-slideshow>
        </div>
        <div v-if="item.links && item.links.length != 0">
            <links-slideshow :blok="links"></links-slideshow>
        </div>
    </div>
</template>

<script>
    import storyblokLivePreview from '@/mixins/storyblokLivePreview'

    export default {
        data() {
            return {
                // images: [],
                reload: null,
                loading: false,
                sources: [
                    { name: "magazin3", key: "m3", selected: false },
                    { name: "youtube", key: "yt", selected: false },
                    { name: "facebook", key: "fb", selected: false },
                    { name: "twitter", key: "tw", selected: false },
                    { name: "instagram", key: "ig", selected: false }
                ],
                news: [],
                it: []
            }
        },
        mixins: [storyblokLivePreview],
        asyncData(context) {
            let filters = {
                filter_query: {
                    component: {
                        in: "news-overview"
                    }
                }
            };
            return context.store.dispatch("findNews", filters).then(data => {
                console.log(data);
                for (let i = 0; i < data.stories.length; i++){
                    // console.log(data.stories[i].full_slug);
                }
                return { news: data.stories };
            });
        },
        created() {
            // console.log(this.$route);
            // console.log(this.$route.query);
            console.log(this.item);
        },
        methods: {
            filters() {
                const sources = this.sources
                    .filter(i => i.selected)
                    .map(i => i.key)
                    .join(",");
                const filter_query = {
                    component: { in: "news-overview" }
                };
                if (sources) {
                    filter_query["source"] = { in: sources };
                }
                console.log({ filter_query });
                return { filter_query };
            },
            vote() {
                let data = {
                    blog_entry_uuid: this.item[0].uuid
                }
                this.$store.dispatch("blogUpvoteCount", data).then((data) => {
                    console.log(data);
                    /*if(data.success) {
                    }*/
                });
            }
        },
        computed: {
            /*items() {
                console.log(this.$route.fullPath);
                console.log(this.$route.fullPath.split('=')[1])
                    this.loading = true;
                    let result = this.$store.dispatch("findNews", this.filters).then(data => {
                        this.loading = false;
                        this.news = data.stories;
                        console.log(this.news);
                    }).catch((e) => {
                        this.loading = false;
                    });
            },*/
            item(){
                for(let i = 0; i < this.news.length; i++){
                    console.log(this.news[i]);
                    if(this.news[i].uuid == this.$route.fullPath.split('=')[1]){
                        console.log(this.news[i])
                        this.it.push(this.news[i]);
                    }
                    if(this.news[i].content._uid == this.$route.fullPath.split('=')[1]){
                        console.log(this.news[i])
                        this.it.push(this.news[i]);
                    }
                }
                console.log(this.it);
              return this.it;
            },
            /*filters() {
                const sources = this.sources
                    .filter(i => i.selected)
                    .map(i => i.key)
                    .join(",");
                const filter_query = {
                    component: { in: "news-overview" }
                };
                if (sources) {
                    filter_query["source"] = { in: sources };
                }
                console.log({ filter_query });
                return { filter_query };
            },*/
            route(){
              return this.$route.fullPath;
            },
            images() {
                // console.log(this.item.content.images);
                return {
                    items: this.item[0].content.images,
                }
            },
            links() {
                return {
                    items: this.item[0].content.links,
                }
            },
            content() {
                return {
                    content: this.item[0].content.contentBloks.text,
                }
            },
            /*richtext() {
                return this.$storyapi.richTextResolver.render(this.$route.query.item.content.content);
            }*/
        },
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/styles.scss';
    .header {
        margin: 0 4%;
        height: calc(72vh - 64px);
        position: relative;
    }
    .header-image {
        height: 100%;
        background-size: cover;
        background-position: 50%;
        @include media-breakpoint-down(sm) {
            height: 65%;
            background-position: 0;
        }
    }
    .header-title{
        right: 0;
        bottom: 0;
        background-color: #fff;
        padding: 75px;
        min-width: 50%;
        @include media-breakpoint-up(sm) {
            position: absolute;
        }
        @include media-breakpoint-down(sm) {
            padding: 25px 10px;
        }
        h4{
            margin: 0;
            font-size: 3rem;
            font-family: Chakra Petch;
            font-weight: 700;
            @include media-breakpoint-down(sm) {
                font-size: 2rem;
            }
        }
    }
    .blogFeed-detail {
        color: #000;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        line-height: normal;
        margin-top: 20px;
        @include margin-page-wide();
        @include media-breakpoint-up(md) {
            margin: 0 100px;
        }
        @include media-breakpoint-down(xs) {
            margin-top: 40px;
        }
        .teaser {
            margin: 20px 40px;
        }
        .left-content {
            display: flex;
            margin-top: 40px;
            @include media-breakpoint-down(sm) {
                margin-bottom: 20px;
            }
            .info-block {
                margin: 20px;
            }
        }
        .right-content {
            flex-direction: column;
            position: relative;
            display: flex;
            align-items: flex-start;

            @include media-breakpoint-up(md) {
                margin-left: 25%;
            }
            img{
                @include media-breakpoint-down(sm) {
                    width: 100%;
                }
            }

            .teaser, .info-text {
                font-weight: normal;
                font-family: $font-primary;
                line-height: 1.8;
                font-size: 1.1rem;
                @include media-breakpoint-down(sm) {
                    line-height: 1.4;
                    font-size: 1rem;
                    margin: 0 0 20px 5%
                }
            }
            .teaser {
                font-weight: bold;
            }
            .link {
                background-color: $color-orange;
                margin: 2% 0 0 5%;
                text-transform: uppercase;
                @include media-breakpoint-up(md) {
                    margin-left: 25%;
                }
                color: #fff;
                padding: .7em .8em;
                font-weight: 800;
            }
            .content-text {
                padding: 20px 80px;
                @include media-breakpoint-down(sm) {
                    padding: 20px 20px;
                }
            }
        }
    }
    .img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        @include media-breakpoint-down(sm) {
            margin-left: 20px;
            margin-right: 20px;
        }
    }
    .images {
        margin: 40px;
        margin-bottom: 0;
    }
    .links{
        margin: 40px;
    }
    .medal-icon {
        width: 33%;
    }
</style>
