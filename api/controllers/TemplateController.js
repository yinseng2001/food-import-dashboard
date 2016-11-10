/**
 * TemplateController
 *
 * @description :: Server-side logic for managing templates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `TemplateController.index()`
   */
  find: function (req, res) {
  	console.log('pages/'+req.param('id').replace(/\./g,'/'));
  	// return res.view('pages/dashboards/members/members-group');
  	return res.view('pages/'+req.param('id').replace(/\./g,'/'));
  },

};

