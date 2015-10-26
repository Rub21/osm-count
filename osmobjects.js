module.exports = {
	osm_objects: {
		nodes: {
			v1: 0,
			vx: 0,
			total: 0
		},
		ways: {
			v1: 0,
			vx: 0,
			total: 0
		},
		relations: {
			v1: 0,
			vx: 0,
			total: 0
		}
	},

	//by tags
	buildings: {
		v1: 0,
		vx: 0,
		total: 0
	},
	highways: {
		v1: 0,
		vx: 0,
		total: 0,
		dist_v1: 0,
		dist_vx: 0,
		dist_total: 0
	},
	obj: function() {
		return {
			user: null,
			osm_nodevx: 0,
			osm_nodev1: 0,
			osm_wayv1: 0,
			osm_wayvx: 0,
			osm_relationv1: 0,
			osm_relationvx: 0,
			changeset: []
		};
	}
}