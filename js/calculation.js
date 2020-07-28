function inputCheck() {
    m = document.getElementById("m_input").value;
    h = document.getElementById("h_input").value;
    cw = document.getElementById("cw_input").value;
    A = document.getElementById("A_input").value;
    dp = document.getElementById("dp_input").value;
    dt = Number(document.getElementById("dt_input").value);
    g = 9.80665;
    rho = -0.00006070059783 * (h / 2) + 0.9351058841;
    rhoKonstantStatus = document.getElementById("rhoKonstantCheckbox").checked;
    tvmaxStatus = document.getElementById("tvmaxCheckbox").checked;
    k = 0.5 * cw * A * rho;
}

function calcMaxSpeed() {
    if (tvmaxStatus == true) {
        a_arr = [g];
        F_arr = [m * g];
        v_arr = [0];
        y_arr = [h];
        t_arr = [0];
        tvmax_arr = [0];
        v_max = Math.sqrt((m * g) / k);
        a = g;
        F = m * g;
        v = 0;
        y = h;
        t = 0;
        while (y >= 0) {
            if (v.toFixed(1) == v_max.toFixed(1)) {
                tvmax_arr.push(t);
            }
            if (rhoKonstantStatus == false) {
                rho =
                    ((101325 * (1 - (0.0065 * y) / 288.15)) ^
                        ((g * 0.0289644) / (8.31447 * 0.0065))) /
                    (287.058 * (288.15 - 0.0065 * h));
            }
            a = g - ((0.5 * cw * A * rho) / m) * v * v;
            F = m * a;
            v += a * dt;
            y -= v * dt;
            t += dt;
        }
        document.getElementById("speed_output").innerHTML =
            "beträgt ≈ " +
            v_max.toFixed(dp) +
            " m/s  ≈ " +
            (v_max * 3.6).toFixed(dp) +
            " km/h und wird nach näherungsweise " +
            tvmax_arr[1].toFixed(dp) +
            " s erreicht";
    } else {
        v_max = Math.sqrt((m * g) / k);
        document.getElementById("speed_output").innerHTML =
            "beträgt ≈ " +
            v_max.toFixed(dp) +
            " m/s  ≈ " +
            (v_max * 3.6).toFixed(dp) +
            " km/h";
    }
}

function calcTime() {
    potenz = Math.pow(Math.E, (h * k) / m);
    if (Math.log(potenz + Math.sqrt(potenz * potenz - 1)) == Infinity) {
        t_fall = Math.sqrt(m / (g * k)) * Math.log(2) + (h * k) / m;
    } else {
        t_fall =
            Math.sqrt(m / (g * k)) *
            Math.log(potenz + Math.sqrt(potenz * potenz - 1));
    }
    document.getElementById("time_output").innerHTML =
        "beträgt ≈ " +
        t_fall.toFixed(dp) +
        " s  ≈ " +
        (t_fall / 60).toFixed(dp) +
        " min";
}

function writeTable() {
    a_arr = [g];
    F_arr = [m * g];
    v_arr = [0];
    y_arr = [h];
    t_arr = [0];
    a = g;
    F = m * g;
    v = 0;
    y = h;
    t = 0;
    while (y >= 0) {
        if (rhoKonstantStatus == false) {
            var T = 288.15 - 0.0065 * h;
            var p =
                (101325 * (1 - (0.0065 * y) / 288.15)) ^
                ((g * 0.0289644) / (8.31447 * 0.0065));
            rho = p / (287.058 * T);
        }
        a = g - ((0.5 * cw * A * rho) / m) * v * v;
        F = m * a;
        v += a * dt;
        y -= v * dt;
        t += dt;
        a_fix = a.toFixed(dp);
        F_fix = F.toFixed(dp);
        v_fix = v.toFixed(dp);
        y_fix = y.toFixed(dp);
        t_fix = t.toFixed(dp);
        a_arr.push(a_fix);
        F_arr.push(F_fix);
        v_arr.push(v_fix);
        y_arr.push(y_fix);
        t_arr.push(t_fix);
    }
    document.write('<table style="font-family:Roboto,sans-serif">');
    document.write(
        "<tr><th>Zeit Δt [s]  </th><th>Geschwindigkeit v [m/s]  </th><th>Höhe h [m]  </th><th>Kraft F [N]  </th><th>Beschleunigung a [m/s^2]  </th></tr>"
    );
    for (i = 0; i < v_arr.length; i++) {
        document.write(
            "<tr><td>" +
                t_arr[i] +
                "</td>" +
                "<td>" +
                v_arr[i] +
                "</td>" +
                "<td>" +
                y_arr[i] +
                "</td>" +
                "<td>" +
                F_arr[i] +
                "</td>" +
                "<td>" +
                a_arr[i] +
                "</td></tr>"
        );
    }
    document.write("</table>");
}

function plotData() {
    if (tvmaxStatus == true) {
        a_arr = [g];
        F_arr = [m * g];
        v_arr = [0];
        y_arr = [h];
        t_arr = [0];
        tvmax_arr = [0];
        v_max = Math.sqrt((m * g) / k);
        a = g;
        F = m * g;
        v = 0;
        y = h;
        t = 0;
        while (y >= 0) {
            if (v.toFixed(1) == v_max.toFixed(1)) {
                tvmax_arr.push(t);
            }
            if (rhoKonstantStatus == false) {
                rho =
                    ((101325 * (1 - (0.0065 * y) / 288.15)) ^
                        ((g * 0.0289644) / (8.31447 * 0.0065))) /
                    (287.058 * (288.15 - 0.0065 * h));
            }
            a = g - ((0.5 * cw * A * rho) / m) * v * v;
            F = m * a;
            v += a * dt;
            y -= v * dt;
            t += dt;
        }
        document.getElementById("speed_output").innerHTML =
            "beträgt ≈ " +
            v_max.toFixed(dp) +
            " m/s  ≈ " +
            (v_max * 3.6).toFixed(dp) +
            " km/h und wird nach ca. " +
            tvmax_arr[1].toFixed(dp) +
            " s erreicht";
    } else {
        v_max = Math.sqrt((m * g) / k);
        document.getElementById("speed_output").innerHTML =
            "beträgt ≈ " +
            v_max.toFixed(dp) +
            " m/s  ≈ " +
            (v_max * 3.6).toFixed(dp) +
            " km/h";
    }
    a_arr = [g];
    F_arr = [m * g];
    v_arr = [0];
    y_arr = [h];
    t_arr = [0];
    vmax_arr = [v_max];
    a = g;
    F = m * g;
    v = 0;
    y = h;
    t = 0;
    while (y >= 0) {
        if (rhoKonstantStatus == false) {
            rho =
                ((101325 * (1 - (0.0065 * y) / 288.15)) ^
                    ((g * 0.0289644) / (8.31447 * 0.0065))) /
                (287.058 * (288.15 - 0.0065 * h));
        }
        a = g - ((0.5 * cw * A * rho) / m) * v * v;
        F = m * a;
        v += a * dt;
        y -= v * dt;
        t += dt;
        a_fix = a.toFixed(dp);
        F_fix = F.toFixed(dp);
        v_fix = v.toFixed(dp);
        y_fix = y.toFixed(dp);
        t_fix = t.toFixed(dp);
        vmax_arr.push(v_max);
        a_arr.push(a_fix);
        F_arr.push(F_fix);
        v_arr.push(v_fix);
        y_arr.push(y_fix);
        t_arr.push(t_fix);
    }
    trace1 = {
        x: t_arr,
        y: y_arr,
        mode: "lines+markers",
        name: "Höhe y [m]",
        line: {
            shape: "spline",
            color: "#2478B2",
        },
        type: "scatter",
    };
    trace2 = {
        x: t_arr,
        y: F_arr,
        mode: "lines+markers",
        name: "Kraft F [N]",
        line: {
            shape: "spline",
            color: "#FFD600",
        },
        type: "scatter",
    };
    trace3 = {
        x: t_arr,
        y: v_arr,
        mode: "lines+markers",
        name: "Geschwindigkeit v [m/s]",
        line: {
            shape: "spline",
            color: "#DD2C00",
        },
        type: "scatter",
    };
    trace4 = {
        x: t_arr,
        y: a_arr,
        mode: "lines+markers",
        name: "Beschleunigung a [m/s^2]",
        line: {
            shape: "spline",
            color: "#00b34d",
        },
        type: "scatter",
    };
    trace5 = {
        x: t_arr,
        y: vmax_arr,
        mode: "lines",
        name: "Grenzgeschwindigkeit v_max [m/s]",
        line: {
            shape: "spline",
            color: "#000000",
        },
        type: "scatter",
    };
    var widthper = 0.9 * $(window).width();
    var heightper = 0.9 * $(window).height();
    data = [trace1, trace2, trace3, trace4, trace5];
    layout = {
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        autosize: !1,
        width: widthper,
        height: heightper,
        xaxis: {
            title: "Zeit Δt [s]",
            titlefont: {
                family: "Roboto",
            },
            font: {
                family: "Roboto",
            },
        },
        legend: {
            font: {
                family: "Roboto",
            },
        },
    };
    Plotly.newPlot("Graph", data, layout);
}
