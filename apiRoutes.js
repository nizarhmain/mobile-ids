
				// Auth CRUD
				antMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/auth/**").hasRole("USER")

				// Comuni CRUD
				.antMatchers(HttpMethod.GET, "/api/comuni").permitAll()
				.antMatchers(HttpMethod.POST, "/api/comuni").hasRole("ADMIN")
				.antMatchers(HttpMethod.PUT, "/api/comuni").hasRole("ADMIN")
				.antMatchers(HttpMethod.DELETE, "/api/comuni").hasRole("ADMIN")

				// Historical CRUD
				.antMatchers(HttpMethod.GET, "api/historical/**").permitAll()
				.antMatchers(HttpMethod.POST, "api/historical/**").hasRole("ADMIN")
				.antMatchers(HttpMethod.PUT, "api/historical/**").hasRole("ADMIN")
				.antMatchers(HttpMethod.DELETE, "api/historical/**").hasRole("ADMIN")
