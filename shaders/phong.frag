#version 330

in vec3 position_in_eye_space;
in vec3 normal_in_eye_space;

out vec4 color;

uniform vec3 light_in_eye_space;
uniform vec4 Ia, Id, Is;

uniform vec4 ka, kd, ks;
uniform float s;

//layout(location = 0) in vec3 vertex;
//layout(location = 1) in vec3 normal;

void main() {
    // transform the vertex position into "eye space"
    vec3 v = normalize(position_in_eye_space);

    // unit vector from the vertex to the light
    vec3 l = normalize(light_in_eye_space - v);
    
    // unit vector from the vertex to the eye point, which is at 0,0,0 in "eye space"
    vec3 e = normalize(vec3(0, 0, 0) - v);

    // normal transformed into "eye space"
	// the normal matrix is the inverse transpose of the model view matrix
	// it handles the case when normals don't transpose correctly in a non-uniform scale
	// so we use this normal_matrix instead of the model_view_matrix
    vec3 n = normalize(normal_in_eye_space);
    
    // halfway vector
    vec3 h = normalize(e + l);
    

    // calculate color using the light intensity equation
	// break it down into different terms
	// vec really just means array -- not LITERALLY a vector

	// This is from the equation of light_intensity
	vec4 ambient = ka * Ia;
	
	//Diffuse will be 0 if there is negative light ?
	float diff_intensity = (dot(n, l) + 1) / 2;
	vec4 diffuse = kd * Id * max(dot(n, l), 0);
	
	//ks * Is * (h dot n)^s.  s is shininess.  
	vec4 specular = ks * Is * pow(max(dot(h, n), 0), s);

	color = ambient + diffuse + specular;

    // This just sets the color to some default color
	// But we want a calculated color so use the code above.
	// color = vec4(0.5, 0.3, 0.7, 1);
}
