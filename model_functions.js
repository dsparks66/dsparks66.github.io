	//Model Functions

	//calculate a
	function calculate_a(ecc, oP,aFactor) {
		star_mass = (1.989)*(10**30);	//kg
		var G = (6.673)*(10**-11);	//Nm^2/kg^2
		var T = oP*24*3576; 	//convert period from days to seconds
		//document.getElementById("check3").innerHTML = T;
		//var true_a = (orbitPeriod/365.25)**(2/3);		//multiply by quantity mass ^ 1/3, where mass is (star mass/sun mass)
		true_a = (((G*star_mass)/(4*(Math.PI**2)))*(T**2))**(1/3);
		true_a = true_a/((1.496e11));	//convert semi major axis from meters to AU
		local_a = aFactor * true_a;
		return local_a;
		//document.getElementById("semi_major_axis").innerHTML = "Semi-Major Axis: " + true_a + " AU";
	}

	function calculate_a_factor(ecc,oP) {
		star_mass = (1.989)*(10**30);	//kg
		var G = (6.673)*(10**-11);	//Nm^2/kg^2
		var T = oP*24*3576; 	//convert period from days to seconds
		//var true_a = (orbitPeriod/365.25)**(2/3);		//multiply by quantity mass ^ 1/3, where mass is (star mass/sun mass)
		true_a = (((G*star_mass)/(4*(Math.PI**2)))*(T**2))**(1/3);
		true_a = true_a/1.496e11;	//convert semi major axis from meters to AU
		aFactor = (250/true_a)/(1+Number(ecc));
		return aFactor;
	}

	function drawGraph(ecc,oP,local_a) {
		//drawing axis
			calculate_a_factor(ecc, oP);
            //account for an eccentricity < 0.1 (model will move out of frame if true)
            document.getElementById("check2").innerHTML = aFactor;
			//document.getElementById("check2").innerHTML
			if (aFactor < 62.5) {
				var x_axis_starting_point = { number: 1, suffix: '' };
				var y_axis_starting_point = { number: 1, suffix: '' };
                grid_size = aFactor;
            } else {
				var x_axis_starting_point = { number: 0.5, suffix: '' };
				var y_axis_starting_point = { number: 0.5, suffix: '' };
                grid_size = 0.5*aFactor;
            }
			//grid_size = 0.5*aFactor;
			/*if (ecc < 0.1) {
				base_canvas.width = 700;
				base_canvas.height = 700;
				canvas.width = 700;
				canvas.height = 700;
				path_canvas.width = 700;
				path_canvas.height = 700;
				path_canvas_1.width = 700;
				path_canvas_1.height = 700;
			} else {*/
				base_canvas.width = 576;
				base_canvas.height = 576;
				canvas.width = 576;
				canvas.height = 576;
				path_canvas.width = 576;
				path_canvas.height = 576;
				path_canvas_1.width = 576;
				path_canvas_1.height = 576;
			//}

			//var x_axis_starting_point = { number: 0.5, suffix: '' };
			//var y_axis_starting_point = { number: 0.5, suffix: '' };

			var canvas_width = base_canvas.width;
			var canvas_height = base_canvas.height;
			var num_lines_x = Math.floor(canvas_height/grid_size);
			var num_lines_y = Math.floor(canvas_width/grid_size);

			var x_axis_distance_grid_lines = Math.round(num_lines_x/2);
			var y_axis_distance_grid_lines = Math.round(num_lines_y/2);

			
			// Draw grid lines along X-axis
			for(var i=0; i<=num_lines_x; i++) {
				ctx_base.beginPath();
				//ctx_base.lineWidth = 1;
				if (i == 0)
					continue;
				// If line represents X-axis draw in different color
				if(i == x_axis_distance_grid_lines) 
					ctx_base.strokeStyle = "#e9e9e9";
				else
					ctx_base.strokeStyle = "#808080";
				
				if(i == num_lines_x) {
					ctx_base.moveTo(0, grid_size*i);
					ctx_base.lineTo(canvas_width, grid_size*i);
				}
				else {
					ctx_base.moveTo(0, grid_size*i+0.5);
					ctx_base.lineTo(canvas_width, grid_size*i+0.5);
				}
				ctx_base.stroke();
			}

			// Draw grid lines along Y-axis
			for(i=0; i<=num_lines_y; i++) {
				ctx_base.beginPath();
				ctx_base.lineWidth = 1;
				if (i == 0)
					continue;
				// If line represents X-axis draw in different color
				if(i == y_axis_distance_grid_lines) 
					ctx_base.strokeStyle = "#e9e9e9";
				else
					ctx_base.strokeStyle = "#808080";
				
				if(i == num_lines_y) {
					ctx_base.moveTo(grid_size*i, 0);
					ctx_base.lineTo(grid_size*i, canvas_height);
				}
				else {
					ctx_base.moveTo(grid_size*i+0.5, 0);
					ctx_base.lineTo(grid_size*i+0.5, canvas_height);
				}
				ctx_base.stroke();
			}

		ctx_base.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);
		ctx_path.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);
		ctx_path_1.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);
		
		// Ticks marks along the positive X-axis
		for(i=1; i<y_axis_distance_grid_lines; i++) {
			ctx_base.beginPath();
			ctx_base.lineWidth = 1;
			ctx_base.strokeStyle = "#808080";

			// Draw a tick mark 6px long (-3 to 3)
			ctx_base.moveTo(grid_size*i+0.5, -3);
			ctx_base.lineTo(grid_size*i+0.5, 3);
			ctx_base.stroke();

			// Text value at that point
			ctx_base.font = '9px Arial';
			ctx_base.textAlign = 'start';
			ctx_base.fillStyle = '#e9e9e9'
			ctx_base.fillText(x_axis_starting_point.number*i + x_axis_starting_point.suffix, grid_size*i-2, 15);
		}

		// Ticks marks along the negative X-axis
		for(i=1; i<y_axis_distance_grid_lines; i++) {
			ctx_base.beginPath();
			ctx_base.lineWidth = 1;
			ctx_base.strokeStyle = "#808080";

			// Draw a tick mark 6px long (-3 to 3)
			ctx_base.moveTo(-grid_size*i+0.5, -3);
			ctx_base.lineTo(-grid_size*i+0.5, 3);
			ctx_base.stroke();

			// Text value at that point
			ctx_base.font = '9px Arial';
			ctx_base.textAlign = 'end';
			ctx_base.fillStyle = '#e9e9e9'
			ctx_base.fillText(-x_axis_starting_point.number*i + x_axis_starting_point.suffix, -grid_size*i+3, 15);
		}

		// Ticks marks along the positive Y-axis
		// Positive Y-axis of graph is negative Y-axis of the canvas
		for(i=1; i<x_axis_distance_grid_lines; i++) {
			ctx_base.beginPath();
			ctx_base.lineWidth = 1;
			ctx_base.strokeStyle = "#808080";

			// Draw a tick mark 6px long (-3 to 3)
			ctx_base.moveTo(-3, grid_size*i+0.5);
			ctx_base.lineTo(3, grid_size*i+0.5);
			ctx_base.stroke();

			// Text value at that point
			ctx_base.font = '9px Arial';
			ctx_base.textAlign = 'start';
			ctx_base.fillStyle = '#e9e9e9'
			ctx_base.fillText(-y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, grid_size*i+3);
		}

		// Ticks marks along the negative Y-axis
		// Negative Y-axis of graph is positive Y-axis of the canvas
		for(i=1; i<x_axis_distance_grid_lines; i++) {
			ctx_base.beginPath();
			ctx_base.lineWidth = 1;
			ctx_base.strokeStyle = "#808080";

			// Draw a tick mark 6px long (-3 to 3)
			ctx_base.moveTo(-3, -grid_size*i+0.5);
			ctx_base.lineTo(3, -grid_size*i+0.5);
			ctx_base.stroke();

			// Text value at that point
			ctx_base.font = '9px Arial';
			ctx_base.textAlign = 'start';
			ctx_base.fillStyle = '#e9e9e9'
			ctx_base.fillText(y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, -grid_size*i+3);
		}

		//center of canvas (x_offset, y_offset)
		//var x_offset = 250; 		
		//var y_offset = 150;
		x_offset = x_axis_distance_grid_lines*grid_size;
		y_offset = y_axis_distance_grid_lines*grid_size;
	}

	function drawBody(x, y, color) {
		// Draw the face
		ctx.beginPath();
		ctx.arc(focus_x + x, focus_y + y, 4, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill()
	}

	function orbitBody() {
		
		for(i=0; i < p_num; i++) {
			
			// hide last position drawn
			ctx.clearRect( last_x[i]-6, last_y[i]-5, 10, 10);
				
			// 1) find the relative time in the orbit and convert to Radians
			var M = 2.0 * Math.PI * time/orbitPeriod[i];

			// 2) Seed with mean anomaly and solve Kepler's eqn for E
			var u = M; // seed with mean anomoly
			var u_next = 0;
			var loopCount = 0;
			// iterate until within 10-6
			while(loopCount++ < LOOP_LIMIT) {
				// this should always converge in a small number of iterations - but be paranoid
				u_next = u + (M - (u - e[i] * Math.sin(u)))/(1 - e[i] * Math.cos(u));
				if (Math.abs(u_next - u) < 1E-6)
					break;
				u = u_next;
			}
				
			// 2) eccentric anomoly is angle from center of ellipse, not focus (where centerObject is). Convert
			//    to true anomoly, f - the angle measured from the focus. (see Fig 3.2 in Gravity) 
			var cos_f = (Math.cos(u) - e[i])/(1 - e[i] * Math.cos(u));
			var sin_f = (Math.sqrt(1 - e[i]*e[i]) * Math.sin (u))/(1 - e[i] * Math.cos(u));
			var r = a[i] * (1 - e[i]*e[i])/(1 + e[i] * cos_f);
			//var revised_r = (true_a) * (1 - e*e)/(1 + e * cos_f);
			cos_f_2 = cos_f*Math.cos(arg[i]) - sin_f*Math.sin(arg[i]);
			sin_f_2 = sin_f*Math.cos(arg[i]) + cos_f*Math.sin(arg[i]);
				
			if (p_num < 2) {
				time = time + orbitPeriod[0]/200;
			} else {
				time = time + orbitPeriod[0]/400;
			}
			time1 = time % orbitPeriod[0];
			document.getElementById("time").innerHTML = "Time: " + time1 + " days";
			document.getElementById("time").style.marginLeft = base_canvas.width + 15;
			// animate
			last_x[i] = focus_x + r*cos_f_2;
			last_y[i] = focus_y + r*sin_f_2;

			movingBody = drawBody( r* cos_f_2, r*sin_f_2, color_list[i]);
		}
		
		for (i=0; i < p_num; i++) {
			distp = Math.sqrt((last_x[i] - last_x[i+1])**(2) + (last_y[i] - last_y[i+1])**(2));
			dist2=Math.sqrt(last_x[i+1]**2+last_y[i+1]**2);
			// document.getElementById("check3").innerHTML = dist2;
			if (distp < 0.08*dist2) {
				ctx.beginPath();
				ctx.moveTo(last_x[i], last_y[i]);
				ctx.lineTo(last_x[i+1], last_y[i+1]);
				ctx.strokeStyle = "#FF64E1"
				ctx.stroke();
				ctx.closePath();
			}
		}
		//slider bar? attached to ms in setTimeout
		animate = setTimeout(orbitBody, 60);

    }
    
    function calculateHZ() {
        sun_mass = 1.9891e30;   //mass of our sun, units: kg
        Lsun = 3.83e26;     //luminosity of our sun, units: J/s
        s = 5.67e-8;        //Stefan-Boltzmann constant, units: J m^-2 K^-4 s^-1
        A = 0.3         //planet albedo
        T_out = 200;     //inner habitable mean temp, units: K
        T_in = 270;    //outer habitable mean temp, units: K
        Mrat = star_mass/sun_mass;
        hz_in_m = ((Mrat/T_in)**2)*Math.sqrt((1-A)*Lsun/(16*s*Math.PI));
        hz_out_m = ((Mrat/T_out)**2)*Math.sqrt((1-A)*Lsun/(16*s*Math.PI));
        hz_in = hz_in_m/1.496e11;
        hz_out = hz_out_m/1.496e11;
    }

	function drawAesth(ecc, oP) {
		//draw center mass
		//calculate_a(ecc, oP,aFactor);
		centerBody = drawBody(0, 0, '#FFFF00');

        calculateHZ();

		//draw inner habitable zone
		ctx_path.beginPath();
		ctx_path.arc(0, 0, hz_in*aFactor, 0, 2*Math.PI);
		ctx_path.closePath();
		ctx_path.lineWidth = 2;
		ctx_path.strokeStyle = "#00A000";
		ctx_path.stroke();
		ctx_path.fillStyle = "#000000";
		ctx_path.fill();
		//drawCircle(hz1*aFactor);

		//draw outer habitable zone
		ctx_path_1.beginPath();
		ctx_path_1.arc(0, 0, hz_out*aFactor, 0, 2*Math.PI);
		ctx_path_1.closePath();
		ctx_path_1.lineWidth = 2;
		ctx_path_1.strokeStyle = "#00A000";
		ctx_path_1.stroke();
		//drawCircle(hz2*aFactor);
		ctx_path_1.globalAlpha = 0.3;
		ctx_path_1.fillStyle = "#00A000";
		ctx_path_1.fill();

	}

	function draw_ellipse_path(ecc, local_a, local_b, local_color, local_arg) {
		//draw ellipse path
		ctx_path.beginPath();
		// ctx_path.ellipse(-local_a*ecc*Math.cos(local_arg), -local_a*ecc*Math.sqrt(1-Math.cos(local_arg)*Math.cos(local_arg)), local_a, local_b, local_arg, 0, 2*Math.PI);
		ctx_path.ellipse(-local_a*ecc*Math.cos(local_arg), -local_a*ecc*Math.sin(local_arg), local_a, local_b, local_arg, 0, 2*Math.PI);
		ctx_path.strokeStyle = local_color;
		ctx_path.stroke();

	}

