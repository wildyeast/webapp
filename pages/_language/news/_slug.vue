<template>
    <div>
        <div class="header">
            <div class="header-image" :style="{ 'background-image': 'url(' +item.content.image+ ')' }"></div>
            <div class="header-title">
                <h4>{{item.content.title}}</h4>
            </div>
        </div>
        <div class="blogFeed-detail">
            <div class="left-content">
                <span class="info-block">{{item.content.datetime | date }}</span>
                <a :href="item.content.link.url" class="info-block"><img v-if="item.content.source" class="source-img" :src="`/icons/${item.content.source}.png`"></a>
            </div>
            <div class="right-content">
                <div class="teaser">
                        {{item.content.teaser}}
                 </div>
                <div>
                    {{item.content.text}}
                </div>

            </div>
        </div>
        <div class="images" v-if="item.content.images.length != 0">
            <image-slideshow :blok="images"></image-slideshow>
        </div>
        <div class="blogFeed-detail">
            <div class="left-content"></div>
            <div v-if="item.content.contentBloks" v-for="i in item.content.contentBloks" class="right-content">
                <span v-if="i.text" class="content-text">{{i.text}}</span>
                <span v-if="i.image" class="img"><img :src="$resizeImage(i.image, '700x0')" alt=""/></span>
            </div>
        </div>
        <div v-if="item.content.links.length != 0">
            <links-slideshow :blok="links"></links-slideshow>
        </div>
    </div>
</template>

<script>
    import storyblokLivePreview from '@/mixins/storyblokLivePreview'

    export default {
        props: ['blok', 'text'],
        data() {
            return {
                story: null,
                // images: [],
            }
        },
        mixins: [storyblokLivePreview],
        asyncData(context) {
            // console.log(context);
            return context.store.dispatch('loadFullPage', context.route.fullPath).catch((e) => {
                context.error({statusCode: e.response.status, message: e.response.statusText})
            });
        },
        created() {
            console.log(this.item.content.images);
        },
        computed: {
            item() {
                // console.log(this.$route.query.item);
                return this.$route.query.item;
            },
            images() {
                // console.log(this.item.content.images);
                return {
                    items: this.item.content.images,
                }
            },
            links() {
                return {
                    items: this.item.content.links,
                }
            },
            content() {
                return {
                    content: this.item.content.contentBloks.text,
                }
            },
            richtext() {
                return this.$storyapi.richTextResolver.render(this.$route.query.item.content.content);
            }
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
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: #fff;
        padding: 75px;
        min-width: 50%;
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
        @include margin-page-wide();
        @include media-breakpoint-up(md) {
            margin: 0 100px;
        }
        .teaser {
            margin: 20px 0 20px 0;
        }
        .left-content {
            margin-top: 40px;
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
                    margin: 0 0 0 5%
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
                padding: 20px 0;
            }
        }
    }
    .img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .images {
        margin: 40px;
        margin-bottom: 0;
    }
    .links{
        margin: 40px;
    }
</style>