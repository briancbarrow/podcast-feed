// Import Vue Router
import * as VueRouter from "vue-router";

// Import the components that will show on the different routes
import PodcastInputFeed from "./components/PodcastInputFeed.vue";
import PodcastDetail from "./components/PodcastDetail.vue";

// Set up the routes
const routes = [
  { path: "/", component: PodcastInputFeed },
  { path: "/podcast/:id", component: PodcastDetail },
];

// Initialize the router
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

// Export the router
export default router;
