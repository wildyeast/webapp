import Vue from 'vue'
import Page from '~/components/Page.vue'
import Teaser from '~/components/Teaser.vue'
import GeneralHeader from '~/components/GeneralHeader.vue'
import AboutTeaser from '~/components/AboutTeaser.vue'
import AboutInfo from '~/components/AboutInfo.vue'
import Grid from '~/components/Grid.vue'
import Feature from '~/components/Feature.vue'
import SitemapItem from '~/components/SitemapItem.vue'
import FAQBlock from '~/components/FAQBlock.vue'
import FAQItem from '~/components/FAQItem.vue'
import DownloadItem from '~/components/DownloadItem.vue'
import LocationDescription from '~/components/LocationDescription.vue'

import Team from '~/components/Team.vue'
import TeamMember from '~/components/TeamMember.vue'
import Mainstage from '~/components/Mainstage.vue'
import Map from '~/components/Map.vue'
import MembershipGrid from '~/components/MembershipGrid.vue'
import MembershipPlan from '~/components/MembershipPlan.vue'
import CenteredText from '~/components/CenteredText.vue'
import ContactInfo from '~/components/ContactInfo.vue'
import InfoBox from '~/components/InfoBox.vue'
import NewsFeedItem from '~/components/NewsFeedItem.vue'
import WorkshopBestOf from '~/components/WorkshopBestOf.vue'
import WorkshopPreview from '~/components/WorkshopPreview.vue'
import WorkshopHeader from '~/components/WorkshopHeader.vue'
import WorkshopInfo from '~/components/WorkshopInfo.vue'
import JobTeaser from '~/components/JobTeaser.vue'
import JobList from '~/components/JobList.vue'
import JobOpening from '~/components/JobOpening.vue'

import ImageSlideshow from '~/components/ImageSlideshow.vue'
import TextImage from '~/components/TextImage.vue'

import StoryBlokLink from '~/components/StoryBlokLink.vue'
import MainNavItem from '~/components/MainNavItem.vue'
import Markdown from '~/components/Markdown.vue'

Vue.component('page', Page)
Vue.component('general-header', GeneralHeader)
Vue.component('teaser', Teaser)
Vue.component('about-teaser', AboutTeaser)
Vue.component('about-info', AboutInfo)
Vue.component('grid', Grid)
Vue.component('feature', Feature)
Vue.component('sitemap-item', SitemapItem)
Vue.component('team', Team)
Vue.component('team-member', TeamMember)
Vue.component('mainstage', Mainstage)
Vue.component('map-view', Map)
Vue.component('membership-grid', MembershipGrid)
Vue.component('membership-plan', MembershipPlan)
Vue.component('centered-text', CenteredText)
Vue.component('contact-info', ContactInfo)
Vue.component('info-box', InfoBox)
Vue.component('news-feed-item', NewsFeedItem)
Vue.component('workshop-best-of', WorkshopBestOf)
Vue.component('workshop-preview', WorkshopPreview)
Vue.component('workshop-header', WorkshopHeader)
Vue.component('workshop-info', WorkshopInfo)
Vue.component('job-teaser', JobTeaser)
Vue.component('job-list', JobList)
Vue.component('job-opening', JobOpening)

Vue.component('image-slideshow', ImageSlideshow)
Vue.component('text-image', TextImage)

Vue.component('faq-block', FAQBlock)
Vue.component('faq-item', FAQItem)
Vue.component('download-item', DownloadItem)

Vue.component('location-description', LocationDescription)

Vue.component('main-nav-item', MainNavItem)
Vue.component('sb-link', StoryBlokLink)
Vue.component('markdown', Markdown)