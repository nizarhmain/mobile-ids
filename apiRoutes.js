
				// Auth CRUD
				antMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/auth/**").hasRole("USER")

				// Comuni CRUD
				.antMatchers(HttpMethod.GET, "/api/comuni").permitAll()
				.antMatchers(HttpMethod.POST, "/api/comuni").hasRole("ADMIN")
				.antMatchers(HttpMethod.PUT, "/api/comuni").hasRole("ADMIN")
				.antMatchers(HttpMethod.DELETE, "/api/comuni").hasRole("ADMIN")

				// Historical CRUD
				.antMatchers(HttpMethod.GET, "api/poi/**").permitAll()
				.antMatchers(HttpMethod.POST, "api/poi/**").hasRole("ADMIN")
				.antMatchers(HttpMethod.PUT, "api/poi/**").hasRole("ADMIN")
				.antMatchers(HttpMethod.DELETE, "api/poi/**").hasRole("ADMIN")
