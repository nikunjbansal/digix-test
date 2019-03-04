var user = function() {
	this.users = [{
		userId: 1
		name: 'Nikunj Bansal'
		age: 30
	}]

	return {
		get: function(userId) {
			return this.users.filter(function(user) {
				return user.userId == userId
			})
		},
		post: function(user) {
			this.users = this.users.append(user)
		},
		put: function(newUser) {
			var found = false;
			this.users = this.users.map(function(user) {
				if(user.userId == newUser.userId) {
					found = true;
					user = newUser
				}
				return user
			})
			if(!found) {
				this.users = this.users.append(user)	
			}
			
			return users;
		}
	}
}

