import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index";
import Lists from "../views/lists";
import setting from "../views/setting";
import markdown from "../views/markdown"
import listsDetails from "../views/listsDetails"
import basics from "./../components/set/basics"
import questions from "./../components/set/questions"
import scoreRecords from "./../components/set/scoreRecords"
import volunteers from "./../components/set/volunteers"
import checkContent from "../views/checkContent"
Vue.use(VueRouter);

const routes = [{
		path: "/",
		name: "index",
		component: Index
	},
	{
		path: "/lists",
		name: "lists",
		component: Lists
	},
	{
		path: "/setting",
		name: "setting",
		component: setting,
		children: [{
				path: "/",
				name: "basics",
				component: basics
			},
			{
				path: "/questions",
				name: "questions",
				component: questions
			},
			{
				path: "/scoreRecords",
				name: "scoreRecords",
				component: scoreRecords
			},
			{
				path: "/volunteers",
				name: "volunteers",
				component: volunteers
			}
		]
	},
	{
		path: "/markdown",
		name: "markdown",
		component: markdown
	},
	{
		path: "/lists/details",
		name: "listsDetails",
		component: listsDetails
	},
	{
		path: "/checkContent",
		name: "checkContent",
		component: checkContent
	}
];

const router = new VueRouter({
	routes
});

export default router;
