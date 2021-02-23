import Vuex from 'vuex';
import auth0 from 'auth0-js';
import {getUserFromLocalStorage, setToken, unsetToken} from '~/utils/auth';
import axios from 'axios';
import moment from 'moment';

const origin = process.client ? window.location.origin : process.env.ORIGIN;

let webAuth = new auth0.WebAuth({
    domain: 'auth.grandgarage.eu',
    clientID: 'lwqb_LrkbU8b2rHfbC05C87xqM4bSfms',
    audience: 'https://api.grandgarage.eu/',
    responseType: 'token id_token',
    redirectUri: origin + '/auth'
});
let connectorBaseUrl = "https://connector.grandgarage.eu/api"

let connector;

const version = process.env.CONNECTOR_API_URL;

const createStore = () => {
    return new Vuex.Store({
        state: {
            cacheVersion: '',
            debug: '',
            language: 'de',
            sidebar: null,
            settings: {},
            user: null,
            auth: null,
            fabman: null,
            courses: null,
            memberCourses: null,
            workshops: null,
        },
        getters: {
            getMemberCourseById: (state) => (id) => {
                return state.memberCourses.find(c => c.course_id === id);
            },
            getMemberWorkshopsById: (state) => (id) => {
                return state.workshops.find(w => w.content.workshop.uuid === id);
            },
            getPackageById: (state) => (id) => {
                return state.fabman.packages.find(p => p.id === id);
            },
            getTrainingById: (state) => (id) => {
                return state.fabman.trainings.find(t => t.id === id);
            },
            getResourceById: (state) => (id) => {
                return state.fabman.resources.find(r => r.id === id);
            }
        },
        mutations: {
            setAuth(state, auth) {
                state.auth = auth;
            },
            setUser(state, user) {
                state.user = user;
            },
            setFabman(state, data) {
                state.fabman = data;
            },
            setCourses(state, data) {
                state.courses = data;
            },
            setMemberCourses(state, data) {
                state.memberCourses = data;
            },
            setSettings(state, settings) {
                state.settings = settings;
            },
            setLanguage(state, language) {
                state.language = language;
            },
            setCacheVersion(state, version) {
                state.cacheVersion = version;
            }
        },
        actions: {
            nuxtServerInit({state}, context) {
            },
            init({state, dispatch}, context) {
                let chain = [];
                if (!state.auth) {
                    chain.push(dispatch('checkAuth'));
                } else {
                    if (!state.user) {
                        chain.push(dispatch('getUser'));
                    } else {
                        chain.push(dispatch('getData'));
                    }
                }
                return Promise.all(chain);
            },
            getRecourseLogs() {
                return connector.get('member/resourceLogs').then((r) => {
                    return r;
                }).catch((err) => {
                    this.$sentry.captureException(err);
                });
            },
            getCurrentActivities() {
                return connector.get('member/currentActivities').then((r) => {
                    return r;
                }).catch((err) => {
                    this.$sentry.captureException(err);
                });
            }, getUserMetadata() {
                return connector.get('member/metadata').then((r) => {
                    return r;
                }).catch((err) => {
                    this.$sentry.captureException(err);
                });
            }
            ,getBookedWorkshops() {
               return connector.post('member/bookedWorkshops').then((r) => {
                    return r.data;
                }).catch((err) => {
                    this.$sentry.captureException(err);
                });
            }
            ,
            voteBlog({state}, data) {
                let c = axios.create({
                    baseURL: connectorBaseUrl,
                });
                return c.post('/blog/votes/vote', data).then((r) => {
                    if (r.data.success) {
                        return r.data;
                    }
                })
            },
            getVotesByUuids({state}, data) {
                let c = axios.create({
                    baseURL: connectorBaseUrl,
                });
                return c.post('/blog/votes', data).then((r) => {
                    return r.data;
                })
            },
            getWorkshopDateMetadata({state}, data) {
                if (connector) {
                    return connector.post('/member/getWorkshopDateMetadata', data).then((r) => {
                        if (r.data) {
                            return r.data;
                        }
                    })
                } else {
                    return new Promise((resolve, reject) => {
                        throw new Error({logged_in: false});
                    })
                }

            },
            bookWorkshop({state}, data) {
                return connector.post('/member/checkoutWorkshopDate', data).then((r) => {
                    if (r.data.success) {
                        return r.data;
                    }
                })/*.catch((err) => {
          this.$sentry.captureException(err);
          console.log(err.response.data.msg);
        })*/;
            },     checkout({state}, data) {
                return connector.post('/member/checkout', data).then((r) => {
                    if (r.data.success) {
                        return r.data;
                    }
                })/*.catch((err) => {
          this.$sentry.captureException(err);
          console.log(err.response.data.msg);
        })*/;
            },
            getCredits({ state }, data) {
              console.log('GET CREDITS')
              return connector.get('/member/getCredits', data).then((r) => {
                if (r.data.success) {
                    return r.data;
                }
              })
            },
            redeemGiftCard({ state }, data) {
              return connector.post('/member/redeemGiftCard', data).then((r) => {
                if (r.data.success) {
                    return r.data;
                }
              })
            },
            getInvoices({state}) {
                return connector.get('/member/invoices').then((r) => {
                    console.log(r);
                    return r;
                })
            },
            getPDF({state}, id) {
                return connector.get('/member/invoice/' + id, {}, {
                    headers: {
                        'Content-Type': 'application/pdf'
                    }
                }).then((r) => {
                    console.log(r);
                    r.responseType = 'arraybuffer';
                    return r;
                })
            },
            getInvoiceDocument({commit, dispatch, state}, id) {
                console.log(id);
                let instance;
                if (state.auth || getUserFromLocalStorage()) {
                    // renew Token
                    return new Promise((resolve, reject) => {
                        webAuth.checkSession({}, function (err, authResult) {
                            if (err) {
                                unsetToken();
                                return reject(err);
                            }
                            if (authResult && authResult.accessToken) {
                                //set auth
                                let auth = {
                                    accessToken: authResult.accessToken,
                                }
                                setToken(authResult.accessToken);
                                commit('setAuth', auth);
                                instance = axios.create({
                                    baseURL: connectorBaseUrl + '/member/invoice/' + id,
                                    // headers: {'Authorization': `Bearer ${auth.accessToken}`, 'Content-Type' : 'application/pdf'}
                                    headers: {'Authorization': `Bearer ${auth.accessToken}`}
                                });
                                dispatch('getPDF', id);
                                resolve();
                            }
                        });
                    }).then((r) => {
                        console.log(r);
                    });
                }
            },
            saveQuiz({state}, data) {
                return connector.post('/courses/save-quiz', data).then((r) => {
                    if (r.data.success) {
                        return r.data.data;
                    }
                });
            },
            getQuiz({state}, id) {
                let params = {
                    course_id: id
                }
                return connector.get('/courses/get-quiz', {params}).then((r) => {
                    if (r.data.success) {
                        return r.data.data
                    }
                });
            },
            getBookings({state}, id) {
                return axios.get(`${origin}/.netlify/functions/getBookings\?id\=${id}`).then((r) => {
                    return r.data;
                }).catch((err) => {
                    this.$sentry.captureException(err);
                });
            },
            checkStatus({state}, id) {
                return axios.get(`${origin}/.netlify/functions/checkStatus\?id\=${id}`).then((r) => {
                    return r.data;
                }).catch((err) => {
                    this.$sentry.captureException(err);
                });
            },
            getFabman({state, commit}) {
                return axios.get(`${origin}/.netlify/functions/getFabman`).then((r) => {
                    commit('setFabman', r.data);
                }).catch((err) => {
                    this.$sentry.captureException(err);
                });
            },
            updateUser({state, commit, dispatch}, data) {
                return axios.post(`${origin}/.netlify/functions/updateUser`, data).then((r) => {
                    let patch = {profile: r.data}
                    let user = Object.assign(state.user, patch);
                    commit('setUser', user);
                }).catch((err) => {
                    this.$sentry.captureException(err);
                });
            },
            getUser({state, commit, dispatch}) {
                return axios.get(`${origin}/.netlify/functions/getUser`).then((r) => {
                    commit('setUser', r.data);
                    return dispatch('getFabman');
                }).catch((err) => {
                    this.$sentry.captureException(err);
                });
            },
            checkAuth({commit, dispatch, state}) {
                if (state.auth || getUserFromLocalStorage()) {
                    // renew Token
                    return new Promise((resolve, reject) => {
                        webAuth.checkSession({}, function (err, authResult) {
                            if (err) {
                                unsetToken();
                                return reject(err);
                            }
                            if (authResult && authResult.accessToken) {
                                //set auth
                                let auth = {
                                    accessToken: authResult.accessToken,
                                }
                                setToken(authResult.accessToken);
                                commit('setAuth', auth);
                                connector = axios.create({
                                    baseURL: connectorBaseUrl,
                                    headers: {'Authorization': `Bearer ${auth.accessToken}`}
                                });
                                dispatch('getCourses');
                                dispatch('getMemberCourses');
                                resolve();
                            }
                        });
                    }).then(() => {
                        if (!state.user) {
                            return dispatch('getUser');
                        }
                    });
                } else {
                    return new Promise((resolve, reject) => {
                        resolve(false)
                    })
                }
            },
            auth({commit}, {hash}) {
                return new Promise((resolve, reject) => {
                    webAuth.parseHash({hash}, function (err, authResult) {
                        if (err) {
                            return reject(err);
                        }

                        //set auth
                        let auth = {
                            accessToken: authResult.accessToken,
                        }
                        setToken(authResult.accessToken);
                        connector = axios.create({
                            baseURL: connectorBaseUrl,
                            headers: {'Authorization': `Bearer ${auth.accessToken}`}
                        });
                        resolve();
                    });
                });
            },
            logout({commit}) {
                commit('setAuth', null)
                unsetToken();
            },
            startCourse({commit}, context) {
                return connector.post('/courses/start-course', context).then((r) => {
                    if (r.data.success) {
                        return r.data.data;
                    }
                });
            },
            loginUser({commit}, context) {
                return new Promise((resolve, reject) => {
                    webAuth.login({
                        connection: 'Username-Password-Authentication',
                        email: context.email,
                        password: context.password,
                    }, function (err, r) {
                        if (err) reject(err);
                        resolve(r);
                    });
                });
            },
            registerUser({commit}, context) {
                return new Promise((resolve, reject) => {
                    webAuth.signup({
                        connection: 'Username-Password-Authentication',
                        email: context.email,
                        password: context.password,
                        user_metadata: context.user_metadata,
                    }, function (err, r) {
                        if (err) reject(err);
                        resolve(r);
                    });
                });
            },
            setSidebar({state}, value) {
                state.sidebar = value;
            },
            getMemberCourses({state, commit}, id) {
                if (!state.auth) return null;

                return connector.get('/courses/get-member-courses').then((r) => {
                    if (r.data.success) {
                        commit('setMemberCourses', r.data.data);
                    }
                });
            },
            getCourses({state, commit}, id) {
                if (!state.auth) return null;

                return connector.get('/courses/get-courses').then((r) => {
                    if (r.data.success) {
                        commit('setCourses', r.data.data);
                    }
                }).catch((err) => {
                    this.$sentry.captureException(err);
                });
            },
            loadTags({state}) {
                return this.$storyapi.get(`cdn/tags`, {}).then((res) => {
                    return res.data.tags;
                });
            },
            loadTeam({state}) {
                return this.$storyapi.get(`cdn/stories`, {
                    filter_query: {
                        'component': {
                            'in': 'team-member'
                        }
                    },
                    per_page: 50,
                    version: version,
                    cv: state.cacheVersion
                }).then((res) => {
                    return res.data;
                });
            },
            loadFullPage({state}, path) {
                return this.$storyapi.get(`cdn/stories${path}`, {
                    version: version,
                    cv: state.cacheVersion
                }).then((res) => {
                    return res.data;
                }).catch((err) => {
                    this.$sentry.captureException(err);
                })
            },
            loadStoryByUUid({state}, uuid) {
                return this.$storyapi.get(`cdn/stories/${uuid}`, {
                    version: version,
                    cv: state.cacheVersion,
                    find_by: 'uuid',
                    resolve_relations: 'workshop-date.workshop'
                }).then((res) => {
                    return res.data;
                }).catch((err) => {
                    this.$sentry.captureException(err);
                })
            },
            loadPage({state}, path) {
                if (!path) {
                    path = '/';
                }

                return this.$storyapi.get(`cdn/stories/${state.language}${path}`, {
                    version: version,
                    cv: state.cacheVersion
                }).then((res) => {
                    return res.data;
                }).catch((err) => {
                    this.$sentry.captureException(err);
                })
            },
            loadMachineItem({state}, slug) {
                let endpoint = `cdn/stories/${state.language}/machines/${slug}`;
                return this.$storyapi.get(endpoint, {
                    version: version,
                    cv: state.cacheVersion
                }).then((res) => {
                    return res.data;
                }).catch((res) => {
                    this.$sentry.captureException(err);
                });
            },
            loadMachineItemById({state}, id) {
                let endpoint = `cdn/stories/${state.language}/machines/${id}`;
                return this.$storyapi.get(endpoint, {
                    version: version,
                    cv: state.cacheVersion
                }).then((res) => {
                    return res.data;
                }).catch((res) => {
                     this.$sentry.captureException(res);;
                });
            },
            loadEventItem({state}, slug) {
                let endpoint = `cdn/stories/${state.language}/events/${slug}`;
                return this.$storyapi.get(endpoint, {
                    version: version,
                    cv: state.cacheVersion
                }).then((res) => {
                    return res.data;
                }).catch((res) => {
                     this.$sentry.captureException(res);;
                });
            },
            async loadWorkshopItem({state, dispatch}, slug) {
                let endpoint = `cdn/stories/${state.language}/workshops/${slug}`;
                let workshop = await this.$storyapi.get(endpoint, {
                    version: version,
                    cv: state.cacheVersion
                }).then((res) => {
                    return res.data.story;
                });
                if (!workshop) {
                    console.log('workshop not found: ', workshop);
                }
                let dates = await this.$storyapi.get(`cdn/stories`, {
                    filter_query: {
                        workshop: {
                            in: workshop.uuid
                        },
                        component: {
                            in: "workshop-date"
                        },
                        starttime: {
                            "gt-date": moment().format("YYYY-MM-DD HH:mm")
                        },
                    },
                    version: version,
                    cv: state.cacheVersion,
                    sort_by: 'content.starttime:asc'
                }).then((res) => {
                    return res.data.stories;
                });
                return {workshop, dates}
            },
            findStatusMachines({state}) {
                return this.$storyapi.get(`cdn/stories`, {
                    filter_query: {
                        'component': {
                            'in': 'machine'
                        },
                        'machine_status_items': {
                            'is': 'not_empty_array'
                        }
                    },
                    version: version,
                    cv: state.cacheVersion,
                    per_page: 150
                }).then((res) => {
                    return res.data;
                }).catch((res) => {
                     this.$sentry.captureException(res);;
                });
            },
            findMachines({state}, filters) {
                return this.$storyapi.get(`cdn/stories`, {
                    ...filters,
                    version: version,
                    cv: state.cacheVersion,
                    per_page: 150
                }).then((res) => {
                    return res.data;
                }).catch((res) => {
                     this.$sentry.captureException(res);;
                });
            },
            findEvents({state}, filters) {
                return this.$storyapi.get(`cdn/stories`, {
                    ...filters,
                    version: version,
                    cv: state.cacheVersion,
                }).then((res) => {
                    return res.data;
                }).catch((res) => {
                     this.$sentry.captureException(res);;
                });
            },
            findWorkshops({state}, filters) {
                return this.$storyapi.get(`cdn/stories`, {
                    ...filters,
                    version: version,
                    cv: state.cacheVersion,
                    resolve_relations: 'workshop',
                    sort_by: 'content.starttime:asc',
                    per_page: 100
                }).then((res) => {
                    let workshopdates = res.data.stories;
                    let workshops = {};
                    for (let w of workshopdates) {
                        let wid;
                        wid = w.content.workshop.uuid;
                        if (wid in workshops) {
                        } else {
                            workshops[wid] = Object.assign({dates: []}, w.content.workshop);
                        }
                        workshops[wid].dates.push(w);
                    }
                    return Object.values(workshops);
                }).catch((res) => {
                     this.$sentry.captureException(res);;
                });
            },
            findWorkshopDates({state}, filters) {
                return this.$storyapi.get(`cdn/stories`, {
                    ...filters,
                    version: version,
                    cv: state.cacheVersion,
                    sort_by: 'content.starttime:asc',
                    per_page: 100
                }).then((res) => {
                    return res.data.stories;
                }).catch((res) => {
                     this.$sentry.captureException(res);;
                });
            },
            loadNewsItem({state}, slug) {
                let endpoint = `cdn/stories/${state.language}/news/${slug}`;
                return this.$storyapi.get(endpoint, {
                    version: version,
                    cv: state.cacheVersion
                }).then((res) => {
                    return res.data;
                }).catch((res) => {
                     this.$sentry.captureException(res);;
                });
            },
            findNews({state}, filters) {
                return this.$storyapi.get('cdn/stories', {
                    filter_query: filters.filter_query,
                    version: version,
                    cv: state.cacheVersion,
                    starts_with: `${state.language}/news`,
                    sort_by: 'content.datetime:desc'
                }).then((res) => {
                    return res.data;
                }).catch((res) => {
                     this.$sentry.captureException(res);;
                });
            },
            loadSitemap({state, commit}) {
                return this.$storyapi.get('cdn/links', {
                    version: version,
                    cv: state.cacheVersion,
                    starts_with: state.language,
                }).then((res) => {
                    return res.data
                }).catch((res) => {
                     this.$sentry.captureException(res);;
                })
            },
            loadSettings({state, commit}, context) {
                return this.$storyapi.get(`cdn/stories/${context.language}/settings`, {
                    version: version,
                }).then((res) => {
                    commit('setSettings', res.data.story.content)
                }).catch((e) => {
                    console.log(e);
                });
            }
        }})

}

export default createStore
