#version 330

// CSci-4611 Assignment 5:  Art Render

// TODO: You need to calculate per-fragment shading here using a toon shading model

in vec3 position_in_eye_space;
in vec3 normal_in_eye_space;

out vec4 color;

uniform vec3 light_in_eye_space;
uniform vec4 Ia, Id, Is;

uniform vec4 ka, kd, ks;
uniform float s;

uniform sampler2D diffuse_ramp;
uniform sampler2D specular_ramp;


void main() {
    vec3 v = normalize(position_in_eye_space);

    vec3 l = normalize(light_in_eye_space - v);
    
    vec3 e = normalize(vec3(0, 0, 0) - v);
	
	vec3 n = normalize(normal_in_eye_space);
  
    vec3 h = normalize(e + l);

	vec4 ambient = ka * Ia;
	
	float diff_intensity = (0.5 * dot(n, l) + 0.5);
	vec4 tex_color_d = texture(diffuse_ramp, vec2(diff_intensity, 0));
	vec4 diffuse = kd * Id * tex_color_d;
	
	float clamp = pow(max(dot(h, n), 0), s);
	vec4 tex_color_s = texture(specular_ramp, vec2(clamp, 0));
	vec4 specular = ks * Is * tex_color_s;

	color = ambient + diffuse + specular;

}
