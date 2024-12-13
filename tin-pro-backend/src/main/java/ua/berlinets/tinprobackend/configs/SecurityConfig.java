package ua.berlinets.tinprobackend.configs;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import ua.berlinets.tinprobackend.enums.RoleEnum;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        authorizeHttpRequests -> authorizeHttpRequests
                                .requestMatchers("/swagger-ui.html").permitAll()
                                .requestMatchers("/swagger-ui/**").permitAll()
                                .requestMatchers("/v3/api-docs/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/candidate/register", "/api/auth/refresh-token", "/api/auth/recruiter/register").permitAll()
                                .requestMatchers("/api/users", "/api/users/**").hasAnyAuthority(RoleEnum.RECRUITER.name(), RoleEnum.ADMIN.name(), RoleEnum.CANDIDATE.name())
                                .requestMatchers(HttpMethod.GET, "/api/candidates/p/**").permitAll()
                                .requestMatchers("/api/candidates", "/api/candidates/**").hasAnyAuthority(RoleEnum.RECRUITER.name(), RoleEnum.ADMIN.name(), RoleEnum.CANDIDATE.name())
                                .requestMatchers("/api/admin", "/api/admin/**").hasAnyRole(RoleEnum.ADMIN.name())
                                .requestMatchers("/", "/error").permitAll()
                                .anyRequest()
                                .authenticated()
                )
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    configuration.setAllowedOrigins(List.of("*"));
                    configuration.setAllowedMethods(List.of("*"));
                    configuration.setAllowedHeaders(List.of("*"));
                    return configuration;
                }))
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
