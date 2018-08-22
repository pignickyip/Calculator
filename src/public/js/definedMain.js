let basicCal = new Vue({
    el: "#calculator",
    data: {
        digit: "",
        msg: "0",
        equation: "",
        cal: "",
        temp: "",
        tempOper: 0,
        rdIsActive: true,
        paIsActive: true,
        powIsActive: false,
        eeIsActive: false,
        sqrtIsActive: false
    },
    methods: {
        input: function (num) {
            if (num === "." && this.msg.toString().includes("."))
                return false;
            else if (this.msg === "0") {
                this.msg = num;
                this.digit = num;
            } else {
                this.digit += num;
                this.msg = this.digit;
            }
        },
        clear: function () {
            if (this.msg === "0")
                this.equation = "";
            this.msg = "0";
            this.digit = "";
            this.rdIsActive = true;
        },
        operator: function (opt) {
            this.equation += this.msg;
            //            if (this.equation.match(/(^[0-9]*)+$/)) {
            //                this.equation = this.msg;
            //            } else {
            //                this.equation = this.digit;
            //            }
            if (this.equation) {
                this.operatorHanlder(opt, 2);
            }
        },
        percentage: function () {
            this.equation = "";
            this.msg = (this.msg / 100).toString();
            this.digit = this.msg;
        },
        inverse: function () {
            if (this.msg == 0)
                return false;
            this.equation = "";
            if (this.msg[0] == "-")
                this.msg = this.msg.substr(1);
            else
                this.msg = "-" + this.msg;
            this.digit = this.msg;
        },
        equal: function () {
            if (this.temp && this.tempOper === 1) {
                if (!this.msg.match(/(^[0-9]*)+$/)) {
                    console.log("Oh no.");
                    return;
                } else {
                    let bastante = Math.pow(this.temp, this.msg);
                    this.equation = "";
                    this.msg = bastante;
                    this.digit = bastante;
                    this.cal = "";
                    this.temp = "";
                    this.tempOper = 0;
                    this.powIsActive = !this.powIsActive;
                }
            } else if (this.temp && this.tempOper === 2) {
                if (!this.msg.match(/(^[0-9]*)+$/)) {
                    console.log("Oh no.");
                    return;
                } else {
                    let bastante = Math.pow(this.temp, (1 / this.msg));
                    this.equation = "";
                    this.msg = bastante;
                    this.digit = bastante;
                    this.cal = "";
                    this.temp = "";
                    this.tempOper = 0;
                    this.sqrtIsActive = !this.sqrtIsActive;
                }
            } else if (this.temp && this.tempOper === 3) {
                if (!this.msg.match(/(^[0-9]*)+$/)) {
                    console.log("Oh no.");
                    return;
                } else {
                    //For example, x [EE] y = x * 10^y
                    let bastante = this.temp * Math.pow(10, this.msg);
                    this.equation = "";
                    this.msg = bastante;
                    this.digit = bastante;
                    this.cal = "";
                    this.temp = "";
                    this.tempOper = 0;
                    this.eeIsActive = !this.eeIsActive;
                }
            } else if (this.equation === "") {
                return;
            } else if (this.cal !== "") {
                this.equation += this.msg;
                this.operatorHanlder("", 1);
            } else {
                return;
            }
        },
        parentheses: function () {
            //this.check();
            if (this.paIsActive) {
                //if (this.equation ) {
                this.temp = this.equation;
                this.msg = "";
                this.equation = "";
                //}
            } else {
                if (this.temp) {
                    if (this.temp.match(/(^[0-9]*)+$/)) {
                        return;
                    } else {
                        let bastante = this.temp + this.msg;
                        this.equation = bastante;
                        this.temp = "";
                        //console.log(this.equation)
                        this.operatorHanlder("", 1);
                    }
                }
            }
            this.paIsActive = !this.paIsActive;
        },
        pow: function (v, f) {
            let temp = this.msg;
            if (f === 0) {
                this.msg = Math.pow(temp, v);
            } else if (f === 1) {
                this.temp = this.msg;
                this.tempOper = 1;
                this.msg = "0";
                this.powIsActive = !this.powIsActive;
            } else if (f === 2) {
                this.msg = Math.exp(temp);
            } else if (f === 3) {
                if (parseFloat(temp) * v > 100) {
                    temp = 100 / v;
                }
                this.msg = Math.pow(v, temp);
            }
            this.lemniscate();
            this.digit = "";
            //            this.digit = this.msg;
            //            this.cal = '';
        },
        sqrt: function (f) {
            let temp = this.msg;
            if (f === 2) { // Square Root
                this.msg = Math.sqrt(temp);
            } else if (f === 3) { // Cube Root  
                this.msg = Math.cbrt(temp);
            } else if (f === 4) {
                this.temp = this.msg;
                this.tempOper = 2;
                this.msg = "0";
                this.sqrtIsActive = !this.sqrtIsActive;
            }
            this.digit = "";
            //            this.digit = this.msg;
            //            this.cal = '';
        },
        trigonometric: function (i, t) {
            let temp = this.msg;
            if (i === 0) {
                if (t === 0) {
                    this.msg = Math.sin(temp);
                } else if (t === 1) {
                    this.msg = Math.cos(temp);
                } else if (t === 2) {
                    this.msg = Math.tan(temp);
                }
            } else if (i === 1) {
                if (t === 0) {
                    this.msg = Math.asin(temp);
                } else if (t === 1) {
                    this.msg = Math.acos(temp);
                } else if (t === 2) {
                    this.msg = Math.atan(temp);
                }
            } else {
                return;
            }
            this.lemniscate();
            this.digit = "";
            //this.digit = this.msg;
            //this.cal = '';
        },
        myValueChange: function (f) {
            if (f === 0) {
                this.msg = Math.E.toFixed(10);
            } else if (f === 1) {
                this.msg = Math.PI.toFixed(10);
            } else if (f === 2) {
                this.msg = Math.random().toFixed(10);
            }

            //this.digit = this.msg;
        },
        specialOperator: function (f) {
            if (f === 0) {
                this.msg = (1 / parseFloat(this.msg));
            } else if (f === 1) { //log base e
                this.msg = Math.log(this.msg);
            } else if (f === 2) { //log base 10
                this.msg = Math.log10(this.msg);
            } else if (f === 3) { //x!
                this.msg = this.factorialFunction(Math.round(this.msg));
            } else
            if (f === 4) { //EE
                this.temp = this.msg;
                this.tempOper = 3;
                this.msg = "0";
                this.eeIsActive = !this.eeIsActive;
            } else if (f === 5) { //RAD
                //1 rad = 180°/π = 57.295779513°
                if (this.rdIsActive) {
                    this.msg = (this.msg) * 180 / Math.PI;
                    this.rdIsActive = false;
                } else {
                    this.msg = (this.msg) * Math.PI / 180;
                    this.rdIsActive = true;
                }
            }
            this.lemniscate();
            // this.digit = this.msg
        },
        msgChangeHandler: function (e) {
            let temp = this.msg;
            //            if (temp.match(/^([0-9\-])+$/g)) {
            //                console.log("ds")
        },
        operatorHanlder: function (calVal, flag) {
            this.msg = eval(this.equation).toString();
            this.digit = "";
            this.cal = calVal;
            if (flag === 1) {
                this.equation = "";
            } else if (flag === 2) {
                this.equation = this.msg + calVal;
            }
        },
        factorialFunction: function (num) {
            if (num === 0) {
                return 1;
            } else {
                return num * this.factorialFunction(num - 1);
            }
        },
        lemniscate: function () { //Infinity trend to 1
            if (this.msg) { // value -> *.99999999999999
                if (this.msg.toString().includes(".")) {
                    let temp = this.msg.toString().split(".")[1];
                    if (temp.match(/([9]{5,})+$/) && !temp.match(/([0-8])+$/)) {
                        this.msg = Math.round(this.msg);
                    }
                } else {
                    return;
                }
            } else {
                return;
            }
        },
        check: function () {
            console.log(this.equation);
            console.log(this.digit);
            console.log(this.msg);
        },
        machineOperator: async function (flag) {
            let temp = this.msg;
            if (flag === 0) {
                await machineFunction("/machine/clear", {
                    username: "nick"
                }, flag);
                this.clear();
            } else if (flag === 1) {
                await machineFunction("/machine/store", {
                    data: temp,
                    username: "nick"
                }, flag);
                this.clear();
            } else if (flag === 2) {
                this.msg = await machineFunction("/machine/result", {
                    username: "nick"
                }, flag);
                this.digit = "";
            } else if (flag === 3) { //M+
                this.msg = await machineFunction("/machine/operate", {
                    value: temp,
                    operator: 2,
                    username: "nick"
                }, flag);
                this.digit = "";
            } else if (flag === 4) {
                this.msg = await machineFunction("/machine/operate", {
                    value: temp,
                    operator: 3,
                    username: "nick"
                }, flag);
                this.digit = "";
            }
        }
    }
});
