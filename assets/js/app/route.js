/*
* @Author: yinseng
* @Date:   2016-10-17 09:04:22
* @Last Modified by:   yinseng
* @Last Modified time: 2016-10-26 11:58:24
*/

(function (){
	namespace.routes = [{
		url: '',
		controller: 'DashboardCtrl',
		template: '/templates/dashboards.dash-app',
		reloadOnSearch: false
	},
	{
		url: 'application',
		controller: 'AppCtrl',
		template: '/templates/dashboards.dash-app-detail',
		reloadOnSearch: false
	},
	{   // SMS
		url: 'sms/sent',
		controller: 'SentCtrl',
		template: '/templates/dashboards.sms.message-sent',
		reloadOnSearch: false
	},
	{
		url: 'sms/send',
		controller: 'SendCtrl',
		template: '/templates/dashboards.sms.send-message',
		reloadOnSearch: false
	},
	{
		url: 'sms/schedule',
		controller: 'ScheduleCtrl',
		template: '/templates/dashboards.sms.schedule',
		reloadOnSearch: false
	},
	{
		url: 'sms/template',
		controller: 'TemplateCtrl',
		template: '/templates/dashboards.sms.template',
		reloadOnSearch: false
	},
	{   // members
		url: 'members',
		controller: 'MembersCtrl',
		template: '/templates/dashboards.members.members',
		reloadOnSearch: false
	},
	{
		url: 'members/group',
		controller: 'MembersGroupCtrl',
		template: '/templates/dashboards.members.members-group',
		reloadOnSearch: false
	},
	{
		url: 'help/faq',
		controller: 'AppCtrl',
		template: '/templates/dashboards.helps.faq',
		reloadOnSearch: false
	},
	{
		url: 'help/feedback',
		controller: 'AppCtrl',
		template: '/templates/dashboards.helps.feedback',
		reloadOnSearch: false
	},

	];
}());